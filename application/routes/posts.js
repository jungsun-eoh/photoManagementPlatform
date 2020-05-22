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
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({storage: storage});

router.post('/postimage', uploader.single('uploadImage') ,(req,resp,next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let desc = req.body.description;
    let fk_userid = req.session.userID;

    sharp(fileUploaded) 
        .resize(200)
        .toFile(destOfThumbnail)
        .then(() => {
            let baseSQL = 
            'INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?,?,?,?,now(),?);'
            return db.execute(baseSQL, [title, desc, fileUploaded, destOfThumbnail, fk_userid]);
        })
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                successPrint('new post created');
                resp.redirect('/');
                //resp.json({status:"OK", message:"post created", "redirect": "/"});
            } else {
                //resp.json({status:"OK", message:"post was not created", "redirect": "/postimage"});
                next(error('post was not created'));
            }
        })
        .catch((err) => {next(err)});
});

router.get('/search/:searchTerm', (req, resp, next) => {
    let searchTerm = req.params.searchTerm;
    let _sql = 'SELECT p.id, p.title, p.description, p.thumbnail, u.id, u.username FROM posts p JOIN users u on p.fk_userid=u.id WHERE title LIKE ?;';
    searchTerm = "%" + searchTerm + "%";
    db.query(_sql, [searchTerm])
    .then(([results, fields]) => {
        resp.json(results);
    })
    .catch((err) => next(err));
}) ;

router.get('/getRecentPosts', (req, resp, next) => {
    let _sql = 'SELECT p.id, p.title, p.description, p.thumbnail, u.id, u.username FROM posts p JOIN users u on p.fk_userid=u.id ORDER BY p.created DESC LIMIT 8;';
    db.query(_sql, )
    .then(([results, fields]) => {
        resp.json(results);
    })
    .catch((err) => next(err));
}) ;

router.get('/imagePost/:id', (req, resp, next) => {
    resp.sendFile('imagepost.html', {root:'public/html'});
})
router.get('/getPostById/:id', (req, resp, next) => {
    let _id = req.params.id;
    let _sql = 'SELECT p.id, p.title, p.description, p.photopath, p.created, u.username FROM posts p JOIN users u on p.fk_userid=u.id WHERE p.id=?;';
    db.query(_sql, _id )
    .then(([results, fields]) => {
        resp.json(results[0]);
    })
    .catch((err) => next(err));
})
module.exports = router;