load('EcmaUnit.js');

var runner = new EcmaUnitRunner();

var test1WasCalled = false;
var testFixture = {
	test1: function(){
		test1WasCalled = true;
	}
};

runner.run(testFixture);

assert(test1WasCalled, "Expected test1WasCalled");
print("Passed!");