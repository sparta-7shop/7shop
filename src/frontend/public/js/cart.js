$(document).ready(function () {
  getUserCart();
  getCartProduct();
});
function getCartProduct() {
  axios
    .get(`/users/cart/`)
    .then((response) => {
      // console.log("ㅇㅁㄴㅇㅁ",response.data.callCartProductName)
    })
}


function getUserCart() {
  axios
    .get(`/users/products/`)
    .then((response) => {
       console.log("야호", response.data.productName);
      // console.log("키키", response.data.productName[0].count)
      for (let i = 0; i < response.data.productName.length; i++) {
        const productNumber = response.data.productName[i].id
        const product = response.data.productName[i]
        // console.log("아이",i)
        const productImageUrl = response.data.productName[i].Product.img_path

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
            <input type="number" class="list-inline-item" min="1" value="1" style="width:50px"></input>
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

function minus(productNumber) {
  let val = $('#var-value').html();
  val = val == '1' ? val : val - 1;
  $('#var-value').html(val);
  $(`#product-quanity`).val(val);
  return false;
}
function plus(productNumber) {
  let val = $('#var-value').html();
  val++;
  $('#var-value').html(val);
  $(`#product-quanity`).val(val);
  return false;
}
