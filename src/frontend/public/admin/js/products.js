$(document).ready(function () {
	showProducts();
	deleteProducts();
});
require('../../uploads/');

function showProducts() {
	axios.get('/products/list')
		.then(( res ) => {
			const rows = res.data.productList;
			console.log("res.data.productList", rows);
			for ( let i = 0; i < rows.length; i++ ) {
				const no = rows[i].id;
				const name = rows[i].name;
				const price = rows[i].price;
				const stock = rows[i].stock;
				const img_path = rows[i].img_path;
				const description = rows[i].description;
				const createdAt = rows[i].createdAt;



				let temp_html = `
				<tr>
          <th scope="row"><input type="checkbox" /></th>
          <td class="tm-product-name" id="productId">${ no }</td>
          <td>${ name }</td>
          <td><img src="../../uploads/${ img_path }" width="50" height="50"/></td>
          <td>${ price }</td>
          <td>${ stock }</td>
          <td>${ createdAt }</td>
          <td>
            <a href="#" class="tm-product-delete-link" onclick="deleteProducts()">
              <i class="far fa-trash-alt tm-product-delete-icon"></i>
            </a>
          </td>
        </tr>
				`;
				$('#productList').append(temp_html);
			}
		})
		.catch(( err ) => {
			console.error(err);
		});
}

// 상품 삭제
function deleteProducts() {
	const no = document.getElementById('productId').innerText;
	console.log(no);
	axios.post(`/admin/product/${ no }`)
		.then(res => {
			console.log(res);
			alert(res.data.message);
			window.location.reload()
		})
		.catch(err => {
			console.error(err);
			alert(err.response.data.errorMessage);
		});
}
