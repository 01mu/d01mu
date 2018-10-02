/*
 *  db api
 */

const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;

/*
 *  db credentials
 */

const dbUser = 'daniel';
const dbPW = 'Spittle.910';

const dbUrl = 'mongodb://' + dbUser + ':' + dbPW +
    '@ds121332.mlab.com:21332/heroku_1zdhhm66';

/*
 *  schemas
 */

const TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const EmployeeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

const Team = mongoose.model('Team', TeamSchema);
const Employee = mongoose.model('Employees', EmployeeSchema);

db.on('error', function () {
    console.log('there was an error communicating with the database');
});

const hello = function hello (res) {
    res.render('pages/index', { teamName: "", employeeId: "" });
};

/*
 *  getValueQuery: query collection
 */

const getValueQuery = function getValueQuery(res, collection, query, page) {
    mongoose.connect(dbUrl, function (err, db) {
        if(err) {
            return console.log('problem happened ' + err);
        }

        db.collection(collection).find(query).toArray(function(err, result) {
            if(err) {
                throw err;
            }

            if(page != '') {
                var name = '';
                var dbVals;

                if(result[0] != undefined) {
                    name = result[0].name
                }

                dbVals = {teamName: name, employeeId: ""};

                res.render(page, dbVals);
            } else {
                res.send(result);
            }
        });
    });
}

/*
 *  deleteValue
 */

const deleteValue = function deleteValue(res, collection, query, page) {
    mongoose.connect(dbUrl, function (err, db) {
        if(err) {
            return console.log('problem happened ' + err);
        }

        db.collection(collection).deleteOne(query, function(err, obj) {
            console.log(query);

            if(err) {
                throw err;
            }
        });
    });
}
/*
 *  insertValue
 */

const insertValue = function insertValue(type, values) {
    mongoose.connect(dbUrl, function (err) {
        if (err) {
            return console.log('problem happened ' + err);
        }

        insertValueHelper(type, values, function (err, pd, devops, acct) {
            if (err) {
                return console.log(err)
            }
        });
    });
}

function insertValueHelper(type, values, callback) {
    var func = function (error, pd, devops, acct) {
        if (error) {
            return callback(error);
        } else {
            console.info('added')
            callback(null, pd, devops, acct);
        }
    };

    if(type == 'employees') {
        Employee.create(values, func);
    }
}

module.exports.hello = hello;
module.exports.insertValue = insertValue;
module.exports.getValueQuery = getValueQuery;
module.exports.deleteValue = deleteValue;
