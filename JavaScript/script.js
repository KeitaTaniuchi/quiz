"use strict";

const h1 = document.getElementsByTagName('h1');

document.getElementById('quiz-start-btn').addEventListener('click', () => {
    fetchQuizJsonData();
});

//webAPIからJSONデータを作成する関数
const fetchQuizJsonData = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=10");
    console.log(response)
    const quizArrData = await response.json();
    console.log(quizArrData)
    const A = quizArrData.results;
    console.log(A)
    createQuizList(A);
}

const createQuizList = (A) => {
  
    

    /* object.keys(quizJsonData).forEach(key => {
        console.log(key + ": " + jsonData[key]);
    }) */
    
    const value = A[0].category;
    console.log(value)
}