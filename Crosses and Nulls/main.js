const area = document.getElementById('area');
let move = 0;

area.addEventListener('click', e => {
   if(e.target.className=='box') {
      if(move % 2 === 0) {
         e.target.innerHTML = "X";
      }else {
         e.target.innerHTML = "0";
      }
      move++;
   }
   check();
});

const winCombinations = [
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]
];

const check = () => {
   const boxes = document.getElementsByClassName('box');
   for(let i = 0; i < winCombinations.length; i++) {
      if(
      boxes[winCombinations[i][0]].innerHTML === 'X' 
      && boxes[winCombinations[i][1]].innerHTML === 'X'
      && boxes[winCombinations[i][2]].innerHTML === 'X'
      ) {
         result = 'крестики';
         prepareResult(result);
      } else if(
      boxes[winCombinations[i][0]].innerHTML === '0' 
      && boxes[winCombinations[i][1]].innerHTML === '0'
      && boxes[winCombinations[i][2]].innerHTML === '0'
      ) {
         result = 'нолики';
         prepareResult(result);
      } else if (move == 9) {
         result = 'ничья';
         prepareResult(result);   
      }
   }
}

const prepareResult = winner => {
   if (winner !== 'ничья'){
      alert(`Победили ${winner}!`)
   } else {
      alert(`Победила ${winner}!`) 
   }
}

