const Package = require("../model/Package");

const getPackageNumber = async (req, res) => {
    const packagesNumber = req.body;
    await Package.findOne({where: { package_number : packagesNumber} }).then((data) => {
        console.log(data)
    })
    res.send({
        packages : packages
    })
};

module.exports ={
    getPackage
}