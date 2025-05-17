import Game from './game';
import Gameboard from './gameboard';

const DisplayController = (() => {
  const boardElement = document.getElementById('gameboard');
  const messageElement = document.getElementById('message');
  const player1Input = document.getElementById('player1');
  const player2Input = document.getElementById('player2');
  const startButton = document.getElementById('start-btn');
  const restartButton = document.getElementById('restart-btn');

  const renderBoard = () => {
    boardElement.innerHTML = '';
    Gameboard.getBoard().forEach((cell, index) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.dataset.index = index;
      cellElement.textContent = cell;
      boardElement.appendChild(cellElement);
    });
  };

  const handleCellClick = (e) => {
    if (!e.target.classList.contains('cell') || Game.isGameOver()) return;
    
    const index = e.target.dataset.index;
    const result = Game.playTurn(index);
    
    if (result) {
      renderBoard();
      if (result.gameOver) {
        const message = result.winner === 'draw' 
          ? "Победила ДРУЖБА!" 
          : `${Game.getCurrentPlayer().name} ПОБЕДИЛ!`;
        messageElement.textContent = message;
      }
    }
  };

  const handleStartGame = () => {
    const player1Name = player1Input.value || 'Player 1';
    const player2Name = player2Input.value || 'Player 2';
    Game.start(player1Name, player2Name);
    messageElement.textContent = `${Game.getCurrentPlayer().name} ходит`;
    renderBoard();
  };

  const bindEvents = () => {
    boardElement.addEventListener('click', handleCellClick);
    startButton.addEventListener('click', handleStartGame);
    restartButton.addEventListener('click', handleStartGame);
  };

  const init = () => {
    bindEvents();
    renderBoard();
  };

  return { init };
})();

export default DisplayController;