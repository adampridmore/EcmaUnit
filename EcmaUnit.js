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

    var runFixtureInternal = function(testFixture){
      var fixtureResult = new ecmaUnit.FixtureResult();

      for(property in testFixture){
        var test = testFixture[property];
        if (isFunction(test)){
          runTest(test, fixtureResult, property);
        }
      }

      fixtureResult.setPassedFlag();

      return fixtureResult;
    };

    return runFixtureInternal(testFixture);
  }
};

ecmaUnit.FixtureResult = function(){
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

  this.setPassedFlag = function(fixtureResult){
    if (that.failCount === 0){
      that.passed = true;
    } else {
      that.passed = false;
    }
  };
};

var assert = assert || {};

assert.areEqual = function(expected, actual, message){
  if (expected === actual){
    return;
  }

  var error = "Expected '" + expected + "' but was '" + actual + "'";

  if (message){
    error += '\r\nMessage: ' + message;
  }

  throw error;
};

assert.fail = function(message){
  throw 'Fail: ' + message;
};