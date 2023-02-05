const { create } = require("domain");

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
    const createProduct = await this.adminModel.create({
      name,
      price,
      stock,
      img_path,
      description,
      admin_id,
      category_Id,
    });
    console.log("createProduct", createProduct);
    return createProduct;
  };
}
module.exports = AdminRepository;
