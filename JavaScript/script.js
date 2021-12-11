"use strict";

document.getElementById('quiz-start-btn').addEventListener('click', () => {
    fetch("https://opentdb.com/api.php?amount=10")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })
});