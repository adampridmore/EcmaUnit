load('EcmaUnit.js');

function test1(){
  var runner = new EcmaUnitRunner();

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
}

function test2_failingTest(){
  var runner = new EcmaUnitRunner();

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
}

main();

function main(){
  var tests = [test1, test2_failingTest];

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