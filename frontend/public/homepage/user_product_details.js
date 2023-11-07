// Function to get query parameter value from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  // Get the productID from the URL query parameter
const productID = getQueryParam('productID');

const productDetails = JSON.parse(sessionStorage.getItem('productsByCategory'));

const product = productDetails.find(product => product.productid === parseInt(productID));

// Get a reference to the container element in your HTML where you want to add the product details
const productContainer = document.querySelector('.productDetails');

if (product) {
  // Create the elements for product details

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('productDetailsImage'); // Use the new image container class
  
  const productImage = document.createElement('img');
  productImage.src = product.imageurl;

  const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('productDetailsDescription'); // Use the new description container class

  const productName = document.createElement('h1');
  productName.textContent = product.name;

  const productPrice = document.createElement('h2');
  productPrice.textContent = `From $${product.price} SGD`;

  const productDescription = document.createElement('p');
  productDescription.textContent = product.description;

  const productStock = document.createElement('h3');
  productStock.textContent = `Stock: ${product.stockquantity}`;

  imageContainer.appendChild(productImage);

  descriptionContainer.appendChild(productName);
    descriptionContainer.appendChild(productPrice);
    descriptionContainer.appendChild(productDescription);
    descriptionContainer.appendChild(productStock);

    productContainer.appendChild(imageContainer);
    productContainer.appendChild(descriptionContainer);

  // Append the created elements to the container
//   productContainer.appendChild(productImage);
//   productContainer.appendChild(productName);
//   productContainer.appendChild(productPrice);
//   productContainer.appendChild(productDescription);
//   productContainer.appendChild(productStock);
} else {
  // Handle the case where the product details are not found
  // You can display an error message or handle it as needed.
}

