<?php
session_start();
// Configurações do banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "aceschedule";

// Criar a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Query para buscar os dados da tabela "salas"
$sql = "SELECT id, nome, capacidade, img, status FROM salas";
$result = $conn->query($sql);

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
            <button onclick="window.location='https://etpc.com.br/'" class="barrmenulink" id="barrmenulink1"> Home</button>
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
            Bem vindo, <?php echo $_SESSION["usuario"] ?>
        </h7>
    </div>

    <div class="row">
        <div class="col">
            <h1>Salas Disponíveis</h1>
            <p>
                Nosso site de agendamento de salas simplifica a reserva de espaços para reuniões, <br>eventos e atividades,
                proporcionando conveniência e eficiência para todos os usuários.
            </p>
            <h6>Clique em uma sala para realizar um pedido de agendamento</h6>
        </div>
        <div class="colcards">

            <?php


            if ($result->num_rows > 0) {
                // Output dos dados de cada linha
                while ($row = $result->fetch_assoc()) {
                    echo '<div class="card" idcard="' . $row["id"] . '" style="background-image: url(img_salas/' . $row["img"] . ')" onclick="abrirModal(' . $row["id"] . ', \'' . $row["nome"] . '\', ' . $row["capacidade"] . ', ' . $row["status"] . ')"><h5>' . $row["nome"] . '</h5></div>';
                    //Caso o dado da capacidade virar string colocar o contrabarra e em seguida a aspas simples, igual no nome

                }
            } else {
                echo "<h6> Nenhuma sala encontrada </h6>";
            }
            $conn->close();
            ?>
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

    <!----------------------------POU-UPS--------------------------------------------------------------->
    <dialog id="modal">
        <div class="modal-container">
            <div class="modal">
                <h1>Nome sala</h1>
                <p>Descrição</p>
                <input type="hidden" id="idSala" name="idSala" value="">
                <button id="close">Fechar</button>
                <button id="reserva" onlcick=reserva>Reservar</button>
            </div>
        </div>
    </dialog>
    <!------------------------------------------------------------------------------------------------------------>
    <dialog id="poupup-reserva" class="poupup-reserva">
        <div class="popupContainerAgenda">
            <div class="popupAgenda">
                <div class="light">
                    <button id="FecharReserva" class="reserva-sair">X</button>
                    <img alt="ETPC6277" src="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/a3f00890-86aa-469d-81db-c61abcb20af5/7214d12c-1521-42ec-a653-1d1421805490?org_if_sml=13348" class="light-etpc">
                    <div class="FrameMain">
                        <div class="calendar">
                            <div class="calendar-header">
                                <span class="month-picker" id="month-picker">February</span>
                                <div class="year-picker">
                                    <span class="year-change" id="prev-year">
                                        <pre><</pre>
                                    </span>
                                    <span id="year">2021</span>
                                    <span class="year-change" id="next-year">
                                        <pre>></pre>
                                    </span>
                                </div>
                            </div>
                            <div class="calendar-body">
                                <div class="calendar-week-day">
                                    <div>Dom</div>
                                    <div>Seg</div>
                                    <div>Ter</div>
                                    <div>Qua</div>
                                    <div>Qui</div>
                                    <div>Sex</div>
                                    <div>Sab</div>
                                </div>
                                <div class="calendar-days"></div>
                            </div>

                            <div class="month-list"></div>
                        </div>
                        <div class="calendarfuncional">
                            <div class="funcional">
                                <span class="func-text" id="func-text">
                                    Selecione a data da reserva.
                                </span>
                                <spa class="func-text2" id="DataEscolhida"></spa>
                                <button type="reset" class="func-excluir button" id="reset">X</button>
                            </div>
                            <form action='inserir_reservas.php' method='POST' class='d-inline' style="width: 20vw;">
                                <input id="dataAgendamento" type="hidden" value="" name="dataAgendamento">
                                <input id="nome_sala" type="hidden" value="" name="nome_sala">
                                <input id="nome_usuario" type="hidden" value="<?= $_SESSION["id"] ?>" name="usuario">
                                <input id="horaAgendamento" type="time" name="horaAgendamento" required>
                                <button type="submit" id="mostrarPopup" class="funcenviar">Enviar</button>
                            </form>
                            <div id="popup" class="popupConcluir">
                            </div>
                        </div>
                    </div>
                </div>
                <main class="dark"></main>
            </div>
    </dialog>

    <?php
    // Verifica se o tipo de usuário é Administrador para exibir o painel de administração de reservas
    if ($_SESSION["usertype"] == "Administrador") {
        echo '<div class="painelir">
                <h2>Administrar reservas</h2>
                <button onclick="window.location=\'/AceSchedules/Ace Schedules - frontend/Painel Admin Salas - Ace Schedules/index.php\'" class="Btn-painelir" style="vertical-align:middle"><span>Painel de administração</span></button>
              </div>';
    }
    ?>

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

                <div class="logo-ace" onclick="window.location='/AceSchedules/Ace Schedules - frontend/Projeto nêmesis/1 Player/Projeto nêmesis.html'">
                    <img src="img/logotipo_ace.png">

                </div>

                <p1>Projeto Ace Schedules - Desenvolvido por Alunos da ETPC</p1>

            </div>
        </div>
    </footer>

    <script type="text/javascript" src="scripts.js"></script>
</body>

</html>