import Penyakit from "../models/Penyakit.js";
import Gejala from "../models/Gejala.js";

const getGejala = async(req,res) => {
    const response = await Gejala.findAll();
    if(response == "") return res.status(404).json({message: "empty data"})
    res.status(200).json({
        message: "200 status OK",
        data: response
    });
}

const hitungCF = async(req,res) => {
    const gejalaa = await Gejala.findAll({
        attributes: ["id","name"]
    });

    const aturan = await Penyakit.findAll({
        attributes: ["id","name","keterangan","solusi"],
        include: [{
            model: Gejala,
            attributes: ["id","name"],
            through: {
                attributes: ["MB","MD"]
            }
        }]

    });

    if(req.body.data.length === 0){
        res.status(400).json({message: "mohon masukkan gejala yang dialami"})
    }else{
        let data = req.body.data
        let final = []

        for(let i in aturan){
            let hasil = aturan[i].gejalas
            .filter((item)=>data.indexOf(item.id) > -1);

            let MB = [];
            let MD = [];
            
            for(let i in hasil){
                MB.push(hasil[i].aturans.MB);
                MD.push(hasil[i].aturans.MD);
            }
            let combined = {
                "MB" : MB,
                "MD" : MD
            }
            
            let mbCombined = combined.MB.reduce((a,e) => {return Number(a)+Number(e)*(1-Number(a))},0);
            let mdCombined = combined.MD.reduce((a,e) => {return Number(a)+Number(e)*(1-Number(a))},0);

            final.push({
                "id": aturan[i].id,
                "NamaPenyakit": aturan[i].name,
                "Keterangan": aturan[i].keterangan,
                "Solusi": aturan[i].solusi,
                "cfPercentage": (mbCombined - mdCombined)*100
            })
        }

        //sort by percentage
        let sorted = final.sort((a,b)=>b.cfPercentage - a.cfPercentage)

        res.status(200).json({
            data: sorted
        })
}
}

export {
    hitungCF,
    getGejala
};