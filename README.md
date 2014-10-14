#EcmaUnit

A pure EcmaScript / JavaScript unit testing framework, with no dependencies on running in a browsers or nodejs etc.

##Getting Started

Load EcmaUnit.js into your JavaScript runtime. e.g.

###For MongoDB

`load('EcmaUnit.js');`

###For HTML

 `<script type="text/javascript" src="EcmaUnit.js"></script>`

Then to run the tests in a fixture:

```
var runner = new EcmaUnitRunner();

var testFixture = {
	test1: function(){
		var sum = 8 + 2;
		assert.areEqual(10, sum);
	}
};

var result = runner.run(testFixture);
var testTestResults = result.stringify();

// Print using your environments console/out/print comment here.
// print(testTestResults);
// console.log(testTestResults);
```
