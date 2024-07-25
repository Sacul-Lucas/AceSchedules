const modal = document.getElementById(`modal`); // ID vai ter q ser gerado para cada sala
const fazer_reserva = document.getElementById('poupup-reserva');
const fechar = document.getElementById(`close`);
const reservar = document.getElementById(`reserva`);

function abrirModal(id_sala, nome_sala, capacidade_sala, status_sala) {
    if (status_sala == 1) {
        alert('Esta sala está bloqueada e não pode ser aberta para reserva.');
        return;
    }
    modal.querySelector('h1').innerHTML = `Informações ${nome_sala}`;
    modal.querySelector('p').innerHTML = `Capacidade: ${capacidade_sala} pessoas`;
    modal.querySelector('#idSala').value = id_sala;
    modal.show();
}
    

fechar.onclick = function () {
    modal.close()
}

reservar.onclick = function() {
    modal.close()
    fazer_reserva.show()
    
    document.getElementById('func-text').innerHTML = "Selecione a data da reserva.";
    document.getElementById('nome_sala').value = document.getElementById('idSala').value;
    DiaEscolha = null;

function formatMonth(month) {
        return (month + 1).toString().padStart(2, '0');
}
    //NomeSala = this.innerHTML  
    
///               Gerando o calendário

let calendar = document.querySelector('.calendar')
var DiaEscolha = null;
const month_names = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

///                 Ano bissexto
isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}
///========================================================
var DiaEscolhaF = null;
generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

///          Data atual que aparece quando o calendário é aberto

    let currDate = new Date()
    if (month == null) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month_name = `${month_names[month]}`
    month_picker.innerHTML = curr_month_name
    calendar_header_year.innerHTML = year

    // primeiro dia do mês

    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('button')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.setAttribute('id', i)
            day.innerHTML = i - first_day.getDay() + 1
            var buttons = document.querySelectorAll('button');
            var quantbtn = 0;
            buttons.forEach(function (button) {
                if (!button.hasAttribute('class') || button.getAttribute('class').trim() === '') {
                    quantbtn++;
                }
            });

            if (quantbtn > 0) {
                day.setAttribute('id', i - quantbtn + 2)
            }
            //                                              Pegar o dia atual
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
            day.addEventListener('click', function () {
                console.clear(); // Clear the console
                let Diaescolha = this.innerHTML
                console.log('Button ID:', Diaescolha);


                
                var MesEscolha = (curr_month.value + 1).toString().padStart(2, '0'); // Obtendo o número do mês
                
                var AnoEscolha = curr_year.value; // Obtendo o ano atual
                
                if (Diaescolha < 10) {
                    DiaEscolhaF = "0" + Diaescolha
                }
                else {
                    DiaEscolhaF = Diaescolha
                }
                var DataAgendamento = document.getElementById('dataAgendamento');
                DataAgendamento.value = AnoEscolha + "-" + MesEscolha + "-" + DiaEscolhaF;
                var DataAgendamento = 
                document.getElementById('dataAgendamento').innerHTML
                var DataEscolha = DiaEscolhaF + "/" + MesEscolha + "/" + AnoEscolha;
                document.getElementById('func-text').innerHTML = "Data selecionada para a reserva:";
                document.getElementById('DataEscolhida').innerHTML = DataEscolha;
                console.log(DiaEscolhaF)


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

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

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
    console.log(DiaEscolha)
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

var limpar = document.getElementById("reset");

limpar.onclick = function() {
    document.getElementById('DataEscolhida').innerHTML = "";
    document.getElementById('func-text').innerHTML = "Selecione a data da reserva.";
    DiaEscolha == null
}

var btt = document.getElementById("mostrarPopup");

btt.onclick = function popupp() {
    // Verifica se DiaEscolhaF está definido
    if (DiaEscolhaF === null) {
        event.preventDefault();
        alert("Por favor, selecione uma data para a reserva.");
    } else {
        // Popup de confirmação
        if (confirm("Deseja confirmar o agendamento para a data selecionada?")) {
            // Se confirmado, o formulário é enviado
            document.getElementById('popup').classList.add('show');
            return true;
        } else {
            // Se cancelado, o envio do formulário é cancelado
            event.preventDefault();
            return false;
        }
    }
}

FecharReserva.onclick = function () {
    event.preventDefault();
    fazer_reserva.close()
    modal.show()
}

}

