const AdminRepository = require("../repositories/admin.repository");
const { Admin, Users, Products, Orders } = require("../db/index");

class AdminService {
  constructor(adminService) {
    this.adminService = adminService;
  }
  adminRepository = new AdminRepository(Admin);
  userRepository = new AdminRepository(Users);
  productRepository = new AdminRepository(Products);
  ordersRepository = new AdminRepository(Orders)

  /**
    * 회원삭제(service)
    */
  deleteUser = async (userId) => {
    try {
      const existUser = await this.userRepository.findUser(userId)
      if (existUser?.destroyTime) {
        return { code: 412, errorMessage: '이미 삭제한 회원입니다.' }
      }
      if (existUser === null) {
        return { code: 412, errorMessage: '존재하지 않는 회원입니다.' }
      }
      const deleteUser = await this.userRepository.deleteUser(userId);
      return deleteUser;
    } catch (error) {
      return { errorMessage: error }
    }
  };

  /**
    * 상품수정(service)
    */
  updateProduct = async ({ productId, name, price, stock, productImage, description }) => {
    try {
      /*-----존재하는 상품인지 확인-----*/
      const product = await this.productRepository.findProduct({ productId })
      if (product?.destroyTime) {
        return { code: 412, errorMessage: '이미 삭제된 상품입니다.' }
      }
      if (product === null) {
        return { code: 412, errorMessage: '존재하지 않는 상품입니다.' }
      }

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
      const updateProduct = await this.productRepository.updateProduct({
        productId,
        name,
        price,
        stock,
        productImage,
        description
      });
      return updateProduct;
    } catch (error) {
      return { errorMessage: error }
    }
  };

  /**
    * 상품삭제(service)
    */
  deleteProduct = async (productId) => {
    try {
      const product = await this.productRepository.findProduct({ productId })
      if (product?.destroyTime) {
        return { code: 412, errorMessage: '이미 삭제된 상품입니다.' }
      }
      if (product === null) {
        return { code: 412, errorMessage: '존재하지 않는 상품입니다.' }
      }

      const deleteProduct = await this.productRepository.deleteProduct({ productId });
      return deleteProduct;
    } catch (error) {
      return { errorMessage: error }
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

  // 유저 목록
  userInfo = async () => {
    const userInfo = await this.userRepository.userInfo();

    userInfo.sort((a, b) => {
      return b.id - a.id
    })

    return userInfo.map(info => {
      return {
        no: info.id,
        name: info.name,
        email: info.email,
        phone: info.phone,
        createdAt: info.createdAt.toLocaleString()
      }
    })
  }

  userOrder = async () => {
    const userOrder = await this.ordersRepository.userOrder();

    userOrder.sort((a, b) => {
      return b.id - a.id
    })

    return userOrder.map((order) => {
      return {
        ...order,
        createdAt: order.createdAt.toLocaleString(),

      }
    })
    return userOrder
    userById = async (id) => {
      try {
        return await this.userRepository.userById(id)
      } catch (error) {
        console.log(error)
      }
    }

  }
}

module.exports = AdminService;
