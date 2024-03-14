$(document).ready(function(){
    menu.events.init();
    menu.methods.getMenu();
    menu.methods.setActiveFilter();
});

let menu = {};
let filterMenu = "burgers";

menu.events = {
    init:() =>{
        menu.methods.getMenu();
    }
}
menu.methods = {
    getMenu:() =>{
        let filter = MENU[filterMenu];

        $("#items-menu").empty();
        $.each(filter, (i, e)=>{
            let template = menu.templates.item(e.img, e.name, e.price);
            $("#items-menu").append(template);
        });
    },
    changeFilterMenu: (filter)=> {
        filterMenu = filter;
        menu.methods.getMenu();
    },
    setActiveFilter: ()=>{
        $(".container-menu a.btn-white").on( "click", function() {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
        });
    }
}
menu.templates = {
    item : (imgPath, name, price) => `
    <div class="col-lg-3">
        <div class="card card-item">
            <div class="img-produto">
                <img src="${imgPath}"
                    alt="${name}">
            </div>
            <p class="title-product text-center mt-3"><b>${name}</b></p>
            <p class="price-product text-center mt-4"><b>R$ ${price.toString().replace('.',',')}</b></p>
            <div class="add-cart">
                <span class="btn-sub"><i class="fas fa-minus"></i></span>
                <span class="number-items">0</span>
                <span class="btn-add"><i class="fas fa-plus"></i></span>
                <span class="btn btn-add-cart"><i class="fas fa-shopping-bag"></i></span>
            </div>
        </div>
    </div>
    `
}