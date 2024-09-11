interface FormsSalasProps {
    formVER: boolean;
    formID: string;
    idName: string;
    idIMG: string;
    idCaract: string;
    edit: boolean;
    block: boolean;
}

export const FormsSalas: React.FC<FormsSalasProps> = ({ 
        formVER,
        formID,
        idName,
        idIMG,
        idCaract,
        edit,
        block,

  
}) => {
return (
<div>
    {formVER === true ? 
        <form id={formID}>
            <div className="modal-body">

                <div id="errorMessage" className="alert alert-warning d-none"></div>

                {edit === true ? 
                    <input type="hidden" name="id" id="id"/>
                :<div/>}
                
                <div className="mb-3">
                    <label>Nome da Sala</label>
                    <input className="form-control" type="text" name={idName} placeholder="Nome sala" autoComplete="off" />
                </div>
                <div className="mb-3">
                    <label>Capacidade</label>
                    <input className="form-control" type="number" name={idCaract} placeholder="Texto capacidade" autoComplete="off" />
                </div>
                <div className="container">
                    <h3>Enviar imagem</h3>
                <div className="drag-area">
                        <div className="icon">
                            <i className="fas fa-images"></i>
                        </div>
                        <span className="header">Arrastar & soltar</span>
                        <span className="header"> ou <span className="button"> procurar </span></span>
                        <span className="support">Tipos acceitos: JPEG, JPG, PNG </span>
                </div>
                    <div className="mb-3">
                        <input className="input-img" accept="image/*" type="file" name={idIMG} placeholder="Img nome" hidden />
                    </div>
                </div>
                {block === true ? 
                <div className="mb-3">
                    <label>Bloquear sala</label>
                    <input type="checkbox" name="status"/>
                </div>
                : <div/>}
            </div>
        </form>
        : 
        // Visualizar
        <div className="modal-body">
            <div className="mb-3">
                <label htmlFor="">Nome</label>
                <p id="view_nome" className="form-control"></p>
            </div>
            <div className="mb-3">
                <label htmlFor="">Caracteristicas:</label>
                <p id="view_caracteristicas" className="form-control"></p>
            </div>
            <div className="mb-3">
                <label htmlFor="">Imagem:</label>
                <p id="view_imagem" className="form-control"></p>
            </div>
        </div>}            
</div>
)};

                    