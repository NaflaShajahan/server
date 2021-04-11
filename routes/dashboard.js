const express = require("express");
const user = require("../models/user");
const trip = require("../models/trip");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = {
    getAllridersdrivers: route.post("/getAllridersdrivers", (req, res) => {
        var page = parseInt(req.body.page) || 0; 
        var limit = parseInt(req.body.limit) || 10;
        var query = {type:req.body.type ? req.body.type : 1}
        user.find(query)
        .sort({ _id: -1 })
        .skip(page * limit) //Notice here
        .limit(limit)
        .exec((err, resp) => {
          if (err) {
            return res.json(err);
          }
          user.countDocuments(query).exec((count_error, count) => {
            if (err) {
              return res.json(count_error);
            }
            return res.json({
              total: count,
              page: page,
              pageSize: resp.length,
              rider: resp
            });
          });
        });
    }),

    chart: route.post("/chart", (req, res) => {
      var page = parseInt(req.body.page) || 0; 
      var limit = parseInt(req.body.limit) || 10;
      var query = null;
      var query1 = {};
      const tab = req.body.type =='user' ? user : trip
      if ( req.body.type =="trip"){
        query = {status : 1},
        query1 = {}
      }
      else {
        query = { isActive : 1}
        query1 = {}
      }
      tab.find()
      .sort({ _id: -1 })
      .skip(page * limit) //Notice here
      .limit(limit)
      .exec((err, resp) => {
        if (err) {
          return res.json(err);
        }
        tab.countDocuments(query1).exec((count_error, count) => {
          if (err) {
            return res.json(count_error);
          }
          tab.countDocuments(query).exec((count_error, count1) => {
            if (err) {
              return res.json(count_error);
            }
          return res.json({
            total: count,
            page: page,
            pageSize: resp.length,
            tripDriver: resp,
            chart1: [{
              name: 'Completed',
              value : count1,
            },
            {
              name:'Uncompleted',
              value: count-count1
            }
          ],
          chart: [{
            name: 'Active',
            value : count1,
          },
          {
            name:'Inactive',
            value: count-count1
          }
        ]
          });
        })
        });
      });
  }),

  trip: route.post("/newTrip", (req, res) => {
    console.log(req);
    let saveData = new trip({
      tripType: req.body.tripType,
      bookedBy: req.body.bookedBy,
      bookingNo: req.body.bookingNo,
      address: req.body.address,
      date: req.body.date,
      driver:req.body.driver,
      rider: req.body.rider,
      status: req.body.status,       //0->booked,1->completed,2->cancelled
      sourceLocation: req.body.sourceLocation,
      destination: req.body.destination,
      //taxi:req.body.taxi
    });
    saveData
      .save()
      .then(resp => {
       
        res.send(resp);
      })
      .catch(err => {
        console.log("res",err)
        res.send(err);
      });
  }),
}