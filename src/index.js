// Function to fetch all ramen data from the server
async function fetchRamenData() {
    const response = await fetch('http://localhost:3000/ramens');
    const ramenData = await response.json();
    return ramenData;
  }
  
  // Function to display all ramen images in the menu
  function displayRamenMenu(ramenData) {
    const ramenMenuDiv = document.getElementById('ramen-menu');
  
    ramenData.forEach((ramen) => {
      const ramenImage = document.createElement('img');
      ramenImage.src = ramen.image;
      ramenImage.alt = ramen.name;
      ramenImage.addEventListener('click', () => {
        displayRamenDetails(ramen);
      });
  
      ramenMenuDiv.appendChild(ramenImage);
    });
  }
  
  // Function to display ramen details in the detail section
  function displayRamenDetails(ramen) {
    const detailImage = document.querySelector('.detail-image');
    const nameElement = document.querySelector('.name');
    const restaurantElement = document.querySelector('.restaurant');
    const ratingDisplay = document.getElementById('rating-display');
    const commentDisplay = document.getElementById('comment-display');
  
    detailImage.src = ramen.image;
    detailImage.alt = ramen.name;
    nameElement.textContent = ramen.name;
    restaurantElement.textContent = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating;
    commentDisplay.textContent = ramen.comment;
  }
  
  // Function to handle the form submission for adding a new ramen
  async function handleNewRamenForm(event) {
    event.preventDefault();
  
    const nameInput = document.getElementById('new-name');
    const restaurantInput = document.getElementById('new-restaurant');
    const imageInput = document.getElementById('new-image');
    const ratingInput = document.getElementById('new-rating');
    const commentInput = document.getElementById('new-comment');
  
    const newRamen = {
      name: nameInput.value,
      restaurant: restaurantInput.value,
      image: imageInput.value,
      rating: parseFloat(ratingInput.value),
      comment: commentInput.value,
    };
  
    // Add the new ramen to the menu
    displayRamenInMenu(newRamen);
  
    // Reset the form
    event.target.reset();
  }
  
  // Function to add a new ramen to the menu
  function displayRamenInMenu(ramen) {
    const ramenMenuDiv = document.getElementById('ramen-menu');
    const newRamenImage = document.createElement('img');
    newRamenImage.src = ramen.image;
    newRamenImage.alt = ramen.name;
    newRamenImage.addEventListener('click', () => {
      displayRamenDetails(ramen);
    });
  
    ramenMenuDiv.appendChild(newRamenImage);
  }
  
  // Add event listener to the new ramen form
  const newRamenForm = document.getElementById('new-ramen');
  newRamenForm.addEventListener('submit', handleNewRamenForm);
  
  // Fetch all ramen data and display the menu
  fetchRamenData()
    .then((ramenData) => {
      displayRamenMenu(ramenData);
  
      // Display details for the first ramen by default
      if (ramenData.length > 0) {
        displayRamenDetails(ramenData[0]);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  