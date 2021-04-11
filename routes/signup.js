const express = require("express");
const user = require("../models/user");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

//const JWT_SECRET = `bdnorprrrewhgin67johncena5448miasdvsdvkhalifa54s47dvdwasdfwe`;

route.post("/", (req, res) => {
  console.log(req);
  let saveData = new user({
    email:req.body.email ,
    password: req.body.password,
    confirm_password:req.body.cofirm_password ,
    name: req.body.name ,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    type:req.body.type,
    isActive:req.body.isActive
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
});

module.exports = route;
