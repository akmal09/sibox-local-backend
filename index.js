if(process.env.NODE_ENV == "production"){
    require('dotenv').config()
}

const sequelize = require("./database/dbconfig")
const Package = require("./model/Package");

// sequelize.sync({ force: true }).then(async () => {
//     console.log()
// })

sequelize.sync({ force: true})
const express = require("express")
const routes = require("./routes/route")

const app = express();
app.use(express.json());

app.get("/", (req, resp) => resp.send("application is up and running"))

app.use("/service", routes.routes)

const PORT = process.env.PORT | 3005;
app.listen(PORT, () => {
    console.log(`Service endpoint = http://localhost:${PORT}`)
});