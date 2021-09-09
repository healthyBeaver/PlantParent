const router = require('express').Router();
let userPlant = require('../models/userPlant.model');

router.route('/add').post((req, res) => {
    const plantID = req.body.plantID;
    const givenName = req.body.givenName;
    const stage = req.body.stage;
    const dob = req.body.dob;
    console.log("STAGE:", stage)
    const newUserPlant = new userPlant({plantID, givenName, stage, dob});
    newUserPlant.save().then((saved) => res.status(200).json({userPlantID:saved._id})).catch(err => res.status(400).json("Error: "+err) )

});

router.route('/addWS').put((req, res) => {
    const userPlantID = req.body.userPlantID;
    const WSID = req.body.WSID;
    userPlant.findOne({_id:userPlantID}).then((userPlant)=>{
        userPlant.wateringSchedule=WSID; 
        userPlant.save().then((userPlant)=>res.status(200).json(userPlant)).catch(err=> console.log("Error: " +err))}).catch(err=> console.log("Error: " +err));
});

router.route('/getPlant/:plantID').get(async (req, res) => {
    let plantID = req.params.plantID;
    
    userPlant.findOne({_id:plantID}).then(plant => res.status(200).json(plant)).catch(err=> res.status(400).json("Error: "+err))
});

router.route('/delete').delete((req, res) => {
    let userPlantID = req.body.userPlantID;
    userPlant.findOneAndRemove({_id:userPlantID}).then(()=> res.status(200).json("Deleted!")).catch(err => res.status(400).json("Error: " + err ))

})


router.route('/editName').put((req, res) => {
    let userPlantID = req.body.userPlantID;
    let newName = req.body.newName;

    userPlant.findOne({_id:userPlantID}).then((userPlant) => {
        userPlant.givenName = newName; userPlant.save().then((userPlant)=> res.status(200).json(userPlant)).catch(err => console.log("Error: " + err))
     }).catch(err => console.log("Error: "+ err))
})

router.route('/editStage').put((req, res) => {
    let userPlantID = req.body.userPlantID;
    let newStage = req.body.newStage;

    userPlant.findOne({_id:userPlantID}).then((userPlant) => {
        userPlant.stage = newStage; userPlant.save().then((userPlant)=> res.status(200).json(userPlant)).catch(err => console.log("Error: " + err))
     }).catch(err => console.log("Error: "+ err))
})


module.exports = router; //do this for all routers