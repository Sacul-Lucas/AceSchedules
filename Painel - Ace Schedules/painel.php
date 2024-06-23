<?php
session_start();
include("tconect.php");

?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <script src="script-menu.js" defer></script>
    <link rel="icon" type="image/x-icon" href="https://cdn-icons-png.flaticon.com/512/2693/2693710.png">
    <title>Agendamento de Salas</title>
</head>

<body bgcolor="#1c1c31">

    <header>
        <div class="navbar">
            <a href="https://fundacaocsn.org.br/"><img src="img/logo-fundacao-csn.png.png" class="logo"></a>
        </div>

        <div class="sub-bar">

            <a href="https://etpc.com.br/"><img src="img/logo.png" class="logo2"></a>

            <div class="subbarLinks" style="display: flex;">
                <p>QUEM SOMOS</p>

                <div class="barSocial">
                    <a href="https://instagram.com/aceschedules?igshid=MzRlODBiNWFlZA=="><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://br.linkedin.com/school/escola-tecnica-pandia-calogeras/"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="https://github.com/Sacul-Lucas/AceSchedule"><i class="fa-brands fa-github"></i></a>
                </div>
            </div>


        </div>


        <div class="listmenu" id="listmenu">
            <button onclick="window.location=''" class="barrmenulink" id="barrmenulink1"> Home</button>
            <a href="#footer"><button class="barrmenulink" id="barrmenulink2"> Contato</button></a>
            <button form="logoutform" class="barrmenulink" id="barrmenulink3" name="logout"> Sair</button>
            <form id="logoutform" action="logout.php" method="GET"></form>
        </div>

        <div class="container1" onclick="myFunction(this);myFunction1(this);myFunction2(this);myFunction3(this);toggle(this);">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
    </header>

    <div class="user">
        <h7 class="nome">
            Bem-vindo, <?php echo $_SESSION["usuario"] ?>
        </h7>
    </div>

    <div class="container">

        <div class="row">
            <div class="col">
                <h1>Salas Disponíveis</h1>

                <p>
                    Nosso site de agendamento de salas simplifica a reserva de espaços para reuniões, <br>eventos e atividades,
                    proporcionando conveniência e eficiência para todos os usuários.
                </p>

                <h6>Clique em uma sala para realizar um pedido de agendamento</h6>

            </div>

            <div class="col">

                <div class="card card1" id="card1">
                    <h5>Auditório</h5>
                </div>

                <div class="card card2" id="card2">
                    <h5>Sala 106</h5>
                </div>

                <div class="card card3" id="card3">
                    <h5>Sala 128</h5>
                </div>

                <div class="card card4" id="card4">
                    <h5>Sala 129</h5>
                </div>

                <div class="card card5" id="card5">
                    <h5>Sala 130</h5>
                </div>

            </div>


        </div>


    </div>

    <div class="background-effects">
        <div class="enfeite1">
            <img src="img/enfeite1.png" alt="">
        </div>

        <div class="enfeite2">
            <img src="img/enfeite2.png" alt="">
        </div>
    </div>



    <!----------------------------POU-UPS 1--------------------------------------------------------------->

    <dialog id="modal1">
        <div class="modal-container">
            <div class="modal">
                <h1>Auditório Informações</h1>
                <li>Capacidade Máxima: 120 pessoas</li>
                <li>Capacidade Mínima: 90 pessoas</li>

                <button id="close">Fechar</button>
                <button id="reserva">Reservar</button>
            </div>
        </div>
    </dialog>
    <!------------------------------------------------------------------------------------------------------------>


    <!----------------------------POU-UPS 2--------------------------------------------------------------->
    <dialog id="modal2">
        <div class="modal-container">
            <div class="modal">
                <h1>Sala 106 Informações</h1>
                <li>Capacidade Máxima: 50 pessoas</li>
                <li>Capacidade Mínima: 25 pessoas</li>

                <button id="close2">Fechar</button>
                <button id="reserva2">Reservar</button>
            </div>
        </div>
    </dialog>
    <!------------------------------------------------------------------------------------------------------------>


    <!----------------------------POU-UPS 3--------------------------------------------------------------->
    <dialog id="modal3">
        <div class="modal-container">
            <div class="modal">
                <h1>Sala 128 Informações</h1>
                <li>Capacidade Máxima: 70 pessoas</li>
                <li>Capacidade Mínima: 50 pessoas</li>

                <button id="close3">Fechar</button>
                <button id="reserva3">Reservar</button>
            </div>
        </div>
    </dialog>
    <!------------------------------------------------------------------------------------------------------------>


    <!----------------------------POU-UPS 4--------------------------------------------------------------->
    <dialog id="modal4">
        <div class="modal-container">
            <div class="modal">
                <h1>Sala 129 Informações</h1>
                <li>Capacidade Máxima: 80 pessoas</li>
                <li>Capacidade Mínima: 6 pessoas</li>

                <button id="close4">Fechar</button>
                <button id="reserva4">Reservar</button>
            </div>
        </div>
    </dialog>
    <!------------------------------------------------------------------------------------------------------------>


    <!----------------------------POU-UPS 5--------------------------------------------------------------->
    <dialog id="modal5">
        <div class="modal-container">
            <div class="modal">
                <h1>Sala 130 Informações</h1>
                <li>Capacidade Máxima: 30 pessoas</li>
                <li>Capacidade Mínima: 15 pessoas</li>

                <button id="close5">Fechar</button>
                <button id="reserva5">Reservar</button>
            </div>
        </div>
    </dialog>
    <!------------------------------------------------------------------------------------------------------------>

    <dialog id="poupup-reserva-auditorio" class="poupup-reserva">
        <div class="poupup-container">
            <div class="poupup">

                <div class="poupup-topo">
                    <div class="bola-agenda">
                        <img src="img/agenda.png">
                    </div>
                    <div class="barra-1"></div>
                    <div class="bola-pagamento">
                        <p>$</p>
                    </div>
                    <div class="barra-2"></div>
                    <div class="bola-verificar">
                        <img src="img/verificar.png">
                    </div>
                </div>

                <div class="sub-poupup">
                    <form action="typeloc1_audi.php" method="POST">
                        <p>Dia da reserva</p>


                        <input type="date" id="dataAgendamento" name="dataAgendamento" class="data" placeholder="Insira a data desejada" />


                        <p>Período da Reserva</p>

                        <select id="periodo" name="periodo">
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                        </select>


                        <spaw></spaw>

                        <div classe="btn-dolado">
                            <button id="btn-agendar-auditorio" type="submit">Agendar</button>
                        </div>


                        <div classe="btn-dolado">
                            <button id="btn-voltar" type="button">Voltar</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </dialog>

    <dialog id="poupup-reserva-106" class="poupup-reserva">
        <div class="poupup-container">
            <div class="poupup">

                <div class="poupup-topo">
                    <div class="bola-agenda">
                        <img src="img/agenda.png">
                    </div>
                    <div class="barra-1"></div>
                    <div class="bola-pagamento">
                        <p>$</p>
                    </div>
                    <div class="barra-2"></div>
                    <div class="bola-verificar">
                        <img src="img/verificar.png">
                    </div>
                </div>

                <div class="sub-poupup">
                    <form action="typeloc_sala1.php" method="POST">
                        <p>Dia da reserva</p>


                        <input type="date" id="dataAgendamento" name="dataAgendamento" class="data" placeholder="Insira a data desejada" />


                        <p>Período da Reserva</p>

                        <select id="periodo" name="periodo">
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>


                        </select>
                        <spaw></spaw>

                        <div classe="btn-dolado">
                            <button id="btn-agendar-sala106">Agendar</button>
                        </div>

                        <div classe="btn-dolado">
                            <button id="btn-voltar2" type="button">Voltar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </dialog>

    <dialog id="poupup-reserva-128" class="poupup-reserva">
        <div class="poupup-container">
            <div class="poupup">

                <div class="poupup-topo">
                    <div class="bola-agenda">
                        <img src="img/agenda.png">
                    </div>
                    <div class="barra-1"></div>
                    <div class="bola-pagamento">
                        <p>$</p>
                    </div>
                    <div class="barra-2"></div>
                    <div class="bola-verificar">
                        <img src="img/verificar.png">
                    </div>
                </div>

                <div class="sub-poupup">
                    <form action="typeloc_sala2.php" method="POST">
                        <p>Dia da reserva</p>


                        <input type="date" id="dataAgendamento" name="dataAgendamento" class="data" placeholder="Insira a data desejada" />


                        <p>Período da Reserva</p>

                        <select id="periodo" name="periodo">
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>


                        </select>

                        <spaw></spaw>
                        <div classe="btn-dolado">
                            <button id="btn-agendar-sala128">Agendar</button>
                        </div>

                        <div classe="btn-dolado">
                            <button id="btn-voltar3" type="button">Voltar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </dialog>

    <dialog id="poupup-reserva-129" class="poupup-reserva">
        <div class="poupup-container">
            <div class="poupup">

                <div class="poupup-topo">
                    <div class="bola-agenda">
                        <img src="img/agenda.png">
                    </div>
                    <div class="barra-1"></div>
                    <div class="bola-pagamento">
                        <p>$</p>
                    </div>
                    <div class="barra-2"></div>
                    <div class="bola-verificar">
                        <img src="img/verificar.png">
                    </div>
                </div>

                <div class="sub-poupup">
                    <form action="typeloc_sala3.php" method="POST">
                        <p>Dia da reserva</p>


                        <input type="date" id="dataAgendamento" name="dataAgendamento" class="data" placeholder="Insira a data desejada" />


                        <p>Período da Reserva</p>

                        <select id="periodo" name="periodo">
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>


                        </select>

                        <spaw></spaw>

                        <div classe="btn-dolado">
                            <button id="btn-agendar-sala129">Agendar</button>

                        </div>

                        <div classe="btn-dolado">
                            <button id="btn-voltar4" type="button">Voltar</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>

    </dialog>

    <dialog id="poupup-reserva-sala130" class="poupup-reserva">
        <div class="poupup-container">
            <div class="poupup">

                <div class="poupup-topo">
                    <div class="bola-agenda">
                        <img src="img/agenda.png">
                    </div>
                    <div class="barra-1"></div>
                    <div class="bola-pagamento">
                        <p>$</p>
                    </div>
                    <div class="barra-2"></div>
                    <div class="bola-verificar">
                        <img src="img/verificar.png">
                    </div>
                </div>

                <div class="sub-poupup">
                    <form action="typeloc_sala4.php" method="POST">
                        <p>Dia da reserva</p>


                        <input type="date" id="dataAgendamento" name="dataAgendamento" class="data" placeholder="Insira a data desejada" />


                        <p>Período da Reserva</p>

                        <select id="periodo" name="periodo">
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>


                        </select>
                        <spaw></spaw>
                        <div classe="btn-dolado">
                            <button id="btn-agendar-sala130">Agendar</button>

                        </div>

                        <div classe="btn-dolado">
                            <button id="btn-voltar5" type="button">Voltar</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </dialog>

    <footer id="footer">
        <div class="rodape-content">
            <div class="contatos-etpc">
                <div class="primeira-coluna">
                    <div class="logo">
                        <img src="img/logo-footer-white.png" class="contatos-logo">
                    </div>

                    <div class="contatos-sub">
                        <h8>RECEBA INFORMAÇÕES DA ESCOLA</h8>

                        <div class="input-contato">
                            <input type="text" placeholder="Email" id="email" autocomplete="off">
                            <h3>OK</h3>
                        </div>

                        <div class="resto-contatos">
                            <h8>CONTATO</h8>

                            <div class="resto-contatos-sub">
                                <p1>Telefone: (24) 3340-5400</p1>

                                <p1>WhastsApp: (24) 3340-5412</p1>

                                <p1>Email: secretaria.etpc@csn.com.br</p1>

                                <h3>R. Sessenta e Dois, 90 - Sessenta,<br> Volta Redonda - RJ </h3>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="segunda-coluna-links">
                    <a href="https://etpc.com.br/">INÍCIO</a>
                    <a href="https://etpc.com.br/quemsomos/">QUEM SOMOS</a>
                    <a href="https://etpc.com.br/fundacao-csn/">FUNDAÇÃO CSN</a>
                    <a href="https://etpc.com.br/ensino-medio-com-curso-tecnico/">ENSINO MÉDIO + TÉCNICO</a>
                    <a href="https://etpc.com.br/curso-tecnico-subsequente/">CURSOS TÉCNICOS</a>
                    <a href="https://etpc.com.br/curso-rapido/">CURSOS RÁPIDOS</a>
                    <a href="https://etpc.com.br/extracurricular/cursos-teen/">CURSOS TEEN</a>
                    <a href="https://etpc.com.br/in-company/">IN COMPANY</a>
                    <a href="https://etpc.com.br/politica-de-privacidade/">POLÍTICA DE PRIVACIDADE</a>
                </div>

                <div class="segunda-coluna-links">
                    <a href="https://etpc.com.br/noticias/">NOTÍCIAS</a>
                    <a href="https://etpc.com.br/noticias/matriculas/">MATRÍCULAS</a>
                </div>

                <div class="terceira-coluna-social">
                    <a href="https://www.instagram.com/ETPCVR/"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://www.facebook.com/ETPCVR/"><i class="fa-brands fa-square-facebook"></i></a>
                    <a href="https://www.linkedin.com/school/escola-tecnica-pandia-calogeras/"><i class="fa-brands fa-linkedin"></i></a>
                </div>
            </div>
        </div>

        <div class="footer-tag">
            <div class="tag-content">
                <div class="etpc-direitos">
                    <p>Política de privacidade // © <script>
                            document.write(new Date().getFullYear());
                        </script> ETPC - Todos os direitos reservados</p>


                </div>

                <div class="logo-ace" onclick="window.location='/Projeto nêmesis/1 Player/Projeto nêmesis.html'">
                    <img src="img/logotipo_ace.png">

                </div>

                <p1>Projeto Ace Schedules - Desenvolvido por Alunos da ETPC</p1>

            </div>
        </div>
    </footer>

    <script type="text/javascript" src="scripts.js"></script>
</body>

</html>