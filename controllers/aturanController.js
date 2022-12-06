import e from "express";
import sequelize from "sequelize";
import Aturan from "../models/Aturan.js";
import Gejala from "../models/Gejala.js";
import Penyakit from "../models/Penyakit.js";

const getAturan = async(req,res) => {
    const response = await Penyakit.findAll({
        attributes: ["id","name","keterangan","solusi"],
        include: [{
            model: Gejala,
            attributes: ["id","name"],
            through: {
                attributes: ["MB","MD"]
            }
        }]

    });
    if(response == "") return res.status(404).json({message: "empty data"})
    res.status(200).json({
        message: "200 status OK",
        data: response
    });
}

const getAturanById = async(req,res) => {
    const response = await Penyakit.findAll({
        where: {
            id:req.params.id
        },
        attributes: ["id","name"],
        include: [{
            model: Gejala,
            attributes: ["id","name"],
            through: {
                attributes: ["MB","MD","uuid"]
            }
        }]

    });

    if(!response) return res.status(404).json({message: "Aturan tidak ditemukan"});
    res.status(200).json({
        message: "200 status OK",
        data: response
    })
}

const createAturan = async(req,res) => {
    try {
        await Aturan.bulkCreate(req.body.arr);
        res.status(201).json({message: "Aturan telah ditambahkan"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateAturan = async(req,res) => {  
    const response = await Penyakit.findAll({
        where: {
            id:req.params.id
        },
        attributes: ["id","name"],
        include: [{
            model: Gejala,
            attributes: ["id","name"],
            through: {
                attributes: ["MB","MD","uuid"]
            }
        }]
    });

    const eliminated_uuids = response[0].gejalas
    .filter(({ id }) => !req.body.arr.some(({ gejalaId }) => gejalaId === id))
    .map(a=>a.aturans.uuid);
    
    try {
        for(let i in eliminated_uuids){
            await Aturan.destroy({
                where: {
                    uuid: eliminated_uuids[i]
                }
            });
        }
        await Aturan.bulkCreate(
            req.body.arr,
            {
                updateOnDuplicate: ["gejalaId","MB","MD"]
            }
            );
        res.status(201).json({message:"aturan telah diperbarui"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteAturan = async(req,res) => {
    
    // const response = await Aturan.findOne({
    //     where: {
    //         uuid: req.params.id
    //     }
    // });

    // if(!response) return res.status(404).json({message: "Aturan tidak ditemukan"});
    const response = await Penyakit.findAll({
        where: {
            id:req.params.id
        },
        attributes: ["id","name"],
        include: [{
            model: Gejala,
            attributes: ["id","name"],
            through: {
                attributes: ["MB","MD","uuid"]
            }
        }]

    });



    // try {
    //     for(let i in eliminated_uuids){
    //         await Aturan.destroy({
    //             where: {
    //                 id: uuids[i]
    //             }
    //         });
    //     }
    //     res.status(200).json({message: "Aturan telah dihapus"});
    //     } catch (error) {
    //         res.status(400).json({message: error.message});        
    //     }
}

export {
    getAturan,
    getAturanById,
    createAturan,
    updateAturan,
    deleteAturan
}