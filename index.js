var request = require('request');
var randomUser = require('random-user');
var usersModule = require('./modules/users');
var businessesModule = require('./modules/businesses');

class Marqeta {
    constructor(applicationToken, masterAccessToken, baseUrl = 'https://shared-sandbox-api.marqeta.com/v3/') {
        this.applicationToken = applicationToken;
        this.masterAccessToken = masterAccessToken;
        this.baseUrl = baseUrl;
        this.users = new usersModule(this.applicationToken, this.masterAccessToken, this.baseUrl + 'users')
        this.businesses = new businessesModule(this.applicationToken, this.masterAccessToken, this.baseUrl + 'users')
  }
}

var marqeta = new Marqeta('user27681519415818', '2b220094-4c9b-45d9-a6bb-57d4d2e12813');

marqeta.users.getUsers({count: 100, fields: ['token']}, function(users, err) {
    if (err) {console.log(err);};
    console.log(users);
});

marqeta.users.postUser({"first_name": 'Joan', "last_name": 'Gray', "address1": '6676 East Pecan St', "city": 'Buffalo', "state": 'Arizona', "zip": '36048', "email": 'joan.gray@example.com', "password": 'browngoose725'}, function(user, error) {
  if (error) { console.log (err)}
  console.log(user);
});
