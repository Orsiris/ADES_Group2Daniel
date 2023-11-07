const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const categoryContent = getCategoryContent(category);
const categoryTitleElement = document.getElementById("categoryTitle");
const categoryDescriptionElement = document.getElementById(
  "categoryDescription"
);
const categoryImageElement = document.getElementById("categoryImage");

categoryTitleElement.textContent = categoryContent.title;
categoryDescriptionElement.textContent = categoryContent.description;
categoryImageElement.src = categoryContent.image;
//WILL CHANGE LATER
function getCategoryContent(category) {
  // You can define content for each category here
  switch (category) {
    case "Living Room":
      return {
        title: "Living Room",
        image: "../img/living.jpg",
        description:
          "Step into the heart of your home, the living room, where comfort and style come together to create a haven for relaxation and gatherings. Our carefully curated collection of living room furniture brings you the best in comfort, aesthetics, and functionality.  Your living room is not just a space its a canvas for self-expression and a stage for the moments that matter most. Explore our collection today and transform your living room into a sanctuary of comfort, sophistication, and functionality.",
      };
    case "Bedroom":
      return {
        title: "Bedroom",
        image: "../img/bedroom.jpg",
        description:
          "Vivamus dignissim pharetra pulvinar. Mauris porttitor sapien id erat mollis convallis. Pellentesque ac efficitur nisl, tristique commodo lacus. Nam tempus tempus neque in venenatis. Vivamus vitae consequat nibh. Nulla dui lectus, efficitur sed ex nec, feugiat euismod quam. Nulla ac fringilla tortor. Nullam quis erat id diam lacinia blandit. Quisque ut elit vehicula, molestie nunc id, molestie risus.",
      };

      case "Outdoor":
      return {
        title: "Outdoor",
        image: "../img/outdoor.jpg",
        description:
          "Vivamus dignissim pharetra pulvinar. Mauris porttitor sapien id erat mollis convallis. Pellentesque ac efficitur nisl, tristique commodo lacus. Nam tempus tempus neque in venenatis. Vivamus vitae consequat nibh. Nulla dui lectus, efficitur sed ex nec, feugiat euismod quam. Nulla ac fringilla tortor. Nullam quis erat id diam lacinia blandit. Quisque ut elit vehicula, molestie nunc id, molestie risus.",
      };

      case "Dining Room":
      return {
        title: "Dining Room",
        image: "../img/dining.jpg",
        description:
          "Vivamus dignissim pharetra pulvinar. Mauris porttitor sapien id erat mollis convallis. Pellentesque ac efficitur nisl, tristique commodo lacus. Nam tempus tempus neque in venenatis. Vivamus vitae consequat nibh. Nulla dui lectus, efficitur sed ex nec, feugiat euismod quam. Nulla ac fringilla tortor. Nullam quis erat id diam lacinia blandit. Quisque ut elit vehicula, molestie nunc id, molestie risus.",
      };

      case "All Collections":
        return {
          title: "All Collections",
          image: "../img/allProduct.jpg",
          description:
            "Vivamus dignissim pharetra pulvinar. Mauris porttitor sapien id erat mollis convallis. Pellentesque ac efficitur nisl, tristique commodo lacus. Nam tempus tempus neque in venenatis. Vivamus vitae consequat nibh. Nulla dui lectus, efficitur sed ex nec, feugiat euismod quam. Nulla ac fringilla tortor. Nullam quis erat id diam lacinia blandit. Quisque ut elit vehicula, molestie nunc id, molestie risus.",
        };
   
    default:
      return {
        title: "Default Title",
        description: "Default Description for unknown category",
      };
  }
}

// Retrieve product data from sessionStorage
const productData = JSON.parse(sessionStorage.getItem("productsSelected"));

// Get a reference to the grid container
const gridContainer = document.querySelector(".grid-container");

// Check if the product data exists
if (productData && Array.isArray(productData)) {
  // Iterate through the product data
  productData.forEach((product) => {
    // Create a new anchor element (a) to make each grid-item a link
    const productLink = document.createElement("a");
    productLink.classList.add("grid-item-link"); // Add a class for styling if needed
    // Construct the URL for the product details page with the selected productID as a query parameter
    productLink.href = `product_details.html?productID=${product.productid}`;

    // Create a new grid item (div element)
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("grid-image"); // Use the new image container class

    // Create and configure an image element
    const img = document.createElement("img");
    img.src = product.imageurl;

    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("grid-description"); // Use the new description container class

    // Create and configure an h2 element for the title
    const title = document.createElement("h2");
    title.textContent = product.name;

    // Create and configure an h3 element for the price
    const price = document.createElement("h3");
    price.textContent = `From $${product.price} SGD`;

    imageContainer.appendChild(img);

    descriptionContainer.appendChild(title);
    descriptionContainer.appendChild(price);

    // Append the image, title, and price to the grid item
    gridItem.appendChild(imageContainer);
    gridItem.appendChild(descriptionContainer);

    // Append the grid item to the anchor element
    productLink.appendChild(gridItem);

    // Append the anchor element to the grid container
    gridContainer.appendChild(productLink);
  });
} else {
  // Handle the case where there is no product data
  console.log("No product data available.");
}
