import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios
    .post("http://localhost:4000/events", event)
    .catch(() => console.log("Post service not running"));
  axios
    .post("http://localhost:4001/events", event)
    .catch(() => console.log("Comments service not running"));
  axios
    .post("http://localhost:4002/events", event)
    .catch(() => console.log("Query service not running"));
  axios
    .post("http://localhost:4003/events", event)
    .catch(() => console.log("Moderation service not running"));

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
