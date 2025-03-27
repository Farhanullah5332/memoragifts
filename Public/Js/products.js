const products = [
  {
    id: 1,
    name: "Ball Points",
    image: "Public/ProductImages/1.webp",
    price: 49.99,
    description: "Smooth and reliable ballpoint pens for everyday writing.",
    features: [
      "Pack of 10",
      "Quick-drying ink",
      "Comfortable grip",
      "Multiple colors available",
    ],
  },
  {
    id: 2,
    name: "Key Chains",
    image: "Public/ProductImages/2.webp",
    price: 150,
    description: "Stylish and durable key chains to keep your keys organized.",
    features: [
      "Metal and leather designs",
      "Customizable options",
      "Lightweight and sturdy",
      "Available in various shapes",
    ],
  },
  {
    id: 3,
    name: "Phone Covers",
    image: "Public/ProductImages/3.webp",
    price: 299,
    description:
      "Protect your phone with our stylish and durable phone covers.",
    features: [
      "Shockproof design",
      "Scratch-resistant material",
      "Compatible with major phone brands",
      "Sleek and stylish look",
    ],
  },
  {
    id: 4,
    name: "Mugs",
    image: " Public/ProductImages/4.webp",
    price: 199,
    description: "High-quality ceramic mugs for your coffee or tea.",
    features: [
      "Dishwasher and microwave safe",
      "Available in various designs",
      "Comfortable handle",
      "Customizable prints available",
    ],
  },
  {
    id: 5,
    name: "Jewellery",
    image: "Public/ProductImages/5.webp",
    price: 999,
    description: "Elegant and stylish jewellery pieces for all occasions.",
    features: [
      "Premium craftsmanship",
      "Hypoallergenic material",
      "Available in gold, silver, and rose gold",
      "Perfect for gifting",
    ],
  },
  {
    id: 6,
    name: "Shirts",
    image: "Public/ProductImages/6.webp",
    price: 1499,
    description: "Comfortable and stylish shirts in various designs.",
    features: [
      "100% cotton",
      "Available in all sizes",
      "Trendy and casual wear",
      "Multiple colors available",
    ],
  },
  {
    id: 7,
    name: "Caps",
    image: " Public/ProductImages/7.webp",
    price: 450,
    description: "Stylish and adjustable caps for everyday wear.",
    features: [
      "Breathable fabric",
      "Adjustable strap",
      "Available in various colors",
      "Perfect for outdoor activities",
    ],
  },
  {
    id: 8,
    name: "Chat Books",
    image: "Public/ProductImages/8.webp",
    price: 499,
    description: "Personalized chat books to preserve your memories.",
    features: [
      "Customizable pages",
      "High-quality printing",
      "Durable binding",
      "Perfect gift for loved ones",
    ],
  },
  {
    id: 9,
    name: "Temperature Bottles",
    image: "Public/ProductImages/9.webp",
    price: 300,
    description: "Smart temperature bottles to keep your drinks hot or cold.",
    features: [
      "LED temperature display",
      "Vacuum insulated",
      "Leak-proof design",
      "Durable stainless steel",
    ],
  },
];

// Enhanced orderNow function
function orderNow(product, price) {
  let quantity = parseInt(prompt("Enter quantity (max 20):", "1")) || 1;
  quantity = Math.min(Math.max(1, quantity), 20); // Enforce limits

  if (isNaN(quantity)) {
    alert("Please enter a valid number");
    return;
  }

  // Calculate total and generate reference
  let total = price * quantity;
  let orderRef = "ORD-" + Math.floor(100000 + Math.random() * 900000);

  // Create message with formatted text
  let message = `*ORDER #${orderRef}*\n\n` +
    `*Product Details:*\n` +
    `📦 Product: ${product}\n` +
    `💰 Price: ${price} PKR x ${quantity}\n` +
    `🔢 Quantity: ${quantity}\n` +
    `💵 Total: ${total.toFixed(2)} PKR\n\n` +
    `*Info:*\n` +
    `📍 Provide delivery address [Address here ...]\n` +
    `📱 Contact: [Your number]\n` +
    `📅 ${new Date().toLocaleDateString()}\n\n` +
    `💳 50% advance payment required\n` +
    `🔄 For customization: Send name/image\n` +
    `🚚 Delivery: 3-5 days (COD available)\n\n` +
    `Send payment proof to confirm order.\n\n` +
    `Thank you!`;

  try {
    // Open WhatsApp and return reference
    let whatsappURL = `https://wa.me/+923199485031?text=${encodeURIComponent(message)}`;
    
    console.log("WhatsApp URL: ", whatsappURL); // Debugging: Check the generated URL
    
    window.open(whatsappURL, "_blank");

    // Notify success (optional)
    console.log("Order initiated: " + orderRef);

    return orderRef;
  } catch (error) {
    // Handle any errors
    console.error("Error sending order: ", error);
    alert("Unable to open WhatsApp. Please try again.");
    return null;
  }
}
