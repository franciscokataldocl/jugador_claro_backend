const Regions = require("../models/Regions");


exports.getRegions = async (req, res) => {


    const regions = await Regions.findAll();
    res.send(regions);

};
