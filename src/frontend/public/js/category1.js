$(document).ready(function () {
    showProduct();
});

function showProduct() {
    axios.
        get('/products/list/1')
        .then((res) => {
            /* ------------------shop 페이지 ------------------ */
            let rows = res.data.productList
            console.log(rows);
            for (i in rows) {
                let name = rows[i].name
                let price = rows[i].price
                let stock = rows[i].stock
                let image = rows[i].img_path
                let desc = rows[i].description
                let productId = rows[i].id
                let product = `
                <div class="col-md-4" id="paginate">
                <div class="card mb-4 product-wap rounded-0" >
                <div class="card rounded-0" >
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
            createPaginate()
        })
        .catch((error) => {
            console.log(error);
        })
}
