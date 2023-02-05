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

module.exports = AdminService;
