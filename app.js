const quiz = [
    {
        question: "What is the capital of France?",
        answer: "paris"
    },
    {
        question: "Who wrote Romeo and Juliet?",
        answer: "shakespeare"
    },
    {
        question: "What is 5 plus 2?",
        answer: "7"
    },
    // {
    //     question:"who is divya anna?",
    //     answer:"C1"
    // }
];

let currentQuestionIndex = 0;
let score = 0;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
const synth = window.speechSynthesis;
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';
function startQuiz() {
    document.getElementById('result').textContent = '';
    currentQuestionIndex = 0;
    score = 0;
    askQuestion();
}
function askQuestion() {
    if (currentQuestionIndex < quiz.length) {
        let question = quiz[currentQuestionIndex].question;
        document.getElementById('question').textContent = question;
        speakText(question);  
        recognition.start();
    }
}
recognition.onresult = function(event) {
    const userAnswer = event.results[0][0].transcript.toLowerCase().trim();
    document.getElementById('output').textContent = `You said: ${userAnswer}`;
    
    if (userAnswer === quiz[currentQuestionIndex].answer) {
        score++;
        speakText("Correct!");
    } else {
        speakText("Incorrect. Try again.");
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quiz.length) {
        setTimeout(() => {
            askQuestion(); 
        }, 2000);
    } else {
        document.getElementById('result').textContent = `Quiz Finished! Your score: ${score} out of ${quiz.length}`;
        speakText(`Quiz Finished! Your score is ${score} out of ${quiz.length}`);
        recognition.stop(); 
    }
};
recognition.onend = function() {
    if (currentQuestionIndex < quiz.length) {
        recognition.start();
    }
};
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    synth.speak(utterance);
}