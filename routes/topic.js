const router = require("express").Router();
const { response } = require("express");
let Topic = require("../model/Topic");

router.route("/add").post(async(req,res) => {

    const person1 = req.body.person1;
    const topic = req.body.topic;
    const supervisor = req.body.supervisor;
    const supervisorOpinion = req.body.supervisorOpinion;
    const finalDecision = req.body.finalDecision;
    const coSupervisor = req.body.coSupervisor;
    const coSupervisorOpinion = req.body.coSupervisorOpinion;

    const newtopic = new Topic({

        person1,
        topic, 
        supervisor,
        supervisorOpinion,
        finalDecision,
        coSupervisor,
        coSupervisorOpinion
    })

    try{
        const user = await Topic.findOne({person1:req.body.person1}); 


         if(user){
            return res.status(409).send({message: "User with given group already exists"})
        }
            
        else{
            newtopic.save().then(()=>{
                res.json("Topic Added")
            }).catch((err)=>{
                console.log(err);
            })
                
        }
    }catch (error){
        res.status(500).send({message: "Internal Server Error"})
    }
    
   

})


router.route("/").get((req,res)=>{
    Topic.find().then((topic)=>{
        res.json(topic)
    }).catch((err)=>{
        console.log(err);
    })

})


router.route("/get-topic/:id").get((req,res)=>{
    let supervisorId = req.params.id;
    Topic.find(
        {
            supervisor:supervisorId,
            supervisorOpinion: "pending"
        }
    ).then((topic)=>{
        res.json(topic)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/co-get-topic/:id").get((req,res)=>{
    let supervisorId = req.params.id;
    Topic.find(
        {
            coSupervisor:supervisorId,
            coSupervisorOpinion: "pending",
            supervisorOpinion: "Accept"
        }
    ).then((topic)=>{
        res.json(topic)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/spesific-topic/:id").get((req,res)=>{
    let topicId = req.params.id;
    Topic.findOne(
        {
            _id:topicId
        }
    ).then((topic)=>{
        res.json(topic)
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/up-sup-opinion/:id").put((req,res)=>{
    let topicId = req.params.id;
    Topic.findByIdAndUpdate(
        topicId, req.body
    ).then((topic)=>{
        res.json(topic)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/up-co-opinion/:id").put((req,res)=>{
    let topicId = req.params.id;
    Topic.findByIdAndUpdate(
        topicId, req.body
    ).then((topic)=>{
        res.json(topic)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async (req, res)=>{
    let userId = req.params.id;
    const{name, age, gender} = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }

    const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(()=>{
        res.status(200).send({status:"User updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.message});
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId)
    .them(()=>{
        res.status(200).send({status:"User deleted", user: update})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleted  user", error: err.message});
    })
})




router.route("/get/:id").get(async (req, res)=> {
    let userId = req.parms.id;
    const user = await Student.findById(userId)
    .then((Student) => {
        res.status(200).send({status:"User fetched", Student})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get  user", error: err.message});

    })
})

router.route("/getTopicReq/:id").get(async (req, res)=> {
    let person1Id = req.parms.id;
    const person1 = await Topic.findById(person1Id)
    .then((Topic) => {
        res.status(200).send({status:"User fetched", Topic})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get  user", error: err.message});

    })
})

module.exports = router;