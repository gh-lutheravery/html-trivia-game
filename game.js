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


     });

     
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