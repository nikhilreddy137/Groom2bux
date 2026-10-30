const cdn = (file, w = 800) => `https://groom2b.in/cdn/shop/files/${file}?width=${w}`;

export const NAV_LINKS = [
  { label: "Collections", href: "#collections" },
  { label: "Categories", href: "#categories" },
  { label: "Try On", href: "#tryon" },
  { label: "Occasions", href: "#occasions" },
  { label: "Stores", href: "#stores" },
];

export const STATS = [
  { value: "1,00,000+", label: "Outfits created" },
  { value: "20,000+", label: "Grooms served" },
  { value: "6+", label: "Years of craft" },
  { value: "4.8", label: "Rated on Google & Justdial" },
];

export const COLLECTIONS = [
  {
    id: "swarnalayam",
    name: "Swarnalayam",
    line: "Golden traditions, modern grooming elegance",
    img: cdn("swarnalayam.png", 1000),
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: "vaikunta",
    name: "Vaikunta Vaibhavam",
    line: "An ode to divine elegance",
    img: cdn("vaikunta.png"),
    span: "",
  },
  {
    id: "namam",
    name: "Namam",
    line: "A tribute to sacred heritage",
    img: cdn("Frame_343.png"),
    span: "",
  },
  {
    id: "peddamma",
    name: "Peddamma",
    line: "Where heritage meets regal elegance",
    img: cdn("pedamma.png"),
    span: "",
  },
  {
    id: "baraat",
    name: "Baraat",
    line: "Made for the grandest entrance",
    img: cdn("df78c1e3-2639-4f63-951e-ba9e97603a38_1.png"),
    span: "",
  },
  {
    id: "suits",
    name: "Designer Suits",
    line: "Sharp silhouettes, exceptional craftsmanship",
    img: cdn("Frame_344.png", 1000),
    span: "lg:col-span-2",
  },
];

export const CATEGORIES = [
  { name: "Pattu Pancha", img: cdn("Frame_353.png", 600) },
  { name: "Sherwani", img: cdn("Frame_330.png", 600) },
  { name: "Designer Suits", img: cdn("Frame_352.png", 600) },
  { name: "Indo Western", img: cdn("Frame_350.png", 600) },
  { name: "Jodhpuri", img: cdn("Frame_314.png", 600) },
  { name: "Kurta", img: cdn("Frame_351.png", 600) },
  { name: "Sadris", img: cdn("Frame_359.png", 600) },
];

export const PRODUCTS = [
  {
    cat: "Sherwani",
    name: "Off-White Brocade Sherwani with Chest Work",
    price: 34500,
    img: cdn("402_afc00aa0-389e-40b4-9e71-09a6c13faaaa.png"),
  },
  {
    cat: "Sherwani",
    name: "Ivory Wedding Sherwani with Sita Ram Embroidery",
    price: 68000,
    img: cdn("24.png"),
  },
  {
    cat: "Sherwani",
    name: "Flora & Fauna Fully Hand-Embroidered Sherwani",
    price: 84000,
    img: cdn("438_5c990def-fcc6-4666-8940-ebf78a98fc78.png"),
  },
  {
    cat: "Pattu Pancha",
    name: "Shankha Chakra Sherwani Pancha Set",
    price: 56000,
    img: cdn("133_9b065ca1-ff03-4e3f-8dff-861103edfbcf.png"),
  },
  {
    cat: "Pattu Pancha",
    name: "Royal Blush Kurta with Thirunamam, Shanku & Chakra",
    price: 36000,
    img: cdn("6760faf8-edd5-40c1-a4e9-e08591879dd6.png"),
  },
  {
    cat: "Pattu Pancha",
    name: "Classic Pattu Pancha for Weddings",
    price: 30000,
    img: cdn("1_e814f1ad-eb0d-43da-a96d-9b75a34aa72a.png"),
  },
  {
    cat: "Suits",
    name: "Black & Maroon 3-Piece Satin Lapel Tuxedo",
    price: 25000,
    img: cdn("SuitsImagesfortheproductspart2822026_4.png"),
  },
  {
    cat: "Suits",
    name: "Black Double-Breasted Suit with Gold Buttons",
    price: 18500,
    img: cdn("125_017d83e9-8008-46dc-9c8f-782882b5b579.png"),
  },
  {
    cat: "Suits",
    name: "Classic Black 3-Piece Slim-Fit Tuxedo",
    price: 21800,
    img: cdn("85_212c7c24-3d93-4dc9-9c43-4eed5849c8ff.png"),
  },
];

export const PRODUCT_TABS = ["Sherwani", "Pattu Pancha", "Suits"];

export const OCCASIONS = [
  { name: "Dhoti Ceremony", img: cdn("Frame_370.png", 600) },
  { name: "Wedding", img: cdn("Frame_331.png", 600) },
  { name: "Reception", img: cdn("Frame_344.png", 600) },
  { name: "Sangeet", img: cdn("Frame_357.png", 600) },
  { name: "Haldi", img: cdn("Frame_355.png", 600) },
  { name: "Festive", img: cdn("Frame_356.png", 600) },
];

export const TRYON_IMG = cdn("Frame_364.png", 1600);
export const EDITORIAL_IMG = cdn("ChatGPT_Image_Sep_10_2026_08_05_02_PM_e0493bf7-4d89-43e9-96cf-77fee8eac296.png", 1400);
export const SADRI_IMG = cdn("Frame_361_009ca57f-b2b7-4dbe-a9d4-3cc71f959d0d.png", 1400);

export const TESTIMONIALS = [
  {
    quote:
      "The fit was perfect and delivered well on time, so I had no last-minute stress. I received a ton of compliments on the day.",
    name: "Sriram S.",
    meta: "Google · Wedding sherwani",
    img: cdn("IMG_0182.jpg", 700),
  },
  {
    quote:
      "Special shoutout to my stylist Bhavana who gave the best suggestions according to our choice. It turned out perfect, down to the minute details.",
    name: "Manas R.",
    meta: "Google · May 2026",
    img: cdn("IMG_0160.jpg", 700),
  },
  {
    quote:
      "We got five outfits stitched — two for the groom and three for cousins — and every one came out with a perfect fit and excellent quality.",
    name: "Mallidi Akhil Reddy",
    meta: "Google · Family order",
    img: cdn("IMG_0176.jpg", 700),
  },
];

export const GALLERY = [
  cdn("WhatsApp_Image_2026-09-22_at_3.49.10_PM.jpg", 700),
  cdn("IMG_0181.jpg", 700),
  cdn("WhatsApp_Image_2026-09-21_at_11.17.06_AM.jpg", 700),
  cdn("IMG_0183.jpg", 700),
  cdn("WhatsApp_Image_2026-09-17_at_5.29.53_PM.jpg", 700),
  cdn("IMG_0186.jpg", 700),
  cdn("IMG_0178.jpg", 700),
  cdn("IMG_0159.jpg", 700),
];

export const STORES = [
  {
    city: "Hyderabad",
    tag: "Flagship Studio",
    address: "FF 101, Plot 1108, Road No. 55, beside HDFC Bank, Jubilee Hills, Hyderabad 500033",
    phone: "+91 95151 00372",
    hours: "All week · 11am – 8pm",
    img: cdn("Frame_346_62dd47bc-066e-49a3-80cb-c2bfc0db621a.png", 900),
  },
  {
    city: "California",
    tag: "USA Boutique",
    address: "691 S Milpitas Blvd #71004, Milpitas, CA 95035, United States",
    phone: "+1 (269) 532-6332",
    hours: "All week · 12pm – 7pm",
    img: cdn("Frame_347_338e835b-2693-44cd-b87f-343836596486.png", 900),
  },
];

export const OCCASION_OPTIONS = ["Wedding", "Reception", "Sangeet", "Haldi", "Dhoti Ceremony", "Festive"];

export const formatINR = (n) => `₹${n.toLocaleString("en-IN")}`;
