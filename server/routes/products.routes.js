import express from 'express'
import productsCtrl from '../controllers/products.controller.js'
const router = express.Router()
router.route('/api/products')
	.get(productsCtrl.productsByNameSubstringOrList) // GET ALL PRODUCTS
	.post(productsCtrl.create) //ADD NEW PRODUCT
	.delete(productsCtrl.deleteAll) //DELETE ALL PRODUCTS
router.param('productsId', productsCtrl.productsByID)
router.route('/api/products/:productsId') 
	.get(productsCtrl.read)	//GET PRODUCT BY ID
	.put(productsCtrl.update) //UPDATE PRODUCT BY ID
	.delete(productsCtrl.remove) //REMOVE PRODUCT BY ID
// router.route('/api/products').post(productsCtrl.create)
// router.route('/api/products').get(productsCtrl.list)
// router.param('productsId', productsCtrl.productByName)
// router.route('/api/products/:productsId').get(productsCtrl.read)
// router.route('/api/products/:productsId').put(productsCtrl.update)
// router.route('/api/products/:productsId').delete(productsCtrl.remove)



export default router
