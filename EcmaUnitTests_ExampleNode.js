var ecmaUnit = require('./EcmaUnit.js');

var fixture = {
	test1: function(){
		console.log("test1");
	}
};

var runner = new ecmaUnit.Runner();
var result = runner.run(fixture);

console.log(result.stringify());

if (!result.passed){
	throw result;
}