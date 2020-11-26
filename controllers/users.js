var Sequelize = require("sequelize");
var Op = Sequelize.Op;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const db = require("../config/database");

exports.register = async (req, res) => {
    if (req.body.username.length < 4) {
        return res.status(400).send({
            message: "Username Must Contain 4 Characters",
        });
    }
    if (req.body.password.length < 6) {
        return res.status(400).send({
            message: "Password Must Contain 6 Characters",
        });
    }
    db.users
        .findAll({
            where: {
                username: req.body.username,
            },
        })
        .then((res1, err) => {
            if (res1.length) {
                return res.status(403).send({
                    message: "username Already Exists",
                });
            }
            db.users
                .findAll({
                    where: {
                        email: req.body.email,
                    },
                })
                .then((res2, err) => {
                    if (res2.length) {
                        return res.status(403).send({
                            message: "Email Already Exists",
                        });
                    }
                    bcrypt.hash(req.body.password, saltRounds).then((hashedPassword) => {
                        db.users
                            .create({
                                username: req.body.username,
                                email: req.body.email,
                                password: hashedPassword,
                            })
                            .then((res3, err) => {
                                return res.send({
                                    message: "User Registered Successfully",
                                });
                            });
                    });
                });
        });
};

exports.login = async (req, res) => {
    db.users
        .findAll({
            where: {
                email: req.body.email,
            },
        })
        .then((res1, err) => {
            if (!res1.length) {
                return res.status(404).send({
                    message: "Email Not Found",
                });
            }
            bcrypt.compare(req.body.password, res1[0].password, function (err, result) {
                if (result == true) {
                    var token = jwt.sign(
                        {
                            id: res1[0].id,
                            email: res1[0].email,
                            username: res1[0].username,
                        },
                        process.env.TOKEN_SECRET_KEY,
                        {
                            expiresIn: "12h",
                        }
                    );
                    return res.send({
                        message: "Logged Successfully",
                        token: token,
                    });
                } else {
                    return res.status(400).send({
                        message: "Incorrect Password",
                    });
                }
            });
        });
};

exports.listDetails = (req, res) => {
    db.users
        .findAll({
            attributes: ["id", "username", "email"],
            where: {
                id: req.user.id,
            },
        })
        .then((res1, err) => {
            return res.send({
                message: "Details Listed",
                data: res1,
            });
        });
};

exports.listFiles = (req, res) => {
    db.usersAndFiles
        .findAll({
            attributes: ["id", "fileName", "url"],
            where: {
                userId: req.user.id,
            },
        })
        .then((res1, err) => {
            return res.send({
                message: "Files Listed",
                data: res1,
            });
        });
};
