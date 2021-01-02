const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translate = new Translator()
suite('Unit Tests', () => {
  suite('American to British', () => {
    test('test 1', function(done) {
      let input = 'Mangoes are my favorite fruit';
      assert.equal(translate.a2b(input)[0],'Mangoes are my favourite fruit');
      done();
    });
  
    test('test 2', function(done) {
      let input = 'I ate yogurt for breakfast.';
      assert.equal(translate.a2b(input)[0],'I ate yoghurt for breakfast.');
      done();
    });
  
    test('test 3', function(done) {
      let input = 'We had a party at my friend\'s condo.';
      assert.equal(translate.a2b(input)[0],'We had a party at my friend\'s flat.');
      done();
    });
  
    test('test 4', function(done) {
      let input = 'Can you toss this in the trashcan for me?';
      assert.equal(translate.a2b(input)[0],'Can you toss this in the bin for me?');
      done();
    });
  
    test('test 5', function(done) {
      let input = 'The parking lot was full.';
      assert.equal(translate.a2b(input)[0],'The car park was full.');
      done();
    });
  
    test('test 6', function(done) {
      let input = 'Like a high tech Rube Goldberg machine.';
      assert.equal(translate.a2b(input)[0],'Like a high tech Heath Robinson device.');
      done();
    });
  
    test('test 7', function(done) {
      let input = 'To play hooky means to skip class or work.';
      assert.equal(translate.a2b(input)[0],'To bunk off means to skip class or work.');
      done();
    });
  
    test('test 8', function(done) {
      let input = 'No Mr. Bond, I expect you to die.';
      assert.equal(translate.a2b(input)[0],'No Mr Bond, I expect you to die.');
      done();
    });
  
    test('test 9', function(done) {
      let input = 'Dr Grosh will see you now.';
      assert.equal(translate.a2b(input)[0],'Dr Grosh will see you now.');
      done();
    });
  
    test('test 10', function(done) {
      let input = 'Lunch is at 12:15 today';
      assert.equal(translate.a2b(input)[0],'Lunch is at 12.15 today');
      done();
    });
  })

  suite('British to American',() => {
    test('test 11', function(done) {
      let input = 'We watched the footie match for a while.';
      assert.equal(translate.b2a(input)[0],'We watched the soccer match for a while.');
      done();
    });
  
    test('test 12', function(done) {
      let input = 'Paracetamol takes up to an hour to work.';
      assert.equal(translate.b2a(input)[0],'Tylenol takes up to an hour to work.');
      done();
    });
  
    test('test 13', function(done) {
      let input = 'First, caramelise the onions.';
      assert.equal(translate.b2a(input)[0],'First, caramelize the onions.');
      done();
    });
  
    test('test 14', function(done) {
      let input = 'I spent the bank holiday at the funfair.';
      assert.equal(translate.b2a(input)[0],'I spent the public holiday at the carnival.');
      done();
    });
  
    test('test 15', function(done) {
      let input = "I've just got bits and bobs in my bum bag.";
      assert.equal(translate.b2a(input)[0],"I've just got odds and ends in my fanny pack.");
      done();
    });
  
    test('test 16', function(done) {
      let input = 'The car boot sale at Boxted Airfield was called off.';
      assert.equal(translate.b2a(input)[0],'The swap meet at Boxted Airfield was called off.');
      done();
    });
  
    test('test 17', function(done) {
      let input = 'Have you met Mrs Kalyani?';
      assert.equal(translate.b2a(input)[0],'Have you met Mrs. Kalyani?');
      done();
    });
  
    test('test 18', function(done) {
      let input = 'Prof Joyner of King\'s College, London.';
      assert.equal(translate.b2a(input)[0],'Prof. Joyner of King\'s College, London.');
      done();
    });
  
    test('test 19', function(done) {
      let input = 'I had a bicky then went to the chippy.';
      assert.equal(translate.b2a(input)[0],'I had a cookie then went to the fish-and-chip shop.');
      done();
    });
  
    test('test 20', function(done) {
      let input = 'Tea time is usually around 4 or 4.30.';
      assert.equal(translate.b2a(input)[0],'Tea time is usually around 4 or 4:30.');
      done();
    });
  })

  suite('American to British with highlighted text',() => {
    test('test 21 - Highlight translation', function(done) {
      let input = 'Mangoes are my favorite fruit.';
      assert.equal(translate.a2b(input)[2],'Mangoes are my <span class="highlight">favourite</span> fruit.');
      done();
    });
  
    test('test 22 - Highlight translation', function(done) {
      let input = 'I ate yogurt for breakfast.';
      assert.equal(translate.a2b(input)[2],'I ate <span class="highlight">yoghurt</span> for breakfast.');
      done();
    });
  })

  suite('British to American with highlighted text',() => {
    test('test 23 - Highlight translation', function(done) {
      let input = 'Paracetamol takes up to an hour to work.';
      assert.equal(translate.b2a(input)[2],'<span class="highlight">Tylenol</span> takes up to an hour to work.');
      done();
    });
  
    test('test 24 - Highlight translation', function(done) {
      let input = 'We watched the footie match for a while.';
      assert.equal(translate.b2a(input)[2],'We watched the <span class="highlight">soccer</span> match for a while.');
      done();
    });
  })  
});
