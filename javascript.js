var canvas;
var context;
var pacmanPosition = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var monsterColor = "white";
var currentUser;
var numOfMonsters;
var numOfFood;
var gameTime;
var keys = {};
var users = [];
var monsters = [];
var bonus = new Object(); 
var fivePts;
var escapeBtn; 
var lastMove; 
var TFPts;
var fifPts;
var modal;
var span = document.getElementsByClassName("close")[0];

$(document).ready(function () {
    $("#Welcome").show();
    $("#content").hide();
    $("#Menu").hide();
    $("#AboutUs").hide();
    canvas = document.getElementById("MyCanvas");
    context = canvas.getContext("2d");
    modal = document.getElementById('myModal');
    document.getElementById("Register").addEventListener("submit", function (e) {
        e.preventDefault();
        register();
    });
    document.getElementById("Login").addEventListener("submit", function (e) {
        e.preventDefault();
        login();
    });
    document.getElementById("Settings").addEventListener("submit", function (e) {
        e.preventDefault();
        saveSettings();
    });
    document.getElementById("buttons").addEventListener("submit", function (e) {
        e.preventDefault();
        setKeys();
    });
    document.getElementById("foodColor").addEventListener("submit", function (e) {
        e.preventDefault();
        setFoodColors();
    });
    $('body').keydown(function (escapeBtn) {
        if (escapeBtn.keyCode == 27) 
            closeModal(); 
    });
    escapeBtn = $.Event("keydown", {
        keyCode: 27
    });

    $('#escape').click(function () {
        $("body").trigger(escapeBtn);
    });

    aUser = new Object();
    aUser.username = "a";
    aUser.password = "a";
    users[0] = aUser;

    keys["left"] = 'ArrowLeft'
    keys["right"] = 'ArrowRight'
    keys["up"] = 'ArrowUp'
    keys["down"] = 'ArrowDown'
});

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    
    if (event.target == modal) {
        closeModal();
    }
}

function showModal() {
    modal.style.display = "block";
}

function showWelcome() {
    $("#Welcome").show();
    $("#Menu").hide();
    $("#content").hide();
    $("#AboutUs").hide();
}

function showLogin() {
    $("#content").show();
    $("#Login").show();
    $("#buttons").hide();
    $("#foodColor").hide();
    $("#Menu").hide();
    $("#Game").hide();
    $("#Welcome").hide();
    $("#Register").hide();
    $("#Settings").hide();
    $("#AboutUs").hide();
}

function showRegister() {
    $("#content").show();
    $("#Register").show();
    $("#Menu").hide();
    $("#foodColor").hide();
    $("#buttons").hide();
    $("#Game").hide();
    $("#Login").hide();
    $("#Welcome").hide();
    $("#AboutUs").hide();
    $("#Settings").hide();
}

function showGame() {
    $("#content").show();
    $("#Menu").show();
    $("#Game").show();
    $("#Register").hide();
    $("#foodColor").hide();
    $("#buttons").hide();
    $("#Login").hide();
    $("#Welcome").hide();
    $("#AboutUs").hide();
    $("#Settings").hide();
}

function showSettings() {
    $("#content").show();
    $("#Menu").show();
    $("#Settings").show();
    $("#Register").hide();
    $("#buttons").hide();
    $("#foodColor").hide();
    $("#Login").hide();
    $("#Welcome").hide();
    $("#AboutUs").hide();
    $("#Game").hide();
}

function back(e) {
    e.preventDefault();
    showWelcome();
}

function register() {
    var fname = $("#firstName").val();
    var lname = $("#lastName").val();
    var mail = $("#mail").val();
    var username = $("#RegisterUser").val();
    var password = $("#RegisterPass").val();
    var birthdate = $("#birthdate").val();

    newUser = new Object();
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
    for (var i = 0; i < users.length; i++) {
        if (!validUser && username == users[i].username && password == users[i].password) {
            validUser = true;
            currentUser = username;
        }
    }
    if (validUser == true) {
        showSettings();
    }
    else {
        showLogin();
        alert("Username or password not correct. Please try again");

    }

}

function saveSettings() {
    numOfFood = document.getElementById("foodNum").value;
    numOfMonsters = document.getElementById("monsterNum").value;
    gameTime = document.getElementById("gameTime").value;
    showGame()
    Start();
}


function Start() {
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var food_remain = numOfFood;
    start_time = new Date();
    for (var i = 0; i < 24; i++) {
        board[i] = new Array(13);
    }
    placeBorder();
    placeFood();
    placePacMan();
    placeMonsters();
    placeBonus(); 
    for (var i = 0; i < 24; i++) {
        for (var j = 0; j < 13; j++) {
            if (!board[i][j]) {
                board[i][j] = 0;
            }
        }
    }
    pacmanPosition.side = 4;
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    interval = setInterval(UpdatePosition, 150);
}

/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown[keys["up"]]) {
        return 1;
    }
    if (keysDown[keys["down"]]) {
        return 2;
    }
    if (keysDown[keys["left"]]) {
        return 3;
    }
    if (keysDown[keys["right"]]) {
        return 4;
    }
}

function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);//clean board
    context.fillRect(0, 0, canvas.width, canvas.height);
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 24; i++) {
        for (var j = 0; j < 13; j++) {
            var center = new Object();
            center.x = i * 27 + 13;
            center.y = j * 27 + 13;
            if (board[i][j] === 2) {
                //should put the first drawing of the pacman
                //if up
                if (pacmanPosition.side == 1) {
                    context.beginPath();
                    context.arc(center.x, center.y, 11, -0.35 * Math.PI, 1.35 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color 
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 6, center.y, 2, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color 
                    context.fill();
                    context.closePath();
                }
                //if down
                else if (pacmanPosition.side == 2) {
                    context.beginPath();
                    context.arc(center.x, center.y, 11, 0.65 * Math.PI, 2.35 * Math.PI); // half circle
                    context.lineTo(center.x, center.y); // the triangle
                    context.fillStyle = pac_color; //color if the pacman
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 6, center.y, 2, 0, 2 * Math.PI); // circle eye
                    context.fillStyle = "black"; //color
                    context.fill();
                    context.closePath();
                }
                //if left
                else if (pacmanPosition.side == 3) {
                    context.beginPath();
                    context.arc(center.x, center.y, 11, 1.15 * Math.PI, 2.85 * Math.PI, false);
                    context.lineTo(center.x, center.y); // the triangle
                    context.fillStyle = pac_color; //color if the pacman
                    context.fill();
                    context.beginPath();
                    context.arc(center.x, center.y - 6, 2, 0, 2 * Math.PI); // circle eye
                    context.fillStyle = "black"; //color
                    context.fill();
                    context.closePath();
                }
                //if right
                else if (pacmanPosition.side == 4) {
                    context.beginPath();
                    context.arc(center.x, center.y, 11, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y); // the triangle is downwards.
                    context.fillStyle = pac_color; //color if the pacman
                    context.fill();
                    context.beginPath();
                    context.arc(center.x, center.y - 6, 2, 0, 2 * Math.PI); // circle eye
                    context.fillStyle = "black"; //color
                    context.fill();
                    context.closePath();
                }

            } else if (board[i][j] === 1) {
                context.beginPath();
                context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
                context.fillStyle = fivePts; //color of the food 
                context.fill();
            } else if (board[i][j] === 5) {
                context.beginPath();
                context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
                context.fillStyle = fifPts; //color of the food 
                context.fill();
            } else if (board[i][j] === 6) {
                context.beginPath();
                context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
                context.fillStyle = TFPts; //color of the food 
                context.fill();
            } else if (board[i][j] === 7) {
                var img = new Image();
                img.src = "photos/purpleGhost.png";
                context.drawImage(img, center.x - 13, center.y - 13, 27, 27);
            } else if (board[i][j] === 8) {
                var img = new Image();
                img.src = "photos/redGhost.png";
                context.drawImage(img, center.x - 13, center.y - 13, 27, 27);
            } else if (board[i][j] === 9) {
                var img = new Image();
                img.src = "photos/blueGhost.png";
                context.drawImage(img, center.x - 13, center.y - 13, 27, 27);
            } else if (board[i][j] === 4) { //handles the walls 
                context.beginPath();
                context.rect(center.x - 13, center.y - 13, 27, 27);
                context.fillStyle = "grey"; //color
                context.fill();
            }
            else if (board[i][j] === 0) {
                context.beginPath();
                context.rect(center.x - 13, center.y - 13, 27, 27);
                context.fillStyle = "black"; //color when there aint nothing
                context.fill();
            }
        }
    }
    drawMonsters();
    drawBonus(); 
}

function UpdatePosition() {
    board[pacmanPosition.i][pacmanPosition.j] = 0;
    var x = GetKeyPressed();
    //up
    if (x === 1) {
        if (pacmanPosition.j > 0 && board[pacmanPosition.i][pacmanPosition.j - 1] !== 4) {
            pacmanPosition.j--;
            pacmanPosition.side = 1;
        }
    }
    //down
    if (x === 2) {
        if (pacmanPosition.j < 12 && board[pacmanPosition.i][pacmanPosition.j + 1] !== 4) {
            pacmanPosition.j++;
            pacmanPosition.side = 2;
        }
    }
    //left
    if (x === 3) {
        if (pacmanPosition.i > 0 && board[pacmanPosition.i - 1][pacmanPosition.j] !== 4) {
            pacmanPosition.i--;
            pacmanPosition.side = 3;
        }
    }
    //right
    if (x === 4) {
        if (pacmanPosition.i < 23 && board[pacmanPosition.i + 1][pacmanPosition.j] !== 4) {
            pacmanPosition.i++;
            pacmanPosition.side = 4;
        }
    }
    if (board[pacmanPosition.i][pacmanPosition.j] === 1) {
        score++;
    } else if (board[pacmanPosition.i][pacmanPosition.j] === 5) {
        score += 15;
    } else if (board[pacmanPosition.i][pacmanPosition.j] === 6) {
        score += 25;
    }
    board[pacmanPosition.i][pacmanPosition.j] = 2;
    repositionMonsters();
    repositionBonus();
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

function repositionBonus() {
    var x = bonus.i;
    var y = bonus.j;
    var flag = true; 
    var rand;
    //1 for left, 2 for right, 3 for up, 4 for down
    while(flag) {
        rand = Math.floor((Math.random()*4)+1); 
        if(rand == 1) {
            if(x != 0) {
            if(board[x-1][y] != 4) {
                bonus.i = x-1;
                flag = false; 
            }
            else
                continue;
            }
        }
        else if(rand == 2) {
            if(x != 23) {
                if(board[x+1][y] != 4) {
                    bonus.i = x+1;
                    flag = false; 
                }
                else
                    continue;
            }
        } 
        else if(rand == 3) {
            if(y != 0) {
                if(board[x][y-1]) {
                    bonus.j = y-1;
                    flag = false; 
                }
                else
                    continue;
            }
        } 
        else if(rand == 4) {
            if(y != 12) {
                if(board[x][y+1] != 4) {
                    bonus.j = y+1;
                    flag = false; 
                }
                else
                    continue;
            }
        } 
    }
}

function repositionMonsters() {
    for (var i = 0; i < numOfMonsters; i++) {
        var x = monsters[i].i;
        var y = monsters[i].j;
        var horizontalDistance = x - pacmanPosition.i;
        var verticalDistance = y - pacmanPosition.j;
        //if pacman is closer on the left or right
        if (Math.abs(horizontalDistance) < Math.abs(verticalDistance)){
            //if pacman on the right 
            if (horizontalDistance < 0 && x+1 < 24 && board[x+1][y] != 4){
                //board[x+1][y] = 7+i;
                monsters[i].i = x+1;
            //if pacman on the left
            } else if (horizontalDistance > 0 && x-1 >= 0 && board[x-1][y] != 4){
                //board[x-1][y] = 7+i;
                monsters[i].i = x-1;
            //if pacman is beneath
            } else if (verticalDistance < 0 && y+1 < 13 && board[x][y+1] != 4){
                //board[x][y+1] = 7+i;
                monsters[i].j = y+1;
            //if pacman is above
            } else if (verticalDistance > 0 && y-1 >= 0 && board[x][y-1] != 4){
                //board[x][y-1] = 7+i;
                monsters[i].j = y-1;
            } else {
                if (x+1 < 24 && board[x+1][y] != 4) {
                    //board[x+1][y] = 7+i;
                    monsters[i].i = x+1;
                } else if (x-1 >= 0 && board[x-1][y] != 4){
                    //board[x-1][y] = 7+i;
                    monsters[i].i = x-1;
                } else if (y+1 < 13 && board[x][y+1] != 4){
                    //board[x][y+1] = 7+i;
                    monsters[i].j = y+1;
                } else if (y-1 >= 0 && board[x][y-1] != 4) {
                    //board[x][y-1] = 7+i;
                    monsters[i].j = y-1;
                }
            }
        //if pacman is closer from above or beneath
        } else {
            //if pacman is beneath
            if (verticalDistance < 0 && y+1 < 13 && board[x][y+1] != 4){
                //board[x][y+1] = 7+i;
                monsters[i].j = y+1;
            //if pacman is above
            } else if (verticalDistance > 0 && y-1 >= 0 && board[x][y-1] != 4){
                //board[x][y-1] = 7+i;
                monsters[i].j = y-1;
            //if pacman on the right
            } else if (horizontalDistance < 0 && x+1 < 24 && board[x+1][y] != 4){
                //board[x+1][y] = 7+i;
                monsters[i].i = x+1;
            //if pacman on the left
            } else if (horizontalDistance > 0 && x-1 >= 0 && board[x-1][y] != 4){
                //board[x-1][y] = 7+i;
                monsters[i].i = x-1;
            //if pacman is beneath
            } else {
                if (y+1 < 13 && board[x][y+1] != 4){
                    //board[x][y+1] = 7+i;
                    monsters[i].j = y+1;
                } else if (y-1 >= 0 && board[x][y-1] != 4) {
                    //board[x][y-1] = 7+i;
                    monsters[i].j = y-1;
                } else if (x+1 < 24 && board[x+1][y] != 4) {
                    //board[x+1][y] = 7+i;
                    monsters[i].i = x+1;
                } else if (x-1 >= 0 && board[x-1][y] != 4){
                    //board[x-1][y] = 7+i;
                    monsters[i].i = x-1;
                } 
            }
        }
    }
}

function drawMonsters(){
    var images = ["photos/purpleGhost.png","photos/redGhost.png","photos/blueGhost.png"];
    for (var i = 0; i < numOfMonsters; i++){
        var img = new Image();
        img.src = images[i];
        var center = new Object();
        center.x = monsters[i].i * 27 + 13;
        center.y = monsters[i].j * 27 + 13;
        context.drawImage(img, center.x - 13, center.y - 13, 27, 27);
    }
}

function drawBonus(){
    var image = ["photos/bonus.png"];
    var img = new Image();
    img.src = image;
    var center = new Object();
    center.x = bonus.i * 27 + 13;
    center.y = bonus.j * 27 + 13;
    context.drawImage(img, center.x - 13, center.y - 13, 27, 27);
}

function randomSettings() {
    document.getElementById("monsterNum").value = Math.floor(Math.random() * 3) + 1;
    var foodN = Math.floor(Math.random() * 30) + 50;
    document.getElementById("foodNum").value = foodN;
    min = Math.ceil(60);
    max = Math.floor(600);
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById("gameTime").value = random;
    fivePts = getRandomColor();
    fifPts = getRandomColor();
    TFPts = getRandomColor();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setKey(e, side) {
    e.preventDefault();
    if (e.code == 'Backspace') {
        document.getElementById(side).value = "";
    } else {
        document.getElementById(side).value = e.code;
    }
}

function setKeys() {
    keys = {};
    keys["left"] = document.getElementById("left").value
    keys["right"] = document.getElementById("right").value
    keys["up"] = document.getElementById("up").value
    keys["down"] = document.getElementById("down").value

    showSettings();
}

function setFoodColors() {
    fivePts = document.getElementById("5pts").value;
    fifPts = document.getElementById("15pts").value;
    TFPts = document.getElementById("25pts").value;

    showSettings();
}

function chooseButtons() {
    $("#content").show();
    $("#Menu").show();
    $("#buttons").show();
    $("#Settings").hide();
    $("#Register").hide();
    $("#Login").hide();
    $("#Welcome").hide();
    $("#AboutUs").hide();
    $("#Game").hide();
}

function placeBorder() {
    board[1][4] = 4;
    board[1][5] = 4;
    board[1][6] = 4;
    board[1][7] = 4;

    board[2][3] = 4;
    board[2][8] = 4;

    board[3][2] = 4;
    board[3][9] = 4;

    board[4][2] = 4;
    board[4][9] = 4;

    board[5][2] = 4;
    board[5][9] = 4;

    board[9][3] = 4;
    board[9][4] = 4;
    board[9][6] = 4;
    board[9][7] = 4;
    board[9][8] = 4;

    board[10][2] = 4;
    board[10][5] = 4;
    board[10][9] = 4;

    board[11][2] = 4;
    board[11][5] = 4;
    board[11][9] = 4;

    board[12][3] = 4;
    board[12][4] = 4;
    board[12][6] = 4;
    board[12][9] = 4;

    board[13][7] = 4;
    board[13][8] = 4;

    board[14][5] = 4;
    board[14][6] = 4;
    board[14][8] = 4;

    board[15][9] = 4;

    board[18][2] = 4;
    board[18][3] = 4;

    board[19][4] = 4;

    board[20][5] = 4;
    board[20][6] = 4;
    board[20][7] = 4;
    board[20][8] = 4;
    board[20][9] = 4;

    board[21][4] = 4;

    board[22][2] = 4;
    board[22][3] = 4;

}

function chooseFoodColor() {
    $("#content").show();
    $("#Menu").show();
    $("#foodColor").show();
    $("#Settings").hide();
    $("#Register").hide();
    $("#Login").hide();
    $("#Welcome").hide();
    $("#AboutUs").hide();
    $("#Game").hide();
}

function placePacMan() {
    var placed = false;
    while (!placed) {
        var randRow = Math.floor(Math.random() * 13);
        var randCol = Math.floor(Math.random() * 24);
        if (board[randCol][randRow] != 4 && board[randCol][randRow] != 1 &&
            board[randCol][randRow] != 5 && board[randCol][randRow] != 6) {
            board[randCol][randRow] = 2;
            pacmanPosition.i = randCol;
            pacmanPosition.j = randRow;
            placed = true;
        }
    }
}

function placeFood() {

    var sixty = Math.floor(0.6 * numOfFood);
    var thirty = Math.floor(0.3 * numOfFood);
    var ten = numOfFood - sixty - thirty;
    var precents = [sixty, thirty, ten];
    var index = 0;

    while (index < 3) {
        var food = precents[index];
        while (food > 0) {
            var randRow = Math.floor(Math.random() * 13);
            var randCol = Math.floor(Math.random() * 24);
            if (board[randCol][randRow] != 4) {
                if (index == 1) {
                    board[randCol][randRow] = 1;
                } else if (index == 2) {
                    board[randCol][randRow] = 5;
                } else {
                    board[randCol][randRow] = 6;
                }
                food--;
            }
        }
        index++;
    }
}

function placeMonsters() {
    var monster1 = new Object();
    monster1.i = 0;
    monster1.j = 0;
    monsters[0] = monster1;
    //board[0][0] = 7;
    if (numOfMonsters > 1) {
        var monster2 = new Object();
        monster2.i = 23;
        monster2.j = 0;
        monsters[1] = monster2;
        //board[23][0] = 8;
        if (numOfMonsters > 2) {
            var monster3 = new Object();
            monster3.i = 0;
            monster3.j = 12;
            monsters[2] = monster3;
            //board[0][12] = 9;
        }
    }
}

function placeBonus() {
    //23,12
    bonus.i = 23; 
    bonus.j = 12; 
}