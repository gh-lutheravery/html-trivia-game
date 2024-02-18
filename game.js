import { parse } from './node_modules/@vanillaes/csv/index.js'

var QUESTIONS_ANSWERS = '';

// load csv file into mem
await fetch("assets/game.csv")
   .then((res) => res.text())
   .then((text) => {
      QUESTIONS_ANSWERS = text;
   })
   .catch((e) => console.error(e));

class TriviaGameShow {
   constructor(element) {
      //Database
      this.categories = [];
      this.clues = {};
      
      //State
      this.currentClue = null;
      
      //Elements
      this.boardElement = element.querySelector(".board");
      this.formElement = element.querySelector("form");
      this.inputElement = element.querySelector("input[name=user-answer]");
      this.modalElement = element.querySelector(".card-modal");
      this.clueTextElement = element.querySelector(".clue-text");
      this.resultElement = element.querySelector(".result");
      this.resultTextElement = element.querySelector(".result_correct-answer-text");
   }
 
   initGame() {
      //Bind event handlers
      this.boardElement.addEventListener("click", event => {
         this.handleClueClick(event);
      });

      this.modalElement.addEventListener("dblclick", event => {
         this.handleFormSubmit(event);
      });
      
      //Kick off the category fetch
      this.fetchCategories();
   }

   fetchCategories() {
      const csvList = parse(QUESTIONS_ANSWERS);

      let categories = []
      //Build up our list of categories
      csvList.forEach((row, rowIndex) => {
         if (rowIndex == 0) {
            row.forEach((category) => {
               var category = {
                  title: category,
                  clues: []
               }
               categories.push(category)
            });
         }

         else {
         row.forEach((col, colIndex) => {
            //Create unique ID for this clue
            var clueId = rowIndex + "-" + colIndex;
            categories[colIndex].clues.push(clueId);
            
            const [question, answer] = this.prepareQA(col);
            
            //Add clue to DB
            this.clues[clueId] = {
               question: question,
               answer: answer,
               value: rowIndex * 100
            };
         });
      }

      });

      this.categories.push(...categories);

      //Render each category to the DOM
      this.categories.forEach((c) => {
         this.renderCategory(c);
      });
   }

   prepareQA(clue) {
      // get last colon character
      let list = clue.split(/:([^:]+)$/);

      const question = list[0];
      let newQuestion = '';
      if (isFile(question)) {
         // make html for video and image
         let relativePath = '';
         if (question.startsWith('img/'))
         {
            relativePath = question.slice(35, question.length)
            newQuestion = `<img src="${relativePath}" style="max-width:100%;max-height:100%;"/>`
         }

         else if (question.startsWith('video/')) {
            relativePath = question.slice(37, question.length)

            newQuestion = `<video controls style="max-width:100%;max-height:100%;">
            <source src="${relativePath}" type="video/mp4">
            Your browser does not support the audio element.
         </video>`
         }

         else if (question.startsWith('audio/')) {
            relativePath = question.slice(37, question.length)
            
            newQuestion = `<audio controls>
            <source src="${relativePath}" type="audio/mpeg">
            Your browser does not support the audio element.
         </audio>`
         }

         
      }
      else {
         // text question
         newQuestion = list[0];
      }

      const newAnswer = list[1];
      return [newQuestion, newAnswer];
   }

   renderCategory(category) {      
      let column = document.createElement("div");
      column.classList.add("column");
      column.innerHTML = (
         `<header>${category.title}</header>
         <ul>
         </ul>`
      ).trim();
      
      var ul = column.querySelector("ul");
      category.clues.forEach(clueId => {
         var clue = this.clues[clueId];
         ul.innerHTML += `<li><button data-clue-id=${clueId}>${clue.value}</button></li>`
      })
      
      //Add to DOM
      this.boardElement.appendChild(column);
   }

   handleClueClick(event) {
      var clue = this.clues[event.target.dataset.clueId];

      //Mark this button as used
      event.target.classList.add("used");
      
      //Update current clue
      this.currentClue = clue;

      //Update the text
      this.clueTextElement.innerHTML = this.currentClue.question;
      this.resultTextElement.textContent = this.currentClue.answer;

      //Hide the result
      this.modalElement.classList.remove("showing-result");
      
      //Show the modal
      this.modalElement.classList.add("visible");
   }

   //Handle an answer from user
   handleFormSubmit(event) {
      event.preventDefault();
      
      //Show answer
      this.revealAnswer();
   }

   revealAnswer() { 
      //Show the whole result container
      this.modalElement.classList.add("showing-result");
      
      //Disappear after a short bit
      setTimeout(() => {
         this.modalElement.classList.remove("visible");
      }, 10000);
   }
}


function isFile(question)
{
   if(question.startsWith('img/') || 
      question.startsWith('video/') ||
      question.startsWith('audio/'))
   {
      return true;
   }
   return false;
}

const game = new TriviaGameShow(document.querySelector(".app"));
game.initGame();
