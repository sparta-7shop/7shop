const { Users, Payments } = require('../db');

class AdminRepository {
	constructor( adminModel ) {
		this.adminModel = adminModel;
	}

	/**
	 * 회원찾기(repository)
	 */
	findUser = async ( userId ) => {
		try {
			const existUser = await this.adminModel.findOne({
				where : { id : userId },
				paranoid : false
			});
			return existUser;
		} catch ( error ) {
			return { errorMessage : error };
		}
	};
	/**
	 * 회원삭제(repository)
	 */
	deleteUser = async ( userId ) => {
		try {
			const deleteUser = await this.adminModel.destroy({
				where : { id : userId },
			});
			return deleteUser;
		} catch ( error ) {
			return { errorMessage : error };
		}
	};
	/**
	 * 상품수정(repository)
	 */
	updateProduct = async ( { productId, name, price, stock, productImage, description } ) => {
		try {
			const updateProduct = await this.adminModel.update(
				{
					name : name,
					price : price,
					stock : stock,
					description : description,
					img_path : productImage,
				},
				{
					where : { id : productId },
				}
			);
			return updateProduct;
		} catch ( error ) {
			return { errorMessage : error };
		}
	};
	/**
	 * 상품삭제(repository)
	 */
	deleteProduct = async ( { productId } ) => {
		try {
			const deleteProduct = await this.adminModel.destroy({
				where : { id : productId },
			});
			return deleteProduct;
		} catch ( error ) {
			return { errorMessage : error };
		}
	};
	/**
	 * 상품등록(repository)
	 */
	createProduct = async ( { name, price, stock, description, productImage, adminId, categoryId } ) => {
		try {
			const product = await this.adminModel.create(
				{ name, price, stock, description, img_path : productImage, admin_id : adminId, category_Id : categoryId });
			return product;
		} catch ( error ) {
			return { errorMessage : error };
		}
	};
	/**
	 * 상품등록(repository)
	 */
	createProduct = async ( { name, price, stock, description, productImage, adminId, categoryId } ) => {
		try {
			const product = await this.adminModel.create(
				{ name, price, stock, description, img_path : productImage, admin_id : adminId, category_Id : categoryId });
			return product;
		} catch ( error ) {
			return { errorMessage : error };
		}
	};

	/**
	 * 상품 찾아오기(repository)
	 */
	findProduct = async ( { productId } ) => {
		try {
			const existProduct = await this.adminModel.findOne({
				where : { id : productId },
				paranoid : false
			});
			return existProduct;
		} catch ( error ) {
			return { errorMessage : error };
		}
	};

	// 유저 목록
	userInfo = async () => {
		return await this.adminModel.findAll();
	};

	// 오더 정보 가져오기
	userOrder = async () => {
		const getUserOrder = await this.adminModel.findAll({
		include: [
      {
         model: Users,
         attributes: ['name', 'phone'],
      },
      {
         model: Payments,
         attributes: ['total_price'],
      },
   ],
				raw:true
		});
		console.log(getUserOrder);
		return getUserOrder
	};
}

module.exports = AdminRepository;





