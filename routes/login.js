const express = require("express");
const user = require("../models/user");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.post("/", (req, res) => {
  console.log(req);
  user.findOne({email: req.body.email },(err,logindata) => {  //callback function
    if(logindata == null){
        res.send({
          msg : 'user does not exist',
          status : false
        })
    }
    else {
        if(logindata.password == req.body.password){
            res.send({
                msg: 'login successfull',
                status : true
            })
        }
        else {
            res.send({
                msg : 'incorrect password',
                status : false
            })
        }



    }

  })

    
  
});

module.exports = route;
