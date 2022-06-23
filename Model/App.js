const mongoose = require("mongoose");

const schema = mongoose.Schema;

const appSchema = new schema({
    title:{
        type: String
    },
    imageUrl:{
        type: String
    },

    websiteUrl:{
        type: String
    },

    featured:{
        type: Boolean,
        default: false
    },

    apptype: {
        type: String,
        default: "free"
       
    }


}, {timestamps: true});


module.exports = mongoose.model("App", appSchema);