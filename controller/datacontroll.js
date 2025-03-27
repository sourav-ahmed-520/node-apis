const dbModels = require("../models/dbmodels");
const {ObjectId} = require("mongodb");


// exports.createUmpire = async(req,res)=>{

//     try{
//         console.log("hi")
//         const newUmpire = await dbModels.create(req.body)

//         console.log("hi 0")

//         res.status(200).json({
//             status: "success",
//             data: {
//                 umpire: newUmpire
//             }
//         })

//         console.log("hi 1")
//     } catch(err){
//         res.status(400).json({
//             status: "failed",
//             err: err.message
//         })
//     }
// }

exports.validateId = (req,res,next)=>{

    console.log("hi2");
   if(ObjectId.isValid(req.query.id)){
      next();
   }
   else{
    res.status(500).json({
        status: "failed",
        err: "Not a valid id"
    })
   }
}
exports.getPlayers = async(req,res)=>{ 

    try{

        const page = req.query.p || 0;
        const docFind = 20;

        const players = await dbModels.PlayerModel.find().skip(page*docFind).limit(docFind);

        res.status(200).json({
            status: 200,
            tottal: players.length,
            data:{
                players
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

exports.getPlayer = async(req,res)=>{

    console.log(req.query.id)

    try{
        const player = await dbModels.PlayerModel.find({_id: new ObjectId(req.query.id)});

        if(!player.length){
            res.status(404).json({
                status: "failed",
                message: "No player with id: " + req.query.id
            })
        }
        else{
            res.status(200).json({
                status: "success",
                data: {
                    player
                }
            })
        }
    }
    catch(err){
        res.status(404).json({
            status: "failed",
            err: err.message
        })
    }
    
}

exports.getPlayersbyCountry = async(req,res)=>{

    try{
        const page = req.query.p || 0;
        const docFind = 10;
        const playerCountry = req.query.country.toUpperCase();

        const players = await dbModels.PlayerModel.find({country: playerCountry}).skip(page*docFind).limit(docFind);

        res.status(200).json({
            status: "success",
            type: "players from " + req.query.country,
            tottal: players.length,
            data: {
                players
            }
        })
    }
    catch(err){
        res.status(404).json({
            status: "failed",
            err: err.message
        })
    }
}

exports.getAllAndExp = async(req,res)=>{

    try{
        const page = req.query.p || 0;
        const docFind = 10;
        let players;

        if(req.query.type == "allrounder"){
            players = await dbModels.PlayerModel.find({tech: {$all: ["Bat","Bowl"]}}).skip(page*docFind).limit(docFind);
        }
        else if(req.query.type == "experienced"){
            players = await dbModels.PlayerModel.find({$or: [{"career.odi": {$gt: 50}},{"career.test": {$gt: 50}},{"career.t20": {$gt: 50}}]}).skip(page*docFind).limit(docFind);
        }

        if(!players){
            res.status(500).json({
                status: "failed",
                err: "A bad request"
            })
        }
        else{
            res.status(200).json({
                status: "Success",
                type: req.query.type +" players",
                tottal: players.length,
                data:{
                    players
                }
            })
        }

    }
    catch(err){
        res.staus(500).json({
            status: "failed",
            err: err.message
        })
    }
}

exports.updatePlayer = async(req,res)=>{

    try{
        //upadte by adding values
        // await dbModels.PlayerModel.updateOne({_id: new ObjectId(req.query.id)},req.body)

        //update by incrementing values
        await dbModels.PlayerModel.updateOne({_id: new ObjectId(req.query.id)},{$inc: {"career.odi": 1,"career.test": 1,"career.t20": 1}})

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
        await dbModels.PlayerModel.deleteOne({_id: new ObjectId(req.query.id)})

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



