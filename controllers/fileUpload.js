const fs = require("fs");
const path = require("path");
const db = require("../config/database");
require("dotenv").config();

exports.uploadPdf = (req, res) => {
    fs.readFile(req.files.pdf.path, function (err, data) {
        var fileName = req.files.pdf.originalFilename;

        /// If there's an error
        if (!fileName) {
            return res.status(500).send({
                message: "Upload Failed",
            });
        }

        fs.writeFile("./public/pdf/" + fileName, data, function (err) {
            if (err) {
                return res.status(500).send({
                    message: "Failed",
                });
            }
            db.usersAndFiles
                .create({
                    fileName: fileName,
                    url: __dirname.replace("controllers", "") + "public/pdf/" + fileName,
                    userId: req.user.id,
                })
                .then((res1, err) => {
                    return res.send({
                        message: "Uploaded Successfully",
                        data: {
                            id: res1.id,
                            fileName: res1.fileName,
                            url: res1.url,
                        },
                    });
                });
        });
    });
};
