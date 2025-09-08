

let pokemonGuess = Math.floor(Math.random()*1025)
let pokemonName = ""
let chainCount = 1
let pokemonChain = [];

let url = 'https://pokeapi.co/api/v2/pokemon/'+ pokemonGuess +'/';

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#chain-head-img').src = data.sprites.front_default;
        document.querySelector('#first-card-img').src = data.sprites.front_default;
        document.querySelector('#chain-head-name').innerText = data.name;
        pokemonName = data.name;
        document.querySelector('#first-card-name').innerText = data.name;
        pokemonName = data.name;
        pokemonChain.push(data.name)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });


document.querySelector('button').addEventListener('click', addToChain)

function addToChain(){
  pokemonGuess = document.querySelector('input').value.toLowerCase()
  
  //check for matching letter in chain
  if (pokemonName[pokemonName.length -1] !== pokemonGuess[0]){
    document.querySelector('.error-message').innerText = "Pokemon name does not start with the correct letter!";
  } else {
    document.querySelector('.error-message').innerText = "";
  
  
  //check for duplicates
  if (pokemonChain.indexOf(pokemonGuess) >= 0){
    document.querySelector('.error-message').innerText = "This pokemon has already been chained!";
  } else {

    url = 'https://pokeapi.co/api/v2/pokemon/'+ pokemonGuess +'/';

    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('img').src = data.sprites.front_default;
        document.querySelector('h3').innerText += "-" + data.name;
        pokemonName = data.name;
        pokemonChain.push(pokemonName);
        document.querySelector('h2').innerText = `Enter the name of a pokemon starting with the last letter of this pokemon: ${pokemonName}`
        chainCount += 1;
        document.querySelector('.active-chain').innerText = `${chainCount}`

        let li = document.createElement('li');
        let div = document.createElement('div');
        let img = document.createElement('img');
        let h3 = document.createElement('h3');
        h3.innerText = pokemonName;
        img.src = data.sprites.front_default;
        img.alt = pokemonName;
        div.appendChild(img);
        div.appendChild(h3);
        div.classList.add("card");
        li.appendChild(div);
        document.querySelector("ul").appendChild(li);

      })
      .catch(err => {
          console.log(`error ${err}`)
          document.querySelector('.error-message').innerText = "Pokemon does not exist! Check your spelling";
      });
  }
}
}
