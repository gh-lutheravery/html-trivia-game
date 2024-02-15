import { parse } from './node_modules/@vanillaes/csv/index.js'

var QUESTIONS_ANSWERS = `Name,Email,Phone Number,Address
Bob Smith,bob@example.com,123-456-7890,123 Fake Street
Mike Jones,mike@example.com,098-765-4321,321 Fake Avenu`

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
      let list = clue.split(':');
      if (windowsPathValidation(list[0])) {
         // make html for video and image (do extension endsWith to check)
         // use lastIndexOf to split on colon
      }
      return list;
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
      
      //Clear out the input field
      this.inputElement.value = "";
      
      //Update current clue
      this.currentClue = clue;

      //Update the text
      this.clueTextElement.textContent = this.currentClue.question;
      this.resultTextElement.textContent = this.currentClue.answer;

      //Hide the result
      this.modalElement.classList.remove("showing-result");
      
      //Show the modal
      this.modalElement.classList.add("visible");
      this.inputElement.focus();
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
 
}