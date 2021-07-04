var Appointment = require('../modal/appointment');

// create and save new appointment
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new appointment
    const appointment = new Appointment({
        email : req.body.email,
        // appointmentDate: req.body.appointmentDate,
        message : req.body.message,
        name : req.body.name
    })
    // save appointment in the database
    appointment
        .save(appointment)
        .then(data => {
            res.send(data);
            // res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Something went wrong"
            });
        });

}
//get appointments
exports.find = (req, res)=>{
    if(req.params.id){
        const id = req.params.id;

        Appointment.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found appointment with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving appointment with id " + id})
            })

    }else{
        Appointment.find()
            .then(appointment => {
                res.send(appointment)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving appointment information" })
            })
    }

    
}
// Update a new idetified appointment by appointment id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    if(!req.params && !req.params.id){
        return res
            .status(400)
            .send({ message : "Provide ID to update"})
    }
    const id = req.params.id;
    Appointment
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update appointment with ${id}. Maybe appointment not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update appointment information"})
        })
}

// Delete a appointment with specified appointment id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Appointment.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "appointment was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete appointment with id=" + id
            });
        });
}