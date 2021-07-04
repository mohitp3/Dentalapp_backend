var ClinicData = require("../modal/clinicData");

// create and save new ClinicData
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  // new ClinicData
  const clinicData = new ClinicData({

    dentists :req.body.dentists,
    patients :req.body.patients,
    rooms :req.body.rooms,
    machines :req.body.machines
  });
  // save ClinicData in the database
  clinicData
    .save(clinicData)
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

//get clinicData
exports.find = (req, res) => {
    if (req.params.id) {
      const id = req.params.id;
  
      ClinicData.findById(id)
        .then((data) => {
          if (!data) {
            res
              .status(404)
              .send({ message: "Not found clinicData with id " + id });
          } else {
            res.send(data);
          }
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: "Erro retrieving clinicData with id " + id });
        });
    } else {
      ClinicData.find()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Error Occurred while retriving clinicData information",
          });
        });
    }
  };
  
  // Update a new idetified clinicData by clinicData id
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: "Data to update can not be empty" });
    }
    if (!req.params && !req.params.id) {
      return res.status(400).send({ message: "Provide ID to update" });
    }
    const id = req.params.id;
    ClinicData.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot Update ClinicData with ${id}. Maybe ClinicData not found!`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Update ClinicData information" });
      });
  };
