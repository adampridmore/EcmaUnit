load('EcmaUnit.js');

function test1_passingTest(){
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
}

function test2_failingTest(){
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
}

function test3_printTestResults(){
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
  //printjson(result);
  var expectedText = 'Test Results\r\n============\r\nRan\r\ntest1 - fail\r\ntest2 - pass';

  assert(actualText === expectedText, 'Incorrect actualText:\r\n' + actualText + "\r\nExpected\r\n" + expectedText);
}

main();

function main(){
  var tests = [test1_passingTest, test2_failingTest,test3_printTestResults];

  var failed = false;

  tests.forEach(function(test){
    try{
      test();
    }catch(e){
      failed = true;
      print('Test failed: ' + functionName(test));
      print(e);
    }   
  });

  print();
  if (failed){
    print('************');
    print('Tests Failed');
    print('************');
  }else {
    print('Passed');
  }
}

function functionName(fun) {
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}