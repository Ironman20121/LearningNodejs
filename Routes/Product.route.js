const express = require('express')
const rate = require('../ratelimit')

const router = express.Router();

const ProductController = require('../Controllers/Product.controller')

//get all products
router.get('/',ProductController.getAllProducts)


//get products by id 
router.get('/:id',ProductController.getProductById)
//delete element by id 

router.delete('/:id',ProductController.deleteElementById)

//Updating ele by id 
router.patch('/:id',ProductController.updatingElementbyId)

//Create a new product
router.post('/',rate.registerpost,ProductController.creatingNewProduct)



module.exports = router;
