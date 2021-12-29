const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Username Exist"],
    },
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },
    password: String,
    level: { type: String, default: "normal" },
    created: { type: Date, default: Date.now }
});
module.exports = mongoose.model.Users || mongoose.model("Users", schema);