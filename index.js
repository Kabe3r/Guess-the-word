window.addEventListener("load", loaded);
let count = 0;
let startTime;
const url = "https://random-word-api.herokuapp.com/word?lang=en&number=15";
let myWords = [];

function fetchUrl() {
      fetch(url)
      .then(function(response) {
            return response.json();
      })
      .then(function(words) {
            return words.map(function(word) {
                return myWords.push(word);
            }); 
      });
}

function loaded() {
      fetchUrl();
      createElements();
      document.querySelector("button").addEventListener('click', start);
}

function createElements() {
      let div = document.createElement("div");
      div.setAttribute("class", "message");
      div.innerText = "Press Start Button";
      document.body.appendChild(div);
      let divOne = document.createElement("div");
      divOne.setAttribute("class", "response");
      document.body.appendChild(divOne);
      let button = document.createElement("button");
      button.innerText = "Start Game";
      document.body.appendChild(button);
      let divTwo = document.createElement("div");
      divTwo.setAttribute("class", "game");
      document.body.appendChild(divTwo);
}

function start() {
      count = 0;
      score = 0;
      startTime = Date.parse(new Date());
      this.style.display = "none";
      response("Click The Correct Box");
      let diffArr = myWords.slice(0);
      diffArr.sort(function(a, b) {
            return 0.5 - Math.random();
      });
      myWords.sort(function(a, b) {
            return 0.5 - Math.random();
      });
      const game = document.querySelector(".game");
      diffArr.forEach(function(item) {
            let random = item.split("");
            random.sort(function(a, b)  {
                  return 0.5 - Math.random(); 
            });
            let randomStr = random.join("");
            let div = document.createElement("div");
            div.innerHTML = "Select"
            div.setAttribute("class", "box");
            div.style.backgroundColor = "#fe5d26";
            div.word = item;
            div.addEventListener("mouseenter", function() {
                  div.style.backgroundColor = "#7209b7";
                  div.innerText = randomStr;
            });
            div.addEventListener("mouseleave", function() {
                  div.style.backgroundColor = "#fe5d26";
                  div.innerText = "Select";
            });
            div.addEventListener("click", function() {
                  if (div.word === myWords[count]) {
                        this.classList.add("hidden");
                        count++;
                        response("Correct 👌, Next?")
                        nextWord();
                  } else {
                  div.style.backgroundColor = "red";
                  response("Wrong, Try Again😛")

            }
      });
      game.appendChild(div);  
});
nextWord();
}

function nextWord() {
      if (count >= myWords.length) {
            let endTime = Date.parse(new Date());
            let duration = (endTime - startTime) / 1000;
            document.querySelector(".game").innerHTML = ""; 
            const btn = document.querySelector("button");
            btn.style.display = "block";
            btn.style.margin = "1rem auto";
            btn.innerText = "New Game";
            message("Game Over: Total time in playing " + duration+" seconds");
            response("Well Played 🏆")
            myWords = []; 
      } else {
            message("Select this Word: " + myWords[count]); 
      }
      if (myWords.length === 0) {
            fetchUrl();
      }
}

function message(output) {
      document.querySelector(".message").innerHTML = output;
}

function response(result) {
      document.querySelector(".response").innerHTML = result;
}