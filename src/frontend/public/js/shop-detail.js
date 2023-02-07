let query = window.location.search;
let param = new URLSearchParams(query);
let productId = param.get('productId');

$(document).ready(function () {
    showProductDetail(productId);
});

function showProductDetail(productId) {
    axios
        .get(`/product/${productId}`)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
}