'use strict';

var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client;

var connectionString = 'HostName=team53hub.azure-devices.net;DeviceId=team53device3;SharedAccessKey=XV6aKxdEGL37YnNLeOTs7S1C5dc6Qhmzfn1m3kJexaQ=';
var client = DeviceClient.fromConnectionString(connectionString, Mqtt);



function onGetTemperature(request, response) {

    var temperature = Math.floor(Math.random() * 100) + 1;
    var payload = {
        temperature: temperature
    };

    response.send(200, JSON.stringify(payload), function (err) {
        if (err) {
            console.error('An error occurred when sending a method response:\n' + err.toString());
        } else {
            console.log('Response to method \'' + request.methodName + '\' sent successfully.');
        }
    });
}


client.open(function (err) {
    if (err) {
        console.error('could not open IotHub client');
    } else {
        console.log('client opened');
         client.onDeviceMethod('getTemperature', onGetTemperature);
    }
});