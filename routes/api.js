'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const {
        text,
        locale
      } = req.body


      // Error if there's no text to translate
      if (text === '') {
        return res.json({
          error: 'No text to translate'
        })
      }
      
      // required fields missing
      if (!text) {
        return res.json({
          error: 'Required field(s) missing'
        })
      }

      
      // Error if user did not send the locale fields
      if (!locale) {
        return res.json({
          error: 'Invalid value for locale field'
        })
      }
      

      if (!['american-to-british', 'british-to-american'].includes(locale)) {
        return res.json({
          error: 'Invalid value for locale field'
        })
      }

      if (locale === 'american-to-british') {
        let response = translator.a2b(text)
        if (response.length === 0) {
          res.json({
            error: 'Invalid value for locale field'
          })
        }
        let [str, arr] = response
        console.log(str)
        console.log(arr)
        if (arr.length === 0 && str === text) {          
          return res.json({
            text,
            translation: 'Everything looks good to me!'
          })
        }
        let displayTxt = str
        for (let i of arr) {
          if (str.includes(i)) {
            displayTxt = displayTxt.replace(i, `<span class="highlight">${i}</span>`)
          }
        }
        return res.json({
          text,
          translation: displayTxt
        })
      } else if (locale === 'british-to-american') {
        let response = translator.b2a(text)
        if (response.length === 0) {
          return res.json({
            error: 'Invalid value for locale field'
          })
        }
        let [str, arr] = response
        console.log(str)
        console.log(arr)
        if (arr.length === 0 && str === text) {
          return res.json({
            text,
            translation: 'Everything looks good to me!'
          })
        }
        let displayTxt = str
        for (let i of arr) {
          if (str.includes(i)) {
            displayTxt = displayTxt.replace(i, `<span class="highlight">${i}</span>`)
          }
        }
        return res.json({
          text,
          translation: displayTxt
        })
      }
    });
};