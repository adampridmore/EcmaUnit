var ecmaUnit = require('./EcmaUnit.js').ecmaUnit;
var assert = require('./EcmaUnit.js').assert;

var fixture = {
  test1: function(){
    console.log("test1");
  },
  test2: function(){
    assert.areEqual('a','a');
  }
};

var runner = new ecmaUnit.Runner();
var result = runner.run(fixture);

console.log(result.stringify());

if (!result.passed){
	throw result;
}