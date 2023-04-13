# GO Train Schedule API

schedule timetable located in schedule.json file

## test cases

### GET http://localhost:8081

expected 'App up and running'

###

GET http://localhost:8081/url_doesnot_exist

expected 'Make sure url is correct!'

###

GET http://localhost:8081/schedule

expected
200 OK
[
{
"id": 1,
"line": "Lakeshore",
"departure": 800,
"arrival": 900
},
...
]

###

GET http://localhost:8081/schedule/line_doesnot_exist

expected
400 Not Found

###

GET http://localhost:8081/schedule/Bloomington

expected
200 OK

[
{
"id": 10,
"line": "Bloomington",
"departure": 1400,
"arrival": 1500
},
{
"id": 11,
"line": "Bloomington",
"departure": 1600,
"arrival": 1700
},
{
"id": 12,
"line": "Bloomington",
"departure": 1800,
"arrival": 1900
}
]

###

GET http://localhost:8081/schedule/Gormley

expected
200 OK
[
{
"id": 7,
"line": "Gormley",
"departure": 800,
"arrival": 900
},
{
"id": 8,
"line": "Gormley",
"departure": 1000,
"arrival": 1100
},
{
"id": 8,
"line": "Gormley",
"departure": 1200,
"arrival": 1300
}
]

###

GET http://localhost:8081/schedule/Bloomington?departure=1600
expected
200 OK
[
{
"id": 11,
"line": "Bloomington",
"departure": 1600,
"arrival": 1700
}
]

###

GET http://localhost:8081/schedule/Bloomington?departure=04:00pm
expected
200 OK
[
{
"id": 11,
"line": "Bloomington",
"departure": 1600,
"arrival": 1700
}
]

###

GET http://localhost:8081/schedule/Bloomington?departure=4:00pm
expected
200 OK
[
{
"id": 11,
"line": "Bloomington",
"departure": 1600,
"arrival": 1700
}
]

###

GET http://localhost:8081/schedule/Bloomington?departure=24:00pm

expected
400 Bad Request

###

GET http://localhost:8081/schedule/Bloomington?departure=0000

expected
200 OK
[]

###

GET http://localhost:8081/schedule/Gormley?departure=2800

expected
400 Bad Request

###

GET http://localhost:8081/schedule/Gormley?departure=1800

expected
200 OK
[]
