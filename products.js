function createImage(category, productId) {

  const imageQueries = {
    Women: "women,fashion,dress",
    Sarees: "saree,indian,woman",
    Men: "men,fashion,clothing",
    Boys: "boys,fashion,clothing",
    Shoes: "shoes,footwear,sneakers"
  };

  const query = imageQueries[category] || "fashion";

  return `https://loremflickr.com/700/800/${encodeURIComponent(query)}?lock=${productId}`;
}
  const query = imageQueries[category] || "fashion";

  return `https://loremflickr.com/700/800/${encodeURIComponent(query)}?lock=${productId}`;
}
 
