// Mobile Menu Toggle
const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");

menuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
// Back to Top Button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove("opacity-0", "invisible");
    backToTopButton.classList.add("opacity-100", "visible");
  } else {
    backToTopButton.classList.add("opacity-0", "invisible");
    backToTopButton.classList.remove("opacity-100", "visible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return; // Don't scroll to top if href is just #
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 20,
        behavior: "smooth",
      });
    }

    // Close mobile menu if open
    if (!mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
  });
});

let viewALLProducts = document.getElementById("view-all-products");
let showingAll = false; // Track state

// Updated renderProducts function in products.js
function renderProducts(showAll) {
  const container = document.getElementById("product-container");
  const button = document.getElementById("view-all-products");
  
  // Disable button during transition
  button.disabled = true;
  container.style.opacity = '0';
  container.style.transition = 'opacity 0.3s ease';

  setTimeout(() => {
      container.innerHTML = ""; // Clear existing content
      
      const productsToShow = showAll ? products : products.slice(0, 3);
      const fragment = document.createDocumentFragment();

      productsToShow.forEach((product) => {
          const productHTML = `
              <div class="bg-white rounded-lg overflow-hidden shadow-md product-card">
                  <img src="${product.image}" alt="${product.name}" 
                       class="w-full h-48 object-cover transition-transform duration-300">
                  <div class="p-6">
                      <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                      <p class="text-gray-600 mb-4">${product.description}</p>
                      <div class="flex justify-between items-center">
                          <span class="text-blue-600 font-bold">Rs ${product.price.toFixed(2)}</span>
                          <button class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 view-details" 
                                  data-product-id="${product.id}">
                              View Details
                          </button>
                      </div>
                  </div>
              </div>`;
          
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = productHTML;
          fragment.appendChild(tempDiv.firstElementChild);
      });

      container.appendChild(fragment);
      
      // Re-enable button and fade in
      requestAnimationFrame(() => {
          container.style.opacity = '1';
          button.disabled = false;
          viewALLProducts.textContent = showAll ? "Show Less Products" : "View All Products";
          addEventListenersToButtons();
      });
  }, 300); // Match transition duration
}

// Add CSS transition rule
const style = document.createElement('style');
style.textContent = `
  #product-container {
      transition: opacity 0.3s ease, transform 0.3s ease;
      will-change: opacity, transform;
  }
`;
document.head.appendChild(style);


// Initial render (show only 3 products)
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(false);
});

// Toggle products when button is clicked
viewALLProducts.addEventListener("click", function () {
  showingAll = !showingAll; // Toggle state
  renderProducts(showingAll);
});

// Section Fade In Animation
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

document.querySelectorAll(".section-fade").forEach((section) => {
  observer.observe(section);
});

// Product Details Modal Functionality
const modal = document.getElementById("product-modal");
const closeModal = document.getElementById("close-modal");
const modalContent = document.getElementById("modal-content");
const viewDetailsButtons = document.querySelectorAll(".view-details");



// Add event listeners to all view details buttons
function addEventListenersToButtons() {
    document.querySelectorAll(".view-details").forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-product-id");
            const product = products.find((p) => p.id === parseInt(productId));

            if (!product) return;

            modalContent.innerHTML = `
            <div class="flex flex-col md:flex-row">
                <div class="md:w-1/2 mb-4 md:mb-0 md:pr-6">
                    <img src="${product.image}" alt="${product.name}" class="rounded-lg w-full">
                </div>
                <div class="md:w-1/2">
                    <h2 class="text-2xl font-bold mb-2">${product.name}</h2>
                    <p class="text-blue-600 font-bold text-xl mb-4">Rs ${product.price.toFixed(2)}</p>
                    <p class="text-gray-600 mb-4">${product.description}</p>
                    <div class="mb-4">
                        <h3 class="font-semibold mb-2">Features:</h3>
                        <ul class="list-disc list-inside text-gray-600">
                            ${product.features.map((feature) => `<li>${feature}</li>`).join("")}
                        </ul>
                    </div>
                    <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded transition duration-300 w-full md:w-auto" onclick="orderNow('${product.name}', ${product.price})">
                       Order via WhatsApp  <i class="fa-brands fa-whatsapp m-1 text-2xl"></i>
                    </button>
                </div>
            </div>`;

            modal.style.display = "block";
            document.body.classList.add("modal-open");
        });
    });
}


// Close modal when clicking the close button
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
});

// Close modal when clicking outside the content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
});
