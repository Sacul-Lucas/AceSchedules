function myFunction(x) {
  
  x.classList.toggle("change");

}

function myFunction1(a) {
  a.classList.toggle("barrmenulink1");

}

function myFunction2(b) {
  b.classList.toggle("barrmenulink2");

}

function myFunction3(c) {
  c.classList.toggle("barrmenulink3");

}


var block = false;

function toggle () {
  var x = document.getElementById("listmenu");
  var a = document.getElementById("barrmenulink1");
  var b = document.getElementById("barrmenulink2");
  var c = document.getElementById("barrmenulink3");
  var d = document.getElementsByClassName("container1");

  block = !block;

  localStorage.setItem('Block', block.toString());


  if (x.style.display === "block") {
    a.style.animation = "1.2s anim-lineDown ease-in";
    b.style.animation = "1s anim-lineDown ease-in";
    c.style.animation = "0.8s anim-lineDown ease-in";

    a.style.opacity = "0";
    b.style.opacity = "0";
    c.style.opacity = "0";



        setTimeout(() => {
          if (localStorage.getItem('Block', block) === 'false' && (d.className != "container1")) {
            x.style.display = "none";
          }
        }, 500);



    
    
    
  } else {
    a.style.animation = "0.8s anim-lineUp ease-out";
    b.style.animation = "1s anim-lineUp ease-out";
    c.style.animation = "1.2s anim-lineUp ease-out";

    a.style.opacity = "1";
    b.style.opacity = "1";
    c.style.opacity = "1";


      setTimeout(() => {
        if (localStorage.getItem('Block', block) === 'true' && (d.className != "container1")) {
          x.style.display = "block";
        }
      }, 300);
  }


}