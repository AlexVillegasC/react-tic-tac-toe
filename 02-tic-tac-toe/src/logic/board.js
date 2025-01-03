import { WINNER_COMBINATION } from '../constants.js';

export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBINATION) {
      console.log(combo);

      const [a, b, c] = combo;
      if(boardToCheck[a] &&
          boardToCheck[a] === boardToCheck[b] &&
          boardToCheck[a] === boardToCheck[c]) 
      {            
        return boardToCheck[a];
      }
    }

    return null;
}
