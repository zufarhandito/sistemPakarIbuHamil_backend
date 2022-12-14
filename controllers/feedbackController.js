import Feedback from "../models/Feedback.js";

const getFeedback = async(req,res) => {
    const response = await Feedback.findAll();
    if(response == "") return res.status(404).json({message: "empty data"})
    res.status(200).json({
        message: "200 status OK",
        data: response
    });
}

const createFeedback = async(req,res) => {
    const { feedback } = req.body;
    try {
        await Feedback.create({
            feedback: feedback
        });
        res.status(201).json({message: "Feedback telah dikirim!"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteFeedback = async(req,res) => {
    const response = await Feedback.findOne({
        where: {
            uuid: req.params.id
        }
    });

    try {
        await Feedback.destroy({
            where: {
                id: response.id
            }
        });

        res.status(200).json({message: "Feedback telah dihapus"});
    } catch (error) {
        res.status(400).json({message: error.message});        
    }

} 

export {
    getFeedback,
    createFeedback,
    deleteFeedback
}