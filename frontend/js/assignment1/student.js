const loadingMessage = "Loading questions";
const buttonContainerTag = "buttonContainer";
const questionContainerTag = "questionContainer";
const backButtonText = "Back";

const getQuestionsURL = "/api/questions";
document.addEventListener("DOMContentLoaded", () => {
  loadQuestions();
  addBackButton();
});


const loadQuestions = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let queryResponse = JSON.parse(xhttp.responseText);
      if(queryResponse.status !== "SUCCESS"){
        noQuestionsAvailable();
      }else{
        addSubmitButton();
        buildQuiz(queryResponse);
      }
    }
  };
  xhttp.open("GET", getQuestionsURL, true);
  xhttp.send();
};

const buildQuiz = (response) => {
  let questions = JSON.parse(response.questions);
  let options = response.options;

  questions.forEach((question) => {
    buildOptions(createQuestionBody(question.num, question.question_text), options[question.num]);
  });

}

const createQuestionBody = (questionTag, questionText) => {

  let questionContainer = document.createElement("div");
  questionContainer.id = "q" + questionTag + "-block";
  questionContainer.classList.add("col-sm-4", questionContainerTag, "m-4");

  let questionHeader = document.createElement("h5");
  questionHeader.classList.add("m-2");
  questionHeader.innerText = "Q" + questionTag;
  questionContainer.appendChild(questionHeader);

  let questionTextArea = document.createElement("div");
  questionTextArea.classList.add("question-part", "textarea");
  questionTextArea.innerText = questionText;

  questionContainer.appendChild(questionTextArea);

  document.getElementById("root").appendChild(questionContainer);
  return questionContainer.id;
}
const buildOptions = (idTag, options) => {

  let parentElement = document.getElementById(idTag);

  let optionContainer = document.createElement("div");
  optionContainer.classList.add("option-part");

  let index = 0;

  options?.forEach((option) => {

    let optionContainer = document.createElement("div");
    optionContainer.classList.add("form-check");

    let inputElement = createInputElement(idTag, index);

    let labelElement = createLabelElement(idTag, index, option);

    optionContainer.appendChild(inputElement);
    optionContainer.appendChild(labelElement);
    parentElement.appendChild(optionContainer);
    index++;
  });

}

const createInputElement = (idTag, index) => {
  let inputElement = document.createElement("input");
  inputElement.id =  idTag.split("-")[0] + "_a" + index;
  inputElement.classList.add("form-check-input");
  inputElement.type = "radio"
  inputElement.value = index;
  inputElement.name = idTag;
  return inputElement;
}

const createLabelElement = (idTag, index, option) => {

  let labelElement = document.createElement("label");
  labelElement.innerText = option.text;
  if(option.is_answer) labelElement.classList.add("ans");
  labelElement.classList.add("form-check-label");
  labelElement.id = "i_" + option.index;
  labelElement.setAttribute("for", idTag.split("-")[0] + "_a" + index);
  return labelElement;
}

const addSubmitButton = () => {
  let submitButton = document.createElement("button");
  submitButton.classList.add("btn", "btn-primary", "btn-space");
  submitButton.innerHTML = "Submit";
  submitButton.addEventListener("click", validateQuiz);
  document.getElementById(buttonContainerTag).appendChild(submitButton);
}

const validateQuiz = () => {

  let rootContainer = document.getElementById("root");
  let questionContainers = rootContainer.getElementsByClassName(questionContainerTag);

  let totalQuestions = questionContainers.length;
  let correctQuestions = 0;
  for(let i = 0; i < questionContainers.length; i++){
    let isCorrect = false;
    let inputOptions = questionContainers[i].getElementsByClassName("form-check");
    for(let i = 0; i < inputOptions.length; i++){
      let inputCheck = inputOptions[i].getElementsByClassName("form-check-input")[0];
      let inputLabel = inputOptions[i].getElementsByClassName("form-check-label")[0];
      if(inputCheck.checked && inputLabel.classList.contains("ans")) {
        isCorrect = true;
        break;
      }
    }
    if(isCorrect) {
      questionContainers[i].classList.add("correct");
      correctQuestions++;
    }else{
      questionContainers[i].classList.add("incorrect");
    }
  }

  alert("Good job! You scored: " + correctQuestions + " out of " + totalQuestions);
}

const noQuestionsAvailable = () => {
  let noQuestionsContainer = document.createElement("div");
  noQuestionsContainer.classList.add('mb-3');
  noQuestionsContainer.innerHTML = "No questions available. Please add some!";
  document.getElementById("root").appendChild(noQuestionsContainer);
}

const addBackButton = () => {
  let backButton = document.createElement("BUTTON");
  let text = document.createTextNode(backButtonText);
  backButton.classList.add("btn", "btn-info", "m-1");
  backButton.appendChild(text);
  backButton.setAttribute("onclick", 'window.location.href = "./index"');
  document.getElementById(buttonContainerTag).appendChild(backButton);

}