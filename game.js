import { parse } from './node_modules/@vanillaes/csv/index.js'

var QUESTIONS_ANSWERS = '';

// load csv file into mem
const client = new XMLHttpRequest();
client.open('GET', '/assets/game.csv');
client.onreadystatechange = function() {
   QUESTIONS_ANSWERS = client.responseText;
}
client.send();


class TriviaGameShow {
   constructor(element) {
      //Which categories we should use (or use default is nothing provided)

      //Database
      this.categories = [];
      this.clues = {};
      
      //State
      this.currentClue = null;
      
      //Elements
      this.boardElement = element.querySelector(".board");
   //  this.scoreCountElement = element.querySelector(".score-count");
      this.formElement = element.querySelector("form");
      this.inputElement = element.querySelector("input[name=user-answer]");
      this.modalElement = element.querySelector(".card-modal");
      this.clueTextElement = element.querySelector(".clue-text");
      this.resultElement = element.querySelector(".result");
      this.resultTextElement = element.querySelector(".result_correct-answer-text");
   //  this.successTextElement = element.querySelector(".result_success");
   //  this.failTextElement = element.querySelector(".result_fail");
   }
 
   initGame() {
      //Bind event handlers
      this.boardElement.addEventListener("click", event => {
         this.handleClueClick(event);
      });

      this.modalElement.addEventListener("click", event => {
         this.handleFormSubmit(event);
      });
      
      //Render initial state of score
      
      //Kick off the category fetch
      this.fetchCategories();
   }

   fetchCategories() {
      //Fetch all of the data from the API
     const csvList = parse(QUESTIONS_ANSWERS);
     console.log(csvList);

     //Sift through the data when all categories come back
      
     let categories = []
     //Build up our list of categories
     csvList.forEach((row, rowIndex) => {
        //Start with a blank category
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
         // make html for video and image (do extension endsWith to check)
         let filePath = '';
         let relativePath = '';
         if (question.startsWith('img/'))
         {
            relativePath = question.slice(35, question.length)
            filePath = question.split('img/')[1];
            newQuestion = `<img src="${relativePath}" style="max-width:100%;max-height:100%;"/>`
         }
         else if (question.startsWith('video/')) {
            relativePath = question.slice(37, question.length)
            filePath = question.split('video/')[1];
            newQuestion = `<video controls style="max-width:100%;max-height:100%;">
            <source src="${relativePath}" type="video/mp4">
            Your browser does not support the audio element.
         </video>`
         }
         else if (question.startsWith('audio/')) {
            relativePath = question.slice(37, question.length)
            filePath = question.split('audio/')[1];
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
      // TODO: make x btn
      setTimeout(() => {
         this.modalElement.classList.remove("visible");
      }, 10000);
   }
   

   // 'one, two, three'
   // '1:1, 2:2, 3:3'

   // mylist[][0]
   // for i in mylist:
   //     if index == column:
   //         obj = obj(str)
   //         add obj

   // make file questions absolute pathes and use stackoverflow post to check for each question. 
   // use yt premium download to get files

   // <audio controls>
   //    <source src="My Hero Academia - Opening 2 _ Peace Sign (1080p_24fps_H264-128kbit_AAC).mp4" type="audio/mpeg">
   //    Your browser does not support the audio element.
   // </audio>

   // <video controls>
   //    <source src="My Hero Academia - Opening 2 _ Peace Sign (1080p_24fps_H264-128kbit_AAC).mp4" type="video/mp4">
   //    Your browser does not support the audio element.
   // </video>

   // <img src="https://cdn.myanimelist.net/images/event/2024_malentine/header.png" style="max-width:100%;max-height:100%;"/>
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
