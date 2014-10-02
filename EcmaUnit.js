var ecmaUnit = ecmaUnit || {};

ecmaUnit.Runner = function (){
  this.run = function(testFixture){

    var isFunction = function(func){
      return (typeof func === "function");
    };

    var runTest = function(test, fixtureResult, testName){
      var testResult = {
        testName: testName
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
    };

    var FixtureResult = function(){
      var that = this;
      this.testResults = [];
      this.passCount = 0;
      this.failCount = 0;
      
      this.stringify = function(){
        var lines = [];
        lines.push('Test Results');
        lines.push('============');
        lines.push('Ran');
        that.testResults.forEach(function(testResult){
          lines.push(testResult.testName + ' - ' + testResult.result);;
        });

        return lines.join('\r\n');
      };
    };
    
    var runFixtureInternal = function(testFixture){
      var fixtureResult = new FixtureResult();

      for(property in testFixture){
        var test = testFixture[property];
        if (isFunction(test)){
          runTest(test, fixtureResult, property);
        }
      }

      setPassedFlag(fixtureResult);

      return fixtureResult;
    };

    return runFixtureInternal(testFixture);
  }
};
