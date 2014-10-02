function EcmaUnitRunner(){
  this.run = function(testFixture){

    var functionName = function(func) {
      return func.toString();
    };

    var isFunction = function(func){
      return (typeof func === "function");
    };

    var runTest = function(test, fixtureResult){
      var testResult = {
        test: test,
        testName: functionName(test)
      };
      fixtureResult.testResults.push(testResult);
      try{
        test();
        testResult.result = "pass";
        fixtureResult.passCount++;
      }catch(exception){
        testResult.result = "fail";
        testResult.exception = exception;
        fixtureResult.failCount++;
      }
    };

    var setPassedFlag = function(fixtureResult){
      if (fixtureResult.failCount === 0){
        fixtureResult.passed = true;
      } else {
        fixtureResult.passed = false;
      }
    }

    var runFixtureInternal = function(testFixture){
      var fixtureResult = {
        testResults: [],
        passCount: 0,
        failCount: 0
      };

      for(property in testFixture){
        var test = testFixture[property];
        if (isFunction(test)){
          runTest(test, fixtureResult);
        }
      }

      setPassedFlag(fixtureResult);

      return fixtureResult;
    };

    return runFixtureInternal(testFixture);
  }
};