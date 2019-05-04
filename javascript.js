var canvas;
var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var currentUser;
var users = [];

$(document).ready(function(){
    $("#content").show();
    $("#Login").hide();
    $("#Register").hide();
    $("#Settings").hide();
    $("#Game").show();
    $("#Welcome").hide();
    $("#Menu").hide();
    $("#AboutUs").hide();
    canvas = document.getElementById("MyCanvas");
    context = canvas.getContext("2d");
    aUser = new Object();
    aUser.username = "a";
    aUser.password = "a";
    users[0] = aUser;
});

function showAbout() {
    $("#AboutUs").show();
    document.getElementById("About").showModal();
}

function showWelcome(){
    $("#Welcome").show();
    $("#Menu").hide();
    $("#content").hide();
    $("#AboutUs").hide();
}


function showLogin(){
    $("#content").show();
    $("#Login").show();
    $("#Menu").hide();
    $("#Game").hide();
    $("#Welcome").hide();
	$("#Register").hide();
    $("#Settings").hide();
    $("#AboutUs").hide();
}

function showRegister(){
    $("#content").show();
    $("#Menu").hide();
    $("#Register").show();
    $("#Game").hide();
    $("#Login").hide();
    $("#Welcome").hide();
    $("#AboutUs").hide();
	$("#Settings").hide();
}

function showGame(){
    $("#content").show();
    $("#Menu").show();
    $("#Game").show();
    $("#Register").hide();
    $("#Login").hide();
    $("#Welcome").hide();
    $("#AboutUs").hide();
	$("#Settings").hide();
}

function showSettings(){
    $("#content").show();
    $("#Menu").show();
    $("#Settings").show();
    $("#Register").hide();
    $("#Login").hide();
    $("#Welcome").hide();
    $("#AboutUs").hide();
	$("#Game").hide();
}

function register(){
    var fname = $("#firstName").val();
    var lname = $("#lastName").val();
    var mail = $("#mail").val();
	var username = $("#RegisterUser").val();
    var password = $("#RegisterPass").val();
    var birthdate = $("#birthdate").val();

    newUser=new Object();
    newUser.fname = fname;
    newUser.lname = lname;
    newUser.email = mail;
    newUser.username = username;
    newUser.password = password;
    newUser.birthdate = birthdate;
    users.push(newUser);
    showWelcome();
}

function login() {
    var username = $("#LoginUser").val();
    var password = $("#LoginPass").val();
    var validUser = false;
    for(var i = 0 ; i < users.length ; i++) {
        if(!validUser && username == users[i].username && password == users[i].password){
            validUser = true;
            currentUser = username;
        }
    }
    if(validUser == true){
        showSettings();
    }
    else{
        showLogin();
        alert("Username or password not correct. Please try again");
        
    }

}


function Start() {
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var food_remain = 50;
    var pacman_remain = 1;
    start_time = new Date();
    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 10; j++) {
            //place border
            if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
                board[i][j] = 4;
                //place food
            } else {
                var randomNum = Math.random();
                if (randomNum <= 1.0 * food_remain / cnt) {
                    food_remain--;
                    board[i][j] = 1;
                    //place pacman
                } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    interval = setInterval(UpdatePosition, 150);
}


function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 9) + 1);
    var j = Math.floor((Math.random() * 9) + 1);
    while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * 9) + 1);
        j = Math.floor((Math.random() * 9) + 1);
    }
    return [i, j];
}

/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown['ArrowUp']) {
        return 1;
    }
    if (keysDown['ArrowDown']) {
        return 2;
    }
    if (keysDown['ArrowLeft']) {
        return 3;
    }
    if (keysDown['ArrowRight']) {
        return 4;
    }
}

function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] === 2) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] === 1) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] === 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            } else if (board[i][j] === 0) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "black"; //color
                context.fill();
            }
        }
    }
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
            shape.j--;
        }
    }
    if (x === 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] !== 4) {
            shape.j++;
        }
    }
    if (x === 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
            shape.i--;
        }
    }
    if (x === 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] !== 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] === 1) {
        score++;
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (score === 50) {
        window.clearInterval(interval);
        window.alert("Game completed");
    } else {
        Draw();
    }
}