$(document).ready(function () {
	showOrderInfo();
});

function showOrderInfo() {
	axios.get('/admin/userOrder')
		.then(( res ) => {
			const rows = res.data.userOrder;
			for ( let i = 0; i < rows.length; i++ ) {
				const id = rows[i].id;
				const status_num = rows[i].status;
				const address = rows[i].address;
				const phone = rows[i]["User.phone"];
				const createAd = rows[i].createdAt.toLocaleString()
				const name = rows[i]["User.name"];
				const total_price_num = rows[i]["Payment.total_price"];

				const status = status_num === 1 ? "구매완료" : "구매대기";
				const total_price = total_price_num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

				let temp_html = `
				 <tr>
              <th scope="row"><b>${ id }</b></th>
              <td>
                  <div class="tm-status-circle moving">
                  </div>${ status }
              </td>
              <td><b>${ name }</b></td>
              <td><b>${ address }</b></td>
              <td><b></b>${ phone }</td>
              <td>${ total_price } 원</td>
              <td>${ createAd }</td>
          </tr>
				`;
				$('#productlist').append(temp_html);
			}
		})
		.catch(( err ) => {
			console.error(err);
		});
}