const Flight = require('../models/flight');

module.exports = {
  new: newFlight,
  create,
  index
};

function index(req, res) {
   res.render('flights/index', {
    flights: Flights.getAll()
   })
    
}


function newFlight(req, res) {
  res.render('flights/new', { errorMsg: '' });
}

async function create(req, res) {
  // Convert departs value to a Date object
  req.body.departs = new Date(req.body.departs);
  try {
    await Flight.create(req.body);
    // Always redirect after CUDing data
    // We'll refactor to redirect to the flights index after we implement it
    res.redirect('/flights');
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('flights/new', { errorMsg: err.message });
  }
}
