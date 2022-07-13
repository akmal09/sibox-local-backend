if (process.env.NODE_ENV == "production") {
  require("dotenv").config();
}
const cors = require("cors");
const cookieParser = require("cookie-parser")
const express = require("express");
const routes = require("./routes/route");
const app = express();


app.use(cookieParser())
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, resp) => resp.send("application is up and running"));

app.use("/service", routes.routes);

const PORT = process.env.PORT | 3005;
app.listen(PORT, () => {
  console.log(`Service endpoint = http://localhost:${PORT}`);
});
