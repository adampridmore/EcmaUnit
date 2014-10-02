function EcmaUnitRunner(){
  this.run = function(testFixture){
    var isFunction = function(fn){
      return (typeof fn === "function");
    };

    var runTest = function(test, fixtureResult){
      try{
        test();
        fixtureResult.testResults.push({
          result: "pass", 
          test: test
        });
        fixtureResult.passCount++;

      }catch(exception){
        fixtureResult.testResults.push({
          result: "fail", 
          test: test,
          exception: exception
        });
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