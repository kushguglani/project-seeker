const mongoose = require('mongoose');

const ManagerSchema = mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    active: { type: String, required: true, default: '1' },
    created: { type: Date, default: Date.now },
    updated: { type: Date }
});
ManagerSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

}

ManagerSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
});

// do not use arrow function since arrow function does not support this keyword binding
ManagerSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const Managers = mongoose.model('Managers', ManagerSchema);


module.exports = Managers;