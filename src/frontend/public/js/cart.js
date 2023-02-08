$(document).ready(function () {
    getUserCart();
    getAddress()
    getUserInfo()
});

function getUserCart() {
    axios
        .get(`/users/products`)
        .then((response) => {
            console.log('response', response)

            let total_price = 0
            for (let i = 0; i < response.data.productName.length; i++) {
                const product = response.data.productName[i]
                const productImageUrl = response.data.productName[i].Product.img_path
                const productId = response.data.productName[i].id
                const count = response.data.productName[i].count
                const price = response.data.productName[i].Product.price
                total_price += response.data.productName[i].Product.price

                let temp_html = `
                <input type="hidden" id="totalPrice" value="${total_price}"/>
                    <div class="Cart-Items">
                    <div>${productId}</div>
                    <div class="image-box">
                        <img src="/uploads/${productImageUrl}" style="width: 150px"/>
                    </div>
                    <div class="about">
                        <h1 class="productName">${product.Product.name}</h1>
                    </div>
                    <div class="about">
                        <h1 class="price">${price}원</h1>
                    </div>
                    <div class="col-auto">
                        <ul class="list-inline pb-3">
                        <li class="list-inline-item text-right">
                        수량:
                        </li>
                        <input type="number" class="list-inline-item" min="1" value="${count}" style="width:50px"></input>
                        </ul>
                    </div>
                    <a class="tm-product-delete-link" onclick="deleteCart(${productId})">
    <i class="far fa-trash-alt tm-product-delete-icon"></i>
</a>
                    </div>
                    </div>
                `

                $('#container').append(temp_html);
            }
            $('#price').append(`
            <p>총 결제 금액:${total_price}원</p>
            <input type="hidden" id="amount" value=${total_price}>
            `)
        }).catch((err) => {
            console.log(err)
        })
}
//  iamport 
function requestPay() {
    const amount = parseInt(document.getElementById('amount').value);

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
                        alert('결제에 성공했습니다!!');
                        window.location.href = "/"
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

function getUserInfo() {
    axios
        .get('/admin/user')
        .then((res) => {
            console.log('res', res)
            const name = res.data.name
            const email = res.data.email
            const phone = res.data.phone


            let user_info = `
            <section>
                <h2>구매자 정보</h2>
                <p>이름:${name}</p>
                <p>이메일:${email}</p>
                <p>휴대폰 번호:${phone}</p>
            </section>
            `
            $('#userInfo').append(user_info)

        })
        .catch((error) => {
            console.log('error', error)
        })
}
function deleteCart(productId) {
    axios
        .post(`/users/cart/${productId}`)
        .then((res) => {
            console.log('res', res)
            alert('삭제완료')
        })
        .catch((error) => {
            console.log('error', error)
        })

}