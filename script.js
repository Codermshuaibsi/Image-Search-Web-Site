let prev = document.getElementById("prev");
let next = document.getElementById("next");

let page = 1; // Initialize the current page

let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  let photos = document.getElementById("photo");
  photos.innerHTML = ""; // Clear the photos before fetching new ones

  let input = document.getElementById("input");
  let inp = input.value;

  //API URL with the current page number
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inp}&client_id=cCuJpa6_vb4-yfmCBUVOj0gw1GzMeYiUoHVwQu4iTFY`;
  
  // Clear the input text after submitting
  inp.innerText = "";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const images = data.results; // Get the array of images from the API response

      // Append images to the photos container
      images.forEach((image) => {
        const img = document.createElement("img");
        img.src = image.urls.small; // Use the small size of the image
        img.alt = image.alt_description; // Set the alt text for accessibility
        photos.appendChild(img); // Append the image to the container
      });

      // Enable or disable the "Previous" and "Next" buttons based on the data
      prev.disabled = page === 1; // Disable "Previous" on the first page
      next.disabled = images.length === 0; // Disable "Next" if there are no images
    })
    .catch((err) => {
      console.error(err);
    });
});

// Function to handle "Next" button
next.addEventListener("click", () => {
  page++; // Increment page number for next page
  let input = document.getElementById("input");
  let inp = input.value;
  
  // Call the button click handler again to fetch next page
  fetchImages(inp);
});

// Function to handle "Previous" button
prev.addEventListener("click", () => {
  if (page > 1) {
    page--; // Decrement page number for previous page
    let input = document.getElementById("input");
    let inp = input.value;
    
    // Call the button click handler again to fetch previous page
    fetchImages(inp);
  }
});

// Function to fetch images (reusable)
function fetchImages(query) {
  let photos = document.getElementById("photo");
  photos.innerHTML = ""; // Clear photos

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=cCuJpa6_vb4-yfmCBUVOj0gw1GzMeYiUoHVwQu4iTFY`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const images = data.results;

      images.forEach((image) => {
        const img = document.createElement("img");
        img.src = image.urls.small;
        img.alt = image.alt_description;
        photos.appendChild(img);
      });

      // Enable or disable the buttons based on the current page
      prev.disabled = page === 1;
      next.disabled = images.length === 0; // Disable next if no images are returned
    })
    .catch((err) => {
      console.error(err);
    });
}
