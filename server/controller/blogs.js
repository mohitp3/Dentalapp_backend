var Blogs = require("../modal/blogs");

exports.create = (req, res) => {
    // validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be emtpy!" });
      return;
    }
  
    // new image add
    const blogs = new Blogs({
      imageUrl: req.file.path,
      description: req.body.description,
      title : req.body.title

    });
    // res.send(req.body);
    // save in the database
    blogs
      .save(blogs)
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

  //get blogs
  exports.find = (req, res) => {
    if (req.params.id) {
      const id = req.params.id;
  
      Blogs
        .findById(id)
        .then((data) => {
          if (!data) {
            res.status(404).send({ message: "Not found image with id " + id });
          } else {
            res.send(data);
          }
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: "Erro retrieving image with id " + id });
        });
    } else {
      Blogs
        .find()
        .then((image) => {
          res.send(image);
        })
        .catch((err) => {
          res
            .status(500)
            .send({
              message:
                err.message || "Error Occurred while retriving image information",
            });
        });
    }
  };

  // Update a blog by blog id
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: "Data to update can not be empty" });
    }
    if (!req.params && !req.params.id) {
      return res.status(400).send({ message: "Provide ID to update" });
    }
    const id = req.params.id;
    Blogs.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot Update Blog with ${id}. Maybe Blog not found!`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Update Blog information" });
      });
  };

  // Delete a Blog with specified Blog id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Blogs.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
        } else {
          res.send({
            message: "Blog was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Blog with id=" + id,
        });
      });
  };
