'use strict';

// You can POST to /api/translate with a body containing text with the text to translate and locale with either american-to-british or british-to-american. The returned object should contain the submitted text and translation with the translated text.

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const {
        text,
        locale
      } = req.body

      if (locale === 'american-to-british') {

        let response = translator.a2b(text)
        let [str, arr] = response
        let displayTxt = str
        for (let i of arr) {
          if (str.includes(i)) {
            displayTxt = displayTxt.replace(i, `<span class="highlight">${i}</span>`)
          }
        }
        res.json({
          translation: displayTxt
        })

      } else if (locale === 'british-to-american') {
        let response = translator.b2a(text)
        let [str, arr] = response
        let displayTxt = str
        for (let i of arr) {
          if (str.includes(i)) {
            displayTxt = displayTxt.replace(i, `<span class="highlight">${i}</span>`)
          }
        }
        res.json({
          translation: displayTxt
        })

      }
    });
};