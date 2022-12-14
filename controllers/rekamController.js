// import Rekam from "../models/Rekam.js";
// import Penyakit from "../models/Penyakit.js";
// import Gejala from "../models/Gejala.js";
// import User from "../models/User.js";

// const getRekam = async(req,res) => {
//     const response = await Rekam.findAll();
//     if(response == "") return res.status(404).json({message: "Rekam tidak ditemukan"})
//     res.status(200).json({
//         message: "200 status OK",
//         data: response
//     });
//     // const response = await User.findAll({
//     //     attributes: ["id","firstName","lastName","fullName"],
//     //     include: [
//     //         {
//     //             model: Penyakit,
//     //             attributes: ["id","name"],
//     //             through: {
//     //                 attributes: ["gejala"]
//     //             }
//     //         }
//     //     ]
//     // })
//     // res.status(200).json(response)
// }

// const getRekamById = async(req,res) => {
//     const response = await Rekam.findOne({
//         where: {
//             uuid : req.params.id
//         },
//         include: [Penyakit,User]
//     });

//     if(!response) return res.status(404).json({message: "Rekam tidak ditemukan"});
//     res.status(200).json({
//         message: "200 status OK",
//         data: response
//     })
// }

// const createRekam = async(req,res) => {
//     // try {
//     //     await Rekam.bulkCreate(req.body.arr);
//     //     res.status(201).json({message: "rekam berhasil ditambahkan"});
//     // } catch (error) {
//     //     res.status(500).json({message:error.message})
//     // }
//     const { userId, penyakitId, CF } = req.body;
//     try {
//         await Rekam.create({
//             userId:userId,
//             penyakitId: penyakitId,
//             CF: CF
//         });
//         res.status(201).json({message: "Rekam telah ditambahkan"});
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// }

// const updateRekam = async(req,res) => {
//     const response = await Rekam.findOne({
//         where: {
//             id: req.params.id
//         }
//     });

//     if(!response) return res.status(404).json({message: "Rekam tidak ditemukan"});

//     const {userId,penyakitId,CF} = req.body;
//     try {
//         await Rekam.update({
//             userId:userId,
//             penyakitId:penyakitId,
//             CF:CF
//         },{
//             where: {
//                 id: response.id
//             }
//         });
//         res.status(200).json({message: "data berhasil di perbarui"});
//     } catch (error) {
//         res.status(400).json({message: error.message});
//     }
// }

// const deleteRekam = async(req,res) => {
//     const response = await Rekam.findOne({
//         where: {
//             uuid: req.params.id
//         }
//     });

//     if(!response) return res.status(404).json({message: "Rekam tidak ditemukan"});

//     try {
//         await Rekam.destroy({
//             where: {
//                 id: response.id
//             }
//         });
//         res.status(200).json({message: "Rekam telah dihapus"});
//     } catch (error) {
//         res.status(400).json({message: error.message});        
//     }
// }


// export {
//     getRekam,
//     getRekamById,
//     createRekam,
//     updateRekam,
//     deleteRekam
// }