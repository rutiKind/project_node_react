const Category = require("../models/category");

module.exports = {
    create: (req, res) => {
        const {
            categoryName,
        } = req.body
       const apartment=[]
        const category = new Category({ apartment, categoryName })
        category.save()
            .then((category) => {
                res.status(200).send(`Create category ${category._id} succeed`);
            })
            .catch((error) => {
                res.status(404).send({ message: error.message });
            });
        },

        getAll: (req, res) => {
            Category.find().populate('Apartment').then(categories => {
                res.status(200).send(categories);
            }).catch(error => {
                res.status(404).send({ error: error.message });
            });
        },

        //שליפת דירות לפי קוד קטגוריה
    }