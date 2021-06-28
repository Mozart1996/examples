const numberOfQuestion = document.getElementById('number_of_question'),
      numberOfAllQuestions = document.getElementById('number_of_all_questions'),
      question = document.getElementById('question'),
      btnNext = document.getElementById('btn_next'),
      dots = document.getElementById('answer_tracker'),
      modalWindow = document.querySelector('.quiz_over_modal'),
      modalTitle = document.getElementById('modal_title');
   
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4'),
      options = document.querySelectorAll('.option');

let indexOfQuestion,
    indexOfPage = 0,
    score = 0;

const correctAnswer = document.getElementById('correct_answer'),
      numberOfAllQuestions2 = document.getElementById('number_of_all_questions2'),
      btnTryAgain = document.getElementById('btn_try_again');

const questions = [
   {
      question: "Как в Javascript вычислить процент от числа?",
      options: [
         "Так в Javascript нельзя делать",
         "Оператор: %",
         "Умножить на кол-во процентов и разделить на 100",
         "Вызвать метод findPrecent()",
      ],
      rightAnswer: 2,
      selectedAnswer: {
         number: undefined,
         type: undefined
      }
   },
   {
      question: "Результат выражения: '13' + 7",
      options: [
         "20",
         "137",
         "undefined",
         "error",
      ],
      rightAnswer: 1,
      selectedAnswer: {
         number: undefined,
         type: undefined
      }
   },
   {
      question: "На Javascript нельзя писать...",
      options: [
         "Плохо",
         "Игры",
         "Скрипты для сайтов",
         "Десктопные приложения",
      ],
      rightAnswer: 0,
      selectedAnswer: {
         number: undefined,
         type: undefined
      }
   },
];

const result = ['Не расстраивайся', 'Можно лучше', 'Хороший результат', 'Безупречно'];

numberOfAllQuestions.innerHTML = questions.length;
numberOfAllQuestions2.innerHTML = questions.length;

const load = index => {
   console.log('index of page ' + indexOfPage);
   console.log('index of question ' + index);
   question.innerHTML = questions[index].question;

   option1.innerHTML = questions[index].options[0];
   option2.innerHTML = questions[index].options[1];
   option3.innerHTML = questions[index].options[2];
   option4.innerHTML = questions[index].options[3];

   numberOfQuestion.innerHTML = indexOfPage + 1;
   lastPage();

   if(questions[index].selectedAnswer.number != undefined) {
      if(questions[index].selectedAnswer.type == 'correct'){
         options[questions[index].selectedAnswer.number].classList.add('correct');
      } else {
         options[questions[index].selectedAnswer.number].classList.add('wrong');
      }
      disableOptions();
      displayCorrectOption(index);
   }
};

const lastPage = () => {
   if(indexOfPage == questions.length - 1){
      btnNext.innerHTML = 'Finish';
   } else {
      btnNext.innerHTML = 'Next';
   }
};

let completedAnswers = [];

const randomQuestion = () => {
   let randomNumber = Math.floor(Math.random() * questions.length);
   let hitDublicate = false;
   if(completedAnswers.length > 0){
      completedAnswers.forEach(item => {
         if(item == randomNumber){
            hitDublicate = true;
         }
      });
      if(hitDublicate){
         randomQuestion();
      } else {
         indexOfQuestion = randomNumber;
         completedAnswers.push(indexOfQuestion); 
         load(indexOfQuestion);
      }
   }
   if(completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
      completedAnswers.push(indexOfQuestion); 
      load(indexOfQuestion);
   }
};

for(option of options) {
   option.addEventListener('click', e => {
      checkAnswers(e);
      noticeAnswer(e);
   });
}

const checkAnswers = el => {
   if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
      el.target.classList.add('correct');
      updateAnswerTracker('correct');
      questions[indexOfQuestion].selectedAnswer.type = 'correct';
      score++;
   } else {
      el.target.classList.add('wrong');
      updateAnswerTracker('wrong');
      questions[indexOfQuestion].selectedAnswer.type = 'wrong';
   }
   disableOptions();
   displayCorrectOption(indexOfQuestion);
};

const noticeAnswer = answer => {
   questions[indexOfQuestion].selectedAnswer.number = answer.target.dataset.id;
};

const updateAnswerTracker = status => {
   dots.children[indexOfPage].classList.add(`${status}`);
};

const disableOptions = () => {
   options.forEach(item => {
      item.classList.add('disable');
   });
};

const displayCorrectOption = index => {
   options.forEach(item => {
      if(item.dataset.id == questions[index].rightAnswer) {
         item.classList.add('correct');
      } 
   });
};

const enableOptions = () => {
   options.forEach(item => {
      item.classList.remove('disable', 'correct', 'wrong')
   });
};

const validate = () => {
   console.log('index of page ' + indexOfPage);
   if(indexOfPage == questions.length - 1){
      quizOver();
      return;
   }
   if(questions[completedAnswers[indexOfPage]].selectedAnswer.number == undefined){
      alert('Вам нужно выбрать один из вариантов ответа!');
      return;
   }
   if(completedAnswers[indexOfPage + 1] != undefined){
      console.log('Im here');
      console.log(completedAnswers);
      indexOfPage++;
      console.log('index of page ' + indexOfPage);
      enableOptions();
      load(completedAnswers[indexOfPage]);
      return;
   }
   else {
      console.log('я попал сюда');
      indexOfPage++;
      randomQuestion();
      enableOptions();
   }
};

btnNext.addEventListener('click', validate);

const answerTracker = () => {
   questions.forEach(() => {
      const div = document.createElement('div');
      dots.appendChild(div);
   });
};

const listenToDots = () => {
   for(let i = 0; i < dots.childNodes.length; i++) {
      dots.childNodes[i].addEventListener('click', e => {
         console.log('Index of dot ' + i);
         if(checkCompletedAnswers(i)) {
            showHistory(i);
         } else if (!checkCompletedAnswers(i)){
            alert('Вам нужно сначала ответить на предыдущий вопрос');
         } 
      });
   }
};

const checkCompletedAnswers = dot => {
   if(dot == 0) {
      return true;
   } 
   if(completedAnswers[dot] != undefined){
      if(questions[completedAnswers[dot-1]].selectedAnswer.number != undefined)
         return true;
   }
   else if (completedAnswers[dot] == undefined && completedAnswers[dot-1] == undefined){
      return false;
   }
   else if(completedAnswers[dot] == undefined && questions[completedAnswers[dot-1]].selectedAnswer.number != undefined) {
      indexOfPage = dot;
      randomQuestion();
      enableOptions();
      return;
   }
   return false;
};

const showHistory = dot => {
   console.log('index of page ' + indexOfPage);
   indexOfPage = dot;
   console.log('index of page ' + indexOfPage);
   enableOptions();
   load(completedAnswers[dot]);
}

const quizOver = () => {
   modalWindow.classList.add('active');
   modalTitle.innerHTML = result[score];
   correctAnswer.innerHTML = score;
};

const tryAgain = () => {
   window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

modalWindow.addEventListener('click', () => {
   modalWindow.classList.remove('active');
   btnNext.remove();
   options.forEach(item => {
      item.classList.add('disable');
   });
});
      
window.addEventListener('load', () => {
   randomQuestion();
   answerTracker();
   listenToDots();
});
