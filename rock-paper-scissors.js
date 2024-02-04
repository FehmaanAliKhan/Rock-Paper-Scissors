let score = JSON.parse(localStorage.getItem('score'));

      if (score === null) {
        score = {
          W: 0,
          L: 0,
          T: 0
        }
      };

      updateScoreElement();

      let isAutoPlaying = false;
      let intervalId;

      function autoplay () {
        if (!isAutoPlaying) {
          intervalId = setInterval(function () {
            const playerMove = movePicker();
            playGame(playerMove);
          }, 1500);
          isAutoPlaying = true;
        } else {
          clearInterval(intervalId);
          isAutoPlaying = false;
        }
      }
      
      function playGame (playerMove) {
        const compMove = movePicker();
    
        let ans = '';

        if (playerMove === 'Scissors') {
          if (compMove === 'Rock') {
            ans = 'You lose meri jan.';
          } else if (compMove === 'Paper') {
            ans = 'You win meri jan.';
          } else if (compMove === 'Scissors') {
            ans = 'Tie.';
          }

        } else if (playerMove === 'Paper') {
          if (compMove === 'Rock') {
            ans = 'You win meri jan.';
          } else if (compMove === 'Paper') {
            ans = 'Tie.';
          } else if (compMove === 'Scissors') {
            ans = 'You lose meri jan.';
          }

        } else if (playerMove === 'Rock') {
          if (compMove === 'Rock') {
            ans = 'Tie.';
          } else if (compMove === 'Paper') {
            ans = 'You lose meri jan.';
          } else if (compMove === 'Scissors') {
            ans = 'You win meri jan.';
          }
        }

        if (ans === 'You win meri jan.') {
          score.W += 1
        } else if (ans === 'You lose meri jan.') {
          score.L += 1
        } else if (ans === 'Tie.') {
          score.T += 1
        } 

        localStorage.setItem('score', JSON.stringify(score));

        updateScoreElement();

        document.querySelector('.js-ans').innerHTML = ans;

        document.querySelector('.js-moves').innerHTML = ` You picked
      <img src="${playerMove}-emoji.png" class="move-icon">
      AI picked
      <img src="${compMove}-emoji.png" class="move-icon">`;
      }

      function updateScoreElement () {
        document.querySelector('.js-score')
          .innerHTML = `Wins: ${score.W} | Losses: ${score.L} | Ties: ${score.T}`;
      }

      function movePicker() {
        const RandomNum = Math.random();

        let compMove = '';

        if (RandomNum >= 0 && RandomNum < 1/3) {
          compMove = 'Rock';
        } else if (RandomNum >= 1/3 && RandomNum < 2/3) {
          compMove = 'Paper';
        } else if (RandomNum >= 2/3 && RandomNum < 1) {
          compMove = 'Scissors';
        }

        return compMove;
      }