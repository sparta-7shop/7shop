class AdminRepository {
  constructor(adminModel) {
    this.adminModel = adminModel;
  }

  deleteUser = async (userId) => {
    try {
      const deleteUser = await this.adminModel.destroy({
        where: { id: userId },
      });
      console.log("deleteUser", deleteUser);
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
      const updateProduct = await this.adminModel.update(
        {
          name: name,
          price: price,
          stock: stock,
          img_path: img_path,
          description: description,
        },
        {
          where: { id: productId },
        }
      );

      console.log("updateProduct", updateProduct);
      return updateProduct;
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (productId) => {
    try {
      const deleteProduct = await this.adminModel.destroy({
        where: { id: productId },
      });
      console.log("deleteProduct", deleteProduct);
      return deleteProduct;
    } catch (error) {
      console.log(error);
    }
    /**
    * 상품등록(repository)
    */
    createProduct = async ({ name, price, stock, description, productImage, adminId, categoryId }) => {
      try {
        const product = await this.adminModel.create(
          { name, price, stock, description, img_path: productImage, admin_id: adminId, category_Id: categoryId })
        return product
      } catch (error) {
        return { errorMessage: error }
      }
    }
  }
  /**
    * 상품등록(repository)
    */
  createProduct = async ({ name, price, stock, description, productImage, adminId, categoryId }) => {
    try {
      const product = await this.adminModel.create(
        { name, price, stock, description, img_path: productImage, admin_id: adminId, category_Id: categoryId })
      return product
    } catch (error) {
      return { errorMessage: error }
    }
  }

}
module.exports = AdminRepository;
