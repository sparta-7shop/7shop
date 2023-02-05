const AdminService = require("../services/admin.service");
const { Admin } = require("../db/index");

class AdminController {
  constructor(adminController) {
    this.adminController = adminController;
  }
  adminService = new AdminService(Admin);

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

  createProduct = async (req, res) => {
    try {
      const {
        name,
        price,
        stock,
        img_path,
        description,
        admin_id,
        category_Id,
      } = req.body;

      const a = await this.adminService.createProduct(
        name,
        price,
        stock,
        img_path,
        description,
        admin_id,
        category_Id
      );

      return res.json({ "msg": "생성완료", a });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = AdminController;
