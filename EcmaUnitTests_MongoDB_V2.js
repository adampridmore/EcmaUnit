load('EcmaUnit.js');

var testFixture = {
  test1_passingTest : function (){
    var runner = new ecmaUnit.Runner();

    var test1WasCalled = false;
    var testFixture = {
      test1: function(){
        test1WasCalled = true;
      }
    };

    var result = runner.run(testFixture);

    assert(test1WasCalled, 'Expected test1WasCalled');
    assert(result.passed === true, 'Expected result.passed was true');
    assert(result.passCount === 1, 'Expected result.passCount was 1');
    assert(result.failCount === 0, 'Expected result.failCount was 0');
    assert(result.testResults.length === 1);
    assert(result.testResults[0].result === "pass");
    //assert(result.testResults[0].testName === "test1", result.testResults[0].testName);
  },

  test2_failingTest: function (){
    var runner = new ecmaUnit.Runner();

    var testFixture = {
      test1: function(){
        throw "test2_error";
      }
    };

    var result = runner.run(testFixture);

    assert(result, "Runner did not return result");
    assert(result.passed === false, "Runner did not return result.passed of false");
    assert(result.passCount === 0, 'Expected result.passCount was 0');
    assert(result.failCount === 1, 'Expected result.failCount was 1');
    assert(result.testResults.length === 1);
    assert(result.testResults[0].result === "fail");
  },

  test3_printTestResults : function(){
    var runner = new ecmaUnit.Runner();

    var testFixture = {
      test1: function(){
        throw "test2_error";
      },
      test2: function(){
        // Passes
      }
    };

    var result = runner.run(testFixture);
    //printjson(result);    

    var actualText = result.stringify();
    print(actualText);
    //printjson(result);
    assert(actualText === "Test Runner", 'Incorrect actualText: ' + actualText);
  }
};

function main(){
  var runner = new ecmaUnit.Runner();
  var result = runner.run(testFixture);
  if (result.passed){
    print("Sucess");
  }else{
    print("Failed");
  }
}

main();