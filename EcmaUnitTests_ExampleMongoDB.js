load('./ecmaUnit.js');

var fixture = {
  test1: function(){
    print("test1");
  },
  test2: function(){
    assert.areEqual('a','a');
  }
};

var runner = new ecmaUnit.Runner();
var result = runner.run(fixture);

print(result.stringify());
