
            ///               Gerando o calendário

let calendar = document.querySelector('.calendar')
var DiaEscolha = null;
const month_names = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']


///                 Ano bissexto
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}
    
getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}
///========================================================
generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

///          Data atual que aparece quando o calendário é aberto


    let currDate = new Date()
    if (!month) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // primeiro dia do mês
    
    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {        
        let day = document.createElement('button')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.setAttribute('id', i + 1 )
            day.innerHTML = i - first_day.getDay() + 1
            var buttons = document.querySelectorAll('button');
            var quantbtn = 0;
        buttons.forEach(function(button) {
            if (!button.hasAttribute('class') || button.getAttribute('class').trim() === '') {
                quantbtn++;
              }
            });

                if (quantbtn > 0){
                    day.setAttribute('id', i - quantbtn + 1)
                
                }
            //                                              Pega o dia atual
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
            day.addEventListener('click', function() {
                console.clear(); // Clear the console
                let Diaescolha = this.getAttribute('id');
                console.log('Button ID:', Diaescolha);
                console.log(quantbtn)

                var DiaEscolhaF = ""
                var mes = document.getElementById("month-picker");
                var MesEscolha = mes.innerHTML;
                
                var ano = document.getElementById("year");
                var AnoEscolha = ano.innerHTML;
                if (Diaescolha < 10){
                    DiaEscolhaF = "0" + Diaescolha
                }
                else {
                    DiaEscolhaF = Diaescolha
                }
                var DataEscolha = DiaEscolhaF + "/" + MesEscolha + "/" + AnoEscolha ;
                document.getElementById('func-text').innerHTML = "Data selecionada para a reserva:";
                document.getElementById('DataEscolhida').innerHTML = DataEscolha;
                
                    DiaEscolha = Diaescolha;
                
            });
            
        }
        calendar_days.appendChild(day)
    }
    
}

// ========================================================
//                 Escolher Mês

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
        DiaEscolha = null
        document.getElementById('func-text').innerHTML = "Selecione a data da reserva.";
        document.getElementById('DataEscolhida').innerHTML = "";
    }
    month_list.appendChild(month)
})

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

//                  Escolher ano

let currDate = new Date()

let curr_month = {value: currDate.getMonth()}
let curr_year = {value: currDate.getFullYear()}

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    DiaEscolha = null
    document.getElementById('DataEscolhida').innerHTML = "";
    document.getElementById('func-text').innerHTML = "Selecione a data da reserva.";
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    DiaEscolha = null
    document.getElementById('DataEscolhida').innerHTML = "";
    document.getElementById('func-text').innerHTML = "Selecione a data da reserva.";
    generateCalendar(curr_month.value, curr_year.value)
}


//     Não mexer

let btns = document.querySelectorAll('.btn')

btns.forEach(btn => {
    btn.onclick = (W) => {
        let x = W.clientX - W.target.offsetLeft
        let y = W.clientY - W.target.offsetTop

        let circle = document.createElement('span')
        circle.style.left = x + 'px'
        circle.style.top = y + 'px'

        btn.appendChild(circle)

        setTimeout(() => {

        circle.remove()
        
        }, 1000);
    }
    
})

/// Calendário Gerado

//                   Popup



function popupp() {
    var btt = document.getElementById("mostrarPopup");
    var limpar = document.getElementById("reset");

        limpar.onclick = function(){
            location.reload()
        }
        
        btt.onclick = function(){
            if(DiaEscolha != null) {
                document.getElementById("popup").style.display = "block";
                document.getElementById("fecharPopup").addEventListener("click", function() {
                document.getElementById("popup").style.display = "none";
                        
                var mes = document.getElementById("month-picker");
                var MesEscolha = mes.innerHTML;
                
                var ano = document.getElementById("year");
                var AnoEscolha = ano.innerHTML;
                if (DiaEscolha < 10){
                    DiaEscolhaF = "0" + DiaEscolha
                }
                else {
                    DiaEscolhaF = DiaEscolha
                }
                var DataEscolha = DiaEscolhaF + "/" + MesEscolha + "/" + AnoEscolha ;
                console.log(DataEscolha)
                });
            }
        }
    }


setInterval(popupp(), 1000);


//        var mes = document.getElementById("month-picker");
//        var MesEscolha = mes.innerHTML;
//
//       var ano = document.getElementById("year");
//        var AnoEscolha = ano.innerHTML;
//        var DataEscolha = DiaEscolha + "/" + MesEscolha + "/" + AnoEscolha ;
//        console.log(DataEscolha)


// mudar o popup,
// banco de dados.
//Horário? ( Hora por hora ou manhã-tarde-noite)
//talvez mudar um pouco a aparencia da agenda


//melhorar responsividade de tudo
//opção de filtrar e lista de aprovados


// tirar a agenda imbutida no painel de salas ( Junto com seus scripts. (exceto o de que identifica quando o botão reservar foi clicado))
// Fazer uma variavel universal contendo o nome da sala para passar pro banco de dados ( quando você clicar em uma sala a variavel recebe o nome da sala, ao sair do menu dessa sala, a variavel perde seu valor)
// Responsividade geral