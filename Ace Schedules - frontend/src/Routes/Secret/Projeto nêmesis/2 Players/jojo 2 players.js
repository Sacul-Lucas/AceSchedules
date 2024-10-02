var canvas = document.getElementById ("Game-board");
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var divPause = document.getElementById ("Controles");

var Biteaudio = document.getElementById ("myAudio");

var points = 0
document.getElementById("point").innerHTML = points;

var melhorPontuação = 0
melhorPontuação = localStorage.getItem("melhor-Pontuação") || 0;
document.getElementById("melhorPontuação").innerHTML = melhorPontuação;


var cumida = document.getElementById ("cumida");
context.fillstyle = "#3B78F1";

var cobra = [] 
cobra[0] = {x:180, y:480};
cobra[1] = {x:120, y:480};
cobra[2] = {x:60, y:480};

var speed = 60;
direção = "";
mudaDireção = false;
pause = false;
var pauseBtt = document.getElementById("pause")

const tamGrid = 60;
const gridX = canvas.width / tamGrid;
const gridY = canvas.height / tamGrid;

function drawGrid() {
    for (let i = 0; i < gridX; i++) {
        for (let j = 0; j < gridY; j++) {
             if((j+i) % 2 == 0){
                  context.fillStyle = "#09C606" 
                  context.fillRect(i*tamGrid, j*tamGrid, tamGrid, tamGrid)
              }else{
                  context.fillStyle = "#17F414"
                  context.fillRect(i*tamGrid, j*tamGrid, tamGrid, tamGrid)
              }      
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

function biteAudio () {
    Biteaudio.play();
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
                    64, 
                    64
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
                    64, 
                    64
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
                    64, 
                    64
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
                        64, 
                        64
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
                    64, 
                    64
                );

            } else if (anterior.x < cobra[i].x && posterior.y > cobra[i].y || posterior.x < cobra[i].x && anterior.y > cobra[i].y) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgBarrigaSimbaDir,
                    cobra[i].x,
                    cobra[i].y,
                    64, 
                    64
                );

            } else if (anterior.y < cobra[i].y && posterior.x < cobra[i].x || posterior.y < cobra[i].y && anterior.x < cobra[i].x) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgBarrigaBaixoDir,
                    cobra[i].x,
                    cobra[i].y,
                    64, 
                    64
                );

            } else if (anterior.x > cobra[i].x && posterior.y < cobra[i].y || posterior.x > cobra[i].x && anterior.y < cobra[i].y) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgBarrigaBaixoEsq,
                    cobra[i].x,
                    cobra[i].y,
                    64, 
                    64
                );

            } else if (anterior.y > cobra[i].y && posterior.x > cobra[i].x || posterior.y > cobra[i].y && anterior.x > cobra[i].x) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgBarrigaSimbaEsq,
                    cobra[i].x,
                    cobra[i].y,
                    64, 
                    64
                );

            } else if (anterior.y < cobra[i].y && posterior.y > cobra[i].y || posterior.y < cobra[i].y && anterior.y > cobra[i].y) {
                context.fillStyle = "#3776EE";
                context.drawImage (
                    imgBarrigaSimba,
                    cobra[i].x,
                    cobra[i].y,
                    64, 
                    64
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
                    64, 
                    64
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
                        64, 
                        64
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
                    64, 
                    64
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
                        64, 
                        64
                    );
                }
    
                
            }
        
    };

   
}


cumida = {
    x: Math.floor(Math.random() * 24) * 60,
    y: Math.floor(Math.random() * 13) * 60,
};
function desenhacumida () {

    var imgMaçã = document.getElementById ("apple")

    context.fillStyle = "#F00505"
    context.drawImage (
        imgMaçã,    
        cumida.x,
        cumida.y,
        64, 
        64
    );
}


function reCumeça () {
    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;

    const proximoY = cobraY - tamGrid;

    const proximoX = cobraX - tamGrid;

    if (direção == "up") {
        if (proximoY < 0 && proximoY <= canvas.height) {

            clearInterval(game);
    
            direção = "";
                
        }

    }

    if (direção == "down") {
        if (proximoY > (canvas.height - 180) && proximoY <= canvas.height) {

            clearInterval(game);
    
            direção = "";
        }
    }

    if (direção == "left") {
        if (proximoX < 0 && proximoX <= canvas.width) {

            clearInterval(game);
    
            direção = "";

        }
    }

    if (direção == "right") {
        if (proximoX >= (canvas.width - 120) && proximoX <= canvas.width) {
            
            clearInterval(game);
    
            direção = "";

        }
    }



    for (i = 1; i < cobra.length; i++) {
        if (cobraX === cobra[i].x && cobraY === cobra[i].y) {

            clearInterval(game);

            direção = "";


        }
    }

}

function Pausar() {
    pause = !pause;

    pauseBtt.textContent = pause ? '▶' : '||'
}

function Reiniciar() {
    direção = "";

    clearInterval(game);
    

    location.reload();
}


document.addEventListener('keydown', movaCroba);
function movaCroba(event) {
    
    if (mudaDireção) return;
    mudaDireção = true;
    
    if ((event.keyCode == 37 || event.keyCode == 65) && (direção != 'right')) direção = 'left';
    if ((event.keyCode == 38 || event.keyCode == 87) && (direção != 'down')) direção = 'up';
    if ((event.keyCode == 39 || event.keyCode == 68) && (direção != 'left')) direção = 'right';
    if ((event.keyCode == 40 || event.keyCode == 83) && (direção != 'up')) direção = 'down';

}

document.addEventListener('keypress', Buttons);
function Buttons(event) {
    if (event.keyCode == 32) {Pausar();}
    if (event.keyCode == 13) {Reiniciar();}

}

function cumeça () {

    reCumeça();
    drawGrid ();
    desenhacroba ();
    desenhacumida ();
    Showpause();


    let cobraX = cobra[0].x;
    let cobraY = cobra[0].y;




    switch (direção) {
        case "right": {
            cobraX += speed;
            break;
        }
    
        case "left": {
            cobraX -= speed;
            break;
        }
    
        case "up": {
            cobraY -= speed;
            break;
        }
    
        case "down": {
            cobraY += speed;
            break;
        }

        default: {
            break;
        }
    }


         
    if (cobraX != cumida.x || cobraY != cumida.y) {
        cobra.pop(); 
    } else {
        biteAudio();
        cumida = {
            x: Math.floor(Math.random() * 24) * 60,
            y: Math.floor(Math.random() * 13) * 60,

            
        };
        points = points + 1;

        document.getElementById("point").innerHTML = points;


        if (points >= melhorPontuação) {
            melhorPontuação = points;
        }else{
            melhorPontuação = melhorPontuação
        };

        localStorage.setItem("melhor-Pontuação", melhorPontuação);


        document.getElementById("melhorPontuação").innerHTML = melhorPontuação;
    }


    for (i = 1; i < cobra.length; i++) {
        if (cumida.x == cobra[i].x && cumida.y == cobra[i].y) {
            cumida = {
                x: Math.floor(Math.random() * 24) * 60,
                y: Math.floor(Math.random() * 13) * 60,
    
                
            };
        }
    } 
    
    


    let Cabecinha = {
        x: cobraX,
        y: cobraY
    };

    cobra.unshift(Cabecinha);

    if (Cabecinha.x == cumida.x && Cabecinha.y == cumida.y) {
        biteAudio();
        cumida = {
            x: Math.floor(Math.random() * 24) * 60,
            y: Math.floor(Math.random() * 13) * 60,

            
        };
        points = points + 1;
        document.getElementById("point").innerHTML = points
    }

    pause = false

    mudaDireção = false

}

const intervalo = 1000/10

game = setInterval(function() {
    if (direção != "" && pause == false) {
        cumeça();
    }else {
        reCumeça();
        drawGrid ();
        desenhacroba ();
        desenhacumida ();
        Showpause();
    }
}, intervalo)