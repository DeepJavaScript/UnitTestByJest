import moment from 'moment';

// TODO: 將 offset 改為全域變數

function CaesarCipher(input) {
  CaesarCipher.input = input;
  CaesarCipher.offset = CaesarCipher.offset || 0;

  let output = input
    .split('')
    .map(char => {
      let ASCIICode = char.charCodeAt();
      let offsetChar = String.fromCharCode(ASCIICode + CaesarCipher.offset);
      return offsetChar;
    })
    .join('');  

  const nowDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  return `${output} ${nowDateTime}`;
}

CaesarCipher.config = function(offset) {
  CaesarCipher.offset = offset;
};



export default CaesarCipher;