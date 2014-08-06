var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test");
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", function() {
    console.log("Connected to db");
});

var imageSchema = mongoose.Schema({
    name: String,
    path: String
});
exports.Image = mongoose.model('Image', imageSchema);
