$(document).ready(function () {
    showProduct();
});

function showProduct() {
    axios.
        get('/products/list')
        .then((res) => {
            console.log(res.data.productList[0]);
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
            $('.container1').append(temp_html1);
            $('.container2').append(temp_html2);
            $('.container3').append(temp_html3);
        })
        .catch((error) => {
            console.log(error);
        })
}