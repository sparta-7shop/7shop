const AdminRepository = require('../repositories/admin.repository');
const { Admin, Products } = require('../db/index')

class AdminService {
    constructor(adminService) {
        this.adminService = adminService
    }
    adminRepository = new AdminRepository(Admin)
    productRepository = new AdminRepository(Products)

    deleteUser = async (userId) => {
        // delete 로직
        return await this.adminRepository.deleteUser(userId)
    }

    /**
     * 상품등록(service)
     */
    createProduct = async ({ name, price, stock, description, productImage, adminId, categoryId }) => {
        try {
            /* -----이미지 파일 관련 예외처리----- */
            if (!productImage) {
                return {
                    code: 412,
                    errorMessage: '사진을 등록해주세요!'
                }
            }
            const lastDot = productImage.lastIndexOf('.');
            const ext = productImage.substring(lastDot, productImage.length);
            if (!ext.match(/\.(jpg|jpeg|png|gif)$/)) {
                return {
                    code: 412,
                    errorMessage: '이미지 파일만 등록가능합니다.'
                }
            }
            /* -----기타 예외처리-----*/
            if (!name || !price || !stock || !description) {
                return {
                    code: 412,
                    errorMessage: '빈칸을 채워주세요!'
                }
            }
            /*-------------------------------*/
            const product = await this.productRepository.createProduct(
                { name, price, stock, description, productImage, adminId, categoryId })
            return product
        } catch (error) {
            return { errorMessage: error }
        }
    }
}


module.exports = AdminService