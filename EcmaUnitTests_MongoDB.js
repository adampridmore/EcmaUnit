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
    assert(result.testResults[0].testName === 'test1', result.testResults[0].testName);
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

  run_single_test : function(){
    var test1Run = false;
    var test2Run = false;

    var testFixture = {
      test1: function(){
        test1Run = true;
      },
      test2: function(){
        test2Run = true;
      }
    }

    var runner = new ecmaUnit.Runner();
    var r = runner.run(testFixture, {runSingleTest: 'test1'});

    assert.isTrue(test1Run);
    assert.isFalse(test2Run);
    assert.areEqual(1, r.passCount);
    assert.areEqual(1, r.skippedCount);
  },

  printTestResults : function(){
    var runner = new ecmaUnit.Runner();

    var testFixture = {
      test1: function(){
        // Passes
      },
      test2: function(){
        assert.fail('test2_error');
      },      
    };

    var result = runner.run(testFixture);

    var actualText = result.stringify();

    var actualLines = actualText.split('\n');

    assert.areEqual('Test Results', actualLines[0]);
    assert.areEqual('============', actualLines[1]);
    assert.areEqual('Ran', actualLines[2]);
    assert.areEqual('test1\t-\tpass', actualLines[3]);
    assert.areEqual('test2\t-\tfail', actualLines[4]);
    assert.areEqual('Exception: \'Error: Fail: test2_error\'', actualLines[5].trim());
    assert.areEqual('At: Error: Fail: test2_error', actualLines[6].trim());
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
      assert(e.toString()=== "Error: Expected 'a' but was 'b'\nMessage: MyErrorMessage", e);
    }
  },

  assert_areEqual_for_nulls : function(){
    assert.areEqual(null,null);
  },

  assert_areEqual_for_dates : function(){
    var d1 = new ISODate('2014-01-01T00:00:00Z');
    var d2 = new ISODate('2014-01-01T00:00:00Z');
    assert.areEqual(d1,d2);
  },

  assert_areEqual_for_dates_that_are_different: function(){
    var d1 = new ISODate('2014-01-01T00:00:00Z');
    var d2 = new ISODate('2014-01-02T00:00:00Z');
    try{
      assert.areEqual(d1,d2);  
      assert(false, 'Expected exception to be thrown.');
    }catch(e){
      assert(e.toString() === "Error: Expected 'Wed Jan 01 2014 00:00:00 GMT+0000 (GMT Standard Time)' but was 'Thu Jan 02 2014 00:00:00 GMT+0000 (GMT Standard Time)'", e.toString());
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

  assertContains : function(){
    assert.stringContains('abc','a');
  },

  assertContains_when_no_match : function(){
    try{
      assert.stringContains('abc','d');
      assert.fail('Exception not thrown');
    }catch(e){
      assert(e.toString() === 'Error: String "abc" did not contain "d"', e.toString());
    }    
  },

  assert_isTrue_when_true : function(){
    assert.isTrue(true);
  },

  assert_isTrue_when_false: function(){
    try{
      assert.isTrue(false);
      assert.fail('Exception not thrown');
    }catch(e){
      assert(e.toString() === 'Error: Expected truthy, but was: false', e.toString());
    }    
  },

  assert_isFalse_when_false : function(){
    assert.isFalse(false);
  },

  assert_isFalse_when_true: function(){
    try{
      assert.isFalse(true);
      assert.fail('Exception not thrown');
    }catch(e){
      assert(e.toString() === 'Error: Expected falsy, but was: true', e.toString());
    }    
  },
}

main();

function main(){
  
  var failed = false;

  for(var testName in tests){
    try{
      tests[testName]();
      print('Ran: ' + testName);
    }catch(e){
      failed = true;
      print('** Test Failed **: ' + testName);
      print(e);
      if (e.stack){
        print(e.stack);
      }      
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