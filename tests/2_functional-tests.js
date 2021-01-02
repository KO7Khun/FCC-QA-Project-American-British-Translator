const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const e = require('express');
let translator = new Translator()

suite('Functional Tests', () => {
  suite('Translation with text and locale fields: POST request to /api/translate', () => {
    test('Valid locale fields', (done) => {
      chai.request(server)
        .post('/api/translate')
        .send({
          locale: 'american-to-british',
          text: 'Mangoes are my favorite fruit.'
        })
        .end(function (err, res) {
          assert.isObject(res.body, 'response from the server should be object')
          assert.property(res.body, 'text')
          assert.property(res.body, 'translation')
          assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
          assert.equal(res.body.translation, translator.a2b('Mangoes are my favorite fruit.')[2])
          done();
        });
    })
  })
  suite('Translation with text and invalid locale field: POST request to /api/translate', () => {
    test('Invalid locale fields', (done) => {
      chai.request(server)
        .post('/api/translate')
        .send({
          locale: 'test',
          text: 'Mangoes are my favorite fruit.'
        })
        .end(function (err, res) {
          assert.equal(res.body.error, 'Invalid value for locale field')
          done();
        });
    })
  })
  suite('Translation with missing text field: POST request to /api/translate', () => {
    test('Missing text field', (done) => {
      chai.request(server)
        .post('/api/translate')
        .send({
          locale: 'american-to-british',
          text: ''
        })
        .end(function (err, res) {
          console.log(res.body)
          assert.equal(res.body.error, 'No text to translate')
          done();
        });
    })
  })
  suite('Translation with missing locale field: POST request to /api/translate', () => {
    test('Missing locale field', (done) => {
      chai.request(server)
        .post('/api/translate')
        .send({
          text: 'Mangoes are my favorite fruit.'
        })
        .end(function (err, res) {
          assert.equal(res.body.error, 'Invalid value for locale field')
          done();
        });
    })
  })
  suite('Translation with empty text: POST request to /api/translate', () => {
    test('Emty text field', (done) => {
      chai.request(server)
        .post('/api/translate')
        .send({
          locale: 'american-to-british'
        })
        .end(function (err, res) {
          assert.equal(res.body.error, 'Required field(s) missing')
          done();
        });
    })
  })
  suite('Translation with text that needs no translation: POST request to /api/translate', () => {
    test('Text that needs no translation', (done) => {
      chai.request(server)
        .post('/api/translate')
        .send({
          locale: 'american-to-british',
          text : "Hi, how are you?"
        })
        .end(function (err, res) {
          assert.equal(res.body.translation, 'Everything looks good to me!')
          done();
        });
    })
  })
});