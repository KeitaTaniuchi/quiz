"use strict";

const h1 = document.getElementById('h1');
const p = document.getElementById('p');
const quizStartBtn = document.getElementById('quiz-start-btn')

class quizList {
    constructor()
}

//開始ボタンを押した時の処理
quizStartBtn.addEventListener('click', () => {
    quizStartBtn.style.display = 'none';
    fetchQuizData();
});

//webAPIから取ってきたクイズデータを、多次元配列に変換する処理
const fetchQuizData = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=10");
    displayInAcquisition();

    const quizData = await response.json();

    const quizDataArr = await quizData.results;
    createQuiz(quizDataArr);
}

//クイズデータ作成中の画面表示を行う処理
const displayInAcquisition = () => {
    h1.innerHTML = "取得中";
    p.innerHTML = "少々お待ちください"
}

const createQuiz = (quizDataArr) => {
    const quizAnswersContainer = document.getElementById('quiz-answers-container');
    const createUl = document.createElement('ul');
    const createLi = document.createElement('li');

    Object.keys(quizDataArr).forEach((currentValue) => {
        const quizNumber = currentValue;
        const quizElem = quizDataArr[currentValue];
        console.log(quizNumber);
        console.log(quizElem);

        quizAnswersContainer.appendChild(createUl);
        quizAnswersContainer.appendChild(createLi);
    });

}