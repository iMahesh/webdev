var faker=require("faker");

var randomName,randomPrice;
// ==================
// Welcome to My Shop
// ==================
console.log("+==================+");
console.log("|Welcome to My Shop|");
console.log("+==================+");
for (var i = 0; i < 10; i++) {
    randomName = faker.commerce.productName();
    randomPrice=faker.commerce.price();
    console.log(randomName+" - $"+randomPrice);
}
