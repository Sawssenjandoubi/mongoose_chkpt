const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PersonSchema = new Schema({

    name:{
        type : String,
        required:true,
    } ,

    age:{
        type : Number,
        required: true,
    }, 
    
    favoriteFoods: {
        type:[String],
        required: true,
    }

},{timestamps:true})

module.exports = mongoose.model('contacts',PersonSchema);