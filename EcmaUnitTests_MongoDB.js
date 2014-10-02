load('EcmaUnit.js');

function test1(){
  var runner = new EcmaUnitRunner();

  var test1WasCalled = false;
  var testFixture = {
    test1: function(){
      test1WasCalled = true;
    }
  };

  runner.run(testFixture);

  assert(test1WasCalled, 'Expected test1WasCalled');
}

main();

function main(){
  var tests = [test1];
  
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