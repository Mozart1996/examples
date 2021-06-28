const engWord = document.getElementById('eng'),
      rusWord = document.getElementById('ru'),
      inputs = document.getElementsByClassName('input'),
      addWordBtn = document.getElementById('add_word'),
      table = document.getElementById('table');

let words;
let btnsDelete;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

const addWordToTable = index => {
   table.innerHTML += `
      <tr class="tr">
         <td class="eng_word">${words[index].english}</td>
         <td class="rus_word">${words[index].russian}</td>
         <td>
            <button class="btn_delete"></button>
         </td>
      </tr>
   `;
   addEventDelete();
}

words.forEach((element, i) => {
   addWordToTable(i);
});

let validateWord = () => {
   if(
      engWord.value.length < 1 || 
      rusWord.value.lenght < 1 ||
      !isNaN(engWord.value) ||
      !isNaN(rusWord.value)
   ) {
      for(let input of inputs) {
         input.classList.add('error');
      }
   } else {
      for(let input of inputs) {
         input.classList.remove('error');
      }
      words.push(new CreateWord(engWord.value, rusWord.value));
      localStorage.setItem('words', JSON.stringify(words));
      addWordToTable(words.length - 1);
      engWord.value = null;
      rusWord.value = null;
   }
}

addWordBtn.addEventListener('click', () => {
   validateWord();
});

function CreateWord(english, russian) {
   this.english = english;
   this.russian = russian;
}

const deleteWord = e => {
   const rowIndex = e.target.parentNode.parentNode.rowIndex;
   e.target.parentNode.parentNode.parentNode.remove();
   words.splice(rowIndex, 1);
   localStorage.removeItem('words');
   localStorage.setItem('words', JSON.stringify(words));
}

const addEventDelete = () => {
   btnsDelete = document.querySelectorAll('.btn_delete');
   for(let btn of btnsDelete) {
      btn.addEventListener('click', e => {
         deleteWord(e);
      })
   }
}

