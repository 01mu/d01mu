const express = require('express')
const bodyParser = require('body-parser')
const isOdd = require('is-odd');
const path = require('path')
const PORT = process.env.PORT || 5000;
const app = express();
const ObjectId = require('mongodb').ObjectID;

var require = require("./db");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.get('/', function (req, res, next) {
    //res.render('pages/angular', { teamName: "", employeeId: "" });
    res.render('pages/index');
});

app.get('/portfolio', function (req, res, next) {
    res.render('pages/portfolio');
});


app.get('/test', function (req, res, next) {
    require.hello(res);
});

app.get('/get/:name', function (req, res, next) {
    require.getValueQuery(res,
        'teams',
        {name: req.params.name},
        '');
});

/*
 *  get employee
 */

app.get('/getemp', function (req, res, next) {
    require.getValueQuery(res,
        'employees',
        {},
        '');
});

/*
 *  delete employee
 */

app.post('/delemp', function (req, res, next) {
    const id = req.body.id;

    require.deleteValue(res,
        'employees',
        {"_id": ObjectId(id)},
        '');

    require.getValueQuery(res,
        'employees',
        {},
        '');
});

/*
 *  insert emplyoee
 */

app.post('/insemp', function (req, res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    //res.send(firstName);

    var insert = [{
        firstName: firstName,
        lastName: lastName
    }];

    require.insertValue('employees', insert);

    require.getValueQuery(res,
        'employees',
        {},
        '');
});

app.get('/teams/:teamName?/:employeeId?', function (req, res, next) {
    tn = req.params.teamName;
    eid = req.params.employeeId;
    locals = { teamName: tn, employeeId: eid };

    res.render('pages/index', locals);
    next();
    }, function (req, res, next) {
        console.log('fiction');
});
