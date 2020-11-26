module.exports = (app) => {
    const userCtrl = require("../controllers/users");
    const uploadCtrl = require("../controllers/fileUpload");

    app.post("/auth/register", userCtrl.register);
    app.post("/auth/login", userCtrl.login);
    app.get("/users/details", userCtrl.listDetails);
    app.get("/users/list-files", userCtrl.listFiles);
    app.post("/users/upload", uploadCtrl.uploadPdf);
};
