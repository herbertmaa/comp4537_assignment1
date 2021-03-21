const express = require('express');
const router = express.Router();
const sql = require('../db');


router.route('/read/getQuestions').get(async (req, res) => {

  if(req.method !== "GET") res.send(400);

  let questions = await getQuestions();
  let options = await getOptions();
  
  let response = {
    status: "RETRIEVING"
  }

  if(questions.length === 0){
    response.status = "ERORR";
    response.statusCode = "NO_QUESTIONS";
    res.status(200);
    res.send(response);
    return;
  }

  response.status = "SUCCESS"
  response.questions = questions;
  response.options = options;

  res.send(response);
});

router.route('/write/postQuestion').post(async (req, response) => {
  
  if(!req.body){
    console.log(req);
    console.log(req.body);
    response.status(400).send("Empty parameters provided.");
    console.log("in here");

    return;
  }

  console.log("i am made it here");
  let requestObject = req.body;
  
  let responseObject = {
    status: "FAILED",
    question_text: requestObject.question_text,
    options:[]
  }

  //First insert the question into the database
  let responseRow = JSON.parse(await insertQuestion(requestObject.question_text));
  let questionNumber = responseRow.lastval;
  responseObject.num = questionNumber;

  //Insert the options and update the question so it has the answer
  let optionIndicies = await insertOptions(questionNumber, requestObject.options);

  //Insert the options into the object that maps questions and options into the answer table
  await insertAnswers(questionNumber, optionIndicies);

  for(let i = 0; i < optionIndicies.length; i++){
    let option = {
      is_answer: requestObject.options[i].is_answer,
      text: requestObject.options[i].option_text,
      index: optionIndicies[i].lastval
    };
    responseObject.options.push(option);

  }
  responseObject.status = "SUCCESS";

  response.status(200);
  response.send(responseObject);
});

router.route('/get/nextValue').get(async (req, res) => {
  if(req.method !== "GET") res.send(400);
  let nextValue = await getNextQuestionNumber();

  let response = {
    status: "RETRIEVING"
  }

  if(!nextValue){
    response.status = "ERORR";
    response.statusCode = "VALUE_SEQUENCE_ERROR";
    res.status(400);
    res.send(response);
    return;
  }

  response.status = "SUCCESS"
  response.nextval = nextValue;
  res.send(response);
});

router.route('/put/updateQuestion').put(async (req, res) => {

  if(!req.body){
    response.status(400).send("Empty parameters provided.");
    return;
  }
  let requestObject = req.body;
  let options = requestObject.options;
  let newAnswerId;

  for(let i = 0; i < options.length; i++){
    if(options[i].is_answer){
      newAnswerId = options[i].id;
      break;
    }
  }

  let sqlUpdateQuestionResult = await updateQuestionText(requestObject.question_num, requestObject.question_text, newAnswerId);
  
  options.forEach(async (option) => {
    let sqlUpdateOptionResult = await updateOptionText(option.id, option.option_text);
    console.log("UPDATEOPTION", sqlUpdateOptionResult)
  })
  
  console.log("SQL_RESULT", sqlUpdateQuestionResult);
  console.log("UPDATEQUESTION", requestObject);
  res.status(200).send("DONE");
});

const getQuestions = async () => {
  return sql.query(`
    SELECT question_text, num 
    FROM questions
    ORDER BY num`
  ).then((res) => {

    if(res.rows.length === 0){
      return res.rows;
    }else{
      return JSON.stringify(res.rows);
    }
  }).catch((err) => {
    console.log("GETQUESTIONS", err.stack);
    return;
  });
}

const getOptions = async () => {
  return sql.query(`
    SELECT a2.question_num , ao.option_text, ao.id, (questions.answer=ao.id) as is_answer
    FROM answers a2 
    inner join answer_options ao on (a2.option_id = ao.id)
    full outer join questions on (ao.id = questions.answer)
  ;
  `).then((res) => {

  
      let options = {};
      res.rows.forEach((row) => {
        if(!options[row.question_num]){
          options[row.question_num] = [
            {
              "text": row.option_text,
              "is_answer": row.is_answer,
              "index": row.id
            }
          ];
        }else{
          options[row.question_num].push({
            "text": row.option_text,
            "is_answer": row.is_answer,
            "index": row.id
          });
        }
      })
      return options;
  }).catch((err) => {
    console.log("GETOPTIONS", err.stack)
    return;
  });
}

const insertAnswers = async (questionNumber, optionIndicies) => {

  let query = "";

  optionIndicies.forEach((index) => {

    console.log("INDEX", index);
    query += 
    `
    INSERT INTO answers
    (question_num, option_id)
    VALUES(${questionNumber}, ${index.lastval}); \n
    `
  });

  return sql.query(query
    ).then((res) => {
      return res;
    }).catch((err) => {
      console.log("insertAnswerQuery", err.stack);
      return;
    });
}

const insertOptions = async (questionNumber, options) => {
  let query = "";
  let optionIds = [];
  let updateQuestionAnswerQuery = `UPDATE questions
  SET answer= (select lastval())
  where questions.num = ${questionNumber}; \n`;

  options.forEach((option) => {
    query += 
    `INSERT INTO answer_options
    (option_text)
    VALUES('${option.option_text}'); \n
    select lastval(); \n
    ${option.is_answer ? updateQuestionAnswerQuery: ''}`;
  });

  return sql.query(query
    ).then((res) => {
      res.forEach((result) => {
        if(result.command === 'SELECT'){
          optionIds.push(result.rows[0]);
        }
      })
      return optionIds;
    }).catch((err) => {
      console.log("updateQuestionAnswerQuery", err.stack);
      return;
    });

}

const insertQuestion = async (questionText) => {

  const query = `
    INSERT INTO questions(question_text)
    VALUES('${questionText}'); \n
    SELECT lastval();
  `;

  return sql.query(query
  ).then((res) => {
    // Get the last value of the inserted into the questions table
    return JSON.stringify(res[res.length-1].rows[0]);
  }).catch((err) => {
    console.log("INSERTQUESTIONS", err.stack);
    return;
  });

  
}

const updateQuestionText = async(questionId, questionText, answerOptionId) => {
  const query = `
  UPDATE questions
  SET answer=${answerOptionId}, question_text='${questionText}'
  WHERE num=${questionId}; \n
  `;

  return sql.query(query
  ).then((res) => {
    return res.rows;
  }).catch((err) => {
    console.log("UPDATEQUESTIONTEXT", err.stack);
    return;
  });
}

const updateOptionText = async(optionId, optionText) => {
  const query = `
  UPDATE answer_options
  SET option_text='${optionText}'
  WHERE id=${optionId}; \n
  `;

  return sql.query(query
    ).then((res) => {
      return res.rows;
    }).catch((err) => {
      console.log("UPDATEOPTIONTEXT", err.stack);
      return;
  });

}

module.exports = router;