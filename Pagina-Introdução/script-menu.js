const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentState = button.getAttribute("data-state");

    if (!currentState || currentState === "closed") {
      button.setAttribute("data-state", "opened");
      button.setAttribute("aria-expanded", "true");
      document.getElementById("BarraMenu").className = "BarraMenu-show";
    } else {
      button.setAttribute("data-state", "closed");
      button.setAttribute("aria-expanded", "false");
      document.getElementById("BarraMenu").className = "BarraMenu";

    }
  });
});

var counter = 1;
    setInterval(function(){
      document.getElementById('radio' + counter).checked = true;
      counter++;
      if(counter > 4){
        counter = 1;
      }
    }, 5000);

    const btnSala1 = document.getElementById(`btnSala1`);
    const fechar = document.getElementById(`close`);
    const modal1 = document.getElementById(`modal1`);
    const reservar = document.getElementById(`reserva`);
    
    btnSala1.onclick = function () {
        modal1.show()
    }
     
    fechar.onclick = function () {
        modal1.close()
    }