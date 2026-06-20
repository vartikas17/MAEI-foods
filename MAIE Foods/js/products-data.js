/* MAIE FOODS — Product catalog */
const MAIE_PRODUCTS = [
  {
    id: 'penne',
    name: 'Penne Pasta',
    category: 'classic',
    price: 120,
    unit: '500g pack',
    image: 'assets/images/pasta/penne.jpg',
    page: 'product-penne.html',
    tag: 'Classic',
    desc: 'Tube-shaped pasta that holds sauces perfectly in every groove.'
  },
  {
    id: 'lasagna',
    name: 'Lasagna',
    category: 'classic',
    price: 150,
    unit: '500g pack',
    image: 'assets/images/pasta/lasagna.jpg',
    page: 'product-lasagna.html',
    tag: 'Classic',
    desc: 'Perfectly crafted layers for rich, flavorful baked dishes.'
  },
  {
    id: 'macaroni',
    name: 'Macaroni Pasta',
    category: 'classic',
    price: 110,
    unit: '500g pack',
    image: 'assets/images/pasta/macaroni.jpg',
    page: 'product-macaroni.html',
    tag: 'Classic',
    desc: 'Small curved tubes — the star of mac & cheese and hearty bakes.'
  },
  {
    id: 'farfalle',
    name: 'Farfalle',
    category: 'classic',
    price: 130,
    unit: '500g pack',
    image: 'assets/images/pasta/farfalle.jpg',
    page: 'product-farfalle.html',
    tag: 'Classic',
    desc: 'Elegant bow-tie shape for light salads and creamy primavera.'
  },
  {
    id: 'vermicelli',
    name: 'Vermicelli',
    category: 'classic',
    price: 95,
    unit: '400g pack',
    image: 'assets/images/pasta/vermicelli.png',
    page: 'product-vermicelli.html',
    tag: 'Classic',
    desc: 'Light, versatile strands — quick to cook for sweet or savoury dishes.'
  },
  {
    id: 'beetroot',
    name: 'Beetroot Pasta',
    category: 'nutritious',
    price: 175,
    unit: '500g pack',
    image: 'assets/images/pasta/beetroot.jpg',
    page: 'product-beetroot.html',
    tag: 'Nutritious',
    desc: 'Naturally coloured with beetroot — rich in iron and antioxidants.'
  },
  {
    id: 'millet',
    name: 'Multi Millet Pasta',
    category: 'nutritious',
    price: 185,
    unit: '500g pack',
    image: 'assets/images/pasta/millet.jpg',
    page: 'product-millet.html',
    tag: 'Nutritious',
    desc: 'Blended with multi millet grains for fiber-rich, wholesome meals.'
  },
  {
    id: 'spinach',
    name: 'Spinach Pasta',
    category: 'nutritious',
    price: 170,
    unit: '500g pack',
    image: 'assets/images/pasta/spinach.jpg',
    page: 'product-spinach.html',
    tag: 'Nutritious',
    desc: 'Infused with spinach for vitamins, minerals, and vibrant green colour.'
  }
];

function getProductById(id) {
  return MAIE_PRODUCTS.find(p => p.id === id);
}

function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}
