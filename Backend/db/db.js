const mongoose = require("mongoose")

function connectToDb() {
    let mongodbAtlas = "mongodb+srv://hoodajatin88:ZAQwsxzaqWSX12%23@cluster0.dtjs0.mongodb.net/Uber?retryWrites=true&w=majority&appName=Cluster0"
    mongoose.connect(process.env.DB_CONNECT || mongodbAtlas, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => { console.log("connected to database") }
    ).catch(error => console.log(error))
}

module.exports = connectToDb
