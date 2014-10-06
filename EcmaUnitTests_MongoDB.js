load('EcmaUnit.js');

var tests = {
  test1_passingTest : function(){
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
    assert(result.testResults[0].result === 'pass');
    //assert(result.testResults[0].testName === 'test1', result.testResults[0].testName);
  },

  test2_failingTest : function(){
    var runner = new ecmaUnit.Runner();

    var testFixture = {
      test1: function(){
        throw 'test2_error';
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
        throw 'test2_error';
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

    assert(actualText === expectedText, 'Incorrect actualText:\r\n' + actualText + '\r\nExpected\r\n' + expectedText);
  },

  test4_assertEquals_when_equal : function(){
    assert.areEqual('a', 'a');
    assert.areEqual(1, 1);
    assert.areEqual(1.1, 1.1);
    assert.areEqual(true, true);
    assert.areEqual(null, null);
    assert.areEqual(undefined, undefined);
    
    var a = {};
    var b = a;
    assert.areEqual(a, b);
  },

  test4_assertEquals_when_not_equal : function(){
    try{
      assert.areEqual('a', 'b');
      assert(false, 'Expected exception to be thrown');
    }catch(e){
      assert(e === "Expected 'a' but was 'b'", e);
    }  
  },

  test4_assertEquals_when_not_equal_with_message : function(){
    try{
      assert.areEqual('a', 'b', "MyErrorMessage");
      assert(false, 'Expected exception to be thrown.');
    }catch(e){
      assert(e === "Expected 'a' but was 'b'\r\nMessage: MyErrorMessage", e);
    }
  },

  assertFail : function(){
    try{
      assert.fail('MyFailMessage');
      assert(false, 'Expected exception to be thrown.');
    }catch(e){
      assert(e === 'Fail: MyFailMessage');
    }    
  },
}

main();

function main(){
  
  var failed = false;

  for(var testName in tests){
    try{
      tests[testName]();
    }catch(e){
      failed = true;
      print('Test failed: ' + testName);
      print(e);
    }
  };

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