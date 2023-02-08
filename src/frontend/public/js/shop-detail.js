let query = window.location.search;
let param = new URLSearchParams(query);
let productId = param.get('id');

$(document).ready(function () {
    showProductDetail(productId);
});

function showProductDetail(productId) {
    axios
        .get(`/product/${productId}`)
        .then((res) => {
            const product = res.data.product
            // const count = $('input[name=p_num1"]').val()
            let product_html = `
            <div class="container pb-5">
                <div class="row">
                    <div class="col-lg-5 mt-5">
                        <div class="card mb-3">
                            <img
                                class="card-img img-fluid"
                                src="/uploads/${product.img_path}"
                                alt="Card image cap"
                                id="product-detail"
                            />
                        </div>
                        <div class="row"></div>
                    </div>
                    <div class="col-lg-7 mt-5">
                        <div class="card">
                            <div class="card-body">
                                <h1 class="h2">${product.name}</h1>
                                <p class="h3 py-2">$${product.price}</p>

                                <h6>Description : ${product.description}</h6>
                                <p>남은 수량 : ${product.stock}개</p>
                                <div class="num">
                                <div class="col-auto">
                                        <ul class="list-inline pb-3">
                                            <li class="list-inline-item text-right">
                                                Quantity
                                                <input type="hidden" name="product-quanity" id="product-quanity" value="1">
                                            </li>
                                            <li class="list-inline-item"><span class="btn btn-success" id="btn-minus" onclick="minus()">-</span></li>
                                            <li class="list-inline-item"><span class="badge bg-secondary" id="var-value">1</span></li>
                                            <li class="list-inline-item"><span class="btn btn-success" id="btn-plus" onclick="plus()">+</span></li>
                                        </ul>
                                    </div>
                                </div>
                                    <div class="row pb-3">
                                        <div class="col d-grid">
                                            <button
                                                type="submit"
                                                class="btn btn-success btn-lg"
                                                name="submit"
                                                value="addtocard"
                                                onclick="addCart()"
                                            >
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
            $('#product_detail').append(product_html);

        })
        .catch((error) => {
            console.log(error);
        })
}
function minus() {
    let val = $('#var-value').html();
    val = val == '1' ? val : val - 1;
    $('#var-value').html(val);
    $('#product-quanity').val(val);
    return false;
}
function plus() {
    let val = $('#var-value').html();
    val++;
    $('#var-value').html(val);
    $('#product-quanity').val(val);
    return false;
}
function addCart() {
    const count = document.getElementById('product-quanity').value
    axios
        .post(`/users/cart`,
            { prodId: productId, count: count })
        .then((res) => {
            alert(res.data.message)
          window.location.href = "/shop.html"
        })
        .catch((error) => {
            alert(error.response.data.errorMessage)
        })
}