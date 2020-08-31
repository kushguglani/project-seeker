// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth': {
        'clientID': '1731775893654677', // your App ID
        'clientSecret': 'ae822ec7d160216627d426f544f772fb', // your App Secret
        'callbackURL': 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields': ['id', 'email', 'name'] // For requesting permissions from Facebook API
    }
}