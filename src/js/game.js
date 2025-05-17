import Gameboard from './gameboard';
import Player from './player';

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = (player1Name, player2Name) => {
    players = [
      Player(player1Name, 'X'),
      Player(player2Name, 'O')
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.resetBoard();
  };

  const getCurrentPlayer = () => players[currentPlayerIndex];

  const playTurn = (cellIndex) => {
    if (gameOver) return false;

    const currentPlayer = getCurrentPlayer();
    if (Gameboard.markCell(cellIndex, currentPlayer.marker)) {
      const winner = Gameboard.checkWinner();
      
      if (winner) {
        gameOver = true;
        return { gameOver, winner };
      }

      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
      return { gameOver: false, winner: null };
    }
    return false;
  };

  const isGameOver = () => gameOver;

  return { start, playTurn, getCurrentPlayer, isGameOver };
})();

export default Game;