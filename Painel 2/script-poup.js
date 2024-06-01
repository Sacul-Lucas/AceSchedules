const btnSala1 = document.getElementById(`btnSala1`);
const fechar = document.getElementById(`close`);
const modal1 = document.getElementById(`PoupUp1`);
const btnReserva1 = document.getElementById('reserva');
const poupup_reserva_auditorio = document.getElementById('poupup_reserva_auditorio')
const btn_voltar = document.getElementById('btn_voltar')

btnSala1.onclick = function () {
    modal1.showModal()
}
 
fechar.onclick = function () {
    modal1.close()
}

btnReserva1.onclick = function () {
    modal1.close();
    poupup_reserva_auditorio.showModal();
}

btn_voltar.onclick = function (){
    poupup_reserva_auditorio.close()
    modal1.showModal()
}

const btnSala2 = document.getElementById(`btnSala2`);
const fechar2 = document.getElementById(`close2`);
const modal2 = document.getElementById(`PoupUp2`);
const btnReserva2 = document.getElementById('reserva2');
const poupup_reserva_sala129 = document.getElementById('poupup_reserva_sala119')
const btn_voltar2 = document.getElementById('btn_voltar2')

btnSala2.onclick = function () {
    modal2.showModal()
}
 
fechar2.onclick = function () {
    modal2.close()
}

btnReserva2.onclick= function () {
    modal2.close();
    poupup_reserva_sala129.showModal();
}

btn_voltar2.onclick = function (){
    poupup_reserva_sala129.close()
    modal2.showModal()
}

const btnSala3 = document.getElementById(`btnSala3`);
const fechar3 = document.getElementById(`close3`);
const modal3 = document.getElementById(`PoupUp3`);
const btnReserva3 = document.getElementById('reserva3');
const poupup_reserva_sala118 = document.getElementById('poupup_reserva_sala118')
const btn_voltar3 = document.getElementById('btn_voltar3')

btnSala3.onclick = function () {
    modal3.showModal()
}
 
fechar3.onclick = function () {
    modal3.close()
}

btnReserva3.onclick = function () {
    modal3.close();
    poupup_reserva_sala118.showModal();
}

btn_voltar3.onclick = function (){
    poupup_reserva_sala118.close()
    modal3.showModal()
}


const btnSala4 = document.getElementById(`btnSala4`);
const fechar4 = document.getElementById(`close4`);
const modal4 = document.getElementById(`PoupUp4`);
const btnReserva4 = document.getElementById('reserva4');
const btn_voltar4 = document.getElementById('btn_voltar4')

btnSala4.onclick = function () {
    modal4.showModal()
}
 
fechar4.onclick = function () {
    modal4.close()
}

btnReserva4.onclick = function () {
    modal4.close();
    poupup_reserva_auditorio.showModal();
}

btn_voltar.onclick = function (){
    poupup_reserva_auditorio.close()
    modal4.showModal()
}


const btnSala5 = document.getElementById(`btnSala5`);
const fechar5 = document.getElementById(`close5`);
const modal5 = document.getElementById(`PoupUp5`);
const btnReserva5 = document.getElementById('reserva5');
const btn_voltar5 = document.getElementById('btn_voltar5');

btnSala5.onclick = function () {
    modal5.showModal()
}
 
fechar5.onclick = function () {
    modal5.close()
}

btnReserva5.onclick = function () {
    modal5.close();
    poupup_reserva_sala129.showModal();
}

btn_voltar5.onclick = function (){
    poupup_reserva_sala129.close()
    modal5.showModal()
}