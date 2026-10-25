const a = (file) => `/assets/${file}`;

export const images = {
  fabric: a('0789797b79aa18db81e0faf13321dff7.jpg'),
  necklace: a('male/male-accessories-editorial.jpg'),
  beach: a('male/male-beach-editorial.jpg'),
  detail: a('male/male-jewelry-detail.jpg'),
  scarf: a('male/male-scarf-style.jpg'),
  woman: a('male/male-suit-neutral.jpg'),
  bag: a('male/male-leather-bag.jpg'),
  look: a('male/male-coat-hero.jpg'),
  coatAlt: a('5589f3d0c26f9b76b711f89513fb0645.jpg'),
  denim: a('male/male-denim-full.jpg'),
  man: a('5c0c526882ccf415cc5813c73ed45fb6.jpg'),
  trench: a('male/male-coat-street.jpg'),
  coat: a('a8f87f8899ec2ff1c84756de05279ee6.jpg'),
  rail: a('f7a39498611020ea4ad51a8907c222d9.jpg'),
};

const swatches = {
  camel: [['Camel', '#B8946A'], ['Charcoal', '#3A3936']],
  stone: [['Stone', '#CBBFA8'], ['Khaki', '#A99A72']],
  neutral: [['White', '#F4F3EF'], ['Black', '#1C1C1B'], ['Oat', '#DCD3C2']],
  blue: [['Light wash', '#9DB4CB'], ['Indigo', '#3E5370']],
};

const rawProducts = [
  ['p1','Relaxed Wool Overcoat','Men · Outerwear',298,images.coat,images.coatAlt,'New',swatches.camel,'4.8',126],
  ['p2','Belted Cotton Trench','Women · Outerwear',245,images.trench,images.woman,'',swatches.stone,'4.9',212],
  ['p3','Heavyweight Crew Tee','Essentials · Unisex',38,images.look,images.detail,'',swatches.neutral,'4.7',540],
  ['p4','Organic Boxy Tee','Women · Essentials',34,images.woman,images.look,'',swatches.neutral,'4.6',188],
  ['p5','Linen Band-Collar Shirt','Men · Shirts',89,images.man,images.coatAlt,'',swatches.neutral,'4.7',74,118],
  ['p6','Washed Denim Trucker','Unisex · Outerwear',128,images.denim,images.rail,'New',swatches.blue,'4.8',96],
  ['p7','Structured Leather Tote','Accessories · Bags',185,images.bag,images.necklace,'', [['Cognac','#8E532C'],['Black','#1C1C1B']],'4.9',301,null,true],
  ['p8','Heritage Leather Weekender','Accessories · Bags',265,images.bag,images.scarf,'', [['Cognac','#8E532C']],'4.8',58,320,true],
  ['p9','Court Leather Sneaker','Footwear',135,images.rail,images.denim,'New', [['Off-white','#EEE7DB']],'4.7',410],
  ['p10','Acetate Cat-Eye Sunglasses','Accessories · Eyewear',95,images.scarf,images.necklace,'', [['Blush','#DCD3C2'],['Tortoise','#6B4A2E']],'4.6',143,null,true],
  ['p11','Brushed Fleece Hoodie','Essentials · Unisex',78,images.coatAlt,images.coat,'',swatches.neutral,'4.8',367],
  ['p12','Pleated Wide-Leg Trouser','Women · Trousers',118,images.look,images.detail,'New', [['Fern','#5F7348'],['Stone','#CBBFA8']],'4.7',82],
  ['p13','Merino Crew Knit','Knitwear',110,images.woman,images.coat,'', [['Ecru','#EAE3D2'],['Oat','#DCD3C2']],'4.9',256,145],
  ['p14','Relaxed Straight Jean','Women · Denim',98,images.denim,images.look,'',swatches.blue,'4.8',198],
  ['p15','Oxford Chambray Shirt','Men · Shirts',84,images.man,images.denim,'', [['Navy','#2C3A52'],['Light','#9DB4CB']],'4.7',121],
  ['p16','Double-Face Camel Coat','Women · Outerwear',340,images.woman,images.trench,'New',swatches.camel,'4.9',47],
  ['p17','Loopback Crew Sweatshirt','Essentials · Unisex',72,images.coatAlt,images.rail,'',swatches.neutral,'4.6',233,90],
  ['p18','Easy Drawstring Trouser','Women · Trousers',68,images.look,images.beach,'', [['Mint','#BFD8C6'],['Ecru','#EAE3D2']],'4.5',64,85],
];

export const products = Object.fromEntries(rawProducts.map(([id,name,cat,price,img,alt,badge,sw,rating,reviews,was,oneSize]) => [id,{id,name,cat,price,img,alt,badge,sw,rating,reviews,was,oneSize}]));
export const freshIds = ['p6','p16','p12','p9','p1','p4','p10','p2'];
export const lovedIds = ['p3','p2','p1','p13','p14','p7','p11','p15'];
export const collections = [
  ['New Arrivals',['p16','p6','p12','p9']],
  ['Everyday Essentials',['p3','p4','p11','p17']],
  ['Trending Now',['p2','p10','p14','p7']],
  ['On Sale',['p5','p8','p13','p18']],
];

export const slides = [
  { img: images.look, pos:'50% 36%', align:'start', eyebrow:'Autumn / Winter 2026', title:'The Art of\nEveryday\nDressing', sub:'Modern essentials designed for the way you move.', cta:'Explore the Collection', cta2:'Shop Women' },
  { img: images.beach, pos:'66% 0%', align:'start', eyebrow:'Just landed', title:'New Season.\nNew Perspective.', sub:'Softened tailoring and outerwear made for changing light.', cta:'Shop New Arrivals', cta2:'View Lookbook' },
  { img: images.coat, pos:'50% 0%', align:'end', eyebrow:'The Essentials Edit', title:'Designed\nto Feel\nDifferent.', sub:'Considered layers and honest materials — the pieces you reach for first.', cta:'Discover Essentials', cta2:'Shop Men' },
];

export const categories = [
  ['Women','142 styles',images.woman,'cat--a'], ['Men','118 styles',images.man,'cat--b'],
  ['Essentials','64 styles',images.rail,'cat--c'], ['Outerwear','38 styles',images.trench,'cat--d'],
  ['Accessories','46 styles',images.bag,'cat--e'],
];

export const reviews = [
  ['Amira K.','Belted Cotton Trench',images.trench,'The cut is perfect — structured enough for work, relaxed enough for weekends. I have worn it almost every day since it arrived.'],
  ['Daniel R.','Relaxed Wool Overcoat',images.coat,'Heavier and warmer than I expected for the price. The shoulders sit exactly right and it still looks sharp over a hoodie.'],
  ['Sofia L.','Heavyweight Crew Tee',images.look,'Finally a white tee that is not see-through and keeps its shape after washing. I ordered three more.'],
  ['Yusuf M.','Merino Crew Knit',images.woman,'Soft, no itch, and it layers under everything. Delivery was quick and the packaging felt considered.'],
];

export const faqs = [
  ['How long does shipping take?','Standard delivery arrives in 3–5 business days and is complimentary on orders over $100. Express delivery (1–2 business days) is available at checkout for $15.'],
  ['What is your return policy?','You have 30 days from delivery to return or exchange unworn items with their tags attached. Returns are free within the US.'],
  ['How do I find my size?','Every product page has a fit note and a size chart. Most pieces are cut relaxed; choose your usual size for a classic fit.'],
  ['Do you ship internationally?','Yes — we ship to more than 40 countries. Duties and taxes are calculated at checkout.'],
  ['How can I track my order?','When your order leaves our warehouse you will receive an email with a tracking link.'],
];
