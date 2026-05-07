const multer = require ("multer");

const storage = multer.diskStorage({
    //kode untuk membuat/mengecek folder
    destination: (req, file, cb)=>{
        cb(null, "uploads/");
    },
    //kode untuk merename file agar unique
    filename: (req, file, cb) =>{
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

module.exports = upload;