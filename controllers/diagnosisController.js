/*
Handler diagnosis
tidak ada db diagnosis, tapi disimpannya ke db rekam (opsional)
*/
import Gejala from "../models/Gejala.js";

//get list gejala yang akan ditampilkan dihalaman utama diagnosis
const getGejala = async(req,res) => {
    const response = await Gejala.findall();
    res.json({response})
}

//send
const kirimGejala = async(req,res) => {
    const response = req.body;

    const value = response.gejala.map(response => ({
        gejalaId: response.gejalaId,
        MB: response.MB
    }))
    res.json({
        data : value
    });

}

const hitungCF = () => {
    
}

export {
    getGejala,
    kirimGejala
}