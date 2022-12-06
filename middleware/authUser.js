import User from "../models/User.js";

const verifyLogin = async(req,res,next) => {
    if(!req.session.userId) return res.status(401).json({message: "please login first"});

    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });

    if(!user) return res.status(404).json({message: "user not found"});

    req.userId = user.id;
    req.role = user.role;
    next();
    
}

const isPakar = async(req,res,next) => {
    if(!req.session.userId) return res.status(401).json({message: "please login first"});
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });

    if(!user) return res.status(404).json({message: "user not found"});
    if(user.role !== "pakar" && user.role !== "admin") return res.status(403).json({message: "forbidden access"});
    next();
}

const isAdmin = async(req,res,next) => {
    if(!req.session.userId) return res.status(401).json({message: "please login first"});
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });

    if(!user) return res.status(404).json({message: "user not found"});
    if(user.role !== "admin") return res.status(403).json({message: "forbidden access"});
    next();
}


export {
    verifyLogin,
    isAdmin,
    isPakar
}