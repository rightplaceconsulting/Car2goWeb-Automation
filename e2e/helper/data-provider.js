var dataProvider = function() {
	
	//read JSON file with filters.
	this.readDataProvider = function(filePath, filter1,filter2) {
		var fs = require('fs');
		var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
		result = obj[filter1][filter2];
		return result;
	};
    
	//write to JSON file with filters and key & value pairs.
	this.writeDataProvider = function(filePath,environment,dataName, key,
			value) {
		var fs = require('fs'), nconf = require('nconf');
		nconf.argv().env().file({
			file : filePath
		});
		nconf.set(environment+':'+dataName+':'+key,value);
		nconf.save(function(err) {
			fs.readFile(filePath, function(err, data) {
			//	console.dir(JSON.parse(data.toString()))
			});
		});
	};
};
module.exports = new dataProvider();