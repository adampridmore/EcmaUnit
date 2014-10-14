load('./ecmaUnit.js');

var fixture = {
	test1: function(){
		print('test1');
	}
};

var runner = new ecmaUnit.Runner();
var result = runner.run(fixture);

print(result.stringify());
