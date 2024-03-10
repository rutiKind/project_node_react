const Advertiser = require('../models/advertiser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const advertiser = require('../models/advertiser')
const advertiser = require('../models/advertiser')
const Customer = require('../models/customer')
const customer = require('../models/customer')

module.exports = {

    getAll: (req, res) => {
        Customer.find()
    .then((customers) => { res.status(200).send({ customers }) })
    .catch((error) => { res.status(404).send({ message: error.message }) });
    },

    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            const existingCustomer = await Customer.findOne({ email: email });
    
            if (existingCustomer) {
                return res.status(409).send({ message: 'Email is already exists' });
            }
    
            const hash = await bcrypt.hash(password, 10);
            const customer = new Customer({
                email,
                password: hash,
            });
    
            await customer.save();
            res.status(200).send('Welcome to our application!');
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    ,

    login: (req, res) => {
        const { email, password } = req.body
        // console.log(email)
        Customer.find({ email: { $eq: email } })
            .then(customer => {
                if (customer.length == 0) {
                    return res.status(409).send({ message: 'Email and password are not matches!' })
                }

                // const user = users[0]
                const [customer2] = customer

                //bcrypt.compare - יוצרת מחרוזת שמצפינה את האובייקט שנשלח אליה
                //נשתמש בה ע"מ לוודא שהסיסמה שהוזנה אכן שייכת למשתמש שנכנס
                //הפונקציה מקבלת שלשה ארגומנטים
                //1. req.body האובייקט עליו הפעלנו את ההצפנה - מתוך ה
                //2. שאותו רוצים להשוות hash
                //3. פונקציית callback
                console.log(customer2.password);
                bcrypt.compare(password, customer2.password, (error, result) => {
                    if (error || !result) {
                        return res.status(500).send({ error: 'Email and password are not matches!' })
                    }

                    //jwt.sign = יצירת צופן
                    //מקבל שלשה ארגומנטים
                    //1. אובייקט שלפיו נערוך את ההצפנה
                    //2. מזהה יחודי של המערכת שישלח בכל הצפנה ובכל פענוח
                    //3. אובייקט אפשרויות - לא חובה
                    //אנחנו הגדרנו שהצופן יהיה תקף לשעה אחת בלבד
                    const token = jwt.sign({ email, password }, process.env.TOKEN, {
                        expiresIn: '1H'
                    })

                    //שליחת הצופן לצד שרת בכניסה למערכת
                    res.status(200).send({ message: 'login succeefull!', token,customer2 })
                })
            })
            .catch(error => {
                res.status(404).send({ error: error.message })
            })
    },

//     remove: (req, res) => {
//         User.findByIdAndDelete(req.params.id)
//             .then((user) => {
//                 if (!user) {
//                     return res.status(404).send({ message: `User not found!` })
//                 }
//                 return Article.deleteMany({ author: user._id })
//             })
//             .then(() => {
//                 res.status(200).send(`Delete user ${req.params.id} succeed`)
//             })
//             .catch((error) => {
//                 res.status(404).send({ error: error.message })
//             })
//     }
// }
}