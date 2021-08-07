const express = require("express");
const router = require("express").Router();
const { cloudinary } = require("../Utils/cloudinary");

let Userbooking = require("../models/userbooking.model");

//get all the user bookings
router.get("/", async (req, res) => {
  try {
    const userbookings = await Userbooking.find();
    res.json(userbookings);
  } catch (err) {
    res.json({ message: err });
  }
});

//get bookings by email
router.get("/search/:email", async (req, res) => {
  let regex = new RegExp(req.params.email, "i");
  try {
    const bookingByEmail = await Userbooking.find({ email: regex });
    res.json(bookingByEmail);
  } catch (err) {
    res.json({ message: err });
  }
});

//register bookings

router.post("/add", async (req, res) => {
  const newUserbooking = new Userbooking({
    name: req.body.name,
    email: req.body.email,
    time: req.body.time,
    date: req.body.date,
    isBooked: req.body.isBooked,
  });

  try {
    const savedUserbooking = newUserbooking.save();
    res.json(savedUserbooking);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Booking cannot be done" });
    }
  }
});

//upload file
// router.post("/upload", async (req, res) => {
//   try {
//     const fileStr = req.body.data;
//     // console.log(fileStr);
//     const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
//       upload_preset: "dev_setups",
//     });
//     console.log(uploadedResponse);
//     res.json({ msg: "Success" });
//   } catch (error) {
//     console.log(error);
//   }
// });

//get uploaded image list
router.get("/getimages", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:dev_setups")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

//delet bookings

router.delete("/:id", async (req, res) => {
  try {
    const deleteBooking = await Userbooking.remove({ _id: req.params.id });
    res.json(deleteBooking);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
