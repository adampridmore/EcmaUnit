function EcmaUnitRunner(){
	this.run = function(testFixture){
		for(property in testFixture){
			if (typeof(testFixture[property] === "function")){
				testFixture[property]();
			}
		}
	}
};