const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  a2b(str) {
    if(!str) return []
    let s1 = str.split(' ')
    let arr = []
    // replace the spelling first.
    for (let i in americanToBritishSpelling) {
      if (s1.includes(i)) {
        s1[s1.indexOf(i)] = americanToBritishSpelling[i]
        arr.push(americanToBritishSpelling[i])
      }
    }
    // loop through american only Notes spaces are included in the object
    let result = s1.join(' ')
    for (let i in americanOnly) {
      if (result.toLowerCase().includes(i)) {
        if (new RegExp('\\b' + i + '\\b', 'g').test(result.toLowerCase())) {
          result = result.replace(result.substring(result.toLowerCase().indexOf(i), result.toLowerCase().indexOf(i) + i.length), americanOnly[i])
          arr.push(americanOnly[i])
        }
      }
    }
    // change titles
    result = result.split(' ')
    for (let i in americanToBritishTitles) {
      if (result.includes(i)) {
        result[result.indexOf(i)] = americanToBritishTitles[i]
        arr.push(americanToBritishTitles[i])
      }
    }
    result = result.join(' ')
    //match time
    let matchTime = /\d{1,2}:\d{2}/g
    if (matchTime.test(result)) {
      for (let i of result.match(matchTime)) {
        let t = i.replace(':', '.')
        result = result.replace(i, t)
        arr.push(t)
      }
    }
    
    for(let i of arr){
      if(!result.includes(i)){
        arr.splice(arr.indexOf(i),1)
      }
    }
    return [result, arr]
  }

  b2a(str) {
    if(!str) return []
    let s1 = str.split(' ')
    let arr = []
    // american to british spelling
    // replace the spelling first.
    for (let i in americanToBritishSpelling) {
      if (s1.includes(americanToBritishSpelling[i])) {
        s1[s1.indexOf(americanToBritishSpelling[i])] = i
        arr.push(i)
      }
    }
    // british only
    s1 = s1.join(' ')
    let keys = {}
    for (let i in britishOnly) {
      if (s1.toLowerCase().includes(i)) {
        if (new RegExp('\\b' + i + '\\b', 'g').test(s1.toLowerCase())) {
          keys[i] = britishOnly[i]
          console.log(i)
        }
      }
    }
    let result = s1
    for (let i in keys) {
      result = result.replace(s1.substring(s1.toLowerCase().indexOf(i), s1.toLowerCase().indexOf(i) + i.length), keys[i])
      console.log(keys[i])
      arr.push(keys[i])
    }
    keys = {}

    result = result.split(' ')
    for (let i in americanToBritishTitles) {
      if (result.includes(americanToBritishTitles[i])) {
        result[result.indexOf(americanToBritishTitles[i])] = i
        arr.push(i)
      }
    }
    result = result.join(' ')
    //match time
    let matchTime = /\d{1,2}\.\d{2}/g
    if (matchTime.test(result)) {
      for (let i of result.match(matchTime)) {
        let t = i.replace('.', ':')
        result = result.replace(i, t)
        arr.push(t)
      }
    }
    // make sure no additional texts are in the array.
    for(let i of arr){
      if(!result.includes(i)){
        arr.splice(arr.indexOf(i),1)
      }
    }

    return [result, arr]
  }
}

module.exports = Translator;