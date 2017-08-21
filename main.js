/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let url = 'https://itunes.apple.com/search?term=';
let button = document.getElementById('search_form');

button.addEventListener('submit', function(event) {
 event.preventDefault();
  let input = document.querySelector('.search_media').value;
  let search = url + input;

  fetch(search)
    .then(function(response) {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }
      response.json().then(function(data) {
        document.getElementById('results').innerHTML = '';
        for (let i = 0; i < data.results.length; i ++) {
          let boxes = document.createElement('div');
          boxes.setAttribute('class', 'box');
          let markup =
          `
          <p><img src = ${data.results[i].artworkUrl100} class = 'picture'></p>
          <p>${data.results[i].trackName}</p>
          <p>${data.results[i].artistName}</p>
          `
          boxes.innerHTML = markup;
          let box = document.getElementById('results');
          box.appendChild(boxes);
          let click = boxes.querySelector('.picture');
          click.addEventListener('click', function(event){
            let music = document.getElementById('controls');
            music.innerHTML = `<audio controls autoplay><source src = '${data.results[i].previewUrl}' type = 'audio/wav'></audio>`
          })
    }
  })
}
)
})
