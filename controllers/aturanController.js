import Aturan from "../models/Aturan.js";

const getAturan = async(req,res) => {
    const response = await Aturan.findAll({
        order: [
            ['penyakitId'],
            ['gejalaId']
        ],
        attributes: [
            'id',
            'penyakitId',
            'gejalaId',
            'MD'
        ]
    });
    if(response == "") return res.status(404).json({message: "empty data"})
    res.status(200).json({
        message: "200 status OK",
        data: response
    });
}

const getAturanById = async(req,res) => {
    const response = await Aturan.findOne({
        where: {
            uuid : req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Aturan tidak ditemukan"});
    res.status(200).json({
        message: "200 status OK",
        data: response
    })
}

const createAturan = async(req,res) => {
    try {
        await Aturan.bulkCreate(req.body);
        res.status(201).json({message: "Aturan telah ditambahkan"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateAturan = async(req,res) => {
    const response = await Aturan.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Aturan tidak ditemukan"});

    const {penyakitId,gejalaId,MD} = req.body;
    try {
        await Aturan.update({
            penyakitId: penyakitId,
            gejalaId:gejalaId,
            MD:MD
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

const deleteAturan = async(req,res) => {
    const response = await Aturan.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Aturan tidak ditemukan"});

    try {
        await Aturan.destroy({
            where: {
                id: response.id
            }
        });
        res.status(200).json({message: "Aturan telah dihapus"});
    } catch (error) {
        res.status(400).json({message: error.message});        
    }
}

export {
    getAturan,
    getAturanById,
    createAturan,
    updateAturan,
    deleteAturan
}