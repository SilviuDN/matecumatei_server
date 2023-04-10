const mongoose = require('mongoose');
const Course = require('../models/Course.model.js');
const Section = require('../models/Section.model.js');
const Lecture = require('../models/Lecture.model.js');

mongoose.connect(process.env.DB_REMOTE, {
// mongoose.connect('mongodb://0.0.0.0/profiles', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Curs complet de matematica pentru Examenul de Bacalaureat
// const courseId = process.env.CURS_BAC;
// mongoDbCompass query: {courseId: ObjectId('process.env.XXX')} 

// Polinoame pentru toti
// const courseId = process.env.CURS_POLINOAME;
// mongoDbCompass query: {courseId: ObjectId('process.env.XXX')}

// Limite de functii - Metoda usoara
// const courseId = process.env.CURS_LIMITE
// mongoDbCompass query: {courseId: ObjectId('process.env.XXX')}

// Curs de trigonometrie pentru clasa a IX-a
// const courseId = process.env.CURS_TRIGO
// mongoDbCompass query: {courseId: ObjectId('process.env.XXX')}

// Totul despre Sisteme de ecuatii liniare
// const courseId = process.env.CURS_SISTEME
// mongoDbCompass query: {courseId: ObjectId('process.env.XXX')}

// Evaluare Nationala 2022 – Geometrie in plan
const courseId = process.env.CURS_EVALUARE
// mongoDbCompass query: {courseId: ObjectId('process.env.XXX')}


// ************************************************ 1 *******************************************
// ADD COURSE ID TO SECTIONS

// Course
//     .findById(courseId)
//     .then( result =>{
//         result.sections.forEach( section => {
//             Section
//                 .findByIdAndUpdate(section, {courseId:mongoose.Types.ObjectId(courseId)}, { new: true })
//                 .then( res => console.log(result))
//                 .catch( err => console.log(err))
//         })
//     })


// ************************************************ 2 *******************************************
// ADD COURSE ID TO Lectures

// Course
//     .findById(courseId)
//     .then( result =>{
//         result.lectures.forEach( lecture => {
//             Lecture
//                 .findByIdAndUpdate(lecture, {courseId:mongoose.Types.ObjectId(courseId)}, { new: true })
//                 .then( result => console.log(result))
//                 .catch( err => console.log(err))
//         })
//     })


// ************************************************ 3 *******************************************
// ADD SECTION ID TO Lectures

// Course
//     .findById(courseId)
//     .then( course =>{
//         course.sections.forEach( section => {
//             Section
//                 .findById(section)
//                 .then( result => {
//                     result.lectures.forEach( lecture => {
//                         Lecture
//                             .findByIdAndUpdate(lecture, {sectionId:section._id}, { new: true })
//                             .then( result => console.log(result.sectionId))
//                             .catch( err => console.log(err))
//                     })
//                 })
//             })
//     })


// ************************************************ 3 *******************************************
// GET ALL LECTURES WITHOUT A courseId AND SET IT TO process.env.XXX --> lIMITE DE FUNCTII
Lecture
    .updateMany({courseId:null}, {courseId: mongoose.Types.ObjectId(process.env.XXX)})
    .then( result => console.log(result))
    .catch( err => console.log(err))
 






// Section
//     .find({},  function(err, result) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result);
//         }
//         mongoose.disconnect();
//     });

// Section
//     .updateMany({}, { courseId: courseId }, function(err, result) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result);
//         }
//         mongoose.disconnect();
//     });