//const Apartment = require("../models/apartment")
const City=require("../models/city")
const Category=require("../models/category")
const Advertiser=require("../models/advertiser")
const apartment = require("../models/apartment")
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const Apartment=require("../models/apartment")
module.exports = {

//שליפת כל הדירות
    getAll: (req, res) => {
        Apartment.find().populate({path:'cityId categoryId advertiserId' , select:'cityName Apartment email categoryName'})
        // Apartment.find().populate('cityId').populate('categoryId').populate('advertiserId')
            .then((apartmentS) => {
                res.status(200).send(apartmentS)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })
    },
 
//יצירת דירה חדשה
create: async  (req, res) => {

    const { path: image } = req.file
    console.log(req.file);
    //'path'.replace('//','/')
    const { advertiserId, price, addition, numBed, address, cityId, categoryId, description, apartmentName } = req.body;
    const apartment = new Apartment({ advertiserId, price, addition, numBed, address, cityId,pic: image.replace('\\', '/'), categoryId, description, apartmentName });
    const savedApartment = await apartment.save();
    // עדכון העיר
 await  City.findByIdAndUpdate(cityId, { $push: { Apartment: savedApartment._id } });
  //עדכון הקטגוריה
 await Category.findByIdAndUpdate(categoryId,{$push:{Apartment:savedApartment._id}});
  //עדכון מפרסם
 await Advertiser.findByIdAndUpdate(advertiserId,{$push:{Apartment:savedApartment._id}})
        .then((apartment) => {
            res.status(200).send(`Create apartment ${savedApartment._id} succeed`);
        })
        .catch((error) => {
            res.status(404).send({ message: error.message });
        });
    },


//עדכון דירה
   update: (req, res) => {
    debugger
    console.log("enter");
    const _id = req.body.id
    console.log("🚀 ~ _id:", _id)
    //const { price, addition,address,description,apartmentName,numBed,id, ...updateData } = req.body;
    //console.log(updateData);
    const imagePath = req.file.path.replace('\\', '/');
   const { price, addition, numBed, address, description, apartmentName } = req.body;
   Apartment.findByIdAndUpdate(_id, { price, addition, numBed, address, pic: imagePath, description, apartmentName }, { new: true })
   .then((apartment) => {
            console.log("success");
            res.status(200).send(apartment)
        })
        .catch((error) => {
            res.status(404).send({ error: error.message })
        })
},

//מחיקת דירה
 deleteApartment: async (req, res) => {
    try {
    const _id = req.params.id;
    console.log(_id);
    const apartment=await Apartment.findById(_id)
    if(!apartment)
        return res.status(404).send({ message: 'Apartment not found' });
    //מחיקת הדירה
    await Apartment.findByIdAndDelete(_id);
    //מחיקה מהעיר
    if(apartment.cityId)
      await City.findByIdAndUpdate(apartment.cityId,{$pull:{Apartment:_id}})
    //מחיקה מהקטגוריה
    if(apartment.categoryId)
      await Category.findByIdAndUpdate(apartment.categoryId,{$pull:{Apartment:_id}})
    //מחיקה מהמפרסם
    if(apartment.advertiserId)
      await Advertiser.findByIdAndUpdate(apartment.advertiserId,{$pull:{Apartment:_id}})
    res.status(200).send({ message: 'Apartment deleted successfully' });
       } 
       catch (error) {
        res.status(500).send({ error: error.message });
        };

},

//שליפת דירה לפי קוד
getById: async(req,res)=>{
    Apartment.findById(req.params.id)
    .then((article) => {
        res.status(200).send(article)
    })
    .catch((error) => {
        res.status(404).send({ error: error.message })
    })
},

//שליפת דירות לפי קוד קטגוריה
getByCategoryId: (req, res) => {
    const categoryId = req.params.id
    Category.findById(categoryId)
        .then((category) => {
            if (!category) {
             return res.status(404).send({ message: `Category not found!` })
            }

            //where 
            //סינון רשומות בהתאם לתנאים
            //find אפשר לקבל את התנאים גם בתוך ה

            //כל המאמרים השייכים לחקטגוריה המסוימת ויש להם תיאור
            // Article.find({ $and: [{ categoryId: { $eq: categoryId } }, { description: $exists }] })

            //$eq = equals
            Apartment.find().where({ categoryId: { $eq: categoryId } })

                //select
                //דרכים לשליפה של שדות מסוימים
                // .select('title description')
                // .select({ title: 1, description: 1 })
                //.select({ _id: 0, content: 0, categoryId: 0, __v: 0 })
                .then((category) => {
                    res.status(200).send(category)
                })
                .catch((error) => {
                    res.status(404).send({ error: error.message })
                })

        })
        .catch((error) => {
            res.status(500).send({ error: error.message })
        })
},

//שליפת דירות לפי קוד עיר
getByCityId: (req, res) => {
    const cityId = req.params.id
    City.findById(cityId)
        .then((city) => {
            if (!city) {
                return res.status(404).send({ message: `City not found!` })
            }

            //where 
            //סינון רשומות בהתאם לתנאים
            //find אפשר לקבל את התנאים גם בתוך ה

            //כל המאמרים השייכים לחקטגוריה המסוימת ויש להם תיאור
            // Article.find({ $and: [{ categoryId: { $eq: categoryId } }, { description: $exists }] })

            //$eq = equals
            Apartment.find().where({ cityId: { $eq: cityId } })

                //select
                //דרכים לשליפה של שדות מסוימים
                // .select('title description')
                // .select({ title: 1, description: 1 })
                //.select({ _id: 0, content: 0, categoryId: 0, __v: 0 })
                .then((city) => {
                    res.status(200).send(city)
                })
                .catch((error) => {
                    res.status(404).send({ error: error.message })
                })

        })
        .catch((error) => {
            res.status(500).send({ error: error.message })
        })
},


//שליפת דירות לפי כמות מיטות שגדולה מ..
getByBigBed: (req, res) => {
    numBed=req.params.numBed
    Apartment.find().where({ numBed: { $gt: numBed } })
    .populate('cityId').populate('categoryId').populate('advertiserId')
    .then((numBed) => {
        res.status(200).send(numBed)
    })
    .catch((error) => {
        res.status(404).send({ error: error.message })
    })

},


//שליפה לפי כמות מיטות קטנה מ
getByLitteleBed: (req, res) => {
    numBed=req.params.numBed
    Apartment.find().where({ numBed: { $lt : numBed } })
    .populate('cityId').populate('categoryId').populate('advertiserId')
    .then((numBed) => {
        res.status(200).send(numBed)
    })
    .catch((error) => {
        res.status(404).send({ error: error.message })
    })

},

//שליפה לפי כמות מיטות שווה ל
getByEqualBed: (req, res) => {
    numBed=req.params.numBed
    Apartment.find().where({ numBed: { $eq : numBed } })
    .populate('cityId').populate('categoryId').populate('advertiserId')
    .then((numBed) => {
        res.status(200).send(numBed)
    })
    .catch((error) => {
        res.status(404).send({ error: error.message })
    })
},

//שליפה לפי מחיר יקר מ
getByPricreBig: (req, res) => {
    price=req.params.price
    Apartment.find().where({ price: { $gt : price } })
    .populate('cityId').populate('categoryId').populate('advertiserId')
    .then((price) => {
        res.status(200).send(price)
    })
    .catch((error) => {
        res.status(404).send({ error: error.message })
    })
},

//שליפה לפי מחיר זול מ
getByPricreLittle: (req, res ) => {
    price=req.params.price
    Apartment.find().where({ price: { $lt : price } })
    .populate('cityId').populate('categoryId').populate('advertiserId')
    .then((price) => {
        res.status(200).send(price)
    })
    .catch((error) => {
        res.status(404).send({ error: error.message })
    })
},


//שליפה לפי מחיר שווה ל
getByPricreEqual: (req, res) => {
    price=req.params.price
    Apartment.find().where({ price: { $eq : price } })
    .populate('cityId').populate('categoryId').populate('advertiserId')
    .then((price) => {
        res.status(200).send(price)
    })
    .catch((error) => {
        res.status(404).send({ error: error.message })
    })
},

//שליפה לפי קוד לקוח
getByAdvertiser: (req, res) => {
    Advertiser.findById({ _id: req.params.id}).populate({ path: `Apartment cityId categoryId advertiserId`, select: `apartmentName numBed decription address categoryId cityId advertiserId price addition pic  cityName Apartment email categoryName`,strictPopulate:false})
        .then((x) => {
            res.status(200).send(x.Apartment)
        })
        .catch((err) => {
            res.status(404).send({ error: err.message })
        })
},


//שליחת מייל עם פרטי הדירה
apartmentDetails:(req,res)=>{
    const {apartment,email}=req.body
    console.log(email);
    console.log("🚀 ~ apartment:", apartment)
    Apartment.find({ _id: { $eq: apartment } }).populate({path:'cityId categoryId advertiserId' , select:'cityName Apartment email categoryName'})

    .then(apartmentSend => {
      const [apartment2] = apartmentSend
      console.log("🚀 ~ apartment2:", apartment2)
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
        to: email,
        subject: 'The apartment has been successfully booked',
        //text:advertiser2.password ,
        html: `Hello,<br> Below are the details of the apartment: <p>${apartment2.apartmentName}</p>
        ,<br> ${apartment2.description}
        <br> ${apartment2.categoryId.categoryName}
        <br> ${apartment2.cityId.cityName}
        <br> ${apartment2.address}
        <br> ${apartment2.numBed}
        <br> ${apartment2.addition}
        <br> ${apartment2.price}
        <br> ${apartment2.advertiserId.email}
        <img src="cid:unique@nodemailer.com"/>'`,
        attachments: [{
            filename: 'apartment.png',
            path: `D:/NODE.JS/פרויקט/node js/${apartment2.pic}`  , // נתיב לתמונה במערכת הקבצים שלך
            cid: 'unique@nodemailer.com' // זהה ל-src ב-HTML
          }]
        }
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
try2:(req,res)=>{
 id=req.body.id
 console.log("🚀 ~ req2:", id)
 console.log("success");
}


}
