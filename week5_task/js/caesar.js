var moment = require('moment');

function caesarCipher (str, num) {
  let newString = []
  // 每 26 個字母形成一次循環
  num = num % 26      // num: 0 ~ 25

  for (let i = 0; i < str.length; i++) {
    let currentCharCode = str.charCodeAt(i)
    let newCharCode

    /**
     * 大寫英文字母的 ASCII Code 65 ~ 90
     * 小寫英文字母的 ASCII Code 97 ~ 122
    **/

    if (currentCharCode >= 65 && currentCharCode <= 90) {
      // 大寫英文字母轉換
      newCharCode = currentCharCode + num
      if (newCharCode < 65) {
        newCharCode = newCharCode + 26
      } else if (newCharCode > 90) {
        newCharCode = newCharCode - 26
      }
    } else if (currentCharCode >= 97 && currentCharCode <= 122) {
      // 小寫英文字母轉換
      newCharCode = currentCharCode + num
      if (newCharCode < 97) {
        newCharCode = newCharCode + 26
      } else if (newCharCode > 122) {
        newCharCode = newCharCode - 26
      }
    } else {
      // 其餘保留原樣
      newCharCode = currentCharCode
    }
    newString.push(String.fromCharCode(newCharCode) + moment().format('YYYY-MM-DD'))
  }
  return newString.join('')
}

export default caesarCipher;