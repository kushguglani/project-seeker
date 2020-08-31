const chai = require('chai');
const chaiHttp = require("chai-http");

const Project = require("../models/project/project.model");
const Manager = require("../models/manager/manager.model");
const Employee = require("../models/employee/employee.model");
const app = require('../server');


chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

let managerToken = ""
let employeeToken = ""
let managerId = ""
let employeeId = ""
let projectId = ""

describe("Project api test", () => {
    before((done) => {
        // delete all project from test db
        if (process.env.NODE_ENV !== 'test') {
            done(`Trying to delete ${process.env.NODE_ENV} data-base`)
        } else {
            Manager.deleteMany({}, (err) => {
                Employee.deleteMany({}, (err) => {
                    Project.deleteMany({}, (err) => {
                        done();
                    })
                });
            });
        }
    })
    // fetch manager and employee token 

    before((done) => {
        chai.request(app)
            .post('/employee/register')
            .send({
                name: 'Pickachu',
                userName: 'Picka1',
                email: 'picka@gmail.com',
                password: '123456'
            })
            .end((error, res) => {
                should.exist(res.body);
                done();
            })
    })

    before((done) => {
        chai.request(app)
            .post('/employee/authenticate')
            .send({
                userName: 'Picka1',
                password: '123456'
            })
            .end((error, res) => {
                employeeToken = res.body.token;
                employeeId = res.body.id;
                done();
            })

    })

    before((done) => {
        chai.request(app)
            .post('/manager/register')
            .send({
                name: 'Manager 1',
                userName: 'Manager1',
                email: 'Manager@gmail.com',
                password: '123456'
            })
            .end((error, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                expect(res).to.have.status(200);
                done();
            })
    })

    before((done) => {
        chai.request(app)
            .post('/manager/authenticate')
            .send({
                userName: 'Manager1',
                password: '123456'
            })
            .end((error, res) => {
                managerToken = res.body.token;
                managerId = res.body.id;
                done();
            })
    })


    // Test to register new project
    it('should register new project', (done) => {
        chai.request(app)
            .post('/project/register/')
            .set('Authorization', 'Bearer ' + managerToken)
            .send({
                "projectName": "banking",
                "clientName": "abc",
                "technologies": ["node", "angular"],
                "role": "developer",
                "jobDescription": "front end developer",
                "status": "open",
            })
            .end((error, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res).to.have.status(200);
                done();
            })
    });

    // Test to fetch list of projects
    it('should fetch list of projects', (done) => {
        chai.request(app)
            .get('/project/')
            .set('Authorization','Bearer '+ managerToken)
            .end((error, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                expect(res).to.have.status(200);
                projectId = res.body[0].id;
                done();
            })
    })

    // Test to apply for project
    it('should apply for project', (done) => {
        chai.request(app)
        .put('/project/apply/'+projectId)
            .set('Authorization','Bearer '+ employeeToken)
            .end((error, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res).to.have.status(200);
                done();
            })
    })

    // Test to fetch list of openings projetcs by employee
    it('should fetch list of openings projetcs by employee', (done) => {
        chai.request(app)
            .get('/project/opening')
            .set('Authorization','Bearer '+ employeeToken)
            .end((error, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                expect(res).to.have.status(200);
                projectId = res.body[0].id;
                done();
            })
    })

    // Test to fetch list of openings projetcs by manager
    it('should fetch list of openings projetcs by manager', (done) => {
        chai.request(app)
            .get('/project/opening')
            .set('Authorization','Bearer '+ managerToken)
            .end((error, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                expect(res).to.have.status(200);
                projectId = res.body[0].id;
                done();
            })
    })
    
    // Test to fetch project by id
    it('should fetch project by id', (done) => {
        chai.request(app)
            .get('/project/'+projectId)
            .set('Authorization','Bearer '+ managerToken)
            .end((error, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res).to.have.status(200);
                done();
            })
    })
    
    // Test to update project by id
    it('should fetch project by id', (done) => {
        chai.request(app)
            .put('/project/'+projectId)
            .set('Authorization','Bearer '+ managerToken)
            .send({
                "projectName": "open banking",
                "clientName": "us",
            })
            .end((error, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res).to.have.status(200);
                done();
            })
    })

    
    // Test to delete project by id
    it("should delete project by id", (done) => {
        chai.request(app)
            .put('/project/delete/'+projectId)
            .set('Authorization', 'Bearer ' + managerToken)
            .end((error, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res).to.have.status(200);
                done();
            })
    });

    // Test to permanently delete project by id
    it("should permanently delete project by id", (done) => {
        chai.request(app)
            .delete('/project/_delete/'+projectId)
            .set('Authorization', 'Bearer ' + managerToken)
            .end((error, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                expect(res).to.have.status(200);
                done();
            })
    });
})