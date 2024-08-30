import * as Carousel from "./carousel.js";

//USE YOUR OWN API KEY!!!
import { API_KEY } from "./key.js";
// import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
axios.defaults.headers.common['x-api-key'] = API_KEY;
/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

const breedUrl = `https://api.thecatapi.com/v1/breeds`;
async function initialLoad(){
  const res = await axios.get(breedUrl, {
  onDownloadProgress: updateProgress
});
  const data = res.data;
  data.forEach((breed) => {
    const option = document.createElement('option');
    option.textContent = breed.name;
    option.setAttribute('value', breed.id);
    breedSelect.appendChild(option);
  })
}
initialLoad();

//interceptors

axios.interceptors.request.use((request) => {
  request.metadata = request.metadata || {};
  request.metadata.startTime = new Date().getTime();
  
  console.log("Sending request....");
// reset the progressBar to 0
  progressBar.style.width = '0px';
  //show cursor progress when requesting
  document.body.style.cursor = 'progress';

  return request;
});

axios.interceptors.response.use(
  (response) => {
    response.config.metadata.endTime = new Date().getTime();
    response.config.metadata.durationInMS =
      response.config.metadata.endTime - response.config.metadata.startTime;

    console.log("Response completed....");
    //default cursor after getting response
    document.body.style.cursor = '';
    console.log(
      `Request took ${response.config.metadata.durationInMS} milliseconds.`,
    );
    return response;
  },
  (error) => {
    error.config.metadata.endTime = new Date().getTime();
    error.config.metadata.durationInMS =
      error.config.metadata.endTime - error.config.metadata.startTime;

    console.log(
      `Request took ${error.config.metadata.durationInMS} milliseconds.`,
    );
    throw error;
  },
);


/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */



breedSelect.addEventListener("change", async (e) => {
  e.preventDefault();
  const res = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedSelect.value}`, {
  onDownloadProgress: updateProgress
});
  const data = res.data;
  console.log(data);
  Carousel.clear();
  data.forEach((entry)=>{
    const item = Carousel.createCarouselItem(entry.url, entry.breeds[0].name, entry.id);
    Carousel.appendCarousel(item);
    infoDump.textContent = entry.breeds[0].description;
  });
  Carousel.start();
});


/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */



/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

function updateProgress(progressEvent) {
  console.log(`${progressEvent}`);

  if (progressEvent.lengthComputable) {
    progressBar.style.width = progressEvent.total + 'px';
  }

}

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
  // axios.get('https://api.thecatapi.com/v1/favourites')
  // .then((res) => {
  //   res.data.forEach((item) => {
  //     axios.delete(`https://api.thecatapi.com/v1/favourites/${item.id}`)
  //   })
  // }); 
  //get all favorite images
  axios.get('https://api.thecatapi.com/v1/favourites')
  .then((res) => {
    console.log(`FAV===> ${res.data}`);
    if(res.data.some(e => e.image_id === imgId)){
      console.log('DELETING');
      const deletedItem = res.data.find(e => e.image_id === imgId);
      axios.delete(`https://api.thecatapi.com/v1/favourites/${deletedItem.id}`);
    } else{
      console.log('ADDING');
      axios.post('https://api.thecatapi.com/v1/favourites', {image_id: imgId}).then(res => console.log(res));
    }
  });
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

getFavouritesBtn.addEventListener('click', getFavourites);

async function getFavourites(){
  infoDump.textContent = '';
  axios.get('https://api.thecatapi.com/v1/favourites')
  .then(res => {
    console.log('All favs', res.data);
    Carousel.clear();
    res.data.forEach(item => {
      const element = Carousel.createCarouselItem(item.image.url, item.image_id, item.image.id);
      Carousel.appendCarousel(element);
    })
  })
}


/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
