import Products from '../models/products.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
const create = async (req, res) => {
	const products = new Products(req.body)
	try {
		await products.save()
		return res.status(200).json({
			message: "Product successfully created!"
		})
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}

const productsByID = async (req, res, next, id) => {
	try {
		let product = await Products.findById(id)
		if (!product)
			return res.status('400').json({
				error: "Product not found"
			})
		req.profile = product
		next()
	} catch (err) {
		return res.status('400').json({
			error: "Could not retrieve product"
		})
	}
}
const productsByNameSubstringOrList = async (req, res) => {
	try {
		if(Object.keys(req.query).length === 0){
			try {
				let products = await Products.find().select('name category description price published updated created')
				res.json(products)
			} catch (err) {
				return res.status(400).json({
					error: errorHandler.getErrorMessage(err)
				})
			}
		}else{
			if(req.query.name){
				const products = await Products.find({name: {'$regex' : req.query.name, '$options' : 'i'}})
				res.json(products)
			}else{
				res.send("No products with this name")
			}
		}
	} catch (err) {
		console.log(err);
		return res.status('400').json({
			error: "Could not retrieve products"
		})
	}
}
const read = (req, res) => {
	return res.json(req.profile)
}
const update = async (req, res) => {
	try {
		let products = req.profile
		products = extend(products, req.body)
		products.updated = Date.now()
		await products.save()
		res.json(products)
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}
const remove = async (req, res) => {
	try {
		let products = req.profile
		let deletedProducts = await products.deleteOne()
		res.json(deletedProducts)
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}
const deleteAll = async (req, res) => {
	try {
		let deletedProducts = await Products.deleteMany({})
		res.json(deletedProducts)
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}

export default { create, productsByNameSubstringOrList, productsByID, deleteAll, read,  remove, update }
