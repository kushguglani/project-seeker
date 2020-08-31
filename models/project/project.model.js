const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectName: { type: String, required: true },
    clientName: { type: String, required: true },
    technologies: { type: Array, required: true },
    role: { type: String, required: true },
    jobDescription: { type: String, required: true },
    status: { type: String, required: true },
    craetedBy: {
        managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Managers' },
        managerName: { type:"String" }
    },
    userApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employees' }],
    active: { type: String, required: true, default: '1' },
    created: { type: Date, default: Date.now },
    updated: { type: Date }
});
ProjectSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

ProjectSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

// do not use arrow function since arrow function does not support this keyword binding
ProjectSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const Projects = mongoose.model('Projects', ProjectSchema);
module.exports = Projects;