// Version 1.1

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
      var line = testResult.testName + '\t-\t' + testResult.result;
      lines.push(line);

      if (testResult.result === 'fail'){
        lines.push('\tException: \'' + testResult.exception + '\'');
        if (testResult.exception.stack){
          lines.push('\tAt: ' + testResult.exception.stack);
        }        
      }
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

  var errorMessage = "Expected '" + expected + "' but was '" + actual + "'";

  if (message){
    errorMessage += '\r\nMessage: ' + message;
  }

  throw new Error(errorMessage);
};

assert.fail = function(message){
  throw new Error('Fail: ' + message);
};

assert.stringContains = function(string, match){
  if (string.indexOf(match) === -1){
    throw new Error('String "' + string + '" did not contain "' + match + '"');
  }
};

// Export the module for nodejs
var module = module || null;
if (module){
  module.exports= {
    ecmaUnit: ecmaUnit,
    assert: assert
  }
}