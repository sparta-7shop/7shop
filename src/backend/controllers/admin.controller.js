const AdminService = require('../services/admin.service')
const { Admin, Products } = require('../db/index')

class AdminController {
  constructor(adminController) {
    this.adminController = adminController
  }
  adminService = new AdminService(Admin)
  productService = new AdminService(Products)

  /**
  * 회원삭제(controller)
  */
  deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await this.adminService.deleteUser(userId);
      if (user.errorMessage) { return res.status(user.code).json({ errorMessage: user.errorMessage }) }
      return res.json({ message: '회원 삭제 완료' });
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.errorMessage,
      });
    }
  };

  /**
  * 상품수정(controller)
  */
  updateProduct = async (req, res) => {
    try {
      const { name, price, stock, description } = req.body;
      const productImage = req.file
      const { productId } = req.params;

      const product = await this.adminService.updateProduct({
        productId,
        name,
        price,
        stock,
        productImage: productImage?.filename,
        description
      })
      if (product.errorMessage) { return res.status(412).json({ errorMessage: product.errorMessage }) }
      return res.status(201).json({
        message: '상품 수정이 완료되었습니다.'
      })
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.errorMessage,
      });
    }
  };

  /**
   * 상품삭제(controller)
   */
  deleteProduct = async (req, res) => {
    try {
      const { productId } = req.params;

      const product = await this.adminService.deleteProduct(productId);
      if (product.errorMessage) { return res.status(412).json({ errorMessage: product.errorMessage }) }
      return res.status(201).json({
        message: '상품 삭제가 완료되었습니다.'
      })
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.errorMessage,
      });
    }
  };

  /**
   * 상품등록(controller)
   */
  createProduct = async (req, res) => {
    const { name, price, stock, description, categoryId } = req.body
    const productImage = req.file
    const adminId = 1
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
      if (product.errorMessage) { return res.status(412).json({ errorMessage: product.errorMessage }) }
      return res.status(201).json({
        message: '상품 등록이 완료되었습니다.'
      })
    } catch (error) {
      return res.status(500).json({
        errorMessage: error.errorMessage,
      });
    }
  }

  // 유저 정보
  userInfo = async (req, res) => {
    try {
      const userInfo = await this.adminService.userInfo()
      console.log(userInfo);
      return res.status(200).json({ userInfo })

    } catch (e) {
      console.error(e);

    }
  }
  userById = async (req, res) => {
    try {
      const { id } = res.locals.user
      const user = await this.adminService.userById(id)
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ errorMessage: error })
    }
  }


}
module.exports = AdminController;
