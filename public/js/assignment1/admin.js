const buttonContainerTag = "buttonsContainer";
const newQuestionContainerTag = "newQuestionContainer";
const savedQuestionContainerTag = "savedQuestions";
const addButtonTag = "addButton";
const saveButtonTag = "saveButton";
const addOptionTag = "addOptionButton";
const addButtonText = "Add";
const saveButtonText = "Save Changes";
const addOptionText = "Add Option";
const backButtonText = "Back";

const getQuestionsURL = "/api/read/getQuestions";
const postQuestionURL = "/api/write/postQuestion";
const putQuestionURL = "/api/put/updateQuestion";

document.addEventListener("DOMContentLoaded", () => {
  loadExistingQuestions();
  createButtons();
  addNewForm();
});

const getInputFormContents = () => {
  let elements = document.getElementById("formContainer").elements;
    let obj ={};
    for(let i = 0 ; i < elements.length ; i++){
        let item = elements.item(i);
        obj[item.name] = item.value;
    }

  return obj;
}

const addOption = () => {

}

const loadExistingQuestions = () => {
  
  console.log("loading questions...");

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let queryResponse = JSON.parse(xhttp.responseText);
      if(queryResponse.status !== "ERROR" && queryResponse.statusCode !== "NO_QUESTIONS"){
        buildExistingQuestionForms(queryResponse);
      }else{
        alert("No questions currently!");
      }
    }
  };
  xhttp.open("GET", getQuestionsURL, true);
  xhttp.send();


}

const addFormButtons = (parentElement) => {
  let saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.classList.add("btn", "btn-primary");
  saveButton.text = "Save";
  parentElement.appendChild(saveButton);
}

const buildExistingQuestionForms = (response) => {
  let questions = JSON.parse(response.questions);
  let options = response.options;
  questions.forEach((question) => {
    let questionContainer = createQuestionContainer(question, options[question.num]);
    document.getElementById(savedQuestionContainerTag).appendChild(questionContainer);
  });

}

const buildTextArea = (formElement, text) => {
  let textArea = document.createElement("textarea");
  textArea.classList.add("mb-3", "input_question");
  textArea.setAttribute("rows", "6");
  textArea.setAttribute("cols", "50");
  textArea.innerText = text;
  formElement.appendChild(textArea);
}

const buildOptionArea = (formElement, optionsArr) => {
  let count = 0;
  optionsArr?.forEach((option) => {
    let inputRadioButton = document.createElement("input");
    inputRadioButton.type = "radio";
    inputRadioButton.name = "answer";
    inputRadioButton.classList.add("radio_option");
    if(option.is_answer === true) inputRadioButton.checked = true;

    let inputTextArea = document.createElement("input");
    inputTextArea.type = "text";
    inputTextArea.name = "answer_" + count;
    inputTextArea.classList.add("option_answer", "i_" + option.index);
    inputTextArea.value = option.text;
    count++;

    formElement.appendChild(inputRadioButton);
    formElement.appendChild(inputTextArea);
    formElement.appendChild(document.createElement("br"));
  });
}

const createButtons = () => {

  let buttonContainer = document.createElement("div");
  buttonContainer.id = buttonContainerTag;

  let addTextNode = document.createTextNode(addButtonText);
  let saveTextNode = document.createTextNode(saveButtonText);
  let optionTextNode = document.createTextNode(addOptionText);

  let addButton = document.createElement("BUTTON");
  addButton.id = addButtonTag;
  addButton.classList.add("btn", "btn-primary", "m-1");
  addButton.appendChild(addTextNode);

  addButton.addEventListener("click", addButtonOnClick);

  let saveButton = document.createElement("BUTTON");
  saveButton.classList.add("btn", "btn-success", "m-1");
  saveButton.id = saveButtonTag;
  saveButton.appendChild(saveTextNode);

  saveButton.addEventListener("click", addSaveOnClick);


  let addOptionButton = document.createElement("BUTTON");
  addOptionButton.classList.add("btn","btn-secondary", "m-1");
  addOptionButton.id = addOptionTag;
  addOptionButton.appendChild(optionTextNode);

  addOptionButton.addEventListener("click", addOptionOnClick);

  let backButton = document.createElement("BUTTON");
  let text = document.createTextNode(backButtonText);
  backButton.classList.add("btn", "btn-info", "m-1");
  backButton.appendChild(text);
  backButton.setAttribute("onclick", 'window.location.href = "./index"');

  buttonContainer.appendChild(addButton);
  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(addOptionButton);
  buttonContainer.appendChild(backButton);

  document.getElementById("root").appendChild(buttonContainer);

}

const addNewForm = () => {

  let newQuestionContainer = document.createElement("div");
  newQuestionContainer.id = newQuestionContainerTag;
  newQuestionContainer.classList.add("container-fluid");
  // let questionNumberArea = document.createElement("div");

  let newForm = document.createElement("form");
  newForm.classList.add("container", "form-inputs", "mb-3");

  let textArea = document.createElement("textarea");
  textArea.classList.add("mb-2", "input_question");
  textArea.setAttribute("rows", "6");
  textArea.setAttribute("cols", "50");

  let paraElement = document.createElement("p");
  paraElement.innerText = "*Answers*";

  newForm.appendChild(textArea);
  newForm.appendChild(paraElement);

  newQuestionContainer.appendChild(newForm);

  createOption(0, newForm);
  createOption(1, newForm);

  let rootElement = document.getElementById("root");
  rootElement.insertBefore(newQuestionContainer, document.getElementById(buttonContainerTag));
  

}

const createOption = (count, parentElement) => {

  let inputRadioButton = document.createElement("input");
  inputRadioButton.type = "radio";
  inputRadioButton.name = "answer";
  inputRadioButton.classList.add("radio_option");

  let inputTextArea = document.createElement("input");
  inputTextArea.type = "text";
  inputTextArea.name = "answer_" + count;
  inputTextArea.classList.add("option_answer");

  parentElement.appendChild(inputRadioButton);
  parentElement.appendChild(inputTextArea);
  parentElement.appendChild(document.createElement("br"));

}

const addOptionOnClick = () => {
  let existingForm = document.getElementById("newQuestionContainer")?.firstChild;
  if(!existingForm) {
    alert("You must add a new question you are working on before adding a new option!");
    return;
  }

  let numOptions = (existingForm.getElementsByTagName("input").length)/2;
  if(numOptions >= 4){
    alert("You can only have up to 4 options!");
    return;
  }
  createOption(numOptions, existingForm);
}

const addButtonOnClick = () => {
  let existingForm = document.getElementById("newQuestionContainer");
  if(existingForm) {
    alert("You must save the question you are working on first before adding a new one!");
    return;
  }
  addNewForm();
}

const addSaveOnClick = () => {
  //Handle Saving Newly Created Objects
  if(document.getElementById("newQuestionContainer")){
    let existingForm = document.getElementById("newQuestionContainer")?.firstChild;
    let radioButtons = existingForm.getElementsByClassName("radio_option");
    let selectedOption = NaN;
  
    for(let i = 0; i < radioButtons.length; i++){
      let button = radioButtons[i];
      if(button.checked) {
        selectedOption = i;
        break;
      }
    }
  
    if(isNaN(selectedOption)){
      alert("You must select an option before saving the question");
      return;
    }
  
    addQuestionToDatabase(getNewQuestionFormObject());

  }
  
  //Handle Saving Changed Objects
  let savedQuestionsObject = document.getElementById(savedQuestionContainerTag);
  let questionForms = savedQuestionsObject.getElementsByTagName("form");

  for(let i = 0; i < questionForms.length; i++){
    let questionObj = convertFormElementToQuestionJSON(questionForms[i].id);
    updateQuestion(questionObj);
  }
}

const addQuestionToDatabase = (question) => {

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let responseObject = JSON.parse(xhttp.response);
      let existingForm = document.getElementById("newQuestionContainer");
      existingForm.remove();
      appendNewQuestion(responseObject);
    }
  };
  xhttp.open("POST", postQuestionURL, true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");  
  xhttp.send(JSON.stringify(question));
}

const getNewQuestionFormObject = () => {
  let existingForm = document.getElementById("newQuestionContainer")?.firstChild;
  let inputElements = existingForm.getElementsByTagName("input");
  let res = {
    "question_text": existingForm.getElementsByTagName("textarea")[0].value,
    "options": []
  };

  for(let i = 0; i < inputElements.length; i+=2){
    let option = {
      "is_answer": inputElements[i].checked,
      "option_text": inputElements[i+1].value
    }
    res.options.push(option);
  }
  return res;
}

const appendNewQuestion = (question) => {
  let questionContainer = createQuestionContainer(question, question.options);
  document.getElementById(savedQuestionContainerTag).appendChild(questionContainer);
}

const createQuestionContainer = (question, options) => {
  let header = document.createElement("h6");
  header.innerText = "Question " + question.num;

  let questionContainer = document.createElement("form");
  questionContainer.id = "question" + question.num;
  questionContainer.classList.add("container", "form_inputs", "mb-3");
  
  //add the question header 
  questionContainer.appendChild(header);

  //build text area for the question
  buildTextArea(questionContainer, question.question_text);


  let paraElement = document.createElement("p");
  paraElement.innerText = "*Answers*";

  questionContainer.appendChild(paraElement);
  //build the form area that allows you to edit options

  buildOptionArea(questionContainer, options);

  return questionContainer;
}

const updateQuestion = (question) => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.response);
    }
  };
  xhttp.open("PUT", putQuestionURL, true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");  
  xhttp.send(JSON.stringify(question));

  
}

const convertFormElementToQuestionJSON = (id) => {
  let element = document.getElementById(id);
  let result = {
    question_text: element.getElementsByTagName("textarea")[0].value,
    question_num: parseInt(element.getElementsByTagName("h6")[0].textContent.replace("Question ", "")),
    options: []
  }

  let options = element.getElementsByTagName("input");
  for(let i = 0; i < options.length; i+= 2){
    let classes = options[i+1].classList;
    let option = {
      option_text: options[i+1].value,
      id: classes[classes.length-1].replace("i_", ""),
      is_answer: options[i].checked
    }
    result.options.push(option);
  }
  return result;
}