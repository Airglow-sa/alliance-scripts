(function($) {

    var methods = {
        init: function(options) {
            var self = this;
            var $this = $(this);
            this.input_el = $($.parseHTML('<textarea rows="10" cols="40"></textarea>'));
            this.key_el = $($.parseHTML('<textarea rows="5" cols="40"></textarea>'));
            this.output_el = $($.parseHTML('<textarea rows="5" cols="40"></textarea>'));
            this.json_el = $($.parseHTML('<textarea rows="5" cols="40"></textarea>'));
            this.sha512_checksum = $($.parseHTML('<textarea rows="5" cols="40"></textarea>'));
            this.ok_el = $($.parseHTML('<button>Ok</button>'));

            $this.append(
                $('<p>Оригинальный текст</p>'), this.input_el, $.parseHTML('<br/>'),
                $('<p>Ключ</p>'), this.key_el, $.parseHTML('<br/>'),
                this.ok_el,
                $('<p>Зашифрованный текст</p>'), this.output_el,
                $('<p title="для ввода в консоль">Зашифрованная строка (2)</p>'), this.json_el,
                $('<p>Контрольная сумма SHA512</p>'), this.sha512_checksum
            );

            // Зашифровать при нажатии на кнопку
            $(this.ok_el).click(function() {
                $.fn.encrypt_panel.do_encryption(self);
            });
        }
    };

    $.fn.encrypt_panel = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' is not available');
        }

    };

    // Зашифровать и вывести результаты
    $.fn.encrypt_panel.do_encryption = function(self) {
        var input_value = self.input_el.val();
        var key_value = self.key_el.val();
        self.output_el.val('');
        if (key_value.length < 1) key_value = undefined;
        self.encryption_result = encrypt(input_value, key_value);
        self.sha512_checksum.val( sha512(input_value) );
        self.key_el.val(self.encryption_result[0]);
        self.output_el.val(self.encryption_result[1]);
        console.log(self.output_el, self.encryption_result[1]);
        self.json_el.val(JSON.stringify(self.encryption_result[1]));
    }

})(jQuery);


(function($) {

    var methods = {
        init: function(options) {
            var self = this;
            var $this = $(this);
            this.input_el = $($.parseHTML('<textarea rows="10" cols="40"></textarea>'));
            this.is_escaped = $($.parseHTML('<input type="checkbox">Раскрыть, как JS-строку</input>'));
            this.key_el = $($.parseHTML('<textarea rows="10" cols="40"></textarea>'));
            this.output_el = $($.parseHTML('<textarea rows="10" cols="40"></textarea>'));
            this.sha512_checksum = $($.parseHTML('<textarea rows="5" cols="40"></textarea>'));
            this.ok_el = $($.parseHTML('<button>Ok</button>'));
            this.checksum_ok = $($.parseHTML('<span></span>'));

            $this.append(
                $('<p>Шифротекст</p>'), this.input_el, $.parseHTML('<br/>'),
                $('<p>Ключ</p>'), this.key_el, $.parseHTML('<br/>'),
                $('<p>Контрольная сумма SHA512</p>'), this.sha512_checksum, $.parseHTML('<br/>'),
                $(this.is_escaped), $.parseHTML('<br/>'),
                this.ok_el,
                $('<p>Оригинальный текст</p>'), this.output_el, $.parseHTML('<br/>'),
                this.checksum_ok
            );

            // Расшифровать при нажатии на кнопку
            $(this.ok_el).click(function() {
                $.fn.decrypt_panel.do_decryption(self);
            });
        }
    };

    $.fn.decrypt_panel = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' is not available');
        }

    };
    
    // Расшифровать и вывести результаты
    $.fn.decrypt_panel.do_decryption = function(self) {
        var input_value = self.input_el.val();
        var key_value = self.key_el.val();
        var checksum_value = self.sha512_checksum.val();
        
        // Раскрытие JSON-строки
        if (self.is_escaped.prop('checked')) {
            input_value = JSON.parse(input_value);
        }
        
        // Расшифровка
        self.decryption_result = decrypt(key_value, input_value);

        // Результат проверки контрольной суммы
        // Сброс старого
        self.checksum_ok.html('');
        // Получение нового
        if (checksum_value.length) {
            if (checksum_value==sha512(self.decryption_result)) {
                self.checksum_ok.html('Контрольная сумма совпадает');
            }
            else {
                self.checksum_ok.html('Контрольная сумма не совпала');
            }    
        }
        
        self.output_el.val(self.decryption_result);
    }

})(jQuery);