"use strict";

const title = document.getElementById('title');
const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty');
const questionAndInformation = document.getElementById('question-and-information');
const buttonsContainer = document.getElementById('btn-container');
const startBtn = document.getElementById('start-btn');

class quiz {
    constructor(quizData) {
        this.quizDataArr = quizData.results;
        this.correctAnswerCount = 0;
    }

    //クイズデータから「category」キーの値を取得する処理
    category(quizNumber) {
        return this.quizDataArr[quizNumber].category;
    }

    //クイズデータから「difficulty」キーの値を取得する処理
    difficulty(quizNumber) {
        return this.quizDataArr[quizNumber].difficulty;
    }

    //クイズデータから「question」キーの値を取得する処理
    question(quizNumber) {
        return this.quizDataArr[quizNumber].question;
    }

    //クイズデータから「correctAnswer」キーの値を取得する処理
    correctAnswer(quizNumber) {
        return this.quizDataArr[quizNumber].correct_answer;
    }

    //クイズデータから「incorrectAnswers」キーの値を取得する処理
    incorrectAnswers(quizNumber) {
        return this.quizDataArr[quizNumber].incorrect_answers;
    }

    //選択した回答が正解かどうかを判定する処理
    correctAnswerDecision(currentValue, quizNumber) {
        if (currentValue === this.quizDataArr[quizNumber].correct_answer) {
            return this.correctAnswerCount++;
        }
    }
}

//開始ボタンを押した時の処理
startBtn.addEventListener('click', () => {
    title.innerHTML = "取得中";
    questionAndInformation.innerHTM = "少々お待ちください。";
    removeChild();
    fetchQuizData();
})

//子要素を全て削除する処理
const removeChild = () => {
    while(buttonsContainer.firstChild) {
        buttonsContainer.removeChild(buttonsContainer.firstChild);
    }
}

//webAPIからクイズデータを取ってくる処理
const fetchQuizData = async () => {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=10");

        const quizData = await response.json();
        const quizNumber = 0;
        const quizInstance = new quiz(quizData, quizNumber);
        questionsCount(quizInstance, quizNumber);

    } catch (error) {
        alert('エラーが発生しました。')
    }
}

//クイズの出題数を判定する処理
const questionsCount = (quizInstance, quizNumber) => {
    removeChild();

    if (quizInstance.quizDataArr.length > quizNumber) {
        createQuiz(quizInstance, quizNumber);

    } else {
        resultDisplay(quizInstance);
    }
}

//クイズを作成する処理
const createQuiz = (quizInstance, quizNumber) => {
    title.innerHTML = `問題${quizNumber + 1}`;
    category.innerHTML = `[ジャンル]${quizInstance.category(quizNumber)}`;
    difficulty.innerHTML = `[難易度]${quizInstance.difficulty(quizNumber)}`;
    questionAndInformation.innerHTML = quizInstance.question(quizNumber);

    const answers = answersRandom(quizInstance, quizNumber);
    answers.forEach((currentValue) => {
        const answersBtn = document.createElement('button');
        answersBtn.innerHTML = currentValue;
        buttonsContainer.appendChild(answersBtn);
        answersBtn.addEventListener('click', () => {
            quizInstance.correctAnswerDecision(currentValue, quizNumber);
            quizNumber++;
            questionsCount(quizInstance, quizNumber);
        })
    })
}

//不正解の回答(配列)に正解の回答を追加し、ランダムソートする処理
const answersRandom = (quizInstance, quizNumber) => {
    const answers = quizInstance.incorrectAnswers(quizNumber);
    answers.push(quizInstance.correctAnswer(quizNumber));

    for (let i = answers.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
}

//結果を表示する処理
const resultDisplay = (quizInstance) => {
    title.innerHTML = `あなたの正答数は,${quizInstance.correctAnswerCount}です。`;
    category.innerHTML = "";
    difficulty.innerHTML = "";
    questionAndInformation.innerHTML = "再度チャレンジしたい場合は、以下をクリックしてください。";

    const retryBtn = document.createElement('button');
    retryBtn.innerHTML = "再度挑戦する";
    buttonsContainer.appendChild(retryBtn);
    retryBtn.addEventListener("click", () => {
        location.reload();
    })
}