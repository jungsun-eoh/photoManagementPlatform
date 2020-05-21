var express = require("express");
var router = express.Router();
const errorPrint = require("../helpers/debug/debughelpers").errorPrint;
const successPrint = require("../helpers/debug/debughelpers").successPrint;
const db = require("../config/database");

const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images/uploads")
    },
    filename: function(req, file, cb) {
        let fileExt = file.mimetype.split("/")[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${this.randomName}.${fileExt}`);
    }
});

var uploader = multer({storage: storage});

router.post('/postimage', uploader.single('uploadImage') ,(req,resp,next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let desc = req.body.description;
    let fk_userid = req.session.userId;

    sharp(fileUploaded) 
        .resize(200)
        .toFile(destOfThumbnail)
        .then(() => {
            let baseSQL = 
            'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?,?,?,?,now(),?);'
            return db.execute(baseSQL, [title, desc, fileUploaded, destOfThumbnail, fk_userid]);
        })
        .then(([results, fileds]) => {
            if (results && results.affectedRows) {
                successPrint('new post created');
                resp.redirect('/');
            } else {
                next(error('post was not created'));
            }
        })
        .catch((err) => {next(err)});
   
});

module.exports = router;