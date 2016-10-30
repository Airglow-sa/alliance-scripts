(function ($) {

    var methods = {
        init: function (options) {
            var self = this;
            var $this = $(this);

            // Checking if cypher blocks are available
            if ("cypher-blocks" in options) {
                this.cypher_blocks = options["cypher-blocks"];
            } else {
                // Avoid errors with empty cypher block list
                this.cypher_blocks = [];
            }

            this.input_container = $('<div></div>');
            this.input_container.addClass('input_container');

            this.input_field = $('<textarea></textarea>');
            this.input_field.attr('rows', '4');
            this.input_field.addClass('cypher_input');
            // this.input_field.attr(
            //     "placeholder",
            //     "Введите ключ шифра и нажмите enter.\n"+
            //     "Shift+Enter переносит строку."
            // );

            this.decrypt_button = $('<button type="button">Расшифровать</button>');
            this.decrypt_button.addClass('decrypt_button');

            this.input_container.append(this.input_field);
            this.input_container.append('<br/>');
            this.input_container.append(this.decrypt_button);

            // Decypher on enter, add a newline on shift + enter
            // this.input_field.keydown(function (e) {
            //     // Enter or ctrl-enter w/o shift
            //     if ((e.keyCode == 10 || e.keyCode == 13) && !e.shiftKey) {
            //         $.fn.cypher_panel.decypher(self);
            //         return false;
            //     }
            // });

            this.decrypt_button.click(function(e) {
                $.fn.cypher_panel.decypher(self);
                return false;
            });

            this.output_block = $('<div></div>');
            this.output_block.addClass('cypher_output_block');

            $this.append(this.input_container, $('<br/>'), this.output_block);
        }
    };

    $.fn.cypher_panel = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' is not available');
        }

    };

    $.fn.cypher_panel.render = function (self) {
        // Стираем старые данные
        self.output_block.html('');
        var current_cypher;
        var b_paragraph;
        for (var cypher_id = 0; cypher_id < self.cypher_blocks.length; cypher_id++) {
            current_cypher = self.cypher_blocks[cypher_id];
            if (current_cypher.hasOwnProperty('text')) {
                b_paragraph = $('<p></p>');

                self.output_block.append(current_cypher.text);
            }
        }
    };

    $.fn.cypher_panel.decypher = function (self) {
        var code = self.input_field.val();
        var current_cypher;
        var current_text;
        var dstate;
        for (var cypher_id = 0; cypher_id < self.cypher_blocks.length; cypher_id++) {
            try {
                dstate = 0;
                if (code.length == 0) {
                    throw new Error("Decryption key is too short.");
                }
                current_cypher = self.cypher_blocks[cypher_id];
                current_text = decrypt(code, current_cypher["cypher-text"]);
                dstate++;
                if (sha512(current_text) == current_cypher.sha512) {
                    self.cypher_blocks[cypher_id].text = current_text;
                    // Hide input container if required
                    if (current_cypher.hide_input) {
                        self.input_container.css('display', 'none');
                    }
                    dstate++;
                    // Clear input field in any way
                    self.input_field.val('');
                    dstate++;
                    // Call the callback if required
                    if (current_cypher.callback && current_cypher.callback_ctx) {
                        current_cypher.callback(current_cypher.callback_ctx);
                    }
                    dstate++;
                }
            } catch (err) {
                console.log('Ошибка расшифровки (' + dstate + ')', err);
            }
        }
        $.fn.cypher_panel.render(self);
    };

})(jQuery);
