// Quiz logic

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull= document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question : "The CSS property used to make the text bold is -",
        choice1:'weight : bold',
        choice2:'font: bold',
        choice3:'style: bold',
        choice4:'font-weight : bold',
        answer:4,
    },

    {
        question : "The property in CSS used to change the text color of an element is -",
        choice1:'bgcolor',
        choice2:'color',
        choice3:'background-color',
        choice4:'All of the above',
        answer:2,
    },

    {
        question : "The HTML attribute used to define the inline styles is -",
        choice1:'style',
        choice2:'styles',
        choice3:'class',
        choice4:'None of the above',
        answer:1,
    },

    {
        question : "Which of the following is the correct syntax to make the background-color of all paragraph elements to yellow?",
        choice1:'p {background-color : yellow;}',
        choice2:'p {background-color : #yellow;}',
        choice3:'all {background-color : yellow;}',
        choice4:'all p{background-color : yellow;}',
        answer:1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions =[...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter>MAX_QUESTIONS)
    {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers=false

        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply= selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect'

        if(classToApply === 'correct')
        {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num =>{
    score += num
    scoreText.innerText = score
}

startGame()













