const mongoose = require('mongoose');
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        User
            .findOne({ email: req.payload.email })

            // .select('email name')
            .exec((err, user) => {

                // If the user is not found
                if (!user) {
                    return res
                        .status(404)
                        .json({ "message": "User was not found" });
                }
                // If an error occurs
                else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }

                // If the user is found
                callback(req, res, user.name);
            });
    }
    // If the user is not found
    else {
        return res
            .status(404)
            .json({ "message": "User was not found" });
    }
};

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    Model
        // .find({}, 'code name length start resort perPerson image description')
        .find({})
        // .select('code name length start resort perPerson image description')
        .exec((err, trips) => {
            // If the trips are not found
            if (!trips) {
                return res
                    .status(404)
                    .json({ "message": "trips not found" });
            }
            // If an error occurs
            else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            // If the trips are found
            else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

// GET: /trips/:tripCode - finds a trip by its code
const tripsFindByCode = async (req, res) => {

    Model
        // .find({}, 'code name length start resort perPerson image description')
        .find({ "code": req.params.tripCode })
        // .select('code name length start resort perPerson image description')
        .exec((err, trip) => {
            // If the trip is not found
            if (!trip) {
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
            }
            // If an error occurs
            else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            // If the trip is found
            else {
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

// POST: /trips - adds a trip
const tripsAddTrip = async (req, res) => {
    // Get the user
    getUser(req, res,
        // Add the trip
        (req, res) => {
            Model
                // .find({}, 'code name length start resort perPerson image description')
                .create({
                    // .select('code name length start resort perPerson image description')
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                    // If an error occurs
                    (err, trip) => {
                        // If the trip is not added
                        if (err) {
                            return res
                                .status(400)
                                .json(err);
                        }

                        // If the trip is added
                        else {
                            return res
                                .status(201)
                                .json(trip);
                        }
                    }
                );
        });
}

// PUT: /trips/:tripCode - updates a trip
const tripsUpdateTrip = async (req, res) => {
    // Get the user
    getUser(req, res,
        // Update the trip
        (req, res) => {
            Model
                // .find({}, 'code name length start resort perPerson image description')
                .findOneAndUpdate({ 'code': req.params.tripCode }, {
                    // .select('code name length start resort perPerson image description')
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                    // If an error occurs
                    { new: true })
                // If the trip is not updated
                .then(trip => {
                    // If the trip is not found
                    if (!trip) {
                        return res
                            .status(404)
                            .send({
                                message: "Trip was not found with code " + req.params.tripCode
                            });
                    }
                    // If the trip is updated
                    res.send(trip);
                    // If an error occurs
                }).catch(err => {
                    // If the trip is not found
                    if (err.kind === 'ObjectId') {
                        return res
                            .status(404)
                            .send({
                                message: 'Trip was not found with code ' + req.params.tripCode
                            });
                    }
                    // If an error occurs
                    return res
                        .status(500)
                        .json(err);
                });
        });
}
// Export the module
module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};