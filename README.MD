## Project seeker on Node js

### Library Used
* express
* jwt
* passport
* mongoose

### Modules
* emolyee
* manger
* project

### Employee api list 
|API name| Url |
|---|---|
|register                     | url=> *localhost:5000/employee/register*|
|authenticate login           | url=> *localhost:5000/employee/authenticate*|
|list of employees            | url=> *localhost:5000/employee/*|
|current-employee-details     | url=> *localhost:5000/employee/current*|
|update employee details      | url=> *localhost:5000/employee/?employeeId*|
|user inactivate              | url=> *localhost:5000/employee/delete/?employeeId*|
|delete employee permanently  | url=> *localhost:5000/employee/_delete/employeeId*|
|get by id                    | url=> *localhost:5000/employee/?employeeId*|
|upload cv                    | url=> *localhost:5000/employee/uploadResume*|

### Manager api list 
|API name| Url |
|---|---|
|manager-register              |url=> *localhost:5000/manager/register*|
|get by id                     |url=> *localhost:5000/manager/?mangerID*|
|manager-authenticate          |url=> *localhost:5000/manager/authenticate*|
|list of manager               |url=> *localhost:5000/manager*|
|update mager details          |url=> *localhost:5000/manager/?mangerID*|
|current-manager-details       |url=> *localhost:5000/manager/current*|
|manager inactivate            |url=> *localhost:5000/manager/delete/?mangerID*|
|delete manager permanently    |url=> *localhost:5000/manager/_delete/?mangerID*|

### Project api list 
|API name| Url |
|---|---|
|add project                         |url=>*localhost:5000/project/register*|
|Projet opening                      |url=>*localhost:5000/project/opening*|
|apply for project                   |url=>*localhost:5000/project/apply/?projectId*|
|project inactivate                  |url=>*localhost:5000/project/delete/?projectId*|
|delete project permanently          |url=>*localhost:5000/project/_delete/?projectId*|
|update project details              |url=>*localhost:5000/project/?projectId*|
|get selected project details by id  |url=>*localhost:5000/project/?projectId*|
|get all projects                    |url=>*localhost:5000/project/*|


for more details of api download file *https://project-seeker.herokuapp.com/documentation



### Test
run command - npm run test
*run with code coverage

### local
run command - npm run local

### For live api (production )
https://project-seeker.herokuapp.com

replace -> localhost:5000 with https://project-seeker.herokuapp.com
In case of heroku file upload not work

### Mlab connection String
mongodb://kg:abc123@ds011800.mlab.com:11800/kush