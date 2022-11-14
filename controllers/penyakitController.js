import Penyakit from "../models/Penyakit.js";

const getPenyakit = async(req,res) => {
    const response = await Penyakit.findAll();
    if(response == "") return res.status(404).json({message: "Penyakit tidak ditemukan"})
    res.status(200).json({
        message: "200 status OK",
        data: response
    });
}

const getPenyakitById = async(req,res) => {
    const response = await Penyakit.findOne({
        where: {
            uuid : req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Penyakit tidak ditemukan"});
    res.status(200).json({
        message: "200 status OK",
        data: response
    })
}

const createPenyakit = async(req,res) => {
    const { name,keterangan,solusi } = req.body;
    try {
        await Penyakit.create({
            name: name,
            keterangan: keterangan,
            solusi: solusi
        });
        res.status(201).json({message: "Penyakit telah ditambahkan"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updatePenyakit = async(req,res) => {
    const response = await Penyakit.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Penyakit tidak ditemukan"});

    const {name,keterangan,solusi} = req.body;
    try {
        await Penyakit.update({
            name: name,
            keterangan: keterangan,
            solusi: solusi
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

const deletePenyakit = async(req,res) => {
    const response = await Penyakit.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Penyakit tidak ditemukan"});

    try {
        await Penyakit.destroy({
            where: {
                id: response.id
            }
        });
        res.status(200).json({message: "Penyakit telah dihapus"});
    } catch (error) {
        res.status(400).json({message: error.message});        
    }
}

export {
    getPenyakit,
    getPenyakitById,
    createPenyakit,
    updatePenyakit,
    deletePenyakit
}