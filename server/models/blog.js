const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setStringType = (maxLength) => {
    return  {type: String, required: true, maxLength: maxLength}
}

const blogSchema = new Schema ({
    userId: setStringType(512),
    slug: {type: String, unique: true, sparse: true},
    title: setStringType(512),
    subtitle: setStringType(512),
    story: setStringType(2048),
    createAt: {type: Date, default: Date.now()},
    updateAt:{type: Date, default: Date.now()},
    status: {type: String, default: 'draft'},
    author: setStringType(128)
})

module.exports = mongoose.model('Blog', blogSchema);
