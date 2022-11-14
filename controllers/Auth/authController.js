import User from "../../models/User.js";
import argon2 from "argon2";

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
        attributes: ['uuid','fullName','firstName','lastName','Gender','role']
    });
    if(!user) return res.status(404).json({message: "user not found"});
    res.status(200).json(user);
}

export {
    login,
    logout,
    me
}