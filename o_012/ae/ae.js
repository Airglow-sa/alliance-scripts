$(function() {
    // Date shim
    if (!Date.now) {
        Date.now = function() {
            return new Date().getTime();
        }
    }

    var Term_proto = function(options) {
        var self = this;
        this.$body = $('<div class="term_proto"></div>');
        this.answers = options.answers;
        this.min_reset_time = options.min_reset_time;
        this.max_reset_time = options.max_reset_time;
        this.new_reset_time();
        this.max_len = options.max_len;

        this.pre_text = options.pre_text;

        this.set_ta();
        this.$body.append(
            $("<div>").addClass('recs').hide()
        );

        // Проверка времени
        this.iter = window.setInterval(function() {
            self.tick();
        }, this.min_reset_time);

        return this;
    };

    Term_proto.prototype.new_reset_time = function() {
        this.time_until_reset = Math.round(Math.random() * (3000 - 500)) + 500;
    }

    Term_proto.prototype.tick = function() {
        this.time_until_reset = this.time_until_reset - this.min_reset_time;
        if (this.time_until_reset <= 0) {
            this.new_reset_time();
            this.reset();
        }
    }

    Term_proto.prototype.set_ta = function() {
        this.$body.find('textarea').remove();
        var $ta = $('<textarea>');
        this.$ta = $ta;
        this.$body.prepend(this.$ta);
    }

    Term_proto.prototype.reset = function() {
        if (this.$ta.val().length > 0) {
            // Reset textarea
            this.$ta.val('');
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
