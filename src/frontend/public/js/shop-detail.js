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
                                <div class="updown">
                                    <input type="text" name="p_num1" id="p_num1" size="2" maxlength="4" class="p_num" value="1">
                                    <span><i class="fas fa-arrow-alt-circle-up up"></i></span>
                                    <span><i class="fas fa-arrow-alt-circle-down down"></i></span>
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
function addCart() {
    const count = document.getElementById('p_num1').value
    axios
        .post(`/users/cart`,
            { prodId: productId, count: count })
        .then((res) => {
            alert(res.data.message)
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
            alert(error.response.data.errorMessage)
        })
}