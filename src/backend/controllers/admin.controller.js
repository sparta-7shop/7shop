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

    createProduct = async (req, res) => {
        const { name, price, stock, description } = req.body
        const productImage = req.file
        const adminId = 1
        const categoryId = 1
        try {
            /* -----예외처리-----*/
            if (!name || !price || !stock || !description) {
                return res.status(412).json({
                    errorMessage: '빈칸을 채워주세요'
                })
            }

            /* -----이미지 파일 관련 예외처리----- */
            if (!productImage) {
                return res.status(412).json({
                    errorMessage: '사진울 등록해주세요',
                });
            }
            const lastDot = productImage.filename.lastIndexOf('.');
            const ext = productImage.filename.substring(lastDot, productImage.length);
            if (!ext.match(/\.(jpg|jpeg|png|gif)$/)) {
                return res.status(412).json({
                    errorMessage: '이미지 파일만 가능합니다',
                });
            }
            /*-------------------------------*/

            const product = await this.productService.createProduct({
                name,
                price: parseInt(price),
                stock: parseInt(stock),
                description,
                productImage: productImage.filename,
                adminId: parseInt(adminId),
                categoryId: parseInt(categoryId)
            })
            if (product.errorMessage) { return res.status(500).json({ errorMessage: product.errorMessage }) }
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