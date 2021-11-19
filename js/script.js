//all the required elements
const strBtn = document.querySelector(".strBtn button");
const instructDiv = document.querySelector(".instructDiv");
const exitBtn = instructDiv.querySelector(".btns .quit");
const contBtn = instructDiv.querySelector(".btns .res");
const quizDiv = document.querySelector(".quizDiv");
const resBox = document.querySelector(".resBox");
const opt = document.querySelector(".opt");
const timeBar = document.querySelector("header .timeBar");
const timeText = document.querySelector(".timer .timeLft");
const timeCount = document.querySelector(".timer .seconds");

// when this button is clicked, istruction page is shown
strBtn.onclick = ()=>{
    instructDiv.classList.add("activeInfo");
    document.body.style.background = "#070203";
}

// when this is clicked, we go back to start button 
exitBtn.onclick = ()=>{
    instructDiv.classList.remove("activeInfo");
    document.body.style.background = "#1c090c";
}

// if this is clicked, we continue forward with the quiz
contBtn.onclick = ()=>{
    instructDiv.classList.remove("activeInfo");
    quizDiv.classList.add("activeQuiz");
    //call all functions
    showQuetions(0);
    queCounter(1);
    startTimer(15);
}

//all variables required
let timeValue =  15;
let queCount = 0;
let queNum = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restartQuiz = resBox.querySelector(".btns .res");
const quitQuiz = resBox.querySelector(".btns .quit");

// if resQuiz button clicked
restartQuiz.onclick = ()=>{
    //quiz restarts
    quizDiv.classList.add("activeQuiz");
    resBox.classList.remove("activeResult");
    //variables reset
    timeValue = 15; 
    queCount = 0;
    queNum = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(queCount);
    queCounter(queNum);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    timeText.textContent = "Time Left";
    nxtBtn.classList.remove("show");
}

// if quitQuiz button clicked
quitQuiz.onclick = ()=>{
    window.location.reload(); //restart index.html
}

const nxtBtn = document.querySelector("footer .nxtBtn");
const quesCounter = document.querySelector("footer .currQues");

// if Next Que button clicked
nxtBtn.onclick = ()=>{
    if(queCount < questions.length - 1){ 
        queCount++; 
        queNum++; 
        showQuetions(queCount); 
        queCounter(queNum); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        timeText.textContent = "Time Left"; 
        nxtBtn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}

// displaying questions from questions.js
function showQuetions(index){
    const ques = document.querySelector(".ques");

    let quesTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let optionTag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    ques.innerHTML = quesTag; 
    opt.innerHTML = optionTag;

    const option = opt.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correcAns = questions[queCount].answer;
    const allOptions = opt.children.length;
    
    if(userAns == correcAns){ //if correct answer selected
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(opt.children[i].textContent == correcAns){ 
                opt.children[i].setAttribute("class", "option correct"); 
                opt.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        opt.children[i].classList.add("disabled"); 
    }
    nxtBtn.classList.add("show"); 
}

function showResult(){
    instructDiv.classList.remove("activeInfo"); 
    quizDiv.classList.remove("activeQuiz"); 
    resBox.classList.add("activeResult"); 
    const scoreText = resBox.querySelector(".score");
        
    let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;  
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Off";
            const allOptions = opt.children.length; 
            let correcAns = questions[queCount].answer; 
            for(i=0; i < allOptions; i++){
                if(opt.children[i].textContent == correcAns){ 
                    opt.children[i].setAttribute("class", "option correct");
                    opt.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                opt.children[i].classList.add("disabled"); 
            }
            nxtBtn.classList.add("show"); 
        }
    }
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    quesCounter.innerHTML = totalQueCounTag;  
}