load('EcmaUnit.js');

var tests = {
  passingTest : function(){
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

  failingTest : function(){
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

  printTestResults : function(){
    var runner = new ecmaUnit.Runner();

    var testFixture = {
      test1: function(){
        throw 'test2_error';
        //assert.fail('test2_error');
      },
      test2: function(){
        // Passes
      }
    };

    var result = runner.run(testFixture);

    var actualText = result.stringify();

    // print('+');
    // print(actualText);
    var actualLines = actualText.split('\r\n');

    assert.areEqual(actualLines[0], 'Test Results');
    assert.areEqual(actualLines[1], '============');
    assert.areEqual(actualLines[2], 'Ran');
    assert.areEqual(actualLines[3], 'test1\t-\tfail');
    assert.areEqual(actualLines[4], '\tException: \'test2_error\'');
    assert.areEqual(actualLines[5], 'test2\t-\tpass');
  },

  assertEquals_when_equal : function(){
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

  assertEquals_when_not_equal : function(){
    try{
      assert.areEqual('a', 'b');
      assert(false, 'Expected exception to be thrown');
    }catch(e){
      assert(e.toString() === "Error: Expected 'a' but was 'b'", e);
    }  
  },

  assertEquals_when_not_equal_with_message : function(){
    try{
      assert.areEqual('a', 'b', "MyErrorMessage");
      assert(false, 'Expected exception to be thrown.');
    }catch(e){
      assert(e.toString()=== "Error: Expected 'a' but was 'b'\r\nMessage: MyErrorMessage", e);
    }
  },

  assertFail : function(){
    try{
      assert.fail('MyFailMessage');
      assert(false, 'Expected exception to be thrown.');
    }catch(e){
      assert(e.toString() === 'Error: Fail: MyFailMessage');
    }    
  },

  assertContains : function(actualText, contains){
    assert.stringContains('abc','a');
  },

  assertContains_when_no_match : function(actualText, contains){
    try{
      assert.stringContains('abc','d');
      assert.fail('Exception not thrown');
    }catch(e){
      assert(e.toString() === 'Error: String "abc" did not contain "d"', e.toString());
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
      print('** Test Failed **: ' + testName);
      print(e);
    }
  };

  print();
  if (failed){
    print('************');
    print('Tests Failed');
    print('************');
    throw 'Tests Failed';
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