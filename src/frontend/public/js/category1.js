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
            const paginationNumbers = document.getElementById("pagination-numbers");
            const paginatedList = document.getElementById("paginated-list");
            const listItems = paginatedList.querySelectorAll("#paginate");
            const nextButton = document.getElementById("next-button");
            const prevButton = document.getElementById("prev-button");
            const paginationLimit = 5;
            const pageCount = Math.ceil(listItems.length / paginationLimit);
            let currentPage = 1;

            const disableButton = (button) => {
                button.classList.add("disabled");
                button.setAttribute("disabled", true);
            };

            const enableButton = (button) => {
                button.classList.remove("disabled");
                button.removeAttribute("disabled");
            };

            const handlePageButtonsStatus = () => {
                if (currentPage === 1) {
                    disableButton(prevButton);
                } else {
                    enableButton(prevButton);
                }

                if (pageCount === currentPage) {
                    disableButton(nextButton);
                } else {
                    enableButton(nextButton);
                }
            };

            const handleActivePageNumber = () => {
                document.querySelectorAll(".pagination-number").forEach((button) => {
                    button.classList.remove("active");
                    const pageIndex = Number(button.getAttribute("page-index"));
                    if (pageIndex == currentPage) {
                        button.classList.add("active");
                    }
                });
            };

            const appendPageNumber = (index) => {
                const pageNumber = document.createElement("button");
                pageNumber.className = "pagination-number";
                pageNumber.innerHTML = index;
                pageNumber.setAttribute("page-index", index);
                pageNumber.setAttribute("aria-label", "Page " + index);
                paginationNumbers.appendChild(pageNumber);
            };

            const getPaginationNumbers = () => {
                for (let i = 1; i <= pageCount; i++) {
                    appendPageNumber(i);
                }
            };

            const setCurrentPage = (pageNum) => {
                currentPage = pageNum;

                handleActivePageNumber();
                handlePageButtonsStatus();

                const prevRange = (pageNum - 1) * paginationLimit;
                const currRange = pageNum * paginationLimit;

                listItems.forEach((item, index) => {
                    item.classList.add("hidden");
                    if (index >= prevRange && index < currRange) {
                        item.classList.remove("hidden");
                    }
                });
            };

            window.addEventListener("load", () => {
                getPaginationNumbers();
                setCurrentPage(1);

                prevButton.addEventListener("click", () => {
                    setCurrentPage(currentPage - 1);
                });

                nextButton.addEventListener("click", () => {
                    setCurrentPage(currentPage + 1);
                });

                document.querySelectorAll(".pagination-number").forEach((button) => {
                    const pageIndex = Number(button.getAttribute("page-index"));

                    if (pageIndex) {
                        button.addEventListener("click", () => {
                            setCurrentPage(pageIndex);
                        });
                    }
                });
            });

        })
        .catch((error) => {
            console.log(error);
        })
}
