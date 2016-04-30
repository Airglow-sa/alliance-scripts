(function($) {

    var methods = {
        init: function(options) {
            var self = this;
            var $this = $(this);

            // Checking if cypher blocks are available
            if ("cypher-blocks" in options) {
                this.cypher_blocks = options["cypher-blocks"];
            }
            else {
                // Avoid errors with empty cypher block list
                this.cypher_blocks = [];
            }

            this.input_field = $('<textarea></textarea>');
            this.input_field.attr('rows', '4');
            this.input_field.addClass('cypher_input').attr("placeholder", "Введите ключ шифра и нажмите enter.\nShift+Enter переносит строку.");

            this.input_field.keypress(function (e) {
              if (e.which == 13 && !e.ctrlKey && !e.shiftKey) {
                $.fn.cypher_panel.decypher(self);
                return false;
              }
            });

            this.output_block = $('<div></div>');
            this.output_block.addClass('cypher_output_block');

            $this.append(this.input_field, $('<br/>'), this.output_block);
        }
    };

    $.fn.cypher_panel = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' is not available');
        }

    };

    $.fn.cypher_panel.render = function(self) {
        // Стираем старые данные
        self.output_block.html('');
        var current_cypher;
        var blockquote;
        var b_paragraph;
        var doctext;
        var cyphertext;
        for (var cypher_id=0; cypher_id<self.cypher_blocks.length; cypher_id++) {
           current_cypher = self.cypher_blocks[cypher_id];
           if (current_cypher.hasOwnProperty('text')) {
              blockquote = $('<blockquote></blockquote>');
              b_paragraph = $('<p></p>');

              doctext = $('<strong></strong>');
              doctext = doctext.html('Текст документа ' + (cypher_id+1) + '.');

              cyphertext = $('<p></p>');
              cyphertext.addClass('cyphertext_paragraph');
              cyphertext.html(current_cypher.text);
              cyphertext.css('white-space', 'pre-wrap')

              b_paragraph.append( doctext, '<br/>', cyphertext );

              blockquote.append(b_paragraph);

              self.output_block.append(blockquote);
           }
        }
    }

    $.fn.cypher_panel.decypher = function(self) {
        var code = self.input_field.val();
        var current_cypher;
        var current_checksum;
        var current_text;
        for (var cypher_id=0; cypher_id<self.cypher_blocks.length; cypher_id++) {
            try {
                current_cypher = self.cypher_blocks[cypher_id];
                current_text = decrypt(code, current_cypher["cypher-text"]);
                if (sha512(current_text)==current_cypher.sha512) {
                    self.cypher_blocks[cypher_id].text = current_text;
                }
            } catch (err) {
                console.log('Ошибка дешифровки сегмента '+cypher_id, err);
            }
        }
        $.fn.cypher_panel.render(self);
    }

})(jQuery);
