const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../../util/mongoose');

class SiteController {
    // [GET] /
    home(req, res, next) {
        // res.render('home');

        // Get db by callback function
        // Course.find({}, function(err, courses) {
        //     if(!err) {
        //         res.json(courses);
        //     } else {
        //         next(err);
        //     }
        // });

        // Get db by promise
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch((error) => next(error));
    }

    // [GET] /search

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
