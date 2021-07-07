var AboutInfo = require("../modal/aboutInfo");

// create and save new AboutInfo
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  // new AboutInfo
  const aboutInfo = new AboutInfo({
    title: req.body.title,
    description: req.body.description,
    icon: req.body.icon,
  });
  // save AboutInfo in the database
  aboutInfo
    .save(aboutInfo)
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

//get aboutInfo
exports.find = (req, res) => {
  if (req.params.id) {
    const id = req.params.id;

    AboutInfo.findById(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "Not found AboutInfo with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Erro retrieving AboutInfo with id " + id });
      });
  } else {
    AboutInfo.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Error Occurred while retriving AboutInfo information",
        });
      });
  }
};

// Update a new idetified AboutInfo by AboutInfo id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  if (!req.params && !req.params.id) {
    return res.status(400).send({ message: "Provide ID to update" });
  }
  const id = req.params.id;
  AboutInfo.findByIdAndUpdate(id, req.body, { useFindAndModify: false,new:true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update AboutInfo with ${id}. Maybe AboutInfo not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update AboutInfo information" });
    });
};

// Delete a AboutInfo with specified AboutInfo id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  AboutInfo.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "AboutInfo was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete AboutInfo with id=" + id,
      });
    });
};
