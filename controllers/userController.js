import User from "../models/User.js";
import argon2 from "argon2";
import multer from "multer";
import path from "path";
import sequelize from "sequelize";

const getUser = async(req,res) => {
    const response = await User.findAll();
    if(response == "") return res.status(404).json({message: "User tidak ditemukan"})
    res.status(200).json({
        message: "200 status OK",
        data: response
    });

}

const getUserById = async(req,res) => {
    const response = await User.findOne({
        where: {
            uuid : req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "User tidak ditemukan"});
    res.status(200).json({
        message: "200 status OK",
        data: response
    })
}

const createUser = async(req,res) => {
    const { name,fullName,firstName,lastName,email,gender,password,role,NIK,RT,RW,alamatLengkap,tempatLahir,tanggalLahir,noHP,lainLain} = req.body;

    let roled;
    if(!role){
        roled = "pasien"
    }else{
        roled = role
    }

    const hashedPassword = await argon2.hash(password);
    const [ data, created ] = await User.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
            name: name,
            fullName: fullName,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            password: hashedPassword,
            role: roled,
            NIK: NIK,
            RT: RT,
            RW: RW,
            alamatLengkap: alamatLengkap,
            tempatLahir: tempatLahir,
            tanggalLahir: tanggalLahir,
            noHP: noHP,
            lainLain: lainLain
        }
    })
    if(!created) return res.status(400).json({message: "Email sudah ada"})
    res.status(200).json({message:"User berhasil ditambahkan!"})
}

const updateUser = async(req,res) => {
    const response = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "User tidak ditemukan"});

    const { name,fullName,firstName,lastName,email,gender,password,role,NIK,RT,RW,alamatLengkap,tempatLahir,tanggalLahir,noHP,lainLain } = req.body;

    let hashed;
    if(password == "" || password == null) {
        hashed = response.password;
    }else{
        hashed = await argon2.hash(password)
    }

    try {
        await User.update({
            // image: req.file.path,
            name: name,
            fullName: fullName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            gender: gender,
            password: hashed,
            role: role,
            NIK: NIK,
            RT: RT,
            RW: RW,
            alamatLengkap: alamatLengkap,
            tempatLahir: tempatLahir,
            tanggalLahir: tanggalLahir,
            noHP: noHP,
            lainLain: lainLain
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

const deleteUser = async(req,res) => {
    const response = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "User tidak ditemukan"});

    try {
        await User.destroy({
            where: {
                id: response.id
            }
        });
        res.status(200).json({message: "User telah dihapus"});
    } catch (error) {
        res.status(400).json({message: error.message});        
    }
}

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'images')
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: '100000'},
    fileFilter: (req,file,cb)=>{
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname){
            return cb(null,true)
        }
        cb("Format file salah")
    }
}).single("images")

export {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    upload
}