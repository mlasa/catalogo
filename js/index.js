$(document).ready(function () {
    menu.events.init();
});

const menu = {};
const cart = [];

menu.events = {
    init: () => {
        menu.methods.getMenu();
        menu.methods.setActiveFilter();

        // Associando eventos de clique aos botões de adição e remoção e adicionar ao carrinho
        $("#items-menu").on("click", ".btn-sub", menu.methods.removeCart);
        $("#items-menu").on("click", ".btn-add", menu.methods.addCart);
        $("#items-menu").on("click", ".btn-add-cart", menu.methods.sendToCart);
    }
}
menu.methods = {
    getMenu: function (filterMenu = "burgers", seeMore = false) {
        let filter = MENU[filterMenu];

        if (!seeMore) {
            $("#items-menu").empty();
            $('#seemore').removeClass("hidden");
        }

        $.each(filter, (index, element) => {
            let template = menu.templates.item(element.img, element.name, element.price, element.id);

            if (seeMore || index < 4) {
                $("#items-menu").append(template);
            }
        });
    },
    setActiveFilter: function () {
        $(".container-menu a.btn-white").on("click", function () {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
        });
    },
    seeMore: function () {
        let active = $('.container-menu a.active').attr("id").split('-')[1];
        menu.methods.getMenu(active, true);
        $('#seemore').addClass("hidden");
    },
    removeCart: function () {
        const quantity = $(this).siblings(".number-items");
        let currentQuantity = parseInt(quantity.text()) || 0;
        if (currentQuantity > 0) {
            quantity.text(currentQuantity - 1);
        }
    },
    addCart: function () {
        const quantity = $(this).siblings(".number-items");
        let currentQuantity = parseInt(quantity.text()) || 0;
        quantity.text(currentQuantity + 1);
    },
    sendToCart: function () {
        const id = $(this).closest(".card-item").attr("id");
        const quantity = $(this).siblings(".number-items");
        const currentQuantity = parseInt(quantity.text()) || 0;
        const activeCategory = $(".container-menu a.btn-white.active").attr("id").split('-')[1];

        if (currentQuantity > 0) {
            /*Javascript*/
            //const itemSelected = MENU[activeCategory].find(item => item.id == id);

            /*JQuery */
            const itemSelected = $.grep(MENU[activeCategory], (element, index) => { return element.id == id })[0];
            itemSelected.quantity = currentQuantity;

            //Item já está no carrinho? Se sim, só aumentar a quantidade
            const isAlreadyInCart = cart.find((e, index) => {
                if (e.id == id) {
                    e.indexInArray = index;
                    return e;
                }
            });
            if (isAlreadyInCart) {
                cart[isAlreadyInCart.indexInArray].quantity += 1;
                delete isAlreadyInCart.indexInArray;
            }
            else {
                delete itemSelected.indexInArray;
                cart.push(itemSelected);
            }
            // Zerar items selecionados
            quantity.text(0);
            console.log(cart);
        }
    }
}
menu.templates = {
    item: (imgPath, name, price, id) => `
    <div class="col-lg-3">
        <div class="card card-item" id="${id}">
            <div class="img-produto">
                <img src="${imgPath}"
                    alt="${name}">
            </div>
            <p class="title-product text-center mt-3"><b>${name}</b></p>
            <p class="price-product text-center mt-4"><b>R$ ${price.toFixed(2).toString().replace('.', ',')}</b></p>
            <div class="add-cart">
                <span class="btn-sub"><i class="fas fa-minus"></i></span>
                <span class="number-items" id="number-items-${id}">0</span>
                <span class="btn-add"><i class="fas fa-plus"></i></span>
                <span class="btn btn-add-cart"><i class="fas fa-shopping-bag"></i></span>
            </div>
        </div>
    </div>
    `
}