const AdminRepository = require("../repositories/admin.repository");
const { Admin, Users, Products } = require("../db/index");

class AdminService {
  constructor(adminService) {
    this.adminService = adminService;
  }
  adminRepository = new AdminRepository(Admin);
  userRepository = new AdminRepository(Users);
  productRepository = new AdminRepository(Products);

  deleteUser = async (userId) => {
    try {
      // delete 로직
      const deleteUser = await this.userRepository.deleteUser(userId);
      return deleteUser;
    } catch (error) {
      console.log(error);
    }
  };

  updateProduct = async (
    productId,
    name,
    price,
    stock,
    img_path,
    description
  ) => {
    try {
      // 상품 수정
      const updateProduct = await this.productRepository.updateProduct(
        productId,
        name,
        price,
        stock,
        img_path,
        description
      );
      return updateProduct;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (productId) => {
    try {
      // 상품 삭제
      const deleteProduct = await this.productRepository.deleteProduct(
        productId
      );
      return deleteProduct;
    } catch (error) {
      console.log(error);
    }
  };

  createProduct = async (
    name,
    price,
    stock,
    img_path,
    description,
    admin_id,
    category_Id
  ) => {
    try {
      const response = await this.productRepository.createProduct(
        name,
        price,
        stock,
        img_path,
        description,
        admin_id,
        category_Id
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = AdminService;
