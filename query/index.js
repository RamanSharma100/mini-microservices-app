import cors from "cors";
import axios from "axios";
import express from "express";
import handleEvent from "./eventHandler.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data, posts);

  res.send("OK");
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);

  const res = await axios.get("http://localhost:4005/events");

  for (let i = 0; i < res.data.length; i++) {
    const event = res.data[i];
    console.log("Processing event:", event.type);
    handleEvent(event.type, event.data, posts);
  }
});
