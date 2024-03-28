const Advertiser = require('../models/advertiser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const advertiser = require('../models/advertiser')
const advertiser = require('../models/advertiser')
const Customer = require('../models/customer')
const customer = require('../models/customer')
const nodemailer = require('nodemailer')

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
    
            await customer.save()
            .then(advertiserSaved => {
                // sending an email
                let transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'r583209640@gmail.com',
                    pass: 'oyot jdqp nvtb arxw',
                  },
                   tls: {
                     rejectUnauthorized: false,
                  },
                });
    
                let mailOptions = {
                  from: 'r583209640@gmail.com',
                  to: advertiserSaved.email,
                  subject: 'Welcome to Our Application!',
                  text: 'Congratulations! Your registration was successful.',
                };
    
                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                    return res.status(500).send({ error: 'Failed to send email' });
                  } else {
                    console.log('Email sent: ' + info.response);
                    console.log(advertiserSaved);
                    return res.status(200).send('Welcome to our application!');
                  }
                })
            })
              .catch(error => {
                res.status(500).send({ error: error.message });
              });
    }
    catch{
        return res.status(500).send('error to register');

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

//שכחתי סיסמא
forgetPassword:(req,res)=>{
    console.log(req.body);
    const {email}=req.body
    //email=req.params.email
    console.log(email);
    Customer.find({ email: { $eq: email } })
     .then(customer => {
         if (customer.length == 0) {
        return res.status(409).send({ message: 'Email does not exist' })
    }
      const [customer2] = customer
      // sending an email
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'r583209640@gmail.com',
          pass: 'oyot jdqp nvtb arxw',
        },
         tls: {
           rejectUnauthorized: false,
        },
      });

      let mailOptions = {
        from: 'r583209640@gmail.com',
        to: customer2.email,
        subject: 'your password',
        //text:advertiser2.password ,
        html: `Hello,<br>To reset your password, please click on the following link: <a href="http://localhost:3000/ResertPassword/${customer2.email}">Reset Password</a>`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).send({ error: 'Failed to send email' });
        } else {
          console.log('Email sent: ' + info.response);
        }
      }
      )
  }
    )
},

//עדכון סיסמא
changePassword :(req, res) => {
  const { email, newPassword } = req.body; 
  
  Customer.findOne({ email: email }).then(customer => {
      if (!customer) {
          return res.status(404).send({ error: 'customer not found' });
      }

      // הצפנה
      bcrypt.hash(newPassword, 10, (err, hash) => {
          if (err) {
              return res.status(500).send({ error: err.message });
          }

          Customer.findByIdAndUpdate(customer._id, { $set: { password: hash } }, { new: true })
          .then(updatedCustomer => {
              res.status(200).send({ message: 'Password updated successfully' });
          })
          .catch(error => {
              res.status(500).send({ error: error.message });
          });
      });
  })
  .catch(error => {
      res.status(500).send({ error: error.message });
  });
}

}