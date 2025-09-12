<img width="373" height="69" alt="pokemon-chains-logo" src="https://github.com/user-attachments/assets/4964497c-23ac-4063-90ef-2d9cb2aeb774" />


# Pokemon Chains
Simple web app game

**Link to project:** https://mstouttech.github.io/pokemon-chains/public/index

![pokemon-chains-demo-v1](https://github.com/user-attachments/assets/f2748ef4-40da-484a-9197-0bb7b2743c9f)



## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js

This app started as an exercise to understand how to request information from outside APIs. I am using https://pokeapi.co/ to fetch names and image sprites.

Next, local storage was implemented to save the local user's top score and also the updated leaderboard.

The leaderboard was used to practice making calls to server.js using node, no express, and a hard-coded data set. This is the reason why there is also fallback data with no flag emojis on the leaderboard for the static site and why I had to use local storage for the updated leaderboard.

## Optimizations

- [ ] Make site responsive
- [ ] Improve accessibility with alt text and WCAG standards
- [ ] Improving web sustainability with WSG and checking website carbon footprint
- [ ] Improve design: a few more animations, make the top score on leaderboard stand out more
- [ ] Improve user experience: enter button for chaining pokemon, add text to remind user of previous submission, handling pokemon with characters in their name -like nidoran
- [ ] End game when there are no more unique pokemon starting with that letter

## Lessons Learned:

I learned about modal overlays, how to style tables, this was my first project I implemented flexbox for layout instead of floats. For what seems like a simple game, there are a lot of functions that I had to keep track of. 
This was a great example to me of why project planning or having a design in mind at the beginning helps a lot more for planning class or id names to help keep styles and variables organized. Adding on additional functionality later starts to create a mess to have to sort through.
