'use strict';

var Client = require('azure-iothub').Client;

var connectionString ='HostName=team53hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=12etMNgrmbfgnajvf3HDccTVWrjSmOZmX7U/BI+Icp4=';
var methodName = 'getTemperature';
var deviceId = 'team53device3';

var client = Client.fromConnectionString(connectionString);

var methodParams = {
	methodName: methodName,
	timeoutInSeconds: 30
};


var temperatureResults = [];
var averageTemperature = 0;

//cal method on device x number of times
for (var i = 0; i < 20; i++) {
	getTempFromDevice();
}





// Function to call direct method on device connected to IOT hub
function getTempFromDevice() {
	client.invokeDeviceMethod(deviceId, methodParams, function (err, result) {

		if (err) {
			console.error('Failed to invoke method \'' + methodName + '\': ' + err.message);
		} else {
			var output = JSON.stringify(result, null, 2);
			var data = JSON.parse(output)
			var temperature = JSON.parse(data.payload).temperature;
			console.log(temperature);
			temperatureResults.push(temperature);

			var sum = 0;
			for (var i = 0; i < temperatureResults.length; i++) {
				sum += temperatureResults[i];
			}

			var averageTemperature = sum / temperatureResults.length;
			console.log(averageTemperature);
			console.log(temperatureResults);
			
			var fs = require('fs');
			var readline = require('readline');
			var stream = require('stream');

			var instream = fs.createReadStream('./DataFiles/vibrations-m0.txt');
			var outstream = new stream;
			var rl = readline.createInterface(instream, outstream);

rl.on('line', function(line) {
  // process line here
});

rl.on('close', function() {
  // do something on finish here
});
		}
	});
}