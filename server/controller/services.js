var Services = require("../modal/services");

// create and save new Services
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  // new Services
  const services = new Services({
    title: req.body.title,
    description: req.body.description,
    icon: req.body.icon,
  });
  // save Services in the database
  services
    .save(services)
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

//get services
exports.find = (req, res) => {
    if (req.params.id) {
      const id = req.params.id;
  
      Services.findById(id)
        .then((data) => {
          if (!data) {
            res
              .status(404)
              .send({ message: "Not found Services with id " + id });
          } else {
            res.send(data);
          }
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: "Erro retrieving Services with id " + id });
        });
    } else {
      Services.find()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Error Occurred while retriving Services information",
          });
        });
    }
  };

  // Update a Service id
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: "Data to update can not be empty" });
    }
    if (!req.params && !req.params.id) {
      return res.status(400).send({ message: "Provide ID to update" });
    }
    const id = req.params.id;
    Services.findByIdAndUpdate(id, req.body, { useFindAndModify: false,new:true })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot Update Services with ${id}. Maybe Services not found!`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Update Services information" });
      });
  };

  // Delete a Service with specified Service id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Services.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
        } else {
          res.send({
            message: "Service was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Service with id=" + id,
        });
      });
  };