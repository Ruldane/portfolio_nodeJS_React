const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setStringType = (maxLength) => {
    return  {type: String, required: true, maxLength: maxLength}
}

const projetShema = new Schema ({
    userId: setStringType(512),
    title: setStringType(256),
    img: setStringType(256),
    author: setStringType(256),
    link: setStringType(256),
    description: setStringType(2048),
})

module.exports = mongoose.model('Project', projetShema)
