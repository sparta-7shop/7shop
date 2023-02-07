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
            const product = res.data.productList[0]

            let product_html = `
            
            `

        })
        .catch((error) => {
            console.log(error);
        })
}