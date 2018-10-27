var http = require('http');
var request = require('request');

class Users {
    constructor(applicationToken, masterAccessToken, baseUrl) {
        this.applicationToken = applicationToken;
        this.masterAccessToken = masterAccessToken;
        this.baseUrl = baseUrl;
    }
}
