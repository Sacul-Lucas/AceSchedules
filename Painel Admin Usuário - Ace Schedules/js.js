//======================== Aplica a máscara de telefone ========================
var telMask = IMask(document.getElementById('addTelefone'), {
    mask: '(00) 0000-0000'
});
var telMask = IMask(document.getElementById('addcnpj'), {
    mask: '00.000.000/0000-00'
});
var telMask = IMask(document.getElementById('telefone'), {
    mask: '(00) 0000-0000'
});
// Aplica a máscara de CNPJ
var cnpjMask = IMask(document.getElementById('cnpj'), {
    mask: '00.000.000/0000-00'
});

//======================== Carregar informações dos popups ========================

$(document).on('click', '.editBtn', function () {
    var id = $(this).val();

    $.ajax({
        type: "GET",
        url: "code.php?id=" + id,
        success: function (response) {
            console.log(response); // Adicionado para verificar a resposta do servidor
            var res = jQuery.parseJSON(response);
            if (res.status == 404) {
                alert(res.message);
            } else if (res.status == 200) {
                $('#id').val(res.data.id);
                $('#usuario').val(res.data.usuario);
                $('#senha').val(res.data.senha);
                $('#email').val(res.data.email);
                $('#telefone').val(res.data.telefone);
                $('#cnpj').val(res.data.cnpj);

                console.log('usertype:', res.data.usertype); // Adicionado para verificar o valor do usertype

                // Atualize o valor do dropdown
                $('#edittypes').val(res.data.usertype);

                $('#UserEditModal').modal('show');
            }
        },
        error: function(xhr, status, error) {
            console.error(xhr); // Adicionado para capturar e exibir erros da solicitação AJAX
        }
    });
});


$(document).on('click', '.viewBtn', function () {

    var id = $(this).val();
    $.ajax({
        type: "GET",
        url: "code.php?id=" + id,
        success: function (response) {

            var res =  jQuery.parseJSON(response);
            if(res.status == 404) {

                alert(res.message);
            }else if(res.status == 200){

                $('#view_usuario').text(res.data.usuario);
                $('#view_email').text(res.data.email);
                $('#view_senha').text(res.data.senha);
                $('#view_telefone').text(res.data.telefone);
                $('#view_cnpj').text(res.data.cnpj);
                $('#view_usertype').text(res.data.usertype);

                $('#UserViewModal').modal('show');
            }
        }
    });
});

//======================== Funções e carregamento da tabela ========================

$(document).ready(function() {
    function loadUsuarios() {
        var usertype = $('#user').val();
        var email = $('#selectMail').val();
        var nome = $('#nome').val();

        $.ajax({
            url: 'get_usuarios.php',
            type: 'GET',
            data: {
                user_type: usertype,
                email: email,
                nome: nome
            },
            success: function(data) {
                var response = JSON.parse(data);
                $('#usuarios tbody').html(response.html);
                $('#total_usuarios').text(response.total);
                $('span#detalhes-usuario').text(`${response.total}`);
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }

    $('#user, #selectMail, #nome').on('change keyup', function() {
        loadUsuarios();
    });

// Carrega os usuários ao carregar a página
loadUsuarios();

//======================== Submissão dos formulários ========================

    // Submissão do formulário de adicionar usuário
    $(document).on('submit', '#saveUser', function (e) {
        e.preventDefault();

        var formData = new FormData(this);
        formData.append("save_User", true);

        $.ajax({
            type: "POST",
            url: "code.php",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                var res = jQuery.parseJSON(response);
                if (res.status == 422) {
                    $('#errorMessage').removeClass('d-none');
                    $('#errorMessage').text(res.message);
                } else if (res.status == 200) {
                    $('#errorMessage').addClass('d-none');
                    $('#UserAddModal').modal('hide');
                    $('#saveUser')[0].reset();

                    // Carregar a tabela novamente
                    loadUsuarios();
                } else if (res.status == 500) {
                    alert(res.message);
                }
            }
        });
    });

    // Submissão do formulário de editar usuário
    $(document).on('submit', '#updateUser', function (e) {
        e.preventDefault();

        var formData = new FormData(this);
        formData.append("update_User", true);

        $.ajax({
            type: "POST",
            url: "code.php",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                var res = jQuery.parseJSON(response);
                if (res.status == 422) {
                    $('#errorMessageUpdate').removeClass('d-none');
                    $('#errorMessageUpdate').text(res.message);
                } else if (res.status == 200) {
                    $('#errorMessageUpdate').addClass('d-none');
                    $('#UserEditModal').modal('hide');
                    $('#updateUser')[0].reset();


                    // Carregar a tabela novamente
                    loadUsuarios();
                } else if (res.status == 500) {
                    alert(res.message);
                }
            }
        });
    });

    // Deletar usuário
    $(document).on('click', '.deleteBtn', function (e) {
        e.preventDefault();

        if (confirm('Tem certeza que quer deletar este cadastro?')) {
            var id = $(this).val();
            $.ajax({
                type: "POST",
                url: "code.php",
                data: {
                    'delete': true,
                    'id': id
                },
                success: function (response) {
                    var res = jQuery.parseJSON(response);
                    if (res.status == 500) {
                        alert(res.message);
                    } else {

                        // Carregar a tabela novamente
                        loadUsuarios();
                    }
                }
            });
        }
    });
});