//======================== Carregar informações dos popups ========================
$(document).on('click', '.editBtn', function () {
    var id = $(this).data('id');
    $.ajax({
        url: 'code.php',
        type: 'GET',
        data: { id: id },
        success: function (response) {
            try {
                var res = jQuery.parseJSON(response);
                if (res.status == 200) {
                    $('#id').val(res.data.id);
                    $('#data').val(res.data.dataAgendamento);
                    $('#hora').val(res.data.horaAgendamento);

                    var salas = res.salas;
                    var salaAtual = res.data.sala_id;
                    var select = $('select[name="sala"]');
                    select.empty();
                    
                    salas.forEach(function(sala) {
                        var selected = sala.id == salaAtual ? 'selected' : '';
                        select.append('<option value="' + sala.id + '" ' + selected + '>' + sala.nome + '</option>');
                    });

                    $('#EditModal').modal('show');
                } else {
                    alert(res.message);
                }
            } catch (e) {
                console.error("Invalid JSON response", e);
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error: ", error);
        }
    });
});
$(document).on('click', '.viewBtn', function (e) {
    var id = $(this).data('id');
    $.ajax({
        url: 'code.php',
        type: 'GET',
        data: { id: id },
        success: function (response) {
            try {
                var res = jQuery.parseJSON(response);
                if (res.status == 200) {
                    $('#view_nome').text(res.data.sala_nome);
                    $('#view_data').text(res.data.dataAgendamento);
                    $('#view_hora').text(res.data.horaAgendamento);
                    $('#view_locador').text(res.data.locador_nome);
                    $('#view_email').text(res.data.email);
                    $('#view_contato').text(res.data.telefone);
                    $('#view_cnpj').text(res.data.cnpj);
                    $('#ViewModal').modal('show');
                } else {
                    alert(res.message);
                }
            } catch (e) {
                console.error("Invalid JSON response", e);
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error: ", error);
        }
    });
});

//======================== Funções e carregamento da tabela ========================

$(document).ready(function() {
    function loadReservas(status) {
        var salaId = status === 0 ? $('#filter_sala').val() : $('#sala_aprov').val();
        var data = status === 0 ? $('#filter_data').val() : $('#data_aprov').val();
        var hora = status === 0 ? $('#filter_hora').val() : $('#hora_aprov').val();
        var nome = status === 0 ? $('#filter_nome').val() : $('#nome_aprov').val();

        if (data) {
            var parts = data.split('-');
            data = parts[2] + '/' + parts[1] + '/' + parts[0];
        }

        $.ajax({
            url: 'get_reservas.php',
            type: 'GET',
            data: {
                sala_id: salaId,
                data: data,
                hora: hora,
                nome: nome,
                status: status
            },
            success: function(data) {
                var result = JSON.parse(data);
                if (status === 0) {
                    $('#reservas tbody').html(result.html);
                    $('#countPendente').text(result.count);
                } else {
                    $('#reservas_aprov tbody').html(result.html);
                    $('#countAprovada').text(result.count);
                }
            }
        });
    }

    $('#filter_sala, #filter_data, #filter_hora, #filter_nome').on('change keyup', function() {
        loadReservas(0);
    });

    $('#sala_aprov, #data_aprov, #hora_aprov, #nome_aprov').on('change keyup', function() {
        loadReservas(1);
    });

//======================== Submissão dos formulários ========================

    $(document).on('click', '.approve-btn', function() {
        var id = $(this).data('id');
        if (confirm('Tem certeza que quer aprovar este cadastro?')) {
            $.ajax({
            url: 'approve_reserva.php',
            type: 'POST',
            data: {
                id: id
            },
            success: function(response) {
                if (response.trim() === 'success') {
                    loadReservas(0);
                    loadReservas(1);

                } else if (response.trim() === 'invalid') {
                    alert('Não foi possível enviar o email porque o destinatário é o próprio remetente.');
                } else {
                    alert('Erro ao aprovar a reserva: ' + response);
                }
            }
        })
        }
        
    })


// Inicializa as tabela ao carregar a página
loadReservas(0);
loadReservas(1);

//======================== Submissão dos formulários ========================
    $(document).on('submit', '#add', function (e) {
        e.preventDefault();

        var formData = new FormData(this);
        formData.append("save", true);

        $.ajax({
            type: "POST",
            url: "code.php",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                try {
                    var res = jQuery.parseJSON(response);
                    if (res.status == 422 || res.status == 409) {
                        $('#errorMessage').removeClass('d-none');
                        $('#errorMessage').text(res.message);
                    } else if (res.status == 200) {
                        $('#errorMessage').addClass('d-none');
                        $('#AddModal').modal('hide');
                        $('#add')[0].reset();

                        // Carregar a tabela novamente
                        loadReservas(0);
                        loadReservas(1);
                    } else if (res.status == 500) {
                        alert(res.message);
                    }
                } catch (e) {
                    console.error("Invalid JSON response", e);
                    $('#errorMessage').removeClass('d-none');
                    $('#errorMessage').text("Erro ao processar a resposta do servidor.");
                }
            }
        });
    });
    $(document).on('submit', '#update', function (e) {
        e.preventDefault();

        var formData = new FormData(this);
        formData.append("update", true);

        $.ajax({
            type: "POST",
            url: "code.php",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log("Response from server:", response);  // Log da resposta
                if (response) {
                    try {
                        var res = jQuery.parseJSON(response);
                        if (res.status == 422 || res.status == 409) {
                            $('#errorMessageUpdate').removeClass('d-none');
                            $('#errorMessageUpdate').text(res.message);
                        } else if (res.status == 200) {
                            $('#errorMessageUpdate').addClass('d-none');
                            $('#EditModal').modal('hide');
                            $('#update')[0].reset();

                            // Carregar a tabela novamente
                            loadReservas(0);
                            loadReservas(1);
                        } else if (res.status == 500) {
                            alert(res.message);
                        }
                    } catch (e) {
                        console.error("Invalid JSON response", e);
                        $('#errorMessageUpdate').removeClass('d-none');
                        $('#errorMessageUpdate').text('Resposta inválida do servidor.');
                    }
                } else {
                    console.error("Empty response from server");
                    $('#errorMessageUpdate').removeClass('d-none');
                    $('#errorMessageUpdate').text('Resposta vazia do servidor.');
                }
            }
        });
    });

    $(document).on('click', '.deleteBtn', function(e) {
        e.preventDefault();

        if (confirm('Tem certeza que quer deletar esta reserva?')) {
            var id = $(this).data('id'); // Mudança: Corrigir de $(this).val() para $(this).data('id')
            $.ajax({
                type: "POST",
                url: "code.php",
                data: {
                    'delete': true,
                    'id': id
                },
                success: function(response) {
                    var res = jQuery.parseJSON(response);
                    if (res.status == 200) {
                        loadReservas(0);
                        loadReservas(1);
                    } else {
                        alert(res.message);
                    }
                }
            });
        }
    });
});