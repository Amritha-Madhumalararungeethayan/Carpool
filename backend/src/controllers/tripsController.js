const Trip = require("../models/Trip")

exports.createTrip = async(req,res)=>{
    try{
        const{name , from , to , time , total , cost , notes } = req.body;
        if(!name || !from || !to || !time || !total ){
            return res.status(400).json({message : "Enter name , from , to , time and the total no of seats "});
        }

        const trip = new Trip({
            user: req.user.id , 
            name , available : total , 
            from , to , time , total , cost , notes 
        })
        await trip.save(); 
        res.status(201).json({message : "Trip created" , trip })
    }
    catch(err){
        res.status(500).json({error :err.message})
    }
};

exports.listTrips = async(req,res)=>{
    try {
        const{destination , date} = req.query ;
        const filter = {status : "active"};
        if(destination){
            filter.to = destination;
        }
        if(date){
            const start = new Date(date);
            const end = new Date(date);
            end.setDate(end.getDate()+1);
            filter.time = {$gte :start , $lt :end };
        }
        const trips = await Trip.find(filter).populate("user", "name email ").sort({time : 1});
    res.json({trips});

    }
    catch(err){
        res.status(500).json({error :err.message})

}};

exports.getTrip = async(req,res)=>{
    try {
        const trip = await Trip.findById(req.params.id).populate("user","name email ");
        if(!trip) return res.status(404).json({message : " trip not found"});
        res.json({trip});

    }
    catch(err){
        res.status(500).json({error :err.message})
};
}

exports.myTrips = async(req,res)=>{
    try {
        const trips = await Trip.find({user : req.user.id}).sort({time : 1 });
        res.json({trips});

    }catch(err){
     res.status(500).json({error :err.message})   
    }n
}

exports.joinTrip = async(req,res)=>{
    try {
    const trip = await Trip.findById( req.params.id);
    if(!trip) return res.status(404).json({message : " trip not found"});
    if(trip.status !== "active"){
    return res.status(400).json({message : " trip no longer active "});    
    }
    if (trip.user.toString() === req.user.id) {
      return res.status(403).json({ message: "You cant join your own trip " });
    }
     if (trip.members.includes(req.user.id)) {
      return res.status(400).json({ message: "You've already joined this trip" });
    }

    const updatedTrip = await Trip.findOneAndUpdate(
        {
        _id: req.params.id,
        available: { $gt: 0 },
        members: { $ne: req.user.id }
      },
      {
        $inc: { available: -1 },
        $push: { members: req.user.id }
      },
      { new: true }
    );
 if (!updatedTrip) {
      return res.status(400).json({ message: "No seats available " });
    }
     res.json({ message: "Joined trip ", trip: updatedTrip });
}
catch(err){
    res.status(500).json({error:err.message});
}

}


exports.leaveTrip = async(req,res)=>{
    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { _id: req.params.id, members: req.user.id },
            { $inc: { available: 1 }, $pull: { members: req.user.id } },
            { new: true }
    );
    if (!updatedTrip) {
      return res.status(400).json({ message: "You havent joined the trip yet" });
    }
    res.json({message : "left trip" , trip : updatedTrip});
    }
    catch(err){
        res.status(500).json({error :err.message});
    }
};











