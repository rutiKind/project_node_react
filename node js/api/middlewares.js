const jwt = require('jsonwebtoken')
const multer = require('multer')


//פונקציה שמסננת את סוגי הקבצים שאפשר להעלות
const fileFilter = (req, file, cb) => {
    //במקרה שלנו נאפשר רק קבצי בסיומת תמונה
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        //true אם הקובץ מסוג מתאים נחזיר 
        cb(null, true)
    }
    //ואם לא - false
    cb(null, false)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


module.exports = {
    logUrl: (req, res, next) => {
        console.log(req.url);
        next()
    },

    checkAuth: (req, res, next) => {
        if (!req.headers.authorization) {
            console.log("1");
            res.status(401).send({ error: 'Authentication failed!' })
        }
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(' ')[0]
        console.log(token);
        if (!token) {
            console.log("2");
            return res.status(401).send({ error: 'Authentication failed!' })
        }
        jwt.verify(token, process.env.TOKEN, (error, decoded) => {
            if (error) {
                console.log("3");
                console.log(error);
                return res.status(401).send({ message: 'Authorization failed!' })
            }
            if (decoded) {
                next()
            }
        })
    },
    upload: multer({
        // dest: 'uploads/',
        storage,
        //הגדרות לגבי הקובץ המועלה
        limits: {
            //2MB הקובץ יכול להיות עד גודל של 
            fileSize: 1024 * 1024 * 2
        },
        fileFilter
    })

}