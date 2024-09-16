var canvas = document.getElementById("Game-board");
var context = canvas.getContext("2d");


function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    tamGrid = Math.min(canvas.width, canvas.height) / 20;
    gridX = Math.floor(canvas.width / tamGrid);
    gridY = Math.floor(canvas.height / tamGrid);

    canvas.width = gridX * tamGrid;
    canvas.height = gridY * tamGrid;
}

ajustarCanvas();
window.addEventListener('resize', ajustarCanvas);

var divPause = document.getElementById("Controles");

var Biteaudio = document.getElementById("myAudio");
var Tapaudio = document.getElementById("myAudio1");
var GameOveraudio = document.getElementById("myAudio2");

var points = 0;
document.getElementById("point").innerHTML = points;

var melhorPontuação = localStorage.getItem("melhor-Pontuação") || 0;
document.getElementById("melhorPontuação").innerHTML = melhorPontuação;

var cumida = { 
    x: Math.floor(Math.random() * gridX) * tamGrid,
    y: Math.floor(Math.random() * gridY) * tamGrid,
};
var cobra = [];
var speed = tamGrid;

direção = "";
mudaDireção = false;
pause = false;

var pauseBtt = document.getElementById("pause");

function drawGrid() {
    for (let i = 0; i < gridX; i++) {
        for (let j = 0; j < gridY; j++) {
            context.fillStyle = (i + j) % 2 === 0 ? "#09C606" : "#17F414";
            context.fillRect(i * tamGrid, j * tamGrid, tamGrid, tamGrid);
        }
    }
}

function Showpause () {
    if (pause == true || direção == "") {
        divPause.style.display = "block";
    }else {
        divPause.style.display = "none";
    }
}

function biteAudio() {
    Biteaudio.play();
}

function tapAudio() {
    Tapaudio.play();
}

function gameoverAudio() {
    GameOveraudio.play();
}

function desenhacroba () {


    var imgCabDireita = document.getElementById ("cabecinha-cobra-direita")

    var imgCabEsquerda = document.getElementById ("cabecinha-cobra-esquerda")
    
    var imgCabBaixo = document.getElementById ("cabecinha-cobra-baixo")
    
    var imgCabCima = document.getElementById ("cabecinha-cobra-cima")
    
    var imgBarriga = document.getElementById ("Barriguinha-cobra")
    
    var imgBarrigaSimba = document.getElementById ("Barriguinha-cobra-simba")

    var imgBarrigaSimbaEsq = document.getElementById ("barriguinha cima-esquerda")

    var imgBarrigaBaixoEsq = document.getElementById ("barriguinha esquerda-baixo")

    var imgBarrigaSimbaDir = document.getElementById ("barriguinha direita-cima")

    var imgBarrigaBaixoDir = document.getElementById ("barriguinha baixo-direita")

    var imgBundinhaDireita = document.getElementById ("Bundinha-cobra-direita")
    
    var imgBundinhaEsquerda = document.getElementById ("Bundinha-cobra-esquerda")
    
    var imgBundinhaBaixo = document.getElementById ("Bundinha-cobra-baixo")
    
    var imgBundinhaCima = document.getElementById ("Bundinha-cobra-cima")
    
    
    
    var ultimo = cobra.length - 1;
    
    var ultimo1 = cobra[cobra.length - 1];
    
    


//Direita   

    for (i=0; i < cobra.length; i++) {
        if (i != 1 && i == 0) {
            var posterior = cobra[i + 1];
            if (posterior.x < cobra[0].x) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgCabDireita,
                    cobra[0].x,
                    cobra[0].y,
                    tamGrid, 
                    tamGrid
                );

            }
        }

        
    };
        
    for (i=ultimo; i < cobra.length; i++) {
        if (i != 0) {
            var penultimo = cobra[i-1];
            if(penultimo.x > ultimo1.x) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgBundinhaDireita,
                    cobra[i].x,
                    cobra[i].y,
                    tamGrid, 
                    tamGrid
                );  
    
            }
        
    
        }
            
    };


//Esquerda    
    
    for (i=0; i < cobra.length; i++) {
        if (i != 1 && i == 0) {
            var posterior = cobra[i + 1];
            if (posterior.x > cobra[0].x) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgCabEsquerda,
                    cobra[0].x,
                    cobra[0].y,
                    tamGrid, 
                    tamGrid
                );

            }
        }
        
    };          
    
    for (i=ultimo; i < cobra.length; i++) {
            if (i != 0) {
                var penultimo = cobra[i-1];
                if (penultimo.x < ultimo1.x) {
                    context.fillStyle = "#3776EE";
                    context.drawImage (
                        imgBundinhaEsquerda,
                        cobra[i].x,
                        cobra[i].y,
                        tamGrid, 
                        tamGrid
                    );
    
                }
    
            }
            
    };

    

    for (i=1; i < cobra.length; i++) {
        if (i != ultimo) {
            var anterior = cobra[i - 1];
            var posterior = cobra[i + 1];

            if (anterior.x < cobra[i].x && posterior.x > cobra[i].x || posterior.x < cobra[i].x && anterior.x > cobra[i].x) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgBarriga,
                    cobra[i].x,
                    cobra[i].y,
                    tamGrid, 
                    tamGrid
                );

            } else if (anterior.x < cobra[i].x && posterior.y > cobra[i].y || posterior.x < cobra[i].x && anterior.y > cobra[i].y) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgBarrigaSimbaDir,
                    cobra[i].x,
                    cobra[i].y,
                    tamGrid, 
                    tamGrid
                );

            } else if (anterior.y < cobra[i].y && posterior.x < cobra[i].x || posterior.y < cobra[i].y && anterior.x < cobra[i].x) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgBarrigaBaixoDir,
                    cobra[i].x,
                    cobra[i].y,
                    tamGrid, 
                    tamGrid
                );

            } else if (anterior.x > cobra[i].x && posterior.y < cobra[i].y || posterior.x > cobra[i].x && anterior.y < cobra[i].y) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgBarrigaBaixoEsq,
                    cobra[i].x,
                    cobra[i].y,
                    tamGrid, 
                    tamGrid
                );

            } else if (anterior.y > cobra[i].y && posterior.x > cobra[i].x || posterior.y > cobra[i].y && anterior.x > cobra[i].x) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgBarrigaSimbaEsq,
                    cobra[i].x,
                    cobra[i].y,
                    tamGrid, 
                    tamGrid
                );

            } else if (anterior.y < cobra[i].y && posterior.y > cobra[i].y || posterior.y < cobra[i].y && anterior.y > cobra[i].y) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgBarrigaSimba,
                    cobra[i].x,
                    cobra[i].y,
                    tamGrid, 
                    tamGrid
                );

            }

        }

    };
    

//Baixo    
    
    for (i=0; i < cobra.length; i++) {
        if (i != 1 && i == 0) {
            var posterior = cobra[i + 1];
            if (posterior.y < cobra[0].y) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgCabBaixo,
                    cobra[0].x,
                    cobra[0].y,
                    tamGrid, 
                    tamGrid
                );

            }
        }
        
    };    
    
    for (i=ultimo; i < cobra.length; i++) {
            if (i != 0) {
                var penultimo = cobra[i-1];
                if (penultimo.y > ultimo1.y) {
                    context.fillStyle = "#3776EE";
                    context.drawImage (
                        imgBundinhaBaixo,
                        cobra[i].x,
                        cobra[i].y,
                        tamGrid, 
                        tamGrid
                    );
                }
    
            }
        
    };


//Cima    
    
    for (i=0; i < cobra.length; i++) {
        if (i != 1 && i == 0) {
            var posterior = cobra[i + 1];
            if (posterior.y > cobra[0].y) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgCabCima,
                    cobra[0].x,
                    cobra[0].y,
                    tamGrid, 
                    tamGrid
                );

            }
        }
        
    };
        
    for (i=ultimo; i < cobra.length; i++) {
            if (i != 0) {
                var penultimo = cobra[i-1];
                if (penultimo.y < ultimo1.y) {
                    context.fillStyle = "#3776EE";
                    context.drawImage (
                        imgBundinhaCima,
                        cobra[i].x,
                        cobra[i].y,
                        tamGrid, 
                        tamGrid
                    );
                }
    
                
            }
        
    };

   
}

function desenhacumida() {
    var imgMaçã = document.getElementById("apple");
    context.drawImage(imgMaçã, cumida.x, cumida.y, tamGrid, tamGrid);
}

function reCumeça() {
    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    const proximoY = cobraY - tamGrid;
    const proximoX = cobraX - tamGrid;

    if (direção === "up" && proximoY < 0) {
        gameoverAudio();
        clearInterval(game);
        direção = "";
    }

    if (direção === "down" && proximoY > canvas.height - 3 * tamGrid) {
        gameoverAudio();
        clearInterval(game);
        direção = "";
    }

    if (direção === "left" && proximoX < 0) {
        gameoverAudio();
        clearInterval(game);
        direção = "";
    }

    if (direção === "right" && proximoX > canvas.width - 3 * tamGrid) {
        gameoverAudio();
        clearInterval(game);
        direção = "";
    }

    for (let i = 1; i < cobra.length; i++) {
        if (cobraX === cobra[i].x && cobraY === cobra[i].y) {
            gameoverAudio();
            clearInterval(game);
            direção = "";
        }
    }
}

function Pausar() {
    pause = !pause;
    pauseBtt.textContent = pause ? '▶' : '||';
}

function Reiniciar() {
    direção = "";
    clearInterval(game);
    location.reload();
}

document.addEventListener('keyup', nãoMovaCroba);
function nãoMovaCroba(event) {
    mudaDireção = false;

    if ((event.keyCode === 37 || event.keyCode === 65) && direção !== 'right') mudaDireção = false;
    if ((event.keyCode === 38 || event.keyCode === 87) && direção !== 'down') mudaDireção = false;
    if ((event.keyCode === 39 || event.keyCode === 68) && direção !== 'left') mudaDireção = false;
    if ((event.keyCode === 40 || event.keyCode === 83) && direção !== 'up') mudaDireção = false;
}

document.addEventListener('keydown', movaCroba);
function movaCroba(event) {
    if (mudaDireção) return;
    mudaDireção = true;

    if ((event.keyCode === 37 || event.keyCode === 65) && direção !== 'right') direção = 'left';
    if ((event.keyCode === 38 || event.keyCode === 87) && direção !== 'down') direção = 'up';
    if ((event.keyCode === 39 || event.keyCode === 68) && direção !== 'left') direção = 'right';
    if ((event.keyCode === 40 || event.keyCode === 83) && direção !== 'up') direção = 'down';

    tapAudio();
}

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches;
}                                                     

document.addEventListener('touchstart', handleTouchStart, false);    
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};

document.addEventListener('touchmove', handleTouchMove, false);                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0 && direção !== 'right') {
            direção = 'left';
        } else if (xDiff < 0 && direção !== 'left') {
            direção = 'right';
        }
    } else {
        if (yDiff > 0 && direção !== 'down') {
            direção = 'up';
        } else if (yDiff < 0 && direção !== 'up') {
            direção = 'down';
        }
    }
    xDown = null;
    yDown = null;                                             
};

document.addEventListener('keypress', Buttons);
function Buttons(event) {
    if (event.keyCode === 32) Pausar();
    if (event.keyCode === 13) Reiniciar();
}

function cumeça() {
    reCumeça();
    drawGrid();
    desenhacroba();
    desenhacumida();
    Showpause();
    

    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    switch (direção) {
        case "right": cobraX += speed; break;
        case "left": cobraX -= speed; break;
        case "up": cobraY -= speed; break;
        case "down": cobraY += speed; break;
    }

    if (cobraX !== cumida.x || cobraY !== cumida.y) {
        cobra.pop();
    } else {
        biteAudio();
        cumida = {
            x: Math.floor(Math.random() * gridX) * tamGrid,
            y: Math.floor(Math.random() * gridY) * tamGrid
        };
        points += 1;
        document.getElementById("point").innerHTML = points;

        if (points > melhorPontuação) {
            melhorPontuação = points;
        }

        localStorage.setItem("melhor-Pontuação", melhorPontuação);
        document.getElementById("melhorPontuação").innerHTML = melhorPontuação;
    }

    for (let i = 1; i < cobra.length; i++) {
        if (cumida.x === cobra[i].x && cumida.y === cobra[i].y) {
            cumida = {
                x: Math.floor(Math.random() * gridX) * tamGrid,
                y: Math.floor(Math.random() * gridY) * tamGrid
            };
        }
    }

    let Cabecinha = { x: cobraX, y: cobraY };
    cobra.unshift(Cabecinha);

    if (Cabecinha.x === cumida.x && Cabecinha.y === cumida.y) {
        biteAudio();
        cumida = {
            x: Math.floor(Math.random() * gridX) * tamGrid,
            y: Math.floor(Math.random() * gridY) * tamGrid
        };
        points += 1;
        document.getElementById("point").innerHTML = points;
    }

    pause = false;
    mudaDireção = false;
}

const intervalo = 1000 / 10;
let game = setInterval(function() {
    if (direção !== "" && !pause) {
        cumeça();
    } else {
        reCumeça();
        drawGrid();
        desenhacroba();
        desenhacumida();
        Showpause();
    }
}, intervalo);

function SpawnCobreta() {
    cobra = [];
    const startX = Math.floor(gridX / 8) * tamGrid;
    const startY = Math.floor(gridY / 2) * tamGrid;

    cobra.push({ x: startX, y: startY });
    cobra.push({ x: startX - tamGrid, y: startY });
    cobra.push({ x: startX - 2 * tamGrid, y: startY });
}

SpawnCobreta();