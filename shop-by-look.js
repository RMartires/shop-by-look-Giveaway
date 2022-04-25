var productMap = ["The-Stool", "Main-Chair", "Emmy-Couch"];
var popoverMap = {};
var lastOpen = null;

function updateProductData() {
    productMap.map((pd, index) => {
        jQuery.getJSON(window.Shopify.routes.root + `products/${productMap[index]}.json`.replace(/%20/g, " "), function (product) {
            let data = product.product;
            productMap[index] = data;
        });
    });
}

setTimeout(function () {
    updateProductData();
}, 1000);

function modal(element, data) {

    if (!popoverMap[`btn${data}`]) {
        popoverMap[`btn${data}`] = new bootstrap.Popover(document.getElementById(`btn${data}`), {
            html: true,
            title: `${productMap[data - 1].handle} <a class="close" href="#");">&times;</a>`,
            content: `<div id="popoverContent" class="hide">
				<img src="${productMap[data - 1].image.src}" alt="${productMap[data - 1].handle}"
					/>
  			  </div>`,
        });
    }

    popoverMap[`btn${data}`].show();

    lastOpen = popoverMap[`btn${data}`];
}

document.onclick = function (e) {
    if ((e.target.id == "shopableImage") || e.target.className == "close") {
        lastOpen.hide();
    }
}

