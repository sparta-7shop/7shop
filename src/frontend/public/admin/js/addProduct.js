function createProduct() {
	const productImage = document.getElementById('productImage');
	const productName = document.getElementById('productName').value;
	const productPrice = document.getElementById('productPrice').value;
	const productStock = document.getElementById('productStock').value;
	const productDesc = document.getElementById('productDesc').value;
	const productCategory = document.getElementById('productCategory').value;

	console.log(productCategory);

	const formData = new FormData();
	formData.append('productImage', productImage.files[0]);
	formData.append('name', productName);
	formData.append('price', productPrice);
	formData.append('stock', productStock);
	formData.append('description', productDesc);
	formData.append('categoryId', productCategory);

	axios
		.post('/admin/product', formData, {
			headers: (
				'Content-Type: multipart/form-data'
			),
		})
		.then((res) => {
			alert(res.data.message);
		})
		.catch((error) => {
			console.error(error);
			alert(error.response.data.errorMessage);
		});
}