import Article from "../../models/Article.js"
import ArticleCategory from "../../models/ArticleCategory.js";
import User from "../../models/User.js";

const getArticle = async(req,res) => {
    const response = await Article.findAll({
        include: [{
            model: User,
            attributes: ["firstName"]
        },{
            model: ArticleCategory,
            attributes: ["name"]
        }]
    });
    if(response == "") return res.status(404).json({message: "empty data"})
    res.status(200).json({
        message: "200 status OK",
        data: response
    });
}

const getArticleById = async(req,res) => {
    const response = await Article.findOne({
        where: {
            uuid : req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Artikel tidak ditemukan"});
    res.status(200).json({
        message: "200 status OK",
        data: response
    })
}

const createArticle = async(req,res) => {
    const { image,title,content,userId,articleCategoryId,caption } = req.body;
    try {
        await Article.create({
            image:image,
            title:title,
            content:content,
            userId:userId,
            caption:caption,
            articleCategoryId:articleCategoryId
        });
        res.status(201).json({message: "Artikel telah ditambahkan"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateArticle = async(req,res) => {
    const response = await Article.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Artikel tidak ditemukan"});

    const {image,title,content,userId,articleCategoryId,caption} = req.body;
    try {
        await Article.update({
            image:image,
            title:title,
            content:content,
            userId:userId,
            caption:caption,
            articleCategoryId:articleCategoryId
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

const deleteArticle = async(req,res) => {
    const response = await Article.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Artikel tidak ditemukan"});

    try {
        await Article.destroy({
            where: {
                id: response.id
            }
        });
        res.status(200).json({message: "Artikel telah dihapus"});
    } catch (error) {
        res.status(400).json({message: error.message});        
    }
}

export {
    getArticle,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
}