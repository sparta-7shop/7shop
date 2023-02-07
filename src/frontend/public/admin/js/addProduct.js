$(document).ready(function () {
	createProduct()
});



function createProduct() {
	const productImage = document.getElementById('productImage');
	console.log(productImage);
	const productName = document.getElementById('productName').value;
	const productPrice = document.getElementById('productPrice').value;
	const productStock = document.getElementById('productStock').value;
	const productDesc = document.getElementById('productDesc').value;
	const productCategory = document.getElementById('productCategory').value;

	const formData = new FormData();
	console.log('formData', formData);
	formData.append('productImage', productImage.files[0]);
	formData.append('name', productName);
	formData.append('price', productPrice);
	formData.append('stock', productStock);
	formData.append('description', productDesc);
	formData.append('category', productCategory);

	axios
		.post('/admin/product', formData, {
			headers : (
				'Content-Type: multipart/form-data'
			),
		})
		.then(( res ) => {
			alert(res.data.message);
		})
		.catch(( error ) => {
			console.error(error);
			alert(error.response.data.errorMessage);
		});
}