const http = require('http');
// for relative path
require('rootpath')();
const cors = require('cors');

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const jwt = require('helpers/jwt');
const errorHandler = require('helpers/error-handler');

//port
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 5000;

setupExpess();
function setupExpess() {
    const app = express();
    const server = http.createServer(app);

    require('./config/passport');
    app.use(bodyParser.urlencoded({ extended: false }));
    // parses all bodies as a string
    app.use(bodyParser.json());

    // CORS-enabled for all origins!
    app.use(cors());

    // use JWT auth to secure the api
    app.use(jwt());

    // api user routes
    app.use('/employee', require('./models/employee/employee.controller'));
    app.use('/manager', require('./models/manager/manager.controller'));
    app.use('/project', require('./models/project/project.controller'));

    app.use(passport.initialize());
    app.use(passport.session());
    // global error handler
    app.use(errorHandler);


    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    }));

    // test
    app.get('/a',(req,res)=>{
        res.send("hello")
    })

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // start server
    server.listen(port, (err) => {
        if (err) return console.log("unable to connect to the server");
        console.log(`Server listening on port ${port}`);
    });
    module.exports = app;
}