// High score to store in local storage
// Timed game - toggle on and off?
// Make look nice

let pokemonGuess = Math.floor(Math.random()*1025)
let pokemonName = ""
let chainCount = 1

let url = 'https://pokeapi.co/api/v2/pokemon/'+ pokemonGuess +'/';

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('img').src = data.sprites.front_default;
        document.querySelector('h3').innerText = data.name;
        pokemonName = data.name;
      })
      .catch(err => {
          console.log(`error ${err}`)
      });


document.querySelector('button').addEventListener('click', addToChain)

function addToChain(){
  pokemonGuess = document.querySelector('input').value.toLowerCase()
  
  //check for matching letter in chain
  if (pokemonName[pokemonName.length -1] !== pokemonGuess[0]){
    document.querySelector('h4').innerText = "Pokemon name does not start with the correct letter!";
  } else {
    document.querySelector('h4').innerText = "";
  
  
  //check for duplicates
  if (document.querySelector('h3').innerText.split('-').indexOf(pokemonGuess) >= 0){
    document.querySelector('h4').innerText = "This pokemon has already been chained!";
  } else {

    url = 'https://pokeapi.co/api/v2/pokemon/'+ pokemonGuess +'/';

    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('img').src = data.sprites.front_default;
        document.querySelector('h3').innerText += "-" + data.name;
        pokemonName = data.name;
        document.querySelector('h2').innerText = `Enter the name of a pokemon starting with the last letter of this pokemon: ${pokemonName}`
        chainCount += 1;
        document.querySelector('span').innerText = `Chain count: ${chainCount}`
      })
      .catch(err => {
          console.log(`error ${err}`)
          document.querySelector('h4').innerText = "Pokemon does not exist! Check your spelling";
      });
  }
}
}
