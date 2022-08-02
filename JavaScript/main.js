
const products = [
	{
		id: 0,
		name: 'Naike Air',
		price: 250,
		discription: 'White',
		imgSrc: '../img/n1.jpg',
	},
	{
		id: 1,
		name: 'Air Force 1 ',
		price: 120,
		discription: 'white',
		imgSrc: '../img/n2.jpg',
	},

	{
		id: 2,
		name: 'Nike Zoom',
		price: 79,
		discription: 'Gray',
		imgSrc: '../img/n3.jpg',
	},
	{
		id: 3,
		name: 'Nike air',
		price: 180,
		discription: ' yellow ',
		imgSrc: '../img/n4.jpg',
	},
	{
		id: 4,
		name: 'Air Max',
		price: 150,
		discription: 'Beige',
		imgSrc: '../img/n5.jpg',
	},
	{
		id: 5,
		name: 'Nike air',
		price: 98,
		discription: 'bleu',
		imgSrc: '../img/n6.jpg',
	},
];

const productsEl = document.querySelector('.products');
const itemsEl = document.querySelector('.cart-items');
const subTotalEl = document.querySelector('.subtotal');




function renderProducts() {

	products.forEach((product) => {
		productsEl.innerHTML += `
			<div class="item">
					<div class="item-container">
                        <div class="card" style="width: 17rem; ">
						<img src="${product.imgSrc}"  style="height:180px;" class="card-img-top" alt="img of product">
						<div class="card-body">
                            <h5 class="card-title">${product.name} DT ${product.price}</h5>
                        <p class="card-text"> ${product.discription} </p>
                            </div></div>
						<div class="add-to-cart" >
						<img  src="../icons/heart.png" alt="add " class="heart"/>
						</div>
						<div class="add-to-wishlist" onclick="addToCard(${product.id})"  >
						<img  src="../icons/bag-plus.png" alt="add to wish list" />
						</div>
					</div>
				</div>`;
	});
}
renderProducts();

var hearts = document.querySelectorAll('.heart');
for (let i = 0; i < hearts.length; i++) {
	const heart = hearts[i];
	heart.addEventListener('click', (e) => {
		e.target.classList.toggle('red');
	});
}

let cart = [];


function addToCard(id) {
	
	if (cart.some((item) => item.id === id)) {
		changeNumberOfUnits('plus', id);
	} else {
		const item = products.find((product) => product.id === id);
		cart.push({
			...item,
			numberOfUnits: 1,
		});
	}
	updateCart();
}


function updateCart() {
	renderCartItems();
	renderSubtotal();
}


function renderSubtotal() {
	let totalPrice = 0,
		totalItems = 0;

	cart.forEach((item) => {
		totalPrice += item.price * item.numberOfUnits;
		totalItems += item.numberOfUnits;
	});

	subTotalEl.innerHTML = `Price (${totalItems} items): $${totalPrice.toFixed(
		2
	)}`;
}


function renderCartItems() {
	itemsEl.innerHTML = ''; 
	cart.forEach((item) => {
		itemsEl.innerHTML += `
		<div class="cart-item">
			<div class="item-info"  onclick="removeItemFromCart(${item.id})">
				<img src="${item.imgSrc}" alt="${item.name}" />
				<h6>${item.name}</h6>
			</div>
			<div class="unit-price"><small>$</small>${item.price}</div>
			<div class="units">
				<div class="btn minus" onclick="changeNumberOfUnits('minus',${item.id})">-</div>
				<div class="number">${item.numberOfUnits}</div>
				<div class="btn plus" onclick="changeNumberOfUnits('plus',${item.id})">+</div>
			</div>
		</div>`;
	});
}


function removeItemFromCart(id) {
	cart = cart.filter((item) => item.id !== id);

	updateCart();
}


function changeNumberOfUnits(action, id) {
	cart = cart.map((item) => {
		let numberOfUnits = item.numberOfUnits;

		if (item.id === id) {
			if (action === 'minus' && numberOfUnits > 1) {
				numberOfUnits--;
			} else if (action === 'plus' && numberOfUnits < 5) {
				numberOfUnits++;
			}
		}

		return {
			...item,
			numberOfUnits,
		};
	});
	updateCart();
}