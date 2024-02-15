import { parse } from './node_modules/@vanillaes/csv/index.js'

var QUESTIONS_ANSWERS = `calebcity/comedy,African history,geography,anime openings/endings,easy,media mix
img/C:/Users/HP/OneDrive/SAND/game/assets/caleb1.JPG:This is how it feels sometimes,What is the large ethnic group that migrated to the Sub-Saharah many years ago?:Bantu,What is the very large desert in North Africa?:Sahara,audio/C:/Users/HP/OneDrive/SAND/game/assets/Attack on Titan Season 2 - Opening _ Shinzou wo Sasageyo! (1080p_24fps_H264-128kbit_AAC).mp4:Attack on Titan OP 2,How many times can you subtract 10 from 100?:Once. Next time you would be subtracting 10 from 90.,audio/C:/Users/HP/OneDrive/SAND/game/assets/One Piece _ Opening 9 - Jungle P _ 4K Creditless (2160p_24fps_VP9 LQ-160kbit_Opus).webm:One Piece - Opening 9
img/C:/Users/HP/OneDrive/SAND/game/assets/caleb2.JPG:Me shopping for anything.,Name of warrior ethnic group in south africa:Zulu,img/C:/Users/HP/OneDrive/SAND/game/assets/Vector-Italy-Map-PNG-Free-Download-1799540212.png:Italy,audio/C:/Users/HP/OneDrive/SAND/game/assets/ENDING 1 _ BLEACH _ Life is Like a Boat by Rie fu _ VIZ (1080p_30fps_H264-128kbit_AAC).mp4:ENDING 1 BLEACH,"Before Mount Everest was discovered, what was the tallest mountain on Earth?:everest",audio/C:/Users/HP/OneDrive/SAND/game/assets/Neon Genesis Evangelion - Opening (Creditless) (HD - 60 fps) (1440p_60fps_VP9-160kbit_Opus).webm:Neon Genesis Evangelion
img/C:/Users/HP/OneDrive/SAND/game/assets/caleb3.JPG:Basically me for a month,"What is notable about the walls of benin? (west africa):Largest collective structure in the world, longer than Great walls of China",img/C:/Users/HP/OneDrive/SAND/game/assets/WRLD-CAM-01-0001-1876659496.png:Central America,audio/C:/Users/HP/OneDrive/SAND/game/assets/My Hero Academia - Opening 2 _ Peace Sign (1080p_24fps_H264-128kbit_AAC).mp4:My Hero Academia - Opening 2,"If the vice president were to die, who is supposed to be president?:President",audio/C:/Users/HP/OneDrive/SAND/game/assets/Fairy Tail - Opening 3 [Official Lyrics Video] [HD_HQ] (1080p_30fps_H264-128kbit_AAC).mp4:Fairy Tail - Opening 3
img/C:/Users/HP/OneDrive/SAND/game/assets/caleb4.JPG:The friend thats always forgetting something,what kind of healthcare was done in pre-colonial kenya?:Brain surgery,,audio/C:/Users/HP/OneDrive/SAND/game/assets/Tokyo Ghoul - Opening _ Munou (1080p_24fps_H264-128kbit_AAC).mp4:Tokyo Ghoul - Opening 2,img/C:/Users/HP/OneDrive/SAND/game/assets/shroud-1.avif:The Shroud,audio/C:/Users/HP/OneDrive/SAND/game/assets/Banjo-Kazooie - trailer (240p_30fps_H264-96kbit_AAC).mp4:Banjo-Kazooie
img/C:/Users/HP/OneDrive/SAND/game/assets/kp.JPG:Killing an African Warlord,"What is notable about drums used in west africa?:By mimicing human speech, it can communicate messages over 4-5 mile distances.",,audio/C:/Users/HP/OneDrive/SAND/game/assets/Re_ZERO -Starting Life in Another World- Season 2 - Opening _ Realize (1080p_24fps_H264-128kbit_AAC).mp4:ReZero season 2 op 1,img/C:/Users/HP/OneDrive/SAND/game/assets/22-1-88932007.jpg:Fighting American,audio/C:/Users/HP/OneDrive/SAND/game/assets/maxresdefault-2710931489.jpg:Penguins of Madagascar
img/C:/Users/HP/OneDrive/SAND/game/assets/desmond.JPG:I hate sleep paralysis the MOST.,,,audio/C:/Users/HP/OneDrive/SAND/game/assets/Nichijou My Ordinary Life - Opening _ Hyadain no Kakakata☆Kataomoi - C (1080p_24fps_H264-128kbit_AAC).mp4:Nichijou op 1,img/C:/Users/HP/OneDrive/SAND/game/assets/8q69kbpaj09x-2804535359.jpg:Metal Man,audio/C:/Users/HP/OneDrive/SAND/game/assets/Mario Party 2 - Intro (720p_30fps_H264-192kbit_AAC).mp4:Mario Party 2
video/C:/Users/HP/OneDrive/SAND/game/assets/The friend thats always waiting on you to make a mistake. CalebCity (720p_30fps_H264-192kbit_AAC).mp4:The friend thats always waiting on you to make a mistake.,,,audio/C:/Users/HP/OneDrive/SAND/game/assets/Boku Dake Ga Inai Machi Opening (1080p_24fps_H264-128kbit_AAC).mp4:Erased,"img/C:/Users/HP/OneDrive/SAND/game/assets/MV5BYjY2MGM3NTgtMWI0MC00YTk3LTlmYjgtMzY4ODVhMjI3MDY1XkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_QL75_UX500_CR0,47,500,281_-3613079497.jpg:Rise of the black bat",audio/C:/Users/HP/OneDrive/SAND/game/assets/Diablo 2_ Resurrected - Mephisto Boss Fight 4K (2160p_60fps_VP9-160kbit_Opus).webm:Diablo 2
,,"img/C:/Users/HP/OneDrive/SAND/game/assets/Swaziland_flag_map-1394117338.webp:Johannesburg, Pretoria, Mbabane",audio/C:/Users/HP/OneDrive/SAND/game/assets/Psycho-Pass Opening 1 (Creditless) (1080p_24fps_H264-128kbit_AAC).mp4:Psycho-Pass Opening 1,img/C:/Users/HP/OneDrive/SAND/game/assets/MV5BMTcwNjI5MTAzNF5BMlf5BanBnXkFtZTcwNTcyOTIwNQ@@._V1_FMjpg_UX1000_-1286440561.jpg:Almighty Thor,img/C:/Users/HP/OneDrive/SAND/game/assets/hmmm.JPG:Dead Island
`

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
      // get last colon character
      let list = clue.split(':([^:]+)$');
      const question = list[0];
      const newQuestion = '';

      if (windowsPathValidation(list[0])) {
         // make html for video and image (do extension endsWith to check)
         const filePath = '';

         switch (question) {
            case question.startsWith('img/'):
               filePath = question.split('img/')[1];
               newQuestion = `<img src="${filePath}" style="max-width:100%;max-height:100%;"/>`
               break;

            case question.startsWith('video/'):
               filePath = question.split('video/')[1];
               newQuestion = `<video controls>
               <source src="${filePath}" type="video/mp4">
               Your browser does not support the audio element.
            </video>`
               break;

            case question.startsWith('audio/'):
               filePath = clue.split('audio/')[1];
               newQuestion = `<audio controls>
               <source src="${filePath}" type="audio/mpeg">
               Your browser does not support the audio element.
            </audio>`
               break;
         
            default:
               break;
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

   //Handle an answer from user
   handleFormSubmit(event) {
      event.preventDefault();
      
      //Show answer
      this.revealAnswer(isCorrect);
   }

   revealAnswer(isCorrect) { 
      //Show the whole result container
      this.modalElement.classList.add("showing-result");
      
      //Disappear after a short bit
      // TODO: make x btn
      setTimeout(() => {
         this.modalElement.classList.remove("visible");
      }, 3000);
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


// https://stackoverflow.com/questions/2030285/regex-for-file-path-validation-in-javascript
function windowsPathValidation(contwinpath)
{
   if((contwinpath.charAt(0) != "\\" || contwinpath.charAt(1) != "\\") || (contwinpath.charAt(0) != "/" || contwinpath.charAt(1) != "/"))
   {
      if(!contwinpath.charAt(0).match(/^[a-zA-Z]/))  
      {
         return false;
      }
      if(!contwinpath.charAt(1).match(/^[:]/) || !contwinpath.charAt(2).match(/^[\/\\]/))
      {
         return false;
      }
   }
}

const game = new TriviaGameShow(document.querySelector(".app"));
game.initGame();
