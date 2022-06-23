const mongoose = require("mongoose");

const schema = mongoose.Schema;

const UserSchema = new schema({
    email:{
        type: String
    },
    password:{
        type: String
    },

    isActive:{
        type: Boolean
    },

    isRechargeValid:{
        type: Boolean
    },

    isBlocked:{
        type: Boolean
    },

    apps:[
        {type: mongoose.Schema.Types.ObjectId,
        ref: "App"}
    ]
,
    sidebarApps:[
        {type: mongoose.Schema.Types.ObjectId,
            ref: "App"}
    ],

    plan:{
        type: String,
        default: "free"
    }
}, {timestamps: true});


module.exports = mongoose.model("User", UserSchema);