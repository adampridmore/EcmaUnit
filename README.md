#EcmaUnit

A pure EcmaScript / JavaScript unit testing framework, with no dependencies on running in a browsers or nodejs etc.

##Getting Started

Just load the EcmaUnit.js into your JavaScript runtime, create a fixture and run it.

###General
```
var fixture = {
  test1: function(){
    assert.areEqual('a','a');
  }
};

var runner = new ecmaUnit.Runner();
var result = runner.run(fixture);
console.log(result.stringify());
```

###For MongoDB
```javascript
load('./ecmaUnit.js');

var fixture = {
  test1: function(){
    assert.areEqual('a','a');
  }
};

var runner = new ecmaUnit.Runner();
var result = runner.run(fixture);

print(result.stringify());
```

###For node.js
```javascript
var ecmaUnit = require('./EcmaUnit.js').ecmaUnit;
var assert = require('./EcmaUnit.js').assert;

var fixture = {
  test1: function(){
    assert.areEqual('a','a');
  }
};

var runner = new ecmaUnit.Runner();
var result = runner.run(fixture);

console.log(result.stringify());

if (!result.passed){
	throw result;
}
```

###For HTML

```HTML
<html>
<head>
  <script type="text/javascript" src="EcmaUnit.js"></script>
</head>

<div id='testResults' style="white-space:pre-wrap;"></div>

<script type="text/javascript">
  var fixture = {
    test1: function(){
      console.log("test1");
    },
    test2: function(){
      assert.areEqual('a','a');
    }
  };

  var runner = new ecmaUnit.Runner();
  var result = runner.run(fixture);

  var resultTest = result.stringify();

  console.log(resultTest);

  document.getElementById("testResults").innerHTML = resultTest;

  if (!result.passed){
    throw result;
  }  
</script>
</html>
```
