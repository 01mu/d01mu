/*
 * d01mu
 * github.com/01mu
 */

const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;

const dbUrl = process.env.mongo;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    }
});

const Blog = mongoose.model('Blog', BlogSchema);

db.on('error', function () {
    console.log('there was an error communicating with the database');
});

const showBlogPosts = function showBlogPosts(res) {
    var web = [];
    var mobile = [];
    var projects = [];
    var bots = [];

    mongoose.connect(dbUrl, { useNewUrlParser: true }, function(err, db) {
        if(err) {
            throw err;
        }

        db.collection("blogs").find({}).sort({priority: -1})
            .toArray(function(err, result) {
            if(err) {
                throw err;
            }

            for(var i = 0; i < result.length; i++) {
                switch(result[i].type) {
                    case 'web': web.push(result[i]); break;
                    case 'mobile': mobile.push(result[i]); break;
                    case 'project': projects.push(result[i]); break;
                    case 'bot': bots.push(result[i]); break;
                    default: break;
                }
            }

            db.collection("about").find({}).toArray(function(err, result) {
                if(err) {
                    throw err;
                }

                db.close();

                res.render('pages/index', {about: result, web: web,
                    mobile: mobile, projects: projects, bots: bots});
            });
        });
    });
}

const insertValue = function insertValue(type, values, res) {
    mongoose.connect(dbUrl, { useNewUrlParser: true }, function (err) {
        if(err) {
            throw err;
        }

        insertValueHelper(type, values, function (err, pd, devops, acct) {
            if(err) {
                return console.log(err);
            } else {
                res.render('pages/index');
                res.end();
            }
        });
    });
}

function insertValueHelper(type, values, callback) {
    var func = function (error, pd, devops, acct) {
        if(error) {
            return callback(error);
        } else {
            return 'a';
            callback(null, pd, devops, acct);
        }
    };

    if(type == 'blog') {
        Blog.create(values, func);
    }
}

module.exports.showBlogPosts = showBlogPosts;
module.exports.insertValue = insertValue;

