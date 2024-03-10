const express=require('express')
const bodyParser=require('body-parser')
const connectToDB = require('./connectDB.JS')
const categoryRoutes = require('./api/routes/category');
const apartmentRoutes=require('./api/routes/apartment')
const advertiserRoutes=require('./api/routes/advertiser')
const cityRoutes=require('./api/routes/city')
const customerRoutes=require('./api/routes/customer')
const cors = require('cors');



const dotenv = require('dotenv')
dotenv.config()

connectToDB()


const app=express()
app.use(bodyParser.json())

app.listen(3004,()=>
{
    console.log("3001");
}
)
app.get('',(req,res)=>{
    res.status(200).send("error")
})

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/categories', categoryRoutes);
app.use('/advertiser', advertiserRoutes);
app.use('/apartment', apartmentRoutes);
app.use('/city', cityRoutes);
app.use('/customer', customerRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());







