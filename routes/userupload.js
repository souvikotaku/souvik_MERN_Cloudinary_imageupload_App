const express = require("express");
const router = require("express").Router();
const { cloudinary } = require("../Utils/cloudinary");
const upload = require("../Utils/multer");

let Userupload = require("../models/userupload.model");

//get all the user uploads
// router.get("/", async (req, res) => {
//   try {
//     const useruploads = await Userupload.find();
//     res.json(useruploads);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

//get uploads by emailid of specific users
router.get("/search/:email", async (req, res) => {
  let regex = new RegExp(req.params.email, "i");
  try {
    const uploadByEmail = await Userupload.find({ email: regex });
    res.json(uploadByEmail);
  } catch (err) {
    res.json({ message: err });
  }
});

//register uploads

// router.post("/add", async (req, res) => {
//   const newUserupload = new Userupload({
//     name: req.body.name,
//     email: req.body.email,

//     isUploaded: req.body.isBooked,
//     cloudinary_id: req.body.cloudinary_id,
//   });

//   try {
//     const savedUserupload = newUserupload.save();
//     res.json(savedUserupload);
//   } catch (error) {
//     if (error.code === 11000) {
//       // duplicate key
//       return res.json({ status: "error", error: "Upload cannot be done" });
//     }
//   }
// });

//upload file
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new user
    let userUpload = new Userupload({
      name: req.body.name,
      email: req.body.email,
      avatar: result.secure_url,
      isUploaded: req.body.isUploaded,
      cloudinary_id: result.public_id,
    });
    // Save user
    await userUpload.save();
    res.json(userUpload);
  } catch (err) {
    console.log(err);
  }
});

//get all uploaded images
router.get("/getimages", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:dev_setups")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

//delet uploads

router.delete("/:id", async (req, res) => {
  try {
    // Find user by id
    let uploadUser = await Userupload.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(uploadUser.cloudinary_id);
    // Delete user from db
    await uploadUser.remove();
    res.json(uploadUser);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
