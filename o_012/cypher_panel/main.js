!function(a,b){"use strict";var c="undefined"!=typeof module;c&&(a=global);var d="0123456789abcdef".split(""),e=[-2147483648,8388608,32768,128],f=[24,16,8,0],g=[1116352408,3609767458,1899447441,602891725,3049323471,3964484399,3921009573,2173295548,961987163,4081628472,1508970993,3053834265,2453635748,2937671579,2870763221,3664609560,3624381080,2734883394,310598401,1164996542,607225278,1323610764,1426881987,3590304994,1925078388,4068182383,2162078206,991336113,2614888103,633803317,3248222580,3479774868,3835390401,2666613458,4022224774,944711139,264347078,2341262773,604807628,2007800933,770255983,1495990901,1249150122,1856431235,1555081692,3175218132,1996064986,2198950837,2554220882,3999719339,2821834349,766784016,2952996808,2566594879,3210313671,3203337956,3336571891,1034457026,3584528711,2466948901,113926993,3758326383,338241895,168717936,666307205,1188179964,773529912,1546045734,1294757372,1522805485,1396182291,2643833823,1695183700,2343527390,1986661051,1014477480,2177026350,1206759142,2456956037,344077627,2730485921,1290863460,2820302411,3158454273,3259730800,3505952657,3345764771,106217008,3516065817,3606008344,3600352804,1432725776,4094571909,1467031594,275423344,851169720,430227734,3100823752,506948616,1363258195,659060556,3750685593,883997877,3785050280,958139571,3318307427,1322822218,3812723403,1537002063,2003034995,1747873779,3602036899,1955562222,1575990012,2024104815,1125592928,2227730452,2716904306,2361852424,442776044,2428436474,593698344,2756734187,3733110249,3204031479,2999351573,3329325298,3815920427,3391569614,3928383900,3515267271,566280711,3940187606,3454069534,4118630271,4000239992,116418474,1914138554,174292421,2731055270,289380356,3203993006,460393269,320620315,685471733,587496836,852142971,1086792851,1017036298,365543100,1126000580,2618297676,1288033470,3409855158,1501505948,4234509866,1607167915,987167468,1816402316,1246189591],h=[],i=function(a){return l(a,384)},j=function(a){return l(a,256)},k=function(a){return l(a,224)},l=function(a,b){var c,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,A,B,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,aa,ba,z=!1,C=0,D=0,E=0,F=a.length;384==b?(c=3418070365,i=3238371032,j=1654270250,k=914150663,l=2438529370,m=812702999,n=355462360,o=4144912697,p=1731405415,q=4290775857,r=2394180231,s=1750603025,t=3675008525,u=1694076839,v=1203062813,w=3204075428):256==b?(c=573645204,i=4230739756,j=2673172387,k=3360449730,l=596883563,m=1867755857,n=2520282905,o=1497426621,p=2519219938,q=2827943907,r=3193839141,s=1401305490,t=721525244,u=746961066,v=246885852,w=2177182882):224==b?(c=2352822216,i=424955298,j=1944164710,k=2312950998,l=502970286,m=855612546,n=1738396948,o=1479516111,p=258812777,q=2077511080,r=2011393907,s=79989058,t=1067287976,u=1780299464,v=286451373,w=2446758561):(c=1779033703,i=4089235720,j=3144134277,k=2227873595,l=1013904242,m=4271175723,n=2773480762,o=1595750129,p=1359893119,q=2917565137,r=2600822924,s=725511199,t=528734635,u=4215389547,v=1541459225,w=327033209,b=512),x=0;do{for(h[0]=x,h[1]=h[2]=h[3]=h[4]=h[5]=h[6]=h[7]=h[8]=h[9]=h[10]=h[11]=h[12]=h[13]=h[14]=h[15]=h[16]=h[17]=h[18]=h[19]=h[20]=h[21]=h[22]=h[23]=h[24]=h[25]=h[26]=h[27]=h[28]=h[29]=h[30]=h[31]=h[32]=0,A=D;F>C&&128>A;++C)y=a.charCodeAt(C),128>y?h[A>>2]|=y<<f[3&A++]:2048>y?(h[A>>2]|=(192|y>>6)<<f[3&A++],h[A>>2]|=(128|63&y)<<f[3&A++]):55296>y||y>=57344?(h[A>>2]|=(224|y>>12)<<f[3&A++],h[A>>2]|=(128|y>>6&63)<<f[3&A++],h[A>>2]|=(128|63&y)<<f[3&A++]):(y=65536+((1023&y)<<10|1023&a.charCodeAt(++C)),h[A>>2]|=(240|y>>18)<<f[3&A++],h[A>>2]|=(128|y>>12&63)<<f[3&A++],h[A>>2]|=(128|y>>6&63)<<f[3&A++],h[A>>2]|=(128|63&y)<<f[3&A++]);for(E+=A-D,D=A-128,C==F&&(h[A>>2]|=e[3&A],++C),x=h[32],C>F&&112>A&&(h[31]=E<<3,z=!0),B=32;160>B;B+=2)Y=h[B-30],Z=h[B-29],G=(Y>>>1|Z<<31)^(Y>>>8|Z<<24)^Y>>>7,H=(Z>>>1|Y<<31)^(Z>>>8|Y<<24)^(Z>>>7|Y<<25),Y=h[B-4],Z=h[B-3],I=(Y>>>19|Z<<13)^(Z>>>29|Y<<3)^Y>>>6,J=(Z>>>19|Y<<13)^(Y>>>29|Z<<3)^(Z>>>6|Y<<26),Y=h[B-32],Z=h[B-31],$=h[B-14],_=h[B-13],K=(65535&_)+(65535&Z)+(65535&H)+(65535&J),L=(_>>>16)+(Z>>>16)+(H>>>16)+(J>>>16)+(K>>>16),M=(65535&$)+(65535&Y)+(65535&G)+(65535&I)+(L>>>16),N=($>>>16)+(Y>>>16)+(G>>>16)+(I>>>16)+(M>>>16),h[B]=N<<16|65535&M,h[B+1]=L<<16|65535&K;var ca=c,da=i,ea=j,fa=k,ga=l,ha=m,ia=n,ja=o,ka=p,la=q,ma=r,na=s,oa=t,pa=u,qa=v,ra=w;for(U=ea&ga,V=fa&ha,B=0;160>B;B+=8)G=(ca>>>28|da<<4)^(da>>>2|ca<<30)^(da>>>7|ca<<25),H=(da>>>28|ca<<4)^(ca>>>2|da<<30)^(ca>>>7|da<<25),I=(ka>>>14|la<<18)^(ka>>>18|la<<14)^(la>>>9|ka<<23),J=(la>>>14|ka<<18)^(la>>>18|ka<<14)^(ka>>>9|la<<23),O=ca&ea,P=da&fa,W=O^ca&ga^U,X=P^da&ha^V,aa=ka&ma^~ka&oa,ba=la&na^~la&pa,Y=h[B],Z=h[B+1],$=g[B],_=g[B+1],K=(65535&_)+(65535&Z)+(65535&ba)+(65535&J)+(65535&ra),L=(_>>>16)+(Z>>>16)+(ba>>>16)+(J>>>16)+(ra>>>16)+(K>>>16),M=(65535&$)+(65535&Y)+(65535&aa)+(65535&I)+(65535&qa)+(L>>>16),N=($>>>16)+(Y>>>16)+(aa>>>16)+(I>>>16)+(qa>>>16)+(M>>>16),Y=N<<16|65535&M,Z=L<<16|65535&K,K=(65535&X)+(65535&H),L=(X>>>16)+(H>>>16)+(K>>>16),M=(65535&W)+(65535&G)+(L>>>16),N=(W>>>16)+(G>>>16)+(M>>>16),$=N<<16|65535&M,_=L<<16|65535&K,K=(65535&ja)+(65535&Z),L=(ja>>>16)+(Z>>>16)+(K>>>16),M=(65535&ia)+(65535&Y)+(L>>>16),N=(ia>>>16)+(Y>>>16)+(M>>>16),qa=N<<16|65535&M,ra=L<<16|65535&K,K=(65535&_)+(65535&Z),L=(_>>>16)+(Z>>>16)+(K>>>16),M=(65535&$)+(65535&Y)+(L>>>16),N=($>>>16)+(Y>>>16)+(M>>>16),ia=N<<16|65535&M,ja=L<<16|65535&K,G=(ia>>>28|ja<<4)^(ja>>>2|ia<<30)^(ja>>>7|ia<<25),H=(ja>>>28|ia<<4)^(ia>>>2|ja<<30)^(ia>>>7|ja<<25),I=(qa>>>14|ra<<18)^(qa>>>18|ra<<14)^(ra>>>9|qa<<23),J=(ra>>>14|qa<<18)^(ra>>>18|qa<<14)^(qa>>>9|ra<<23),Q=ia&ca,R=ja&da,W=Q^ia&ea^O,X=R^ja&fa^P,aa=qa&ka^~qa&ma,ba=ra&la^~ra&na,Y=h[B+2],Z=h[B+3],$=g[B+2],_=g[B+3],K=(65535&_)+(65535&Z)+(65535&ba)+(65535&J)+(65535&pa),L=(_>>>16)+(Z>>>16)+(ba>>>16)+(J>>>16)+(pa>>>16)+(K>>>16),M=(65535&$)+(65535&Y)+(65535&aa)+(65535&I)+(65535&oa)+(L>>>16),N=($>>>16)+(Y>>>16)+(aa>>>16)+(I>>>16)+(oa>>>16)+(M>>>16),Y=N<<16|65535&M,Z=L<<16|65535&K,K=(65535&X)+(65535&H),L=(X>>>16)+(H>>>16)+(K>>>16),M=(65535&W)+(65535&G)+(L>>>16),N=(W>>>16)+(G>>>16)+(M>>>16),$=N<<16|65535&M,_=L<<16|65535&K,K=(65535&ha)+(65535&Z),L=(ha>>>16)+(Z>>>16)+(K>>>16),M=(65535&ga)+(65535&Y)+(L>>>16),N=(ga>>>16)+(Y>>>16)+(M>>>16),oa=N<<16|65535&M,pa=L<<16|65535&K,K=(65535&_)+(65535&Z),L=(_>>>16)+(Z>>>16)+(K>>>16),M=(65535&$)+(65535&Y)+(L>>>16),N=($>>>16)+(Y>>>16)+(M>>>16),ga=N<<16|65535&M,ha=L<<16|65535&K,G=(ga>>>28|ha<<4)^(ha>>>2|ga<<30)^(ha>>>7|ga<<25),H=(ha>>>28|ga<<4)^(ga>>>2|ha<<30)^(ga>>>7|ha<<25),I=(oa>>>14|pa<<18)^(oa>>>18|pa<<14)^(pa>>>9|oa<<23),J=(pa>>>14|oa<<18)^(pa>>>18|oa<<14)^(oa>>>9|pa<<23),S=ga&ia,T=ha&ja,W=S^ga&ca^Q,X=T^ha&da^R,aa=oa&qa^~oa&ka,ba=pa&ra^~pa&la,Y=h[B+4],Z=h[B+5],$=g[B+4],_=g[B+5],K=(65535&_)+(65535&Z)+(65535&ba)+(65535&J)+(65535&na),L=(_>>>16)+(Z>>>16)+(ba>>>16)+(J>>>16)+(na>>>16)+(K>>>16),M=(65535&$)+(65535&Y)+(65535&aa)+(65535&I)+(65535&ma)+(L>>>16),N=($>>>16)+(Y>>>16)+(aa>>>16)+(I>>>16)+(ma>>>16)+(M>>>16),Y=N<<16|65535&M,Z=L<<16|65535&K,K=(65535&X)+(65535&H),L=(X>>>16)+(H>>>16)+(K>>>16),M=(65535&W)+(65535&G)+(L>>>16),N=(W>>>16)+(G>>>16)+(M>>>16),$=N<<16|65535&M,_=L<<16|65535&K,K=(65535&fa)+(65535&Z),L=(fa>>>16)+(Z>>>16)+(K>>>16),M=(65535&ea)+(65535&Y)+(L>>>16),N=(ea>>>16)+(Y>>>16)+(M>>>16),ma=N<<16|65535&M,na=L<<16|65535&K,K=(65535&_)+(65535&Z),L=(_>>>16)+(Z>>>16)+(K>>>16),M=(65535&$)+(65535&Y)+(L>>>16),N=($>>>16)+(Y>>>16)+(M>>>16),ea=N<<16|65535&M,fa=L<<16|65535&K,G=(ea>>>28|fa<<4)^(fa>>>2|ea<<30)^(fa>>>7|ea<<25),H=(fa>>>28|ea<<4)^(ea>>>2|fa<<30)^(ea>>>7|fa<<25),I=(ma>>>14|na<<18)^(ma>>>18|na<<14)^(na>>>9|ma<<23),J=(na>>>14|ma<<18)^(na>>>18|ma<<14)^(ma>>>9|na<<23),U=ea&ga,V=fa&ha,W=U^ea&ia^S,X=V^fa&ja^T,aa=ma&oa^~ma&qa,ba=na&pa^~na&ra,Y=h[B+6],Z=h[B+7],$=g[B+6],_=g[B+7],K=(65535&_)+(65535&Z)+(65535&ba)+(65535&J)+(65535&la),L=(_>>>16)+(Z>>>16)+(ba>>>16)+(J>>>16)+(la>>>16)+(K>>>16),M=(65535&$)+(65535&Y)+(65535&aa)+(65535&I)+(65535&ka)+(L>>>16),N=($>>>16)+(Y>>>16)+(aa>>>16)+(I>>>16)+(ka>>>16)+(M>>>16),Y=N<<16|65535&M,Z=L<<16|65535&K,K=(65535&X)+(65535&H),L=(X>>>16)+(H>>>16)+(K>>>16),M=(65535&W)+(65535&G)+(L>>>16),N=(W>>>16)+(G>>>16)+(M>>>16),$=N<<16|65535&M,_=L<<16|65535&K,K=(65535&da)+(65535&Z),L=(da>>>16)+(Z>>>16)+(K>>>16),M=(65535&ca)+(65535&Y)+(L>>>16),N=(ca>>>16)+(Y>>>16)+(M>>>16),ka=N<<16|65535&M,la=L<<16|65535&K,K=(65535&_)+(65535&Z),L=(_>>>16)+(Z>>>16)+(K>>>16),M=(65535&$)+(65535&Y)+(L>>>16),N=($>>>16)+(Y>>>16)+(M>>>16),ca=N<<16|65535&M,da=L<<16|65535&K;K=(65535&i)+(65535&da),L=(i>>>16)+(da>>>16)+(K>>>16),M=(65535&c)+(65535&ca)+(L>>>16),N=(c>>>16)+(ca>>>16)+(M>>>16),c=N<<16|65535&M,i=L<<16|65535&K,K=(65535&k)+(65535&fa),L=(k>>>16)+(fa>>>16)+(K>>>16),M=(65535&j)+(65535&ea)+(L>>>16),N=(j>>>16)+(ea>>>16)+(M>>>16),j=N<<16|65535&M,k=L<<16|65535&K,K=(65535&m)+(65535&ha),L=(m>>>16)+(ha>>>16)+(K>>>16),M=(65535&l)+(65535&ga)+(L>>>16),N=(l>>>16)+(ga>>>16)+(M>>>16),l=N<<16|65535&M,m=L<<16|65535&K,K=(65535&o)+(65535&ja),L=(o>>>16)+(ja>>>16)+(K>>>16),M=(65535&n)+(65535&ia)+(L>>>16),N=(n>>>16)+(ia>>>16)+(M>>>16),n=N<<16|65535&M,o=L<<16|65535&K,K=(65535&q)+(65535&la),L=(q>>>16)+(la>>>16)+(K>>>16),M=(65535&p)+(65535&ka)+(L>>>16),N=(p>>>16)+(ka>>>16)+(M>>>16),p=N<<16|65535&M,q=L<<16|65535&K,K=(65535&s)+(65535&na),L=(s>>>16)+(na>>>16)+(K>>>16),M=(65535&r)+(65535&ma)+(L>>>16),N=(r>>>16)+(ma>>>16)+(M>>>16),r=N<<16|65535&M,s=L<<16|65535&K,K=(65535&u)+(65535&pa),L=(u>>>16)+(pa>>>16)+(K>>>16),M=(65535&t)+(65535&oa)+(L>>>16),N=(t>>>16)+(oa>>>16)+(M>>>16),t=N<<16|65535&M,u=L<<16|65535&K,K=(65535&w)+(65535&ra),L=(w>>>16)+(ra>>>16)+(K>>>16),M=(65535&v)+(65535&qa)+(L>>>16),N=(v>>>16)+(qa>>>16)+(M>>>16),v=N<<16|65535&M,w=L<<16|65535&K}while(!z);var sa=d[c>>28&15]+d[c>>24&15]+d[c>>20&15]+d[c>>16&15]+d[c>>12&15]+d[c>>8&15]+d[c>>4&15]+d[15&c]+d[i>>28&15]+d[i>>24&15]+d[i>>20&15]+d[i>>16&15]+d[i>>12&15]+d[i>>8&15]+d[i>>4&15]+d[15&i]+d[j>>28&15]+d[j>>24&15]+d[j>>20&15]+d[j>>16&15]+d[j>>12&15]+d[j>>8&15]+d[j>>4&15]+d[15&j]+d[k>>28&15]+d[k>>24&15]+d[k>>20&15]+d[k>>16&15]+d[k>>12&15]+d[k>>8&15]+d[k>>4&15]+d[15&k]+d[l>>28&15]+d[l>>24&15]+d[l>>20&15]+d[l>>16&15]+d[l>>12&15]+d[l>>8&15]+d[l>>4&15]+d[15&l]+d[m>>28&15]+d[m>>24&15]+d[m>>20&15]+d[m>>16&15]+d[m>>12&15]+d[m>>8&15]+d[m>>4&15]+d[15&m]+d[n>>28&15]+d[n>>24&15]+d[n>>20&15]+d[n>>16&15]+d[n>>12&15]+d[n>>8&15]+d[n>>4&15]+d[15&n];return b>=256&&(sa+=d[o>>28&15]+d[o>>24&15]+d[o>>20&15]+d[o>>16&15]+d[o>>12&15]+d[o>>8&15]+d[o>>4&15]+d[15&o]),b>=384&&(sa+=d[p>>28&15]+d[p>>24&15]+d[p>>20&15]+d[p>>16&15]+d[p>>12&15]+d[p>>8&15]+d[p>>4&15]+d[15&p]+d[q>>28&15]+d[q>>24&15]+d[q>>20&15]+d[q>>16&15]+d[q>>12&15]+d[q>>8&15]+d[q>>4&15]+d[15&q]+d[r>>28&15]+d[r>>24&15]+d[r>>20&15]+d[r>>16&15]+d[r>>12&15]+d[r>>8&15]+d[r>>4&15]+d[15&r]+d[s>>28&15]+d[s>>24&15]+d[s>>20&15]+d[s>>16&15]+d[s>>12&15]+d[s>>8&15]+d[s>>4&15]+d[15&s]),512==b&&(sa+=d[t>>28&15]+d[t>>24&15]+d[t>>20&15]+d[t>>16&15]+d[t>>12&15]+d[t>>8&15]+d[t>>4&15]+d[15&t]+d[u>>28&15]+d[u>>24&15]+d[u>>20&15]+d[u>>16&15]+d[u>>12&15]+d[u>>8&15]+d[u>>4&15]+d[15&u]+d[v>>28&15]+d[v>>24&15]+d[v>>20&15]+d[v>>16&15]+d[v>>12&15]+d[v>>8&15]+d[v>>4&15]+d[15&v]+d[w>>28&15]+d[w>>24&15]+d[w>>20&15]+d[w>>16&15]+d[w>>12&15]+d[w>>8&15]+d[w>>4&15]+d[15&w]),sa};!a.JS_SHA512_TEST&&c?(l.sha512=l,l.sha384=i,l.sha512_256=j,l.sha512_224=k,module.exports=l):a&&(a.sha512=l,a.sha384=i,a.sha512_256=j,a.sha512_224=k)}(this);var xor = function(char, key) {
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
};(function($) {

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
