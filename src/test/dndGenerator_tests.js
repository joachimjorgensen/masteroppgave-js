const assert = require('assert')

var app = require('../scripts/dndGenerator.js');


/**
 * UNIT TESTS for dndGenerator.js
 * 
 * To run: npm run test
 * 
 * NB! Most functions cannot be tested since Mocha is running from the commant line
 * and not a browser or html. 
 * This means that every function that uses DOMParser, XMLSerializer, document and 
 * other browser specific functions cannot be tested in these unit tests.
 */

function test_getRandomInt(){
  it('Test random numbers', () => {
    x = app._test.getRandomInt(10);
    y = app._test.getRandomInt(1);
    z = app._test.getRandomInt(5);
    assert.equal(((this.x<10) && (y===0) && (z<5)), true)
  })
}
function test_generate_ID(){
  it('Test generating ID', () => {
    x = app._test.generateID();
    assert.equal(x.length, 37)
    assert.equal(x[0], '_')
  })
}
function test_findTabSize(){
  it('Test find tab size', () => {
    theString1 = ["Hello","  Goodbye"]
    theString2 = ["Hello","    Goodbye"]
    theString3 = ["Hello","Test","    Goodbye"]
    x = app._test.findTabSize(theString1)
    y = app._test.findTabSize(theString2)
    z = app._test.findTabSize(theString3)
    assert.equal(x, 2)
    assert.equal(y, 4)
    assert.equal(z, 4)
  })
}
function test_getMaxTabs(){
  it('Test getting max tabs', () => {
    theString1 = ["Hello", "  Goodbye"]
    theString2 = ["Hello", "    Goodbye"]
    theString3 = ["Hello", "  Test", "    Goodbye"]
    x = app._test.getMaxTabs(theString1, 2)
    y = app._test.getMaxTabs(theString2, 4)
    z = app._test.getMaxTabs(theString3, 2)
    assert.equal(x, 1)
    assert.equal(y, 1)
    assert.equal(z, 2)
  })
}

function test_countTabs(){
  it('Test counting tabs in one line', () => {
    theString0 = "Goodbye";
    theString1 = "  Goodbye";
    theString2 = "    Goodbye"
    theString3 = "    Goodbye"
    k = app._test.countTabs(theString0, 2)
    x = app._test.countTabs(theString1, 2)
    y = app._test.countTabs(theString2, 2)
    z = app._test.countTabs(theString3, 4)
    assert.equal(k, 0)
    assert.equal(x, 1)
    assert.equal(y, 2)
    assert.equal(z, 1)
  })
}

function test_stripMe(){
  it('Test stripping string', () => {
    theString0 = "Goodbye";
    theString1 = "  Goodbye";
    theString2 = "    \t\n\tGoodbye"
    theString3 = "    \n  Goodbye\n\t\n   "
    assert.equal(app._test.stripMe(theString0),"Goodbye")
    assert.equal(app._test.stripMe(theString1),"Goodbye")
    assert.equal(app._test.stripMe(theString2),"Goodbye")
    assert.equal(app._test.stripMe(theString3),"Goodbye")
  })

}
function test_getCanvasHeight(){
  it('Test canvas height', () => {
    startOptions = {"x":[10,20],"Y":[20,30],"Z":[30,40]}
    startOptions1 = {"x":[10,20],"Y":[20,310],"Z":[30,40]}
    startOptions2 = {"x":[10,200],"Y":[20,30],"Z":[30,40]}
    assert.equal(app._test.getCanvasHeight(startOptions),140)
    assert.equal(app._test.getCanvasHeight(startOptions1),410)
    assert.equal(app._test.getCanvasHeight(startOptions2),300)
  })

}


test_getRandomInt();
test_generate_ID();
test_findTabSize();
test_getMaxTabs();
test_countTabs();
test_stripMe();
test_getCanvasHeight();