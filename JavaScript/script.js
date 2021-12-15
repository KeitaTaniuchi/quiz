"use strict";

const title = document.getElementById('title');
const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty');
const p = document.getElementById('p');
const answersContainer = document.getElementById('answers-container');

const answersBtn = document.createElement('button')


class quizElem {
    constructor(quizDataArr, index) {
        this.index = index + 1;
        this.category = quizDataArr[index].category;
        this.difficulty = quizDataArr[index].difficulty;
        this.question = quizDataArr[index].question;
        this.correct_answer = quizDataArr[index].correct_answer;
        this.incorrect_answers = quizDataArr[index].incorrect_answers;
    }
}

//開始ボタンを押した時の処理
startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    fetchQuizData();
});

//webAPIから取ってきたクイズデータを、多次元配列に変換する処理
const fetchQuizData = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=10");
    displayInAcquisition();

    const quizData = await response.json();

    const quizDataArr = await quizData.results;
    let index = 0;
    console.log(quizDataArr)
    createQuiz(quizDataArr, index);
}

//クイズデータ作成中の画面表示を行う処理
const displayInAcquisition = () => {
    title.innerHTML = "取得中";
    p.innerHTM
}


const createQuiz = (quizDataArr, index) => {
    if (index !== quizDataArr.length) {
        //console.log(quizDataArr)
        const quizDataInstance = new quizElem(quizDataArr, index);

        title.innerHTML = `問題${quizDataInstance.index}`;
        category.innerHTML = `[ジャンル]${quizDataInstance.category}`;
        difficulty.innerHTML = `[難易度]${quizDataInstance.difficulty}`;
        p.innerHTML = quizDataInstance.question;
        createNextBtn(index);

       

        

        console.log(quizDataArr[index].category)

        /* console.log(quizDataInstance.quizNumber)
        console.log(quizDataInstance.quizCategory)
        console.log(quizDataInstance.quizDifficulty)
        console.log(quizDataInstance.quizQuestion) */
    }

}


const createNextBtn = (index) => {

}
