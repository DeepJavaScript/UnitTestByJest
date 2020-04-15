var moment = require('moment');

function caesar(str, num){
    let newStr =""
    
    for(let i=0;i<str.length;i++){
        let currentCharCode = str.charCodeAt(i)
        let newCharCode
        //大寫
        if(currentCharCode >=65 && currentCharCode <=90){
            newCharCode = (currentCharCode - 65 + num) % 26 + 65
            newStr += String.fromCharCode(newCharCode)
        //小寫
        }else if(currentCharCode >=97 && currentCharCode <=122){
            newCharCode = (currentCharCode - 97 + num) % 26 + 97
            newStr += String.fromCharCode(newCharCode)
        }else{
            newStr += str.charAt(i)
        } 
    }
    let time =  moment().format('YYYY-MM-DD')
    console.log(`${newStr} ${time}`)
    return `${newStr} ${time}`
}

export default  caesar

