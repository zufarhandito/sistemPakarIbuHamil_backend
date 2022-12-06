import User from "../../models/User.js";
import argon2 from "argon2";

const register = async(req,res) => {
    const { name,fullName,firstName,lastName,email,gender,password,role,NIK,RT,RW,Kalurahan,Kapanewon,Kabupaten,Provinsi } = req.body;

    const hashedPassword = await argon2.hash(password);
    const [ data, created ] = await User.findOrCreate({
        where: {
            email: email
        },
        defaults: {
            name: name,
            fullName: fullName,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            password: hashedPassword,
            role: "pasien",
            NIK: NIK,
            RT: RT,
            RW: RW,
            Kalurahan: Kalurahan,
            Kapanewon: Kapanewon,
            Kabupaten: Kabupaten,
            Provinsi: Provinsi
        }
    })
    if(!created) return res.status(400).json({message: "Email sudah ada"})
    res.status(200).json({message:"Registrasi Berhasil! silahkan login"})
}

const login = async(req,res)=> {
    const user = await User.findOne({
        where:{
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({message: "user not found!"});
    const match = await argon2.verify(user.password,req.body.password);
    if(!match) return res.status(400).json({message: "wrong password"});
    req.session.userId = user.uuid;

    const uuid = user.uuid;
    const fullName = user.fullName;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;
    const gender = user.gender;
    const role = user.role;

    res.status(200).json({
        uuid,
        fullName,
        firstName,
        lastName,
        email,
        gender,
        role
    })
}

const logout = (req,res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({message: "failed to log out"});
        res.status(200).json({message: "logged out"});
    })
}

const me = async(req,res) => {
    if(!req.session.userId) return res.status(401).json({message: "please login first"});
    const user = await User.findOne({
        attributes: ['uuid','image','fullName','firstName','lastName','email','Gender','role','NIK','RT','RW','alamatLengkap','tempatLahir','tanggalLahir','noHP','lainLain'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({message: "user not found"});
    res.status(200).json(user);
}

export {
    login,
    register,
    logout,
    me
}