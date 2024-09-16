interface FormsReservaProps {
    formVER: boolean;
    formID: string;
    idSala: string;
    idData: string;
    idHora: string;
    edit: boolean;

}

export const FormsReserva: React.FC<FormsReservaProps> = ({ 
        formVER,
        formID,
        idSala,
        idData,
        idHora,
        edit,

  
}) => {
return (
<div>
{formVER === true ? 
        <form id={formID} method="POST">
            <div className="modal-body">

                <div id="errorMessageUpdate" className="alert alert-warning d-none"></div>

                {edit === true ? 
                    <input type="hidden" name="id" id="id"/>
                :<div/>}

                <div className="mb-3">
                    <label>Sala alocada</label>
                    <select name="sala" id={idSala} className="form-control">
                        {/* <!-- Opções serão preenchidas pelo JavaScript --> */}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Data do agendamento</label>
                    <input id={idData} type="date" name="data" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label>Horário do agendamento</label>
                    <input id={idHora} type="time" name="hora" className="form-control"/>
                </div>
            </div>
        </form>
        : 
        // Visualizar
        <div>
            <div className="modal-body">
            <div className="mb-3">
                <label>Nome da sala alocada</label>
                <p id="view_nome" className="form-control"></p>
            </div>
            <div className="mb-3">
                <label>Data</label>
                <p id="view_data" className="form-control"></p>
            </div>
            <div className="mb-3">
                <label>Horario</label>
                <p id="view_hora" className="form-control"></p>
            </div>
            <div className="mb-3">
                <label>Locador da sala</label>
                <p id="view_locador" className="form-control"></p>
            </div>
            <div className="mb-3">
                <label>Email do locador</label>
                <p id="view_email" className="form-control"></p>
            </div>
            <div className="mb-3">
                <label>Contato do locador</label>
                <p id="view_contato" className="form-control"></p>
            </div>
            <div className="mb-3">
                <label>CNPJ do locador</label>
                <p id="view_cnpj" className="form-control"></p>
            </div>
            </div>
            <div className="modal-footer">
            </div>
        </div>}            
</div>
)};