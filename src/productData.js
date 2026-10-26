const productAsset = (file) => `/assets/product/${file}`;

export const linenProduct = {
  id: 'p5',
  slug: 'classic-linen-shirt',
  brand: 'FORME',
  price: 249,
  compareAt: 329,
  rating: 4.8,
  reviewCount: 126,
  stock: 18,
  localized: {
    ar: {
      name: 'قميص الكتان الكلاسيكي',
      description: 'أناقة يومية بخامة كتان خفيفة وتصميم يجمع بين الراحة والبساطة.',
      category: 'رجال · قمصان',
    },
    en: {
      name: 'Classic Linen Shirt',
      description: 'Everyday ease in lightweight linen, designed to balance comfort and simplicity.',
      category: 'Men · Shirts',
    },
  },
  images: [
    { id:'front', src:productAsset('5fd97c5c315fd1b0850fe9f12acbc4aa.jpg'), position:'50% 28%' },
    { id:'model', src:productAsset('03434c12ce32080b4c42d95ba38210ef.jpg'), position:'50% 28%' },
    { id:'detail', src:productAsset('5fd97c5c315fd1b0850fe9f12acbc4aa.jpg'), position:'58% 68%' },
    { id:'fabric', src:productAsset('904327a7cf0d3d261991ab46fa79adfc.jpg'), position:'50% 50%' },
  ],
  options: [
    {
      id:'color', type:'swatch', required:true, media:true,
      label:{ar:'اللون',en:'Colour'},
      values:[
        {id:'offwhite',label:{ar:'أوف وايت',en:'Off-white'},hex:'#ECE7DB'},
        {id:'grey',label:{ar:'رمادي حجري',en:'Stone grey'},hex:'#A9A8A2'},
        {id:'sky',label:{ar:'أزرق سماوي',en:'Sky blue'},hex:'#B9C8D8'},
        {id:'black',label:{ar:'أسود',en:'Black'},hex:'#1F1F1F',available:false},
      ],
    },
    {
      id:'size', type:'pill', required:true, guide:true,
      label:{ar:'المقاس',en:'Size'},
      values:[{id:'S'},{id:'M'},{id:'L'},{id:'XL'},{id:'XXL',available:false}],
    },
  ],
  sizeTable: [
    ['S',104,72,44,22], ['M',110,74,46,23], ['L',116,76,48,24],
    ['XL',122,78,50,25], ['XXL',128,80,52,26],
  ],
  relatedIds: ['p15','p3','p1','p7','p9','p11'],
};
