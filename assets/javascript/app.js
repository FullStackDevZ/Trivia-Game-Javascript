window.onload = function () {
  $("#question").attr("style", "display:none;");
  $("#totalScore").attr("style", "display:none;");
  $("#sub").attr("style", "display:none;");
  reset();
  $("#start").on("click", start);
};

// Setting each question as obj inside an array
var questions = [
  {
    Question: "1. Which NBA player played against BOTH the 95-96 Bulls and 2015-2016 Warriors?",
    name: "q1",
    answers: [
      { value: "Tim Duncan", correct: false },
      { value: "Dirk Nowitzki", correct: false },
      { value: "Kevin Garnett", correct: true },
      { value: "Kobe Bryant", correct: false }
    ]
  },
  {
    Question: "2. Who was the first football player to win the elusive Quintuple Crown (Heisman Trophy, National Championship, NFL MVP, Super Bowl MVP, and Super Bowl Champion)?",
    name: "q2",
    answers: [
      { value: "Cam Newton", correct: false },
      { value: "Desmond Howard", correct: false },
      { value: "Roger Staubach", correct: false },
      { value: "Marcus Allen", correct: true }
    ]
  },
  {
    Question: "3. Which of the following NBA players once played in the same game for BOTH teams?",
    name: "q3",
    answers: [
      { value: "Joe Smith", correct: false },
      { value: "Jim Jackson", correct: false },
      { value: "Daryl Dawkins", correct: false },
      { value: "Harvey Catchings", correct: true }
    ]
  },
  {
    Question: "4. Who first coined the term 'Hail Mary' in reference to a last second game tying/winning play in football?",
    name: "q4",
    answers: [
      { value: "Joe Montana", correct: false },
      { value: "Johnny Unitas", correct: false },
      { value: "Roger Staubach", correct: true },
      { value: "Michael Irvin", correct: false }
    ]
  },
  {
    Question: "5. This former NBA play-by-play announcer coined the phrases 'Air Ball' and 'Alley Oop':",
    name: "q5",
    answers: [
      { value: "Marv Albert", correct: false },
      { value: "Chick Hearn", correct: true },
      { value: "Johnny Most", correct: false },
      { value: "Keith Jackson", correct: false }
    ]
  },
  {
    Question: "6. Which of the following NBA players played against BOTH Wilt Chamberlain and Michael Jordan?",
    name: "q6",
    answers: [
      { value: "Dr J", correct: false },
      { value: "Dan Issel", correct: false },
      { value: "Kareem Abdul-Jabbar", correct: true },
      { value: "Artis Gilmore", correct: false }
    ]
  },
  {
    Question: "7. Name an NFL player who played in a Super Bowl in the 60s, 70s, 80s.",
    name: "q7",
    answers: [
      { value: "Herb Adderley", correct: false },
      { value: "Forrest Gregg", correct: false },
      { value: "Art Shell", correct: false },
      { value: "Gene Upshaw", correct: true }
    ]
  },
  {
    Question: "8. The NFL created it's goal tending rule due to which player?",
    name: "q8",
    answers: [
      { value: "Jimmy Graham", correct: false },
      { value: "Morris Stroud", correct: true },
      { value: "Ozzie Newsome", correct: false },
      { value: "Leonard Pope", correct: false }
    ]
  },
  {
    Question: "9. This former NBA player once 'fouled into' a game.",
    name: "q9",
    answers: [
      { value: "Cliff Levingston", correct: true },
      { value: "Steve Nash", correct: false },
      { value: "Oscar Robertson", correct: false },
      { value: "Gene Upshaw", correct: false }
    ]
  },
  {
    Question: "10. Which pair of NBA teams listed below played at one point in San Diego?",
    name: "q10",
    answers: [
      { value: "Golden St. Warriors - Rochester Royals", correct: false },
      { value: "LA Clippers - Houston Rockets", correct: true },
      { value: "Fort Wayne Pistons - Kansas City Kings", correct: false },
      { value: "Syracuse Nationals - New Orleans Pelicans", correct: false }
    ]

  }
];


//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;
var time = 180;


// Loops through all the questions and lists their options
function appendQuestions() {

  for (var i = 0; i < questions.length; i++) {
    $("#question").append("<h4>" + questions[i].Question + "</h4>");

    for (var j = 0; j < questions[i].answers.length; j++) {
      $("#question").append("<input type='radio' style='margin-left: 25px' name=" + "     " + questions[i].name + "   " + " value=" + questions[i].answers[j].correct + ">" + "    " + questions[i].answers[j].value + "</input>" + "   ");

    }
  }

}

// Resets the clock to 3 minutes
function reset() {
  stop();
  time = 180;
  $("#clock").text("3:00");
  question = null;
  $("#question").text(question);
  answers = null;
  $("#totalScore").text("");
  correct = 0;
  wrong = 0;
  $("#reset").text("");
}


function start() {
  $("#question").attr('style', 'display:inline-block;');
  $("#sub").attr('style', 'display:inline-block');
  // Set the clock to running.
  if (!clockRunning) {
    intervalId = setInterval(count, 1000);
    clockRunning = true;
    appendQuestions();
  }
}

function stop() {
  clearInterval(intervalId);
  clockRunning = false;
}

// Counts down once START is clicked
function count() {
  time--;
  var converted = runClock(time);
  $("#clock").text(converted);

}

// .prop("checked").val()

var correct = 0;
var wrong = 0;

// Runs the following function once submit is clicked
$(document).on('click', '#sub', function () {
  clearInterval(runClock);

  // Determines whether an answer is correct or incorrect
  for (var i = 0; i < questions.length; i++) {
    var inputChecked = $("input[name=" + questions[i].name + "]:checked").val();

    if (inputChecked === 'true') {
      correct++;
    }
    else {
      wrong++;
    }
  }

  $("#totalScore").attr('style', 'display:inline-block;');
  $("#totalScore").html("Total Score: <br>" + correct + "/10<br>" + ((correct / 10) * 100) + "%");
  stop();
  $("#question").empty();
  quizAnswers();
});

// Shows the quiz answers after the user clicks on Submit
function quizAnswers() {

  // Creates a RESET button once submit is clicked
  var reset = $("<button class='menu' id='reset'>");
  reset.append("RESET");
  $("#reset").append(reset);

  // Displays the Questions + your answers
  for (var i = 0; i < questions.length; i++) {

    var div = $("<div>")

    // The questions are shown in <h2>
    div.append("<h3>" + questions[i].Question + "</h3>");
    console.log(questions[i].Question);

    for (var j = 0; j < questions[i].answers.length; j++) {

      // var yourAnswer = $(:checked").val();
      // var input = $(questions[i].answers[j].value).prop("checked");

      // //  $("#test").text(input);
      // var input = $("input[name=" + questions[i].name + "]:checked").val();

      // if (questions[i].answers[j].correct === false) {
      //   div.append("<h3>" + questions[i].answers[j].value + "</h3>");
      // }
      if (questions[i].answers[j].correct === true) {

        div.append("<h3>" + "Your Answer: " + "<br>" + "Correct Answer: " + questions[i].answers[j].value + "</h3>");
      }
      

    }
    // Shows the answers to the Quiz in the html file

    $("#question").append(div);
  }
}
$("#reset").on("click", reset);

function runClock(t) {
  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);

  if (seconds === 0) {
    // stop();
    reset();
  }

  return minutes + ":" + seconds;

}



