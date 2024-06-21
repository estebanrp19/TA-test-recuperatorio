import express from 'express';
import axios from 'axios';
import nodemon from 'nodemon';
import 'dotenv/config';

const server = express()

const port = process.env.PORT || 3000
const api = process.env.PEOPLE
const respaldo = process.env.PEOPLE_RESPALDO

server.get("/recovery", async (req, res) => {
    try {
        const { data } = await axios.get(api)
        res.status(200).json(data)
    } catch (error) {
        try {
            const { data } = await axios.get(respaldo);
            res.status(200).json(data);
        } catch (error) {
            console.log("redirected");
            // res.status(500).json({error: "Algo salió mal"})
            res.status(500).redirect("http://localhost:5147/")
        }
    }
})

server.use("/", (req, res) => {
  console.log("Home");
  res.status(200).json("Esto es el Home");
});


server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})