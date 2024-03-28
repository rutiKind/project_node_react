const Advertiser = require('../models/advertiser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  //שליפת כל המפרסמים
  getAll: (req, res) => {
    Advertiser.find().populate('Apartment')
      .then((advertisers) => {
        res.status(200).send({ advertisers });
      })
      .catch((error) => {
        res.status(404).send({ message: error.message });
      });
  },
//הרשמה 
  register: (req, res) => {
    const { email, password, phone, additionalPhone, apartment } = req.body;
  
    Advertiser.findOne({ email: email })
      .then(advertiser => {
        if (advertiser) {
          return res.status(409).send({ message: 'Email already exists' });
        }
  
         bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            return res.status(500).send({ error: error.message });
          }
  
          const newAdvertiser = new Advertiser({
            email,
            phone,
            additionalPhone,
            password: hash,
            apartment,
          });
  
          newAdvertiser
            .save()
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
              });
            })
            .catch(error => {
              res.status(500).send({ error: error.message });
            });
        });
      })
      .catch(error => {
        res.status(500).send({ error: error.message });
      });
  },
  
//התחברות
    login: (req, res) => {
        const { email, password } = req.body
        Advertiser.find({ email: { $eq: email } })
            .then(advertiser => {
                if (advertiser.length == 0) {
                    return res.status(409).send({ message: 'Email and password are not matches!' })
                }

                // const user = users[0]
                const [advertiser2] = advertiser

                //bcrypt.compare - יוצרת מחרוזת שמצפינה את האובייקט שנשלח אליה
                //נשתמש בה ע"מ לוודא שהסיסמה שהוזנה אכן שייכת למשתמש שנכנס
                //הפונקציה מקבלת שלשה ארגומנטים
                //1. req.body האובייקט עליו הפעלנו את ההצפנה - מתוך ה
                //2. שאותו רוצים להשוות hash
                //3. פונקציית callback
                bcrypt.compare(password, advertiser2.password, (error, result) => {
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
                    res.status(200).send({  token, advertiser })
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
    console.log(email);
    Advertiser.find({ email: { $eq: email } })
    .then(advertiserSaved => {
      const [advertiser2] = advertiserSaved
      console.log(advertiser2);

      // שליחת אימייל
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
        to: advertiser2.email,
        subject: 'your password',
        html: `Hello,<br>To reset your password, please click on the following link: <a href="http://localhost:3000/ResertPassword/${advertiser2.email}">Reset Password</a>`
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
  console.log("enter");
  const { email, newPassword } = req.body; 
  console.log(req.body);
  
  Advertiser.findOne({ email: email }).then(advertiser => {
      if (!advertiser) {
          return res.status(404).send({ error: 'Advertiser not found' });
      }

      // הצפנה
      bcrypt.hash(newPassword, 10, (err, hash) => {
          if (err) {
              return res.status(500).send({ error: err.message });
          }

          Advertiser.findByIdAndUpdate(advertiser._id, { $set: { password: hash } }, { new: true })
          .then(updatedAdvertiser => {
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
 

