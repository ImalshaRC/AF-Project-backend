//this is add route part
const router = require("express").Router();
let Web = require("../model/Web.js");

router.route("/add").post((req, res) => {

    new Web({ ...req.body }).save().then(() => {
            res.json("web Successfully Added");
        })
        .catch((err) => {
            console.log(err);
        });
});

//this is get all data route part
router.route("/").get((req, res) => {
    Web.find().then((web) => {
            res.json(web);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with getting data" });
        });
});

//this is delete data route part
router.route("/delete/:id").delete(async (req, res) => {
    let outletID = req.params.id;

    await Web.findByIdAndDelete(outletID).then(() => {
            res.status(200).send({ status: "Outlet deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete product", error: err.message });
        });
});

//this is update data route part
router.route("/update/:id").put(async (req, res) => {
    let courseid = req.params.id;

    await Web.findByIdAndUpdate(courseid, req.body)
        .then(() => {
            res.status(200).send({ status: "Course updated"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data" });
        });
});

//this is get one data route part
router.route("/get/:id").get(async (req, res) => {
    let webID = req.params.id;

    await Web.findById(webID).then((Data) => {
        res.json(Data);
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error with fetched header data"});
    })
});

module.exports = router;