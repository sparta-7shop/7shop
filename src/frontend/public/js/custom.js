$(document).ready(function () {
    showProduct();
});

function showProduct() {
    axios.
        get('/products/list')
        .then((res) => {

            /* ------------------index 페이지 ------------------ */
            const product1 = res.data.productList[0]
            const product2 = res.data.productList[1]
            const product3 = res.data.productList[2]
            let temp_html1 = `
                        <div class="row p-5">
                            <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                                <img class="img-fluid" src=".//uploads/${product1.img_path}" alt="" />
                            </div>
                            <div class="col-lg-6 mb-0 d-flex align-items-center">
                                <div class="text-align-left align-self-center">
                                    <h1 class="h1 text-success"><b>7Shop</b> eCommerce</h1>
                                    <h3 class="h2">${product1.name}</h3>
                                    <p>
                                        ${product1.description}
                                    </p>
                                </div>
                            </div>
                        </div>
            `
            let temp_html2 = `
                        <div class="row p-5">
                            <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                                <img class="img-fluid" src=".//uploads/${product2.img_path}" alt="" />
                            </div>
                            <div class="col-lg-6 mb-0 d-flex align-items-center">
                                <div class="text-align-left align-self-center">
                                    <h1 class="h1 text-success"><b>7Shop</b> eCommerce</h1>
                                    <h3 class="h2">${product2.name}</h3>
                                    <p>
                                        ${product2.description}
                                    </p>
                                </div>
                            </div>
                        </div>
            `
            let temp_html3 = `
                        <div class="row p-5">
                            <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                                <img class="img-fluid" src=".//uploads/${product3.img_path}" alt="" />
                            </div>
                            <div class="col-lg-6 mb-0 d-flex align-items-center">
                                <div class="text-align-left align-self-center">
                                    <h1 class="h1 text-success"><b>7Shop</b> eCommerce</h1>
                                    <h3 class="h2">${product3.name}</h3>
                                    <p>
                                        ${product3.description}
                                    </p>
                                </div>
                            </div>
                        </div>
            `
            $('#container1').append(temp_html1);
            $('#container2').append(temp_html2);
            $('#container3').append(temp_html3);
            /* ------------------shop 페이지 ------------------ */
            let rows = res.data.productList
            for (i in rows) {
                let name = rows[i].name
                let price = rows[i].price
                let stock = rows[i].stock
                let image = rows[i].img_path
                let desc = rows[i].description
                let productId = rows[i].id
                let product = `
                <div class="col-md-4">
                <div class="card mb-4 product-wap rounded-0">
                <div class="card rounded-0">
                    <img
                        class="card-img rounded-0 img-fluid"
                        src="/uploads/${image}"
                    />
                    <div
                        class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center"
                    >
                        <ul class="list-unstyled">
                            <li>
                                <a
                                    class="btn btn-success text-white"
                                    href="/product?id=${productId}"
                                    ><i class="far fa-heart"></i
                                ></a>
                            </li>
                            <li>
                                <a
                                    class="btn btn-success text-white mt-2"
                                    href="/product?id=${productId}"
                                    ><i class="far fa-eye"></i
                                ></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="card-body">
                    <a href="/product?id=${productId}" class="h3 text-decoration-none"
                        >${name}</a
                    >
                    <p class="text-center mb-0">${price}원</p>
                </div>
                </div>
                </div>
                `
                $('#product_list').append(product).trigger('create');
            }



        })
        .catch((error) => {
            console.log(error);
        })
}


`
<div class="card mb-4 product-wap rounded-0">
<div class="card rounded-0">
    <img
        class="card-img rounded-0 img-fluid"
        src="/img/shop_01.jpg"
    />
    <div
        class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center"
    >
        <ul class="list-unstyled">
            <li>
                <a
                    class="btn btn-success text-white"
                    href="shop-single.html"
                    ><i class="far fa-heart"></i
                ></a>
            </li>
            <li>
                <a
                    class="btn btn-success text-white mt-2"
                    href="shop-single.html"
                    ><i class="far fa-eye"></i
                ></a>
            </li>
            <li>
                <a
                    class="btn btn-success text-white mt-2"
                    href="shop-single.html"
                    ><i class="fas fa-cart-plus"></i
                ></a>
            </li>
        </ul>
    </div>
</div>
<div class="card-body">
    <a href="shop-single.html" class="h3 text-decoration-none"
        >Oupidatat non</a
    >
    <ul
        class="w-100 list-unstyled d-flex justify-content-between mb-0"
    ></ul>
    <p class="text-center mb-0">$250.00</p>
</div>
</div>
`