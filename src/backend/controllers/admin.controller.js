const AdminService = require('../services/admin.service')
const { Admin, Products } = require('../db/index')

class AdminController {
    constructor(adminController) {
        this.adminController = adminController
    }
    adminService = new AdminService(Admin)
    productService = new AdminService(Products)

    deleteUser = async (req, res) => {
        const { userId } = req.params;
        console.log('userId', userId)

        const a = await this.adminService.deleteUser(userId)
        console.log('a', a)
        return res.json({ 'msg': '삭제완료', a })
    }

    UpdateUser() {
        //
    }

    /**
     * 상품등록(controller)
     */
    createProduct = async (req, res) => {
        const { name, price, stock, description } = req.body
        const productImage = req.file
        const adminId = 1
        const categoryId = 1
        try {
            const product = await this.productService.createProduct({
                name,
                price: parseInt(price),
                stock: parseInt(stock),
                description,
                productImage: productImage?.filename,
                adminId: parseInt(adminId),
                categoryId: parseInt(categoryId)
            })
            if (product.errorMessage) { return res.status(product.code).json({ errorMessage: product.errorMessage }) }
            return res.status(201).json({
                message: '상품 등록이 완료되었습니다.'
            })
        } catch (error) {
            return res.status(500).json({
                errorMessage: error.errorMessage,
            });
        }
    }
}

module.exports = AdminController