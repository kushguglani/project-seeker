const expressJwt = require('express-jwt');
const config = require('config/config.json');
const userService = require('models/employee/employee.service');
const managerService = require('models/manager/manager.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/employee/authenticate',
            '/employee/register',
            '/manager/authenticate',
            '/manager/register',
            '/auth/facebook',
            '/a'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.id);
    const manager = await managerService.getById(payload.id);
    // revoke token if user no longer exists
    if (!user && !manager) {
        return done(null, true);
    }
    done();
};