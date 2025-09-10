
document.querySelector('input').value = '';

let pokemonGuess = Math.floor(Math.random()*1025);
let pokemonName = "";
let chainCount = 1;
let pokemonChain = [];
let topScore = 0;
let lives = 3;
let leaderboardData = [];


//check for stored top score
if (localStorage.getItem("topScore")){
  topScore = localStorage.getItem("topScore");
  document.querySelector(".top-score").innerText = topScore;
}


//Fetch initial random pokemon from pokemon api
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

//fetch leaderboard data from local storage or server
if(localStorage.getItem("leaderboard")){    
  leaderboardData = JSON.parse(localStorage.getItem("leaderboard"));
  displayLeaderboard(leaderboardData);
}else {
  fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        leaderboardData = data;
        localStorage.setItem("leaderboard", JSON.stringify(data));
        displayLeaderboard(data);
      })
      .catch(err => {
          console.log(`Server not available, using default data: ${err}`);
      
      // Default leaderboard data for client-side only
      leaderboardData = [
        {score: 3, name: "name", country: "country"}, 
        {score: 2, name: "name", country: "country"}, 
        {score: 1, name: "name", country: "country"}
      ];
      
      // Save defaults to localStorage
      localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
      displayLeaderboard(leaderboardData);
      });
    }

function displayLeaderboard(data){
    // Clear current table
  document.querySelector('tbody').innerHTML = '';
  
  let limit = Math.min(20, data.length);
  for(let i = 0; i < limit; i++) {
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    td1.innerText = data[i].score;
    td2.innerText = data[i].name;
    td3.innerText = data[i].country;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    document.querySelector('tbody').appendChild(tr);
  }
}

function loseHeart(){
  lives -= 1;
  if (lives === 2){
    document.querySelector('#life-1').innerText = "♡ "
  } else if (lives === 1){
    document.querySelector('#life-2').innerText = "♡ "
  } else {
    document.querySelector('#life-3').innerText = "♡ "
    document.querySelector('.error-message').innerText += "- GAME OVER"
    document.querySelector('.active-game-input').classList.add('hidden')
    document.querySelector('.active-game-button').classList.add('hidden')
    document.querySelector('#new-game').classList.toggle('hidden')
    checkQualifyLeaderboard();
  }
}

document.querySelector('#chain-button').addEventListener('click', addToChain)

function addToChain(){
  pokemonGuess = document.querySelector('input').value.toLowerCase()
  
  //check for matching letter in chain
  if (pokemonName[pokemonName.length -1] !== pokemonGuess[0]){
    document.querySelector('.error-message').innerText = "Pokemon name does not start with the correct letter!";
    loseHeart();
  } else {
    document.querySelector('.error-message').innerText = "";
  
  
  //check for duplicates
  if (pokemonChain.indexOf(pokemonGuess) >= 0){
    document.querySelector('.error-message').innerText = "This pokemon has already been chained!";
    loseHeart();
  } else {

    url = 'https://pokeapi.co/api/v2/pokemon/'+ pokemonGuess +'/';

    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#chain-head-img').src = data.sprites.front_default;
        document.querySelector('#chain-head-name').innerText = data.name;
        pokemonName = data.name;
        pokemonChain.push(pokemonName);
        
        //score keeping
        chainCount += 1;
        document.querySelector('.active-chain').innerText = `${chainCount}`
        if (chainCount > topScore){
          topScore = chainCount;
          localStorage.setItem("topScore", topScore)
          document.querySelector(".top-score").innerText = topScore;
        }


        //card chain images
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

        //clear the input
        document.querySelector('input').value = '';

      })
      .catch(err => {
          console.log(`error ${err}`)
          document.querySelector('.error-message').innerText = "Pokemon does not exist! Check your spelling";
          loseHeart();
      });
  }
}
}

function checkQualifyLeaderboard() {
  // Check if current score qualifies for top 20
  if (leaderboardData.length < 20 || chainCount > leaderboardData[leaderboardData.length - 1].score) {
    showLeaderboardModal()
  }
}


//document.querySelector('.modal-btn.cancel').addEventListener('click', closeModal)
//document.querySelector('.modal-btn.confirm').addEventListener('click', submitLeaderboard)

// Submit the form
function submitLeaderboard() {
  clearErrors();
  
  const playerName = document.getElementById('player-name').value.trim();
  const playerCountry = document.getElementById('player-country').value;
  let hasErrors = false;
  
  if (!playerName) {
    showError('name-error', 'Please enter your name!');
    hasErrors = true;
  }
            
  if (!playerCountry) {
    showError('country-error', 'Please select your country!');
    hasErrors = true;
  }

  if (hasErrors) {
    return;
  }
            
  updateLeaderboard(playerName, playerCountry);
  console.log('Player data:', { playerName, playerCountry});
            
  // Close modal after successful submission
  closeModal();
  document.querySelector('.error-message').innerText += `
  🎉 ${name} added to leaderboard!`;
}

// Close modal when clicking outside
document.getElementById('modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});

// Handle Enter key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.getElementById('modal-overlay').classList.contains('show')) {
    submitLeaderboard();
  } else if (e.key === 'Escape') {
    closeModal();
  }
});

function updateLeaderboard(playerName, playerCountry){
  leaderboardData.push({
    name: playerName,
    score: chainCount,
    country: playerCountry
  });
      
  // Sort by score (highest first)
  leaderboardData.sort((a, b) => b.score - a.score);
      
  // Keep only top 20
  leaderboardData = leaderboardData.slice(0, 20);
      
  // Save to localStorage
  localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
      
  // Update display
  displayLeaderboard(leaderboardData);
}



// Show the modal
function showLeaderboardModal() {
  document.getElementById('modal-overlay').classList.add('show');
  document.getElementById('player-name').focus();
}

// Close the modal
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('show');
  // Clear inputs
  document.getElementById('player-name').value = '';
  document.getElementById('player-country').value = '';
}
