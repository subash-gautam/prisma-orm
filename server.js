import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Server is running !!");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes files
import routes from "./Routes/index.js";
app.use(routes);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
