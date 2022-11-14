import Gejala from "../models/Gejala.js";

const getGejala = async(req,res) => {
    const response = await Gejala.findAll();
    if(response == "") return res.status(404).json({message: "empty data"})
    res.status(200).json({
        message: "200 status OK",
        data: response
    });
}

const getGejalaById = async(req,res) => {
    const response = await Gejala.findOne({
        where: {
            uuid : req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Gejala tidak ditemukan"});
    res.status(200).json({
        message: "200 status OK",
        data: response
    })
}

const createGejala = async(req,res) => {
    const { name } = req.body;
    try {
        await Gejala.create({
            name: name
        });
        res.status(201).json({message: "Gejala telah ditambahkan"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateGejala = async(req,res) => {
    const response = await Gejala.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Gejala tidak ditemukan"});

    const {name} = req.body;
    try {
        await Gejala.update({
            name: name
        },{
            where: {
                id: response.id
            }
        });
        res.status(200).json({message: "data berhasil di perbarui"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteGejala = async(req,res) => {
    const response = await Gejala.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Gejala tidak ditemukan"});

    try {
        await Gejala.destroy({
            where: {
                id: response.id
            }
        });
        res.status(200).json({message: "Gejala telah dihapus"});
    } catch (error) {
        res.status(400).json({message: error.message});        
    }
}

export {
    getGejala,
    getGejalaById,
    createGejala,
    updateGejala,
    deleteGejala
}