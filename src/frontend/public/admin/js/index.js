$(document).ready(function () {
	showUserInfo();
	deleteUser();
});

// 회원 목록
function showUserInfo() {
	axios.get('/admin/userInfo')
		.then(( res ) => {
			const rows = res.data.userInfo;
			console.log("res.data.userInfo", res.data.userInfo);
			for ( let i = 0; i < rows.length; i++ ) {
				const no = rows[i].no;
				const name = rows[i].name;
				const email = rows[i].email;
				const phone = rows[i].phone;
				const createdAt = rows[i].createdAt;

				let temp_html = `
         <tr>
            <th scope="row"><input type="checkbox" /></th>
            <td class="tm-product-name" id="userId">${ no }</td>
            <td>${ name }</td>
            <td>${ email }</td>
            <td>${ phone }</td>
            <td>${ createdAt }</td>
            <td>
              <a href="#" class="tm-product-delete-link" onclick="deleteUser()">
                <i class="far fa-trash-alt tm-product-delete-icon"></i>
              </a>
            </td>
          </tr>
        `;
				$('#userlist').append(temp_html);
			}
		})
		.catch(( err ) => {
			console.error(err);
		});
}

// 회원 삭제
function deleteUser() {
	const no = document.getElementById('userId').innerText;
	console.log('no',no);
	axios.post(`/admin/users/${ no }`)
		.then(res => {
			console.log(res);
			alert(res.data.message);
		})
		.catch(err => {
			console.error(err);
			alert(err.response.data.errorMessage);
		});
}

