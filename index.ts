import express from "express";

const app = express();
const port = 5000;

// routes
app.use(express.json());

//set endpoint
app.get("/", (req: express.Request, res: express.Response): void => {
  res.send("Hello, World.");
});

// check port to avoid already using
app.listen(port, () => console.log("Listening on http://localhost:" + port));

export default app;
