var http = require('http');
var request = require('request');

class Users {
    constructor(applicationToken, masterAccessToken, baseUrl) {
        this.applicationToken = applicationToken;
        this.masterAccessToken = masterAccessToken;
        this.baseUrl = baseUrl;
    }

    // User functions

    /**
     * Return users on a Marqeta account
     * @param  {[type]}   {} all the possible arguments that can be passed to GET users
     * @param  {Function} callback returns the users or error
     * @return {[type]}    object of users or error
     */
    getUsers({}, callback){
        var args = '?'
        if ('count' in arguments[0]) { args = args + 'count=' + arguments[0].count + '&' }
        if ('startIndex' in arguments[0]) { args = args + 'start_index=' + arguments[0].startIndex + '&'}
        if ('firstName' in arguments[0]) { args = args + 'first_name=' + arguments[0].firstName + '&'}
        if ('lastName' in arguments[0]) { args = args + 'last_name=' + arguments[0].lastName + '&'}
        if ('phone' in arguments[0]) { args = args + 'phone=' + arguments[0].phone + '&'}
        if ('email' in arguments[0]) { args = args + 'email=' + arguments[0].email + '&'}
        if ('phone' in arguments[0]) { args = args + 'phone=' + arguments[0].phone + '&'}
        if ('dda' in arguments[0]) { args = args + 'dda=' + arguments[0].dda + '&'}
        if ('ssn' in arguments[0]) { args = args + 'ssn=' + arguments[0].ssn + '&'}
        if ('searchType' in arguments[0]) { args = args + 'search_type=' + arguments[0].searchType + '&'}
        if ('fields' in arguments[0]) {
            var fieldArgs = '';
            for (var i = 0; i < arguments[0].fields.length; i++) {
                if (i===0) { fieldArgs = arguments[0].fields[i] }
                else { fieldArgs = fieldArgs + '%2C%20' +arguments[0].fields[i] }
            }
             args = args + 'fields=' + fieldArgs + '&'
        }

        request(this.baseUrl + args, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                return callback(JSON.parse(body).data, false);
            } else {  return callback(null, error); }
          }).auth(this.applicationToken, this.masterAccessToken, false);
    }

    /**
     * Create a user for a Marqeta account
     * @param  {[type]}   {}
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    postUser({}, callback) {
        var userData = {}
        for (const data in arguments[0]) {
            userData[data] = arguments[0][data]
        }

        var options = {
            method: 'post',
            body: userData,
            json: true,
            url: this.baseUrl
        }

        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                return callback(body, false);
            } else { 
                console.log(error)
                 return callback(null, error); }
           }).auth(this.applicationToken, this.masterAccessToken, false);
    }

    /**
     * [getClientAccessToken description]
     * @param  {String}   token    [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    getClientAccessToken(token, callback) {
        request(this.baseUrl + token, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    return callback(JSON.parse(body).data, false);
                } else {  return callback(null, error); }
        }).auth(this.applicationToken, this.masterAccessToken, false);
    }

    /**
     * [login description]
     * @param  {[type]}   {}       [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    login({}, callback) {
        var options = {
            method: 'post',
            body: arguments[0],
            json: true,
            url: this.baseUrl + '/auth/login';
        }

        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                return callback(body, false);
            } else { 
                console.log(error)
                 return callback(null, error); }
           }).auth(this.applicationToken, this.masterAccessToken, false);
    }

    /**
     * [changePassword description]
     * @param  {String}   currentPassword [description]
     * @param  {String}   newPassword     [description]
     * @param  {Function} callback        [description]
     * @return {Object}                   [description]
     */
    changePassword(currentPassword, newPassword, callback) {
        passwordData = {
            current_password: currentPassword,
            new_password: newPassword
        }
        var options = {
            method: 'post',
            body: passwordData,
            json: true,
            url: this.baseUrl + '/auth/changepassword';
        }

        request(options, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                return callback(body, false);
            } else { 
                console.log(error)
                 return callback(null, error); }
           }).auth(this.applicationToken, this.masterAccessToken, false);

    }

    /**
     * [onetime description]
     * @param  {Object}   {}       [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */

    onetime({}, callback) {
        var userData = {}
        for (const data in arguments[0]) {
            userData[data] = arguments[0][data]
        }

        var options = {
            method: 'post',
            body: userData,
            json: true,
            url: this.baseUrl + '/auth/user/onetime'
        }

        request(options, function(error, request, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                return callback(body, false);
            } else { 
                console.log(error)
                 return callback(null, error); }
           }).auth(this.applicationToken, this.masterAccessToken, false);
        })
    }


}
module.exports = Users
