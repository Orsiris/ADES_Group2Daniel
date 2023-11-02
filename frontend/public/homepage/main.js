let glide; // Declare a variable to store the Glide.js instance

function initGlide() {
  glide = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    animationDuration: 1000,
    
    // Add pagination
    pagination: {
      el: '.glide__bullets',
    },
  });

  glide.mount();
}

const backendUrl = 'http://localhost:8081';

// Function to fetch data from your API
async function fetchDataFromAPI() {
    try {
      const response = await axios.get(backendUrl + '/getFeaturedImages');
      console.log(response.data)
      return response.data; // Assuming the data format includes image URL, title, and description
    } catch (error) {
      console.error('Error fetching data from the API:', error);
      return null;
    }
  }

  async function preloadImages(imageUrls) {
    return Promise.all(
      imageUrls.map((imageUrl) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = imageUrl;
          img.onload = resolve;
          img.onerror = reject;
        });
      })
    );
  }
  
  
  // Function to update slide content and styles based on fetched data
  async function updateSlideContent() {
    const data = await fetchDataFromAPI();
    if (!data) return;
  
    await preloadImages(data.map((item) => item.image_url));
  
    // Destroy the existing Glide.js instance
    if (glide) {
      glide.destroy();
    }
  
    // Loop through the slides and update their content and styles
    for (let i = 0; i < data.length; i++) {
      const slide = document.getElementById(`slide${i + 1}`);
      const titleElement = slide.querySelector('.titleOfProduct');
      const descElement = slide.querySelector('.prodDesc');
  
      // Set the background image
      slide.style.backgroundImage = `url(${data[i].image_url})`;
  
      // Set the title and description
      titleElement.textContent = data[i].title;
      descElement.textContent = data[i].description;
    }
  
    // Reinitialize Glide.js
    initGlide();
  }
  
  // Call the function to update slide content when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    initGlide(); // Initialize Glide.js
    updateSlideContent(); // Update slide content
  });