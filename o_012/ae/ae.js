$(function() {
    // Date shim
    if (!Date.now) {
        Date.now = function() {
            return new Date().getTime();
        }
    }

    var Term_proto = function(options) {
        var self = this;
        // Set body div, add centering
        this.$body = $('<div class="term_proto"></div>');
        this.$body.css('margin', '0 auto');
        // Set further options
        this.answers = options.answers;
        this.min_reset_time = options.min_reset_time;
        this.max_reset_time = options.max_reset_time;
        this.max_len = options.max_len;
        this.pre_text = options.pre_text;
        // Set time until reset once
        this.new_reset_time();
        // Reset textarea
        this.set_ta();
        // Append records block
        this.$body.append(
            $("<div>").addClass('recs').hide()
        );
        // Check time
        this.iter = window.setInterval(function() {
            self.tick();
        }, this.min_reset_time);
        // Return object
        return this;
    };

    // Set new time until the reset
    Term_proto.prototype.new_reset_time = function() {
        this.time_until_reset = Math.round(Math.random() * (3000 - 500)) + 500;
    }

    // Update time until reset, check if event should start and possibly execute it
    Term_proto.prototype.tick = function() {
        this.time_until_reset = this.time_until_reset - this.min_reset_time;
        if (this.time_until_reset <= 0) {
            this.new_reset_time();
            this.reset();
        }
    }

    // Reset textarea
    Term_proto.prototype.set_ta = function() {
        this.$body.find('textarea').remove();
        var $ta = $('<textarea>');
        this.$ta = $ta;
        this.$body.prepend(this.$ta);
    }

    // Reset the value
    Term_proto.prototype.reset = function() {
        if (this.$ta.val().length > 0) {
            // Reset textarea
            this.set_ta();
            this.$ta.focus();
            // Show records
            this.$body.find('.recs').show();
            // Add record
            var now = $('<span>').addClass('now').text(Math.floor(Date.now() / 1000));
            now.attr('title', 'время записи');
            var item = this.answers[Math.floor(Math.random() * this.answers.length)];
            var text = $('<span>').addClass('status').text(item);
            var paragraph = $('<p>');
            paragraph.append(now, text);
            var recs_div = this.$body.find('div.recs');
            var r_paragraphs = recs_div.find('p');
            if (r_paragraphs.length >= this.max_len) r_paragraphs.last().remove();
            recs_div.prepend(paragraph);
        } else {
            this.new_reset_time();
        }
    }
    window.Term_proto = Term_proto;
});
