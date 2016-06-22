var xor = function(char, key) {
  return String.fromCharCode(char ^ key)
}

var encrypt = function(plaintext, in_key) {
  var key='',
      ciphertext = '',
      len = plaintext.length;
      
  // Restore key state
  if (typeof in_key === 'undefined') {
    for (var i = 0; i < len; i++) {
      // push in a non-random 0-9 for the generated key
      key += ~~((Math.random() * 10) - 1);
    }  
  }
  else {
      key = in_key;
  }

  // Encryption should follow ring logic to simplify the process
  // It is a direct security problem, though
  var encryption_charcode = NaN;
  // Do actual encryption
  for (var i = 0; i < len; i++) {
    encryption_charcode = key[i%key.length].charCodeAt(0);
    // encrypt this character with just generated key
    ciphertext += xor(plaintext.charCodeAt(i), encryption_charcode)
  }

  return [key, ciphertext]
};

var decrypt = function(key, ciphertext) {
  var plaintext = '',
    key = key.split(''),
    len = ciphertext.length

  // Encryption should follow ring logic to simplify the process
  // It is a direct security problem, though
  var decryption_charcode = NaN;
  // Do actual decryption
  for (var i = 0; i < len; i++) {
    decryption_charcode = key[i%key.length].charCodeAt(0);
    plaintext += xor(ciphertext.charCodeAt(i), decryption_charcode)
  }

  return plaintext
};