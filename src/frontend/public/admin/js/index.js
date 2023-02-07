
$(document).ready(function ( ) {
	showUserInfo()
})

function showUserInfo () {
	axios.get('/admin/userInfo')
		.then(( res ) => {
			const rows = res.data.userInfo;
			console.log("res.data.userInfo", res.data.userInfo);
			for ( let i = 0; i < rows.length; i++ ) {
				const no = rows[i].no;
				const name = rows[i].name;
				const email = rows[i].email;
				const phone = rows[i].phone;
				const create = rows[i].createdAt;

				let temp_html = `
         <tr>
            <th scope="row"><input type="checkbox" /></th>
            <td class="tm-product-name">${ no }</td>
            <td>${ name }</td>
            <td>${ email }</td>
            <td>${ phone }</td>
            <td>${ create }</td>
            <td>
              <a href="#" class="tm-product-delete-link">
                <i class="far fa-trash-alt tm-product-delete-icon"></i>
              </a>
            </td>
          </tr>
        `
				$('#userlist').append(temp_html);
			}
		})
		.catch(( err ) => {
			console.error(err);
		});
}