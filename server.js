const express = require("express");

const app = express();
// body parsing for express
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 80;

let server = app.listen(PORT, () => {
    console.log("Server running on " + PORT);
})