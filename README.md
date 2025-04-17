![Logo - Ace Schedules](https://github.com/user-attachments/assets/cd75b0b9-248b-4c96-955f-ab121f90f58f)

# Ace schedules 📅

![](https://img.shields.io/badge/Status-Em%20desenvolvimento-blue)
![](https://img.shields.io/github/commit-activity/t/Sacul-Lucas/AceSchedules)

Trabalho de conclusão de curso (TCC) baseado na criação de um sistema de reservas para espaços/ferramentas de instituições/empresas (a instituição utilizada foi a própria instituição de ensino ETPC).

# :hammer: Funcionalidades do projeto

- `Validação cadastral`: validação de usuários (cadastro e login)
- `Validação cadastral (a)`: retorno à página de login caso o usuário tente acessar os painéis sem realizar o login
- `Validação cadastral (b)`: criptografia de senhas no momento do cadastro
- `Validação cadastral (c)`: verificação de conflitos entre dados cadastrais (nome de usuário, email, número de telefone e CNPJ)

- `Usuário administrador`: possibilidade da criação de usuários administradores, que administrariam os usuários, espaços/ferramentas e reservas criadas (em andamento)
- `Mudança de dados cadastrais`: possibilidade de mudança de dados cadastrais (em andamento)
- `Recuperação de senha`: possibilidade de recuperação de senha (em andamento)
  
- `Reservas`: reserva de espaços/ferramentas em um período de datas e horários definido pelo usuário
- `Reservas (a)`: verificação de conflitos entre reservas
- `Características dos espaços/ferramentas`: demonstração das características e descrição dos espaços/ferramentas no painel de reservas
- `Filtro de espaços/reservas`: filtro das salas mostradas no painel de reservas de acordo com as características dos espaços/ferramentas disponíveis
- `Histórico`: visibilidade do histórico de reservas realizada pelo usuário
- `Aprovação/Rejeição de reservas`: possibilidade de aprovar ou rejeitar reservas (ação apenas disponível para usuários administradores)
- `Sidebar menu`: menu de navegação entre páginas, podendo ser fixo ou colapsável, de acordo com a preferência do usuário


# 📁 Acesso ao projeto

Você pode [acessar o código fonte do projeto](https://github.com/Sacul-Lucas/AceSchedules) ou [baixá-lo](https://github.com/Sacul-Lucas/AceSchedules/archive/refs/heads/God.zip).

# ![mysql-database](https://github.com/user-attachments/assets/0752d77f-e395-4765-861f-474aebf26631) Configurar o servidor local

Antes de baixar o projeto, é preciso baixar e configurar um servidor MySQL local, seguindo os passos:

+ Acesse [a página de download do MySQL Server](https://dev.mysql.com/downloads/installer/) e faça o download do instalador do MySQL.
+ Siga as instruções de instalação e escolha quais programas instalar (utilizaremos apenas o MySQL Server e o MySQL Workbench).
+ Após isso, na página de configuração do servidor, defina o port como 5500, o usuário como root e a senha como 201024.
+ Com o servidor em execução após ser instalado e configurado, abra o MySQL Workbench, acesse 'Open MySQL script' e abra o arquivo sql presente na pasta [Ace Schedules - backend](https://github.com/Sacul-Lucas/AceSchedules/tree/God/Ace%20Schedules%20-%20backend).
+ Feito isso, execute o código selecionando o botão indicado com o símbolo '⚡' no canto superior esquerdo do código do MySQL Workbench.
+ Caso as tabelas tiverem sido criadas normalmente, pode seguir para a próxima seção.

# 🛠️ Abrir e rodar o projeto

Após baixar o projeto, extraia o arquivo .zip e abra tanto o front-end quanto o back-end com o VS Code, feito isso, siga os passos:

+ Abra o terminal em ambas as janelas (use ctrl + shift + '').
+ Execute **yarn dev** em ambos os terminais.
+ Feito isso, o projeto iniciará localmente no seu navegador padrão.
+ **Atenção:** as funções de cadastro e login só funcionarão se o servidor estiver sendo executado e estiver configurado corretamente

# ✅ Tencologias e ferramentas utilizadas

- `React`
- `Node.js`
- `MySQL`
- `Typescript`
- `Tailwind CSS`
- `Yarn`
- `Npm (gerenciador de pacotes do node)`
- `Vite`
- `HTML`
- `CSS`

# Autores

| [<img loading="lazy" src="https://github.com/user-attachments/assets/f0edeae3-bd26-463a-b051-919b4d2dd5b8" width=115><br><sub>Lucas de Matos</sub>](https://github.com/Sacul-Lucas) |  [<img loading="lazy" src="https://github.com/user-attachments/assets/45d02c53-7153-47b7-a1e3-bff19070235c" width=115><br><sub>Victor Xavier</sub>](https://github.com/victorxb) |  [<img loading="lazy" src="https://github.com/user-attachments/assets/0e09cc01-a3f3-4180-84b6-cb541b490d28" width=115><br><sub>Luann Cunha</sub>](https://github.com/phallanxx) | [<img loading="lazy" src="https://github.com/user-attachments/assets/ea8e0971-3a23-46fe-bc83-8550efe69b3a" width=115><br><sub>Arthur Santos</sub>](https://github.com/dev-arthurr) |
| :---: | :---: | :---: | :---: |
