const mongoose = require('mongoose')

const Schema = mongoose.Schema //Creates Schema

const Contact = new Schema({ //Creating schema properties and rules
    name: {
        type:String
    },
    mobile: {
        type:String
    },
    email: {
        type:String
        //Add regular expression under match prop==['reg exp', **error message]
    }
})

const contactModel = mongoose.model('Contact', Contact) //Model is a instance of document. 
//Created a collection above
module.exports = contactModel