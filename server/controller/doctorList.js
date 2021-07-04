var DoctorList = require("../modal/doctorList");

// create and save new Doctor
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  // new Doctor
  const doctorList = new DoctorList({
    name: req.body.name,
    expertism: req.body.expertism,
    aboutDescription: req.body.aboutDescription,
    aboutTitle: req.body.aboutTitle,
    speciality: req.body.speciality,
  });
  // save DoctorList in the database
  doctorList
    .save(doctorList)
    .then((data) => {
      res.send(data);
      // res.redirect('/');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong",
      });
    });
};

//get List
exports.find = (req, res) => {
  if (req.params.id) {
    const id = req.params.id;

    DoctorList.findById(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "Not found DoctorList with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Erro retrieving DoctorList with id " + id });
      });
  } else {
    DoctorList.find()
      .then((DoctorList) => {
        res.send(DoctorList);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message ||
              "Error Occurred while retriving DoctorList information",
          });
      });
  }
};

// Update a new idetified Doctor by id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  if (!req.params && !req.params.id) {
    return res.status(400).send({ message: "Provide ID to update" });
  }
  const id = req.params.id;
  DoctorList.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update Doctor with ${id}. Maybe Doctor not found!`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update Doctor information" });
    });
};

// Delete a Doctor with specified doctor id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DoctorList.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "Doctor was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Doctor with id=" + id,
      });
    });
};
