const express = require('express');
const route = express.Router();
const appointment = require('../controller/appointments');
const slider = require('../controller/slider');
const aboutInfo = require('../controller/aboutInfo');
const doctorList = require('../controller/doctorList');
const service = require('../controller/services');
const clinicData = require('../controller/clinicData')
const gallery = require('../controller/gallery');
const blog = require('../controller/blogs');
const fs = require('fs');
const multer = require('multer');

/**
 * Multer Handling 
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "images/"
    fs.exists(dir, exist => {
    if (!exist) {
      return fs.mkdir(dir, error => cb(error, dir))
    }
    return cb(null, dir)
  })
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
}); 
const upload = multer({ storage });
/**
 * END
 */


/**
 * Routes Handling
 */

route.get('/',(req,res)=>{
    res.send("API's are ready");

});

// API Appointments
route.post('/api/addAppointment', appointment.create);
route.get('/api/getAppointments', appointment.find);
route.get('/api/getAppointments/:id', appointment.find);
route.post('/api/updateAppointment/:id', appointment.update);
route.delete('/api/deleteAppointment/:id', appointment.delete);

//API Slider Images
route.post('/api/addSliderImage',upload.single('imgUrl'), slider.create);
route.get('/api/getSliderImage', slider.find);
route.get('/api/getSliderImage/:id', slider.find);
route.delete('/api/deleteSliderImage/:id', slider.delete);

// API AboutInfo
route.post('/api/addAboutInfo', aboutInfo.create);
route.get('/api/getAboutInfo', aboutInfo.find);
route.get('/api/getAboutInfo/:id', aboutInfo.find);
route.post('/api/updateAboutInfo/:id', aboutInfo.update);
route.delete('/api/deleteAboutInfo/:id', aboutInfo.delete);

// API DoctorList
route.post('/api/addDoctor', doctorList.create);
route.get('/api/getDoctorList', doctorList.find);
route.get('/api/getDoctor/:id', doctorList.find);
route.post('/api/updateDoctor/:id', doctorList.update);
route.delete('/api/deleteDoctor/:id', doctorList.delete);

// API Service
route.post('/api/addService', service.create);
route.get('/api/getService', service.find);
route.get('/api/getService/:id', service.find);
route.post('/api/updateService/:id', service.update);
route.delete('/api/deleteService/:id', service.delete);

//clinic Data
route.post('/api/addClinicData', clinicData.create);
route.get('/api/getClinicData/:id', clinicData.find);
route.post('/api/updateClinicData/:id', clinicData.update);

//gallery
route.post('/api/addGalleryImage',upload.single('imgUrl'), gallery.create);
route.get('/api/getGalleryImage', gallery.find);
route.get('/api/getGalleryImage/:id', gallery.find);
route.delete('/api/deleteGalleryImage/:id', gallery.delete);


//Blog
route.post('/api/addBlog',upload.single('imageUrl'), blog.create);
route.get('/api/getBlog', blog.find);
route.get('/api/getBlog/:id', blog.find);
route.post('/api/updateBlog/:id', blog.update);
route.delete('/api/deleteBlog/:id', blog.delete);



module.exports = route