const AdminService = require('../services/admin.service')
const { Admin, Products } = require('../db/index')

class AdminController {
  constructor(adminController) {
    this.adminController = adminController
  }
  adminService = new AdminService(Admin)
  productService = new AdminService(Products)

  deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      console.log("userId", userId);

      const a = await this.adminService.deleteUser(userId);
      console.log("a", a);
      return res.json({ "msg": "삭제완료", a });
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, price, stock, img_path, description } = req.body;
      console.log("productId", productId);
      console.log(price);

      const a = await this.adminService.updateProduct(
        productId,
        name,
        price,
        stock,
        img_path,
        description
      );

      console.log("a", a);
      return res.json({ "msg": "수정완료", a });
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      console.log("productId", productId);

      const a = await this.adminService.deleteProduct(productId);
      console.log("a", a);
      return res.json({ "msg": "삭제완료", a });
    } catch (error) {
      console.log(error);
    }
  };

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
      if (product.errorMessage) { return res.status(412).json({ errorMessage: product.errorMessage }) }
      return res.status(201).json({
        message: '상품 등록이 완료되었습니다.'
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errorMessage: error.errorMessage,
      });
    }
  }
}
module.exports = AdminController;
