$(document).ready(function () {
    getUserCart();
    getAddress()
});

function getUserCart() {
    axios
        .get(`/users/products`)
        .then((response) => {
            let total_price = 0
            for (let i = 0; i < response.data.productName.length; i++) {
                const product = response.data.productName[i]
                const productImageUrl = response.data.productName[i].Product.img_path
                const productId = response.data.productName[i].Product.id
                const count = response.data.productName[i].count
                total_price += response.data.productName[i].Product.price

                let temp_html = `
                <input type="hidden" id="total_price" value="${total_price}"/>
                    <div class="Cart-Items">
                    <div class="image-box">
                    <h3>${productId}</h3>
                        <img src="/uploads/${productImageUrl}" style="width: 150px"/>
                    </div>
                    <div class="about">
                        <h1 class="productName">${product.Product.name}</h1>
                    </div>
                    <div class="col-auto">
                        <ul class="list-inline pb-3">
                        <li class="list-inline-item text-right">
                        수량:
                        </li>
                        <input type="number" class="list-inline-item" min="1" value="${count}" style="width:50px"></input>
                        </ul>
                    </div>
                    </div>
                    </div>
                `

                $('#container').append(temp_html);
            }
        }).catch((err) => {
            console.log(err)
        })
}
//  iamport 
function requestPay() {
    const amount = parseInt(document.getElementById('total_price').value);
    console.log('amount', typeof amount)

    const IMP = window.IMP; // 생략 가능
    IMP.init('imp86085022'); // Example: imp00000000
    IMP.request_pay(
        {
            // param
            pg: 'kakaopay',
            pay_method: 'card',
            name: '인프런 수강권',
            amount: amount,
            buyer_email: 'gildong@gmail.com',
            buyer_name: '홍길동',
            buyer_tel: '010-4242-4242',
            buyer_addr: '서울특별시 강남구 신사동',
            buyer_postcode: '12345',
        },
        async function (rsp) {
            if (rsp.success) {
                // 결제 성공 시 로직,
                const address = $("#productCategory option:checked").text()
                axios
                    .post(
                        'http://localhost:3000/users/payment',
                        {
                            impUid: rsp.imp_uid,
                            amount,
                            addressName: address
                        },
                        'post',
                        { 'Content-Type': 'application/json' }
                    )
                    .then((data) => {
                        console.log(data);
                        alert('결제에 성공했습니다!!');
                    })
                    .catch((error) => {
                        console.log(error);
                        alert('에러발생!');
                    });
            } else {
                // 결제 실패 시 로직,
                alert(`결제에 실패했습니다!! 에러 내용: ${rsp.error_msg}`);
            }
        }
    );
}

function getAddress() {
    axios
        .get('/users/address')
        .then((res) => {
            let rows = res.data.address
            for (i in rows) {
                let address = rows[i].addressName
                let address_html = `
                <option value="1">${address}</option>
                    `
                $('#productCategory').append(address_html)
            }
        })
        .catch((error) => {
            console.log('error', error)
        })
}