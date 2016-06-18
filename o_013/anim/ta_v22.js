// Global unique ID
// Src: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

// Function to create ranges of values
// http://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-an-array-based-on-suppl
var range = function(start, end, step) {
    var range = [];
    var typeofStart = typeof start;
    var typeofEnd = typeof end;
    if (step === 0) {
        throw TypeError("Step cannot be zero.");
    }
    if (typeofStart == "undefined" || typeofEnd == "undefined") {
        throw TypeError("Must pass start and end arguments.");
    } else if (typeofStart != typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
    }
    if (typeof step == "undefined") {
        step = 1
    }
    if (end < start) {
        step = -step;
    }
    if (typeofStart == "number") {
        while (step > 0 ? end >= start : end <= start) {
            range.push(start);
            start += step;
        }
    } else if (typeofStart == "string") {
        if (start.length != 1 || end.length != 1) {
            throw TypeError("Only strings with one character are supported.");
        }
        start = start.charCodeAt(0);
        end = end.charCodeAt(0);
        while (step > 0 ? end >= start : end <= start) {
            range.push(String.fromCharCode(start));
            start += step;
        }
    } else {
        throw TypeError("Only string and number types are supported");
    }
    return range;
};

// Inject an array of items to a certain index of another array
// Builds a new one
var injectArray = function( baseArray, idx, injArray ) {
    var output = [];
    var a=baseArray.slice( 0, idx ), b=baseArray.slice( idx );
    var pushOneByOne = function(item) {
        output.push(item);
    };
    a.forEach(pushOneByOne);
    injArray.forEach(pushOneByOne);
    b.forEach(pushOneByOne);
    return output;
};

function Term_animation(options) {
    this.options = options;
    // Current frame
    this.frameId = 0;
    // Character id being typed right now
    this.typingCharId = 0;
    // Last paragraph
    this.lastParagraph = false;
    // Default action mode
    if (!(this.options.default_mode)) {
        this.options.default_mode = "print";
    }
    // Ignore delay
    this.ignoreDelayBetweenFrames = false;
    // Current frame pause time
    this.currentFramePauseTime = this.options.pause_between_steps;

    // Current step (used by progressbars for now)
    // Steps include all operations requiring call of "action" fn
    this.currentStep = 0;

    // Paragraph variables
    this.paragraphs = {};
    // Progressbar descriptors
    this.pbdscs = {};

    // Steps left to pass
    this.passStepsLeft = 0;
    // Is delayed?
    this.delayed = false;

    // Set progressbar defaults
    this.progressbarDefaults = {
        'empty_start': '<span style=\"color: #F1F2E1;\">',
        'empty_end': '</span>',
        'fill_start': '<span>',
        'fill_end': '</span>',
        'fill_char': '█'
    };

    this.buildProgressBarHTML = function(len, value, settings) {
        // Get defaults
        if (typeof(settings)==='undefined') settings = this.progressbarDefaults;
        //
        var j;
        var current_s = "";
        // Generate filled part
        if (value>0) {
            current_s+=settings.fill_start;
            for (j=0; j<value; j++) current_s+=settings.fill_char;
            current_s+=settings.fill_end;
        }
        //
        if (len-value>0) current_s+=settings.empty_start;
        for (j=0; j<len-value; j++) current_s+=settings.fill_char;
        if (len-value>0) current_s+=settings.empty_end;
        //
        return (current_s);
    };

    this.findSimultaneousListCommands = function() {
        var ids = [];
        for (var i = 0; i < this.options.frames.length; i++) {
            if (Object.prototype.toString.call(this.options.frames[i]) === '[object Array]') {
                ids.push(i);
            }
        }
        return ids;
    };

    this.replaceSimultaneousListCommands = function() {
        // Indexes to replace and their length
        var pbIds;
        // Frames to inject
        var fti;
        while (this.findSimultaneousListCommands().length) {
            pbIds = this.findSimultaneousListCommands();
            // Building command list; we ignore pause between frames for anything except typing there
            fti = [{"c": "ignore_delay_between_frames"}];
            fti = fti.concat(this.options.frames[pbIds[0]]);
            fti.push({"c": "restore_delay_between_frames"});
            //
            delete this.options.frames[pbIds[0]];
            this.options.frames = injectArray( this.options.frames, pbIds[0], fti );
        }
    };

    this.replaceSimultaneousListCommands();

    this.start = function() {
        this.step();
    };

    // Update progressbar look by its current value
    this.updateCertainProgressBarState = function(pbId) {
        var self = this;
        var progressbarOptions = self.pbdscs[pbId];
        var rId = self.currentStep - progressbarOptions.startStep;
        var crId = rId;
        if (crId>(progressbarOptions.range.length-1)) {
            crId = progressbarOptions.range.length-1;
        }
        var fill = Math.floor(progressbarOptions.range[crId]);
        var htmlValue = self.buildProgressBarHTML(
            progressbarOptions.len,
            fill,
            progressbarOptions.style
        );
        //
        //debugger;
        self.paragraphs[pbId].innerHTML = htmlValue;
        //debugger;
        $(self.paragraphs[pbId]).attr('data-pbid', pbId);
        // Delete the descriptor
        if ((progressbarOptions.range.length-rId)===0) {
            delete self.pbdscs[pbId];
        }
    };

    // List all of the defined progressbars and update these
    this.updateAllProgressBarStates = function() {
        var self = this;
        var pbId;
        for (pbId in this.pbdscs) {
          if (this.pbdscs.hasOwnProperty(pbId)) {
              self.updateCertainProgressBarState(pbId);
          }
        }
    };

    this.action = function(self, max_step, currentFrame) {
        var nextStep = false;
        var nextFrame = false;
        var resetFrameData = false;
        var mode = "";

        if (currentFrame.c) {
            mode = currentFrame.c;
        }
        else if(typeof(currentFrame)=="string") {
            mode = self.options.default_mode;
        }

        //
        if (mode == "rst") {
            // Reset last paragraph
            self.lastParagraph = false;
            // Reset paragraph variables
            self.paragraphs = {};
            // Reset progressbar descriptors
            this.pbdscs = {};
            // Reset text container
            self.options.$parent.html('');
            //
            nextStep = self.frameId < max_step;
            nextFrame = self.frameId < max_step;
            resetFrameData = true;
        }
        else if (mode == "print") {
            var currentParagraph, append;

            if (Object.prototype.toString.call(currentFrame) === "[object Object]" && currentFrame.var_name) {
                if (self.paragraphs.hasOwnProperty(currentFrame.var_name)) {
                    // Find the paragraph, set by the variable
                    currentParagraph = self.paragraphs[currentFrame.var_name];
                }
                else {
                    // Create the paragraph
                    currentParagraph = $.parseHTML("<p>")[0];
                    append = true;
                    // Set the variable
                    self.paragraphs[currentFrame.var_name] = currentParagraph;
                }
                // Set last paragraph
                self.lastParagraph = currentParagraph;
            }
            else {
                currentParagraph = $.parseHTML("<p>")[0];
                append = true;
                // Set last paragraph
                self.lastParagraph = currentParagraph;
            }

            if (true===append) {
                // Append the paragraph
                self.options.$parent[0].appendChild(currentParagraph);
            }

            if (currentFrame.txt) {
                currentParagraph.innerHTML = currentFrame.txt;
            }
            else {
                currentParagraph.innerHTML = currentFrame;
            }

            nextStep = self.frameId < max_step;
            nextFrame = self.frameId < max_step;
        }
        else if (mode == "type") {
            var currentParagraph, append;
            // Init paragraph
            // Check for the beginning of typing
            if (self.typingCharId === 0) {
                if (Object.prototype.toString.call(currentFrame) === "[object Object]" && currentFrame.var_name) {
                    if (self.paragraphs.hasOwnProperty(currentFrame.var_name)) {
                        // Find the paragraph, set by the variable
                        currentParagraph = self.paragraphs[currentFrame.var_name];
                        // Reset old paragraph content
                        currentParagraph.innerHTML = "";
                    }
                    else {
                        // Create the paragraph
                        currentParagraph = $.parseHTML("<p>")[0];
                        append = true;
                        // Set the variable
                        self.paragraphs[currentFrame.var_name] = currentParagraph;
                    }
                }
                else {
                    // Create the paragraph
                    currentParagraph = $.parseHTML("<p>")[0];
                    append = true;
                }
                // Set last paragraph
                self.lastParagraph = currentParagraph;
            }
            else {
                currentParagraph = self.lastParagraph;
            }

            // Append the paragraph
            if (true===append) {
                self.options.$parent[0].appendChild(currentParagraph);
            }
            // Put a character
            currentParagraph.innerHTML += currentFrame.txt[self.typingCharId];
            self.typingCharId++;
            //
            nextStep = (self.frameId < max_step) || (self.typingCharId <= currentFrame.txt.length);
            nextFrame = self.typingCharId >= currentFrame.txt.length;
            resetFrameData = self.typingCharId >= currentFrame.txt.length;
        }
        // Replace text in a certain paragraph
        else if (mode == "replace_paragraph") {
            if (currentFrame.var_name) {
                if (self.paragraphs[currentFrame.var_name]) {
                    self.paragraphs[currentFrame.var_name].innerHTML = currentFrame.txt;
                }
                else {
                    console.log("Warning! There is no paragraph with such name!");
                }
            }
            //
            nextStep = self.frameId < max_step;
            nextFrame = self.frameId < max_step;
        }
        else if (mode == "remove_paragraph") {
            var parentParagraph = self.options.$parent[0];
            var childParagraph = self.paragraphs[currentFrame.var_name];
            if (currentFrame.var_name) {
                if (self.paragraphs[currentFrame.var_name]) {
                    parentParagraph.removeChild(childParagraph);
                }
                else {
                    console.log("Warning! There is no paragraph with such name!");
                }
            }
            //
            nextStep = self.frameId < max_step;
            nextFrame = self.frameId < max_step;
        }
        // Replace text in the last paragraph
        else if (mode == "replace_last") {
            if (self.lastParagraph) {
                self.lastParagraph.innerHTML = currentFrame.txt;
            }
            //
            nextStep = self.frameId < max_step;
            nextFrame = self.frameId < max_step;
        }
        else if (mode == "define_progressbar") {
            var newParagraph, progressbarOptions, append;
            progressbarOptions = currentFrame.pb_opts || {};
            progressbarOptions.len = currentFrame.len;

            if (currentFrame.var_name) {
                // Init paragraph or use the existing one
                if (self.paragraphs[currentFrame.var_name]) {
                    newParagraph = self.paragraphs[currentFrame.var_name];
                    append = false;
                }
                else {
                    // Define and append the paragraph
                    newParagraph = $.parseHTML("<p>")[0];
                    append = true;
                    // Set the paragraph variable
                    self.paragraphs[currentFrame.var_name] = newParagraph;
                }
            }
            else {
                // Set the guid as progressbar's variable name
                currentFrame.var_name = guid();
                // Define and append the paragraph
                newParagraph = $.parseHTML("<p>")[0];
                // Store the paragraph
                self.paragraphs[currentFrame.var_name] = newParagraph;
                append = true;
            }

            // Pasting the paragraph and its data to the place
            self.lastParagraph = newParagraph;

            // Setting up
            progressbarOptions.startStep = self.currentStep;
            if (!progressbarOptions.style) {
                progressbarOptions.style = self.progressbarDefaults;
            }

            if (progressbarOptions.hasOwnProperty('replace_range')) {
                progressbarOptions.range = range(
                    progressbarOptions.replace_range.start,
                    progressbarOptions.replace_range.end,
                    progressbarOptions.replace_range.step
                );
            }
            else {
                progressbarOptions.range = range(0, currentFrame.len, 1);
            }

            // Append the paragraph
            if (true===append) self.options.$parent[0].appendChild(self.lastParagraph);
            // Copy progressbar options
            self.pbdscs[currentFrame.var_name] = progressbarOptions;

            // Update content
            this.updateCertainProgressBarState(currentFrame.var_name);

            // Consider switching the steps
            nextStep = self.frameId < max_step;
            nextFrame = self.frameId < max_step;
        }
        else if (mode == "pause") {
            nextStep = self.frameId < max_step;
            nextFrame = self.frameId < max_step;
            resetFrameData = true;
            this.currentFramePauseTime = currentFrame.time;
        }
        else if (mode == "step_delay") {
            // Init
            if (false===self.delayed) {
                self.delayed = true;
                self.passStepsLeft = currentFrame.cnt;
            }
            else {
                self.passStepsLeft--;
                // Check if delay should be continued
                if (self.passStepsLeft===0) {
                    self.delayed = false;
                }
            }
            // We go to the next step if there are any frames left, or if there are pass steps left
            nextStep = (self.frameId < max_step) || (self.passStepsLeft > 0);
            nextFrame = self.passStepsLeft <= 0;
            resetFrameData = self.passStepsLeft <= 0;
        }
        else if (mode == "ignore_delay_between_frames") {
            self.ignoreDelayBetweenFrames = true;
            nextStep = self.frameId < max_step;
            nextFrame = self.frameId < max_step;
        }
        else if (mode == "restore_delay_between_frames") {
            self.ignoreDelayBetweenFrames = false;
            self.currentFramePauseTime = self.options.pause_between_steps;
            nextStep = self.frameId < max_step;
            nextFrame = self.frameId < max_step;
        }
        else if (mode == "change_global_delay") {
            self.currentFramePauseTime = currentFrame.delay_ms;

            nextStep = (self.frameId < max_step);
            nextFrame = self.passStepsLeft <= 0;
            resetFrameData = self.passStepsLeft <= 0;
        }
        else if (mode == "reset_global_delay") {
            self.currentFramePauseTime = self.options.pause_between_steps;

            nextStep = (self.frameId < max_step);
            nextFrame = self.passStepsLeft <= 0;
            resetFrameData = self.passStepsLeft <= 0;
        }

        return({
            'nextStep': nextStep,
            'nextFrame': nextFrame,
            'resetFrameData': resetFrameData
        });
    };

    this.step = function() {
        var self = this;
        var max_step = this.options.frames.length - 1;
        var currentFrame = this.options.frames[this.frameId];
        var action;
        if (0===self.currentStep) {
            this.currentFramePauseTime = this.options.pause_between_steps;
        }
        // Process frame if it exists
        if (currentFrame) {
            // Reset the pause
            if (currentFrame.c!="type" && true==self.ignoreDelayBetweenFrames) {
                this.currentFramePauseTime = 0;
            }
            action = this.action(self, max_step, currentFrame);
            if (action.nextStep) {
                setTimeout(function() {
                    self.step();
                }, this.currentFramePauseTime);
            }
            if (action.nextFrame) {
                this.frameId++;
            }
            if (action.resetFrameData) {
                this.typingCharId = 0;
                this.lastParagraph = false;
            }
        }

        // Update states for the existing progressbar definitions
        self.updateAllProgressBarStates();

        self.currentStep++;
    };
}

window.Term_animation = Term_animation;
