import { Product, Collection, Post } from './types';



export const PRODUCTS: Product[] = [
  // --- SECTION 1: HOODIES (7 Items) ---
  {
    id: 'h1',
    name: 'Heavyweight Acid Wash Zip',
    price: 185,
    category: 'Hoodies',
    image: 'https://image.made-in-china.com/368f3j00gQOEAarGVHYy/Custom-Heavyweight-Embroidery-Patches-Distressed-Zipper-up-Hoodie-500GSM-Streetwear-Custom-Acid-Wash-Wholesale-1688-Fashion-Men-s-Hoodie-Clothing.webp', 
    isNew: true,
    details: ['500GSM French Terry', 'Distressed Zipper', 'Acid Wash Finish', 'Oversized Fit']
  },
  {
    id: 'h2',
    name: 'Berserk Gothic Print',
    price: 165,
    category: 'Hoodies',
    image: 'https://img4.dhresource.com/webp/m/0x0/f3/albu/jc/n/12/ee4b8f73-56ce-4694-b1fb-3e73e225b880.jpg',
    details: ['Gothic Back Print', 'Vintage Wash', 'Drop Shoulder', 'Kangaroo Pocket']
  },
  {
    id: 'h3',
    name: 'Distressed Essential',
    price: 145,
    category: 'Hoodies',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5tzyX7Wc7f1RCVBRttGbLfORwqPKugWv5BTj0fHuaKgYrJBrdYnJx5Zj_xOj-41yGDPs&usqp=CAU',
    details: ['Heavy Distressing', 'Raw Hem', 'Boxy Silhouette', 'Faded Black']
  },
  {
    id: 'h4',
    name: 'Void Black Pullover',
    price: 120,
    category: 'Hoodies',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8L6YTcIuxEe7QZZiM6m2STKC8CBq4zlQDFb6o28BpiVGfePo9d_E35hMX2vy_qJIeJ08&usqp=CAU',
    details: ['Jet Black Dye', 'Double Lined Hood', 'Relaxed Fit', 'Minimalist']
  },
  {
    id: 'h5',
    name: 'Oversized Street Hoodie',
    price: 135,
    category: 'Hoodies',
    image: 'https://m.media-amazon.com/images/I/61MVtibt-ZL.jpg',
    details: ['Street Staple', 'Cotton Blend', 'Ribbed Cuffs', 'Standard Fit']
  },
  {
    id: 'h6',
    name: 'Gothic Graphic Hoodie',
    price: 155,
    category: 'Hoodies',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4ex0uvKQqIQoI5hmEOpNpRtPYf7UXA5ThUZ2KBMQc-kRtAj2eiu_q_rZCJGykWmYSCZk&usqp=CAU',
    isNew: true,
    details: ['Screen Printed Art', 'Puff Print Details', 'Heavyweight', 'Limited Run']
  },
  {
    id: 'h7',
    name: 'Vintage Wash Graphic',
    price: 140,
    category: 'Hoodies',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6hxr1nJQaqQN-igLyYcPiCeOCgjVIVx6uEsCYd7i3fmlFpLXDbj7iimIMH87GQ0S8as&usqp=CAU',
    details: ['Sun-faded Finish', 'Soft Handfeel', 'Retro Graphic', 'Everyday Comfort']
  },

  // --- SECTION 2: SWEATSHIRTS (5 Items) ---
  {
    id: 's1',
    name: 'Archive Crewneck',
    price: 110,
    category: 'Sweatshirts',
    image: 'https://i.pinimg.com/736x/27/92/07/279207ab5d0cc638c0138812fae939dc.jpg',
    details: ['Loopback Jersey', 'Dropped Shoulders', 'Tight Collar', 'Wide Body']
  },
  {
    id: 's2',
    name: 'Distressed Fleece Crew',
    price: 125,
    category: 'Sweatshirts',
    image: 'https://i.pinimg.com/1200x/a0/72/7c/a0727cd6ebd863c2088731500d31b7ab.jpg',
    details: ['Hand Distressed', 'Garment Dyed', 'Raglan Sleeve', 'Vintage Appeal']
  },
  {
    id: 's3',
    name: 'Vintage Grey Sweat',
    price: 95,
    category: 'Sweatshirts',
    image: 'https://i.pinimg.com/736x/af/da/b4/afdab4e98e4c4120c3cee7b9cb34eb83.jpg',
    isNew: true,
    details: ['Heather Grey', 'Bonded Hems', 'Minimalist', 'Structured Drape']
  },
  {
    id: 's4',
    name: 'Oversized Boxy Crew',
    price: 100,
    category: 'Sweatshirts',
    image: 'https://i.pinimg.com/736x/71/06/da/7106dad26406403158c68d56ddfd2824.jpg',
    details: ['Extra Oversized', 'Heavy Cotton', 'Ribbed Hem', 'Street Staple']
  },
  {
    id: 's5',
    name: 'Washed Black Crew',
    price: 115,
    category: 'Sweatshirts',
    image: 'https://i.pinimg.com/1200x/f0/52/9f/f0529f8621cae44eec21227697def751.jpg',
    details: ['Faded Black', 'Chest Logo', 'Fleece Lined', 'Regular Fit']
  },

  // --- SECTION 3: PREMIUM TROUSERS (5 Items) ---
  {
    id: 't1',
    name: 'Pleated Wide Trouser',
    price: 220,
    category: 'Trousers',
    image: 'https://i.pinimg.com/736x/66/8b/31/668b3177752ca9237d0d287d4c4a7366.jpg',
    isNew: true,
    details: ['Virgin Wool Blend', 'Double Pleat', 'Wide Leg', 'Cropped Hem']
  },
  {
    id: 't2',
    name: 'Straight Leg Formal',
    price: 190,
    category: 'Trousers',
    image: 'https://i.pinimg.com/736x/5f/94/38/5f943862cdb7d1724428db077cb72092.jpg',
    details: ['Flowing Silhouette', 'High Waisted', 'Side Adjusters', 'Premium Cotton']
  },
  {
    id: 't3',
    name: 'Relaxed Drape Pant',
    price: 180,
    category: 'Trousers',
    image: 'https://i.pinimg.com/1200x/c1/34/f8/c134f863c5dd6fde6587df2594787c4d.jpg',
    details: ['Sharp Crease', 'Hidden Closure', 'Belt Loops', 'Formal Cut']
  },
  {
    id: 't4',
    name: 'Structure Wool Pant',
    price: 210,
    category: 'Trousers',
    image: 'https://i.pinimg.com/736x/05/99/20/0599201741daacb502898ddda2a28be7.jpg',
    details: ['Synthetic Blend', 'Liquid Drape', 'Elastic Waist', 'Minimalist']
  },
  {
    id: 't5',
    name: 'Tailored Black Trouser',
    price: 175,
    category: 'Trousers',
    image: 'https://i.pinimg.com/1200x/7c/f3/63/7cf363bcfe681a0392181e2263db9822.jpg',
    details: ['Heavy Canvas', 'Straight Fit', 'Workwear Inspired', 'Reinforced Knees']
  },

  // --- SECTION 4: CARGOS (4 Items) ---
  {
    id: 'c1',
    name: 'Technical Cargo Pant',
    price: 210,
    category: 'Cargos',
    image: 'https://i.pinimg.com/1200x/1f/a4/6c/1fa46ccbe3c3dfabb4820b6252222e49.jpg',
    isNew: true,
    details: ['Multiple Pockets', 'Straps & Buckles', 'Water Repellent', 'Tapered Ankle']
  },
  {
    id: 'c2',
    name: 'Utility Pocket Cargo',
    price: 150,
    category: 'Cargos',
    image: 'https://i.pinimg.com/1200x/ad/1a/08/ad1a0853320ca9f365a8eddc3e48057a.jpg',
    details: ['Ripstop Fabric', 'Drawstring Cuff', 'Relaxed Fit', 'Military Green']
  },
  {
    id: 'c3',
    name: 'Heavyweight Canvas Cargo',
    price: 165,
    category: 'Cargos',
    image: 'https://i.pinimg.com/1200x/3e/ea/b9/3eeab987f4d741e9d5163f39fcc1600f.jpg',
    details: ['Cotton Twill', 'Velcro Pockets', 'Baggy Fit', 'Skate Style']
  },
  {
    id: 'c4',
    name: 'Multi-Zip Tech Cargo',
    price: 185,
    category: 'Cargos',
    image: 'https://i.pinimg.com/1200x/c3/34/28/c33428398bb3306a4a8588ed57323b65.jpg',
    details: ['Lightweight Nylon', 'Rustle Fabric', 'Zip Pockets', 'Sporty Look']
  },

  // --- SECTION 5: POLO T-SHIRTS (5 Items) ---
  {
    id: 'p1',
    name: 'Knit Polo Noir',
    price: 120,
    category: 'Tops',
    image: 'https://i.pinimg.com/1200x/38/35/01/3835010d966b594de31be7d6c01ce640.jpg',
    isNew: true,
    details: ['Merino Wool Blend', 'Open Collar', 'Ribbed Trims', 'Slim Fit']
  },
  {
    id: 'p2',
    name: 'Textured Weave Polo',
    price: 95,
    category: 'Tops',
    image: 'https://i.pinimg.com/736x/67/41/fd/6741fdd0e05b9d263df10649f72de779.jpg',
    details: ['Waffle Texture', 'Breathable', 'Classic Fit', 'Neutral Tone']
  },
  {
    id: 'p3',
    name: 'Quarter Zip Knit',
    price: 110,
    category: 'Tops',
    image: 'https://i.pinimg.com/1200x/78/68/ee/7868eedcea73b0d4d1f60b2a587c3f5d.jpg',
    details: ['Metal Zipper', 'Cotton Pique', 'Structured Collar', 'Smart Casual']
  },
  {
    id: 'p4',
    name: 'Mercerized Cotton Polo',
    price: 140,
    category: 'Tops',
    image: 'https://i.pinimg.com/736x/ae/ac/3f/aeac3f2ce9efe6626b89894a7e4c64a1.jpg',
    details: ['Silk-like Sheen', 'Premium Cotton', 'Buttonless Placket', 'Luxury Feel']
  },
  {
    id: 'p5',
    name: 'Vintage Striped Polo',
    price: 85,
    category: 'Tops',
    image: 'https://i.pinimg.com/736x/79/f3/8b/79f38bb27fd758227cb6dcaa7712f1d5.jpg',
    details: ['Retro Vertical Stripe', 'Contrast Collar', 'Boxy Fit', 'Soft Wash']
  },

  // --- SECTION 6: DENIM JEANS (5 Items) ---
  {
    id: 'd1',
    name: 'Vintage Wash Denim',
    price: 250,
    category: 'Denim',
    image: 'https://i.pinimg.com/1200x/d8/5e/5a/d85e5ae7768c713b057d05a0256b5787.jpg',
    isNew: true,
    details: ['14oz Japanese Denim', 'Redline Selvedge', 'Unwashed', 'Stiff Handle']
  },
  {
    id: 'd2',
    name: 'Distressed Stacked Jean',
    price: 160,
    category: 'Denim',
    image: 'https://i.pinimg.com/736x/a2/a3/40/a2a3408567559a9c087ee0e501a165cd.jpg',
    details: ['Stone Washed', 'Whiskering Details', 'Straight Leg', 'Classic 5 Pocket']
  },
  {
    id: 'd3',
    name: 'Carpenter Denim',
    price: 175,
    category: 'Denim',
    image: 'https://i.pinimg.com/736x/45/4f/3b/454f3b3eaad7d8695bf4ef0a37b8a615.jpg',
    details: ['Faded Black', 'Knee Blowouts', 'Skinny Stacked Fit', 'Stretch Denim']
  },
  {
    id: 'd4',
    name: 'Wide Leg Light Wash',
    price: 145,
    category: 'Denim',
    image: 'https://i.pinimg.com/1200x/58/d5/05/58d5050ef8e9b0c370b099b25fa9187a.jpg',
    details: ['Hammer Loop', 'Utility Pockets', 'Wide Fit', 'Light Wash']
  },
  {
    id: 'd5',
    name: 'Black Waxed Denim',
    price: 155,
    category: 'Denim',
    image: 'https://i.pinimg.com/736x/32/c5/cc/32c5ccc87b7f640ae12d5a40005c5557.jpg',
    details: ['Elongated Inseam', 'Waxed Finish', 'Ankle Stacking', 'Rock Aesthetic']
  },

  // --- SECTION 7: VINTAGE JACKETS (7 Items) ---
  {
    id: 'j1',
    name: 'Distressed Leather Racer',
    price: 650,
    category: 'Jackets',
    image: 'https://i.pinimg.com/1200x/5a/99/f2/5a99f2ecbe0779c25362ed18d50198cc.jpg',
    isNew: true,
    details: ['Full Grain Leather', 'Hand Distressed', 'Cafe Racer Collar', 'Heavy Zippers']
  },
  {
    id: 'j2',
    name: 'Vintage MA-1 Bomber',
    price: 280,
    category: 'Jackets',
    image: 'https://i.pinimg.com/1200x/62/6e/7e/626e7ef3d0a1795f49e9d1feb5580c1c.jpg',
    details: ['Nylon Satin', 'Orange Lining', 'Oversized Puffy Fit', 'Utility Arm Pocket']
  },
  {
    id: 'j3',
    name: 'Varsity Letterman',
    price: 320,
    category: 'Jackets',
    image: 'https://i.pinimg.com/736x/9b/7b/91/9b7b91fbee196bc9ee5a68cac4b724a7.jpg',
    details: ['Wool Body', 'Leather Sleeves', 'Chenille Patches', 'Boxy Cropped Fit']
  },
  {
    id: 'j4',
    name: 'SST Track Jacket',
    price: 110,
    category: 'Jackets',
    image: 'https://i.pinimg.com/1200x/ce/98/1e/ce981ebf6373ce35979f306e1b1315f4.jpg',
    details: ['Retro Sportswear', 'Tricot Fabric', 'Side Stripes', 'Stand Collar']
  },
  {
    id: 'j5',
    name: 'Type III Trucker',
    price: 180,
    category: 'Jackets',
    image: 'https://i.pinimg.com/736x/a0/62/61/a06261223ef5374b9849ccb4de9635c4.jpg',
    details: ['Heavyweight Denim', 'Sherpa Lining', 'Copper Buttons', 'Faded Indigo']
  },
  {
    id: 'j6',
    name: 'Technical Shell',
    price: 450,
    category: 'Jackets',
    image: 'https://i.pinimg.com/736x/9a/46/7a/9a467a31cb765625babb47fedf0614c9.jpg',
    details: ['3-Layer Membrane', 'Waterproof', 'High Neck Hood', 'Performance Gear']
  },
  {
    id: 'j7',
    name: 'Workwear Jacket',
    price: 195,
    category: 'Jackets',
    image: 'https://i.pinimg.com/1200x/be/19/b4/be19b40a9061dcf07ea35ddeec7c0aa3.jpg',
    details: ['Heavy Canvas', 'Corduroy Collar', 'Quilted Lining', 'Boxy Fit']
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    title: 'Swoosh Tech',
    description: 'The intersection of fleece innovation and modern silhouette.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800'
  },
  {
    id: 'c2',
    title: 'Three Stripes Archival',
    description: 'Reimagining the classics for the future of streetwear.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800'
  }
];

export const JOURNAL_POSTS: Post[] = [
  {
    id: 'j1',
    title: 'The Architecture of Grief',
    date: 'NOV 03, 2024',
    category: 'Philosophy',
    excerpt: 'How we translate the weight of loss into the silhouette of our heavyweight fleece. Every seam tells a story of reconstruction.',
    image: 'https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=800'
  },
  {
    id: 'j2',
    title: 'Silence as a Weapon',
    date: 'OCT 21, 2024',
    category: 'Process',
    excerpt: 'In a world that screams for attention, we choose the whisper. Why our branding is invisible and our presence is undeniable.',
    image: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?q=80&w=800'
  },
  {
    id: 'j3',
    title: 'From the Concrete',
    date: 'OCT 12, 2024',
    category: 'Origins',
    excerpt: 'The struggle of the ascent. Documenting the sleepless nights and the relentless pursuit of the perfect heavy gsm fabric.',
    image: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=800'
  },
  {
    id: 'j4',
    title: 'Armor for the Soul',
    date: 'SEP 28, 2024',
    category: 'Design',
    excerpt: 'Clothing is not just fabric; it is a psychological shield. Exploring the protective qualities of the Brutalist collection.',
    image: 'https://images.unsplash.com/photo-1493612276216-9c5901955d43?q=80&w=800'
  }
];