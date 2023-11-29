// Replace 'YOUR_API_KEY' with your actual Pexels API key
apiKey = 'le2A6ZGlRehlD4SAz7n3jYlKeXWLWCLnwTzKHbxu6JLZXV8ItBJEtfXV';
const submit = document.getElementById("submitBtn")
const imgContainer = document.getElementById("imgcontainer")

submit.addEventListener("click", getImg)


function getImg(e) {
  e.preventDefault();

  const searchstring = document.getElementById("pexelimg").value
  if (searchstring === "") return;

  const apiUrl = 'https://api.pexels.com/v1/search?query=' + searchstring + '&per_page=8';
  console.log(searchstring);
  fetch(apiUrl, {
    headers: {
      Authorization: apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      // Process the data returned from the API
      console.log(data)

      const per_page = data.per_page
      const photos = data.photos

      imgContainer.innerHTML = ""
      for (let photo of photos) {
        const img = document.createElement("img")
        img.src = photo.src.medium
        img.alt = photo.alt
        imgContainer.appendChild(img)
      }

    })
    .catch(error => {

      console.error('Error fetching data:', error);
    });
}
