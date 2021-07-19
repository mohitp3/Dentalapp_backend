var Gallery = require("../modal/gallery");

exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  // new image add
  const gallery = new Gallery({
    imgUrl: req.file.path,
    category: req.body.category,
    title: req.body.title,
  });
  // res.send(req.body);
  // save in the database
  gallery
    .save(gallery)
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
//get images
exports.find = (req, res) => {
  if (req.params.id) {
    const id = req.params.id;

    Gallery.findById(id)
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
    const { page = 1, limit = 5 } = req.query;
    const data = {
      total: 0,
      current: 0,
      images: [],
    };
    Promise.all([
      Gallery.find()
        .countDocuments()
        .then((count) => {
          data.total = count;
        }),
        Gallery.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .then((images) => {
          data.current = images.length;
          data.images = images;
        }),
    ])
      .then((result) => {
        res.send(data);
      })
      .catch((err) =>
        res.status(500).send({
          message:
            err.message || "Error Occurred while retriving image information",
        })
      );
  }
};

//delete images by id

exports.delete = (req, res) => {
  const id = req.params.id;

  Gallery.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "image was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete image with id=" + id,
      });
    });
};
