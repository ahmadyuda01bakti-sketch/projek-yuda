// Business data: stored directly in JavaScript (no backend/database)
const produkList = [
  { id: "keranjang", nama: "Woven Basket", gambar: "assets/keranjang.jpg", beratKg: 1.2,
    deskripsi: "Handwoven rattan basket for storage and decoration.",
    varian: [
      { nama: "Small (30 cm)", harga: 85000, stok: 120 },
      { nama: "Medium (40 cm)", harga: 125000, stok: 80 },
      { nama: "Large (55 cm)", harga: 185000, stok: 0 } ] },
  { id: "kursi", nama: "Natural Rattan Chair", gambar: "assets/kursi.jpg", beratKg: 7,
    deskripsi: "Rattan chair with a sturdy frame, ideal for cafes and homes.",
    varian: [
      { nama: "Natural", harga: 650000, stok: 25 },
      { nama: "Dark Brown", harga: 700000, stok: 14 },
      { nama: "Washed White", harga: 720000, stok: 0 } ] },
  { id: "nampan", nama: "Round Rattan Tray", gambar: "assets/nampan.jpg", beratKg: 0.8,
    deskripsi: "Round serving tray with a tightly woven rim.",
    varian: [
      { nama: "Diameter 30 cm", harga: 65000, stok: 200 },
      { nama: "Diameter 45 cm", harga: 95000, stok: 150 } ] },
  { id: "lampu", nama: "Rattan Pendant Lamp", gambar: "assets/lampu.jpg", beratKg: 2.5,
    deskripsi: "Hanging lampshade made of rattan with an open weave pattern.",
    varian: [
      { nama: "Diameter 40 cm", harga: 210000, stok: 35 },
      { nama: "Diameter 60 cm", harga: 340000, stok: 10 } ] }
];

// Shipping rate per kg (Rupiah) and estimated days by destination and method
const tujuanList = [
  { nama: "Singapore",     laut: { tarif: 18000, hari: [7, 10] },  udara: { tarif: 95000,  hari: [3, 5] } },
  { nama: "Malaysia",      laut: { tarif: 17000, hari: [7, 10] },  udara: { tarif: 90000,  hari: [3, 5] } },
  { nama: "Japan",         laut: { tarif: 28000, hari: [14, 18] }, udara: { tarif: 120000, hari: [4, 6] } },
  { nama: "Australia",     laut: { tarif: 30000, hari: [16, 21] }, udara: { tarif: 125000, hari: [4, 7] } },
  { nama: "Netherlands",   laut: { tarif: 35000, hari: [28, 35] }, udara: { tarif: 140000, hari: [5, 8] } },
  { nama: "United States", laut: { tarif: 42000, hari: [32, 40] }, udara: { tarif: 160000, hari: [5, 9] } }
];

const faqList = [
  { q: "Are the products always in stock?", a: "The stock of each variant is shown in the Products section and in the order calculator. Variants marked Sold out cannot be ordered; contact us for the next production schedule." },
  { q: "What is the minimum order?", a: "There is no minimum order. You can order from 1 unit, as long as the quantity does not exceed the available stock." },
  { q: "How is the total price calculated?", a: "Choose a product, variant, and quantity in the order calculator. The product total is calculated automatically, then shipping cost is added to give the total to pay." },
  { q: "How is the shipping cost calculated?", a: "Shipping cost is the total order weight multiplied by the rate per kg for the destination country and method (sea or air)." },
  { q: "How long until my order arrives?", a: "Sea freight takes 7 to 40 days depending on the destination, while air freight takes 3 to 9 days. The calculator shows the estimated arrival dates." },
  { q: "How do I place an order?", a: "Calculate your order, then click the WhatsApp button to send the order summary to Mr. Ridwan." }
];
