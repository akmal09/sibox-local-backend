if (process.env.NODE_ENV == "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const routes = require("./routes/route");
const app = express();
const cron = require("node-cron")
const {
  syncPackage
} = require("./controllers/packageController")

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, resp) => {
  resp.send("application is up and running")
});

app.use("/service", routes.routes);

const PORT = process.env.PORT | 3005;
app.listen(PORT, (req, resp) => {
  console.log(`Service endpoint = http://localhost:${PORT}`);
  const task = cron.schedule("0 */1 * * * *", ()=>{
    console.log("ini cron")
    syncPackage()
  })
  task.start()
});
