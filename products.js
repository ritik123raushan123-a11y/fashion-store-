function createImage(category, productId) {

  const imageSets = {
    Women: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
    ],

    Sarees: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb"
    ],

    Men: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      "https://images.unsplash.com/photo-1488161628813-04466f872be2"
    ],

    Boys: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b",
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea"
    ],

    Shoes: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772"
    ]
  };

  const list = imageSets[category] || imageSets.Women;

  const index = Math.abs(Number(productId) || 0) % list.length;

  return list[index] + "?auto=format&fit=crop&w=700&q=80";
}
