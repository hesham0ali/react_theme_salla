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
  camel: [['camel', '#B8946A'], ['charcoal', '#3A3936']],
  stone: [['stone', '#CBBFA8'], ['khaki', '#A99A72']],
  neutral: [['white', '#F4F3EF'], ['black', '#1C1C1B'], ['oat', '#DCD3C2']],
  blue: [['lightWash', '#9DB4CB'], ['indigo', '#3E5370']],
};

const rawProducts = [
  ['p1',298,images.coat,images.coatAlt,true,swatches.camel,'4.8',126],
  ['p2',245,images.trench,images.woman,false,swatches.stone,'4.9',212],
  ['p3',38,images.look,images.detail,false,swatches.neutral,'4.7',540],
  ['p4',34,images.woman,images.look,false,swatches.neutral,'4.6',188],
  ['p5',89,images.man,images.coatAlt,false,swatches.neutral,'4.7',74,118],
  ['p6',128,images.denim,images.rail,true,swatches.blue,'4.8',96],
  ['p7',185,images.bag,images.necklace,false, [['cognac','#8E532C'],['black','#1C1C1B']],'4.9',301,null,true],
  ['p8',265,images.bag,images.scarf,false, [['cognac','#8E532C']],'4.8',58,320,true],
  ['p9',135,images.rail,images.denim,true, [['offWhite','#EEE7DB']],'4.7',410],
  ['p10',95,images.scarf,images.necklace,false, [['blush','#DCD3C2'],['tortoise','#6B4A2E']],'4.6',143,null,true],
  ['p11',78,images.coatAlt,images.coat,false,swatches.neutral,'4.8',367],
  ['p12',118,images.look,images.detail,true, [['fern','#5F7348'],['stone','#CBBFA8']],'4.7',82],
  ['p13',110,images.woman,images.coat,false, [['ecru','#EAE3D2'],['oat','#DCD3C2']],'4.9',256,145],
  ['p14',98,images.denim,images.look,false,swatches.blue,'4.8',198],
  ['p15',84,images.man,images.denim,false, [['navy','#2C3A52'],['light','#9DB4CB']],'4.7',121],
  ['p16',340,images.woman,images.trench,true,swatches.camel,'4.9',47],
  ['p17',72,images.coatAlt,images.rail,false,swatches.neutral,'4.6',233,90],
  ['p18',68,images.look,images.beach,false, [['mint','#BFD8C6'],['ecru','#EAE3D2']],'4.5',64,85],
];

export const products = Object.fromEntries(rawProducts.map(([id,price,img,alt,badge,sw,rating,reviews,was,oneSize]) => [id,{id,price,img,alt,badge,sw,rating,reviews,was,oneSize}]));
export const freshIds = ['p6','p16','p12','p9','p1','p4','p10','p2'];
export const lovedIds = ['p3','p2','p1','p13','p14','p7','p11','p15'];
export const collections = [
  ['new',['p16','p6','p12','p9']],
  ['essentials',['p3','p4','p11','p17']],
  ['trending',['p2','p10','p14','p7']],
  ['sale',['p5','p8','p13','p18']],
];

export const slides = [
  { key:'0', img: images.look, pos:'50% 36%', align:'start' },
  { key:'1', img: images.beach, pos:'66% 0%', align:'start' },
  { key:'2', img: images.coat, pos:'50% 0%', align:'end' },
];

export const categories = [
  ['women',142,images.woman,'cat--a'], ['men',118,images.man,'cat--b'],
  ['essentials',64,images.rail,'cat--c'], ['outerwear',38,images.trench,'cat--d'],
  ['accessories',46,images.bag,'cat--e'],
];

export const reviews = [
  ['0',images.trench], ['1',images.coat], ['2',images.look], ['3',images.woman],
];

export const faqs = ['0','1','2','3','4'];
