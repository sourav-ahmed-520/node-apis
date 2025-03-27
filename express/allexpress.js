const express = require("express");
const exPrs = express();
const routeCntrl = require("../controller/datacontroll");
const umpireCntrl = require("../controller/unpirecontroll")

exPrs.use(express.json())
const player = express.Router();

// exPrs.use("/api/players",player)
exPrs.use("/api/umpires",player)

//get all players
// player.route("/")
//    .get(routeCntrl.getPlayers)
player.route("/")
   .get(umpireCntrl.getUmpires)
 
//get player by id
player.route("/player") //url with query parameter id = ....
   .get(routeCntrl.validateId,routeCntrl.getPlayer)

//get players with country 
player.route("/country") //url with query parameter country = ....
   .get(routeCntrl.getPlayersbyCountry)

//get players by allrounder or experienced
player.route("/type")
      .get(routeCntrl.getAllAndExp)

//post umpires
player.route("/post")
   .post(umpireCntrl.postUmpire)

// upadte player
// player.route("/update")
//       .patch(routeCntrl.validateId,routeCntrl.updatePlayer)
player.route("/update")
      .patch(routeCntrl.validateId,umpireCntrl.updateUmpire)

//delete player
// player.route("/delete")
//       .delete(routeCntrl.validateId,routeCntrl.deletPlayer)

player.route("/delete")
      .delete(routeCntrl.validateId,umpireCntrl.deletPlayer)

module.exports = exPrs;