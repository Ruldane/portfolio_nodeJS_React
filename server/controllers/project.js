// model with Mongoose
const Project = require('../models/project')


// save book
exports.saveProject = (req, res)=> {
    const projectData = req.body;
    const userId = req.user && req.user.sub;
    const project = new Project(projectData)
    project.userId = userId;

    project.save((error, createProject) => {
        if (error){
            return res.status(422).send(error)
        }
        return res.json(createProject)
    })
}

// get book
exports.getProject = (req, res) => {
    // {} means all projet
    Project.find({}, (err, allProject)=> {
        if (err){
            return res.status(422).send(err)
        }
        return res.json(allProject);
    })
}

