import ArticleCategory from "../../models/ArticleCategory.js";

const getCategory = async(req,res) => {
    const response = await ArticleCategory.findAll();
    if(response == "") return res.status(404).json({message: "empty data"})
    res.status(200).json({
        message: "200 status OK",
        data: response
    });
}

const getCategoryById = async(req,res) => {
    const response = await ArticleCategory.findOne({
        where: {
            uuid : req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Kategori tidak ditemukan"});
    res.status(200).json({
        message: "200 status OK",
        data: response
    })
}

const createCategory = async(req,res) => {
    const { name } = req.body;
    try {
        await ArticleCategory.create({
            name: name
        });
        res.status(201).json({message: "Kategori telah ditambahkan"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateCategory = async(req,res) => {
    const response = await ArticleCategory.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Kategori tidak ditemukan"});

    const {name} = req.body;
    try {
        await ArticleCategory.update({
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

const deleteCategory = async(req,res) => {
    const response = await ArticleCategory.findOne({
        where: {
            uuid: req.params.id
        }
    });

    if(!response) return res.status(404).json({message: "Kategori tidak ditemukan"});

    try {
        await ArticleCategory.destroy({
            where: {
                id: response.id
            }
        });
        res.status(200).json({message: "Kategori telah dihapus"});
    } catch (error) {
        res.status(400).json({message: error.message});        
    }
}
export {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}