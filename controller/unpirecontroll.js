const dbModels = require("../models/dbmodels");
const {ObjectId} = require("mongodb");


exports.getUmpires = async(req,res)=>{

    try{

        const page = req.query.p || 0;
        const docFind = 20;

        const umPire = await dbModels.UmPireModel.find().skip(page*docFind).limit(docFind);

        res.status(200).json({
            status: 200,
            tottal: umPire.length,
            data:{
                umPire
            }
        })

    }
    catch(err){
        res.status(500).json({
            status: 500,
            err: err.message
        })
    }

    // console.log("hi")
}


exports.postUmpire = async(req,res)=>{

    try{
        await dbModels.UmPireModel.insertOne(req.body);

        res.status(201).json({
            status: "successful",
            message: "successfully inserted"
        })
    }
    catch(err){
        res.status(500).json({
            status: "unsuccessful",
            err: err.message
        })
    }
}
exports.updateUmpire = async(req,res)=>{

    try{
        //upadte by adding values
        // await dbModels.PlayerModel.updateOne({_id: new ObjectId(req.query.id)},req.body)

        console.log("hi")

        //update by incrementing values
        await dbModels.UmPireModel.updateOne({_id: new ObjectId(req.query.id)},{$inc: {age: 1}})

        res.status(201).json({
            status: "successful",
            message: "successfully updated"
        })
    }
    catch(err){
        res.status(500).json({
            status: "successful",
            err: err.message
        })
    }
}

exports.deletPlayer = async(req,res)=>{

    try{
        await dbModels.UmPireModel.deleteOne({_id: new ObjectId(req.query.id)})

        res.status(201).json({
            status: "Successfull",
            message: "successfully deleted"
        })
    }
    catch(err){
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
}