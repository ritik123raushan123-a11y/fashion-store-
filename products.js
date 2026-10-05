const imageQueries = {
  Women: "women,fashion,dress",
  Sarees: "saree,indian,woman",
  Men: "men,fashion,clothing",
  Boys: "boys,fashion,clothing",
  Shoes: "shoes,footwear,sneakers"
};

const womenTypes = [
  "Tops", "Dresses", "Jeans", "Co-ord Sets", "T-Shirts",
  "Kurtis", "Jackets", "Hoodies", "Shorts", "Ethnic Wear",
  "Bodycon Dresses", "Floral Dresses", "Party Wear", "Blazers"
];

const sareeTypes = [
  "Banarasi Silk Saree", "Kanjivaram Silk Saree",
  "Chanderi Silk Saree", "Chiffon Saree", "Georgette Saree",
  "Organza Saree", "Cotton Saree", "Linen Saree",
  "Designer Saree", "Wedding Saree", "Printed Saree"
];

const menTypes = [
  "Shirts", "T-Shirts", "Jeans", "Hoodies", "Jackets",
  "Polo Shirts", "Cargo Pants", "Shorts", "Sweatshirts",
  "Kurtas", "Blazers", "Chinos", "Joggers", "Track Pants"
];

const boysTypes = [
  "T-Shirts", "Shirts", "Jeans", "Shorts", "Hoodies",
  "Joggers", "Jackets", "Ethnic Wear", "Cargo Pants",
  "Sweatshirts", "School Shirts"
];

const shoeTypes = [
  "Sneakers", "Sandals", "Slippers", "Sports Shoes",
  "Casual Shoes", "Heels", "Flats", "Loafers",
  "Running Shoes", "Boots", "Mules", "Wedges", "Slides"
];

const colors = [
  "Pink", "Black", "Blue", "Green", "White",
  "Purple", "Beige", "Red", "Maroon", "Yellow",
  "Teal", "Ivory"
];

let products = [];
let id = 1;

function createImage(category, productId) {
  const query = imageQueries[category] || "fashion";
  
  return `https://loremflickr.com/700/800/${query}?lock=${productId}`;
}

function addBatch(category, types, count, label, baseExtra = 0) {

  for (let i = 0; i < count; i++) {

    const type = types[i % types.length];

    const price = 399 + ((i * 137 + baseExtra) % 2600);

    const oldPrice = Math.round(price * 2);

    const discount = Math.round(
      ((oldPrice - price) / oldPrice) * 100
    );

    const rating = (4 + ((i % 10) / 10)).toFixed(1);

    const reviews = 50 + ((i * 17) % 950);

    const sizeList = ["S", "M", "L", "XL"];

    const size = sizeList[i % sizeList.length];

    const color = colors[i % colors.length];

    products.push({
      id: id,

      name: `${label} ${type} ${String(i + 1).padStart(5, "0")}`,

      category: category,

      type: type,

      price: price,

      oldPrice: oldPrice,

      discount: discount,

      rating: Number(rating),

      reviews: reviews,

      size: size,

      color: color,

      image: createImage(category, id)
    });

    id++;
  }
}


/* ================================
   10,000+ PRODUCTS
================================ */

addBatch(
  "Women",
  womenTypes,
  3000,
  "Women Style",
  100
);

addBatch(
  "Sarees",
  sareeTypes,
  2000,
  "Saree Collection",
  250
);

addBatch(
  "Men",
  menTypes,
  2500,
  "Men Style",
  150
);

addBatch(
  "Boys",
  boysTypes,
  1500,
  "Boys Style",
  200
);

addBatch(
  "Shoes",
  shoeTypes,
  1500,
  "Shoe Collection",
  400
);


/* Total = 10,500 products */


/* Make products available to app.js */

window.seedProducts = products;

console.log(
  "Total products loaded:",
  products.length
);
