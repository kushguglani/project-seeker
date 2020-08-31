
// load all the things we need
// var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the employee model
var Employee       = require('../models/employee/employee.model');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the employee for the session
    passport.serializeEmployee(function(employee, done) {
        done(null, employee.id);
    });

    // used to deserialize the employee
    passport.deserializeEmployee(function(id, done) {
        Employee.findById(id, function(err, employee) {
            done(err, employee);
        });
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the employee in the database based on their facebook id
            Employee.findOne({ 'facebook.id' : profile.id }, function(err, employee) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the employee is found, then log them in
                if (employee) {
                    return done(null, employee); // employee found, return that employee
                } else {
                    // if there is no employee found with that facebook id, create them
                    var newEmployee            = new Employee();

                    // set all of the facebook information in our employee model
                    newEmployee.facebook.id    = profile.id; // set the employees facebook id                   
                    newEmployee.facebook.token = token; // we will save the token that facebook provides to the employee                    
                    newEmployee.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport employee profile to see how names are returned
                    newEmployee.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our employee to the database
                    newEmployee.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new employee
                        return done(null, newEmployee);
                    });
                }

            });
        });

    }));

};
