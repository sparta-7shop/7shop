$(document).ready(function () {
    getUserCart();
});


function getUserCart() {
    axios
        .get(`/users/products`)
        .then((response) => {
            for (let i = 0; i < response.data.productName.length; i++) {
                const product = response.data.productName[i]
                const productImageUrl = response.data.productName[i].Product.img_path
                const count = response.data.productName[i].count

                let temp_html = `
                    <div class="Cart-Items">
                    <div class="image-box">
                        <img src="/uploads/${productImageUrl}" style="width: 150px"/>
                    </div>
                    <div class="about">
                        <h1 class="productName">${product.Product.name}</h1>
                        <h3 class="count"></h3>
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
