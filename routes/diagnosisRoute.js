import express from "express";
import {
    getGejala,
    kirimGejala
} from "../controllers/diagnosisController.js"

const route = express.Router();

route.get('/',getGejala);
route.post('/',kirimGejala);

export default route;