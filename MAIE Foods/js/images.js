/* MAIE FOODS — Local product & recipe images */
const MAIE_IMAGES = {
  hero: 'assets/images/pasta/hero-main.jpg',
  homeWhy: 'assets/images/pasta/all-pasta-3.jpg',
  aboutHero: 'assets/images/pasta/all-pasta-2.jpg',
  aboutStory: 'assets/images/pasta/all-pasta-3.jpg',
  ctaBanner: 'assets/images/pasta/all-pasta-2.jpg',
  productsHero: 'assets/images/pasta/all-pasta-3.jpg',
  contactHero: 'assets/images/pasta/all-pasta-2.jpg',
  recipesHero: 'assets/images/pasta/recipe-burrata.jpg',
  products: {
    penne: 'assets/images/pasta/penne.jpg',
    lasagna: 'assets/images/pasta/lasagna.jpg',
    macaroni: 'assets/images/pasta/macaroni.jpg',
    farfalle: 'assets/images/pasta/farfalle.jpg',
    vermicelli: 'assets/images/pasta/vermicelli.png',
    beetroot: 'assets/images/pasta/beetroot.jpg',
    millet: 'assets/images/pasta/millet.jpg',
    spinach: 'assets/images/pasta/spinach.jpg'
  },
  recipes: {
    spaghetti: 'assets/images/pasta/recipe-spaghetti.jpg',
    burrata: 'assets/images/pasta/recipe-burrata.jpg',
    fusilli: 'assets/images/pasta/recipe-fusilli.jpg',
    penne: 'assets/images/pasta/recipe-penne.jpg',
    macaroni: 'assets/images/pasta/recipe-macaroni.jpg',
    lasagna: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=1400&q=90&auto=format&fit=crop'
  }
};

function imgUrl(key) {
  const parts = key.split('.');
  let val = MAIE_IMAGES;
  for (const p of parts) val = val?.[p];
  return val || '';
}
