const {response,request}=require('express')

const Course = require("../models/course");

const GetAllCourses = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.query;
  const statusTrue = { status: true };

  const [total, courses] = await Promise.all([
    Course.countDocuments(statusTrue),
    Course.find(statusTrue).skip(Number(since)).limit(Number(limit)).populate("user", "email").populate("category", "category"),
    //Como traigo los datos de los usuarios y las categorias?🤔
  ]);

  res.json({
    total,
    courses,
  });
};

const getCourse = async (req = request, res = response) => {
  const { id } = req.params;

  const course = await Course.findById(id).populate("user", "email").populate("category", "category");
  //Como traigo los datos de los usuarios y las categorias?🤔

  res.json({
    course,
  });
};

const newCourse = async (req, res = response) => {
  const { price, category, description, img } = req.body;
  const course = req.body.course.toUpperCase();

  const courseAlreadyExistsDB = await Course.findOne({ course });

  if (courseAlreadyExistsDB) {
    return res.status(400).json({
      msg: `${courseAlreadyExistsDB.course} Already exists`,
    });
  }

  const data = {
    course,
    category,
    price,
    description,
    img,
    user: req.user._id,
  };

  const newCourse = new Course(data);

  await newCourse.save();

  res.status(201).json({
    newCourse,
    msg: "Course created successfully!",
  });
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { price, category, description, featured, img } = req.body;

  const user = req.user._id;

  let data = {
    price,
    description,
    category,
    featured,
    img,
    user,
  };

  if (req.body.course) {
    data.course = req.body.course.toUpperCase();
  }

  const updatedCourse = await Course.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    updatedCourse,
    msg: "Course updated successfully",
  });
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  const deletedCourse = await Course.findByIdAndUpdate(id,{ status: false },{ new: true });

  res.json({
    msg: `${deletedCourse.course} status: false`,
  });
};

module.exports = {
  GetAllCourses,
  getCourse,
  newCourse,
  updateCourse,
  deleteCourse,
};