import React, { useEffect, useRef, useState } from 'react';
import '../../Css/Owned/AdminRoom.css';

export interface Sala {
    id: number;
    nome: string;
    descricao: string;
    status: string;
    backImg: string;
    caracteristicas: string; // Assumindo que isso é uma string JSON
}

interface FormsSalasProps {
    selectedSala: Sala | null;
    formVER: boolean;
    formID: string;
    idName: string;
    idDescription: string;
    idIMG: string;
    idCaract: string;
    idStatus: string;
    edit: boolean;
    block: boolean;

    onStatusChange?: (status: string) => void;
}

export const FormsSalas: React.FC<FormsSalasProps> = ({
    selectedSala,
    formVER,
    formID,
    idName,
    idDescription,
    idIMG,
    idCaract,
    idStatus,
    edit,
    block,
    onStatusChange,
}) => {
    const [statusChecked, setStatusChecked] = useState(selectedSala?.status === '1');
    const [caracteristicas, setCaracteristicas] = useState<string[]>([]);

    const dragAreaRef = useRef<HTMLDivElement | null>(null);
    const inputImgRef = useRef<HTMLInputElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (selectedSala && selectedSala.caracteristicas) {
            try {
                const parsedCaracteristicas = JSON.parse(selectedSala.caracteristicas);
                // Verifique se parsedCaracteristicas é uma string ou um array e transforme
                if (Array.isArray(parsedCaracteristicas)) {
                    setCaracteristicas(parsedCaracteristicas);
                } else {
                    setCaracteristicas(parsedCaracteristicas.split(',').map((item: string) => item.trim()));
                }
            } catch (error) {
                console.error('Erro ao analisar características:', error);
            }
        }
    }, [selectedSala]);

    useEffect(() => {
        const dragArea = dragAreaRef.current;
        const input = inputImgRef.current;
        const button = buttonRef.current;

        if (dragArea && input && button) {
            button.onclick = () => {
                input.click();
            };

            input.addEventListener('change', function () {
                const file = this.files?.[0];
                if (file) {
                    dragArea.classList.add('active');
                    displayFile(file);
                }
            });

            dragArea.addEventListener('dragover', (event) => {
                event.preventDefault();
                dragArea.classList.add('active');
            });

            dragArea.addEventListener('dragleave', () => {
                dragArea.classList.remove('active');
            });

            dragArea.addEventListener('drop', (event) => {
                event.preventDefault();
                const file = event.dataTransfer!.files[0];
                if (file) {
                    displayFile(file);
                }
            });
        }
    }, []);

    function displayFile(file: File) {
        const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

        if (validExtensions.includes(file.type)) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const fileURL = fileReader.result as string;
                const safeFileName = file.name.replace(/\s+/g, '_');
                if (dragAreaRef.current) {
                    dragAreaRef.current.innerHTML = `<img src="${fileURL}" alt="${safeFileName}">`;
                    if (inputImgRef.current) {
                        inputImgRef.current.files = createFileList(new File([file], safeFileName, { type: file.type }));
                    }
                }
            };
            fileReader.readAsDataURL(file);
        } else {
            alert('Tipo de arquivo não é uma imagem');
            if (dragAreaRef.current) {
                dragAreaRef.current.classList.remove('active');
            }
        }
    }

    function createFileList(file: File): FileList {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        return dataTransfer.files;
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newStatus = event.target.checked ? '1' : '0';
        setStatusChecked(event.target.checked);
        // Chamar a função para atualizar o status no pai
        onStatusChange!(newStatus);
    };

    return (
        <div>
            {formVER ? (
                <form id={formID}>
                    <div className="modal-body">
                        <div id="errorMessage" className="alert alert-warning d-none"></div>
                        {edit && selectedSala ? (
                            <input type="hidden" name="id" value={selectedSala.id} />
                        ) : null}

                        <div className="mb-3">
                            <label htmlFor={idName} >Nome da Sala</label>
                            <input
                                className="form-control"
                                type="text"
                                id={idName}
                                placeholder="Nome sala"
                                autoComplete="off"
                                defaultValue={selectedSala?.nome}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={idDescription} >Descrição</label>
                            <input
                                className="form-control !h-auto"
                                type="text"
                                id={idDescription}
                                placeholder="Descrição da sala"
                                autoComplete="off"
                                defaultValue={selectedSala?.descricao}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={idCaract} >Características</label>
                            <textarea
                                className="form-control"
                                id={idCaract}
                                placeholder="Características da sala"
                                autoComplete="off"
                                defaultValue={caracteristicas.join(', ')}
                            />
                        </div>

                        {block && (
                            <div className="mb-3">
                                <label htmlFor={idStatus}>Bloquear sala</label>
                                <input
                                    type="checkbox"
                                    id={idStatus}
                                    checked={statusChecked}
                                    onChange={handleStatusChange}
                                />
                            </div>
                        )}

                        <div className="container">
                            <h3>Enviar imagem</h3>
                            <div className="drag-area" ref={dragAreaRef}>
                                <div className="icon">
                                    <i className="fa-solid fa-image"></i>
                                </div>
                                <span className="header">Arrastar & soltar</span>
                                <span className="header">
                                    {' '}ou <span className="button" ref={buttonRef}> procurar </span>
                                </span>
                                <span className="support">Tipos aceitos: JPEG, JPG, PNG </span>
                            </div>
                            <div className="mb-3">
                                <input
                                    className="input-img"
                                    accept="image/*"
                                    type="file"
                                    id={idIMG}
                                    ref={inputImgRef}
                                    hidden
                                />
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="view_nome">Nome</label>
                        <p id="view_nome" className="form-control">{selectedSala?.nome}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="view_descricao">Descrição:</label>
                        <p id="view_descricao" className="form-control !h-auto">{selectedSala?.descricao}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="view_imagem">Imagem:</label>
                        {/* Exibe o nome da imagem */}
                        <p id="view_imagem" className="form-control">{selectedSala?.backImg}</p>
                        {/* Renderiza a imagem */}
                        {selectedSala?.backImg && (
                            <div className="mt-2">
                                <img
                                    src={`/src/assets/img_salas/${selectedSala.backImg}`} // Corrija o caminho de acordo com o que foi armazenado
                                    alt={selectedSala?.nome || "Sala sem nome"}
                                    className="max-w-full h-auto border rounded-lg shadow-md"
                                />
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="view_caracteristicas">Características:</label>
                        <textarea
                            id='view_caracteristicas'
                            className="form-control !h-auto"
                            placeholder="Características da sala"
                            autoComplete="off"
                            defaultValue={caracteristicas.join(', ')}
                            disabled
                        ></textarea>
                    </div>
                </div>
            )}
        </div>
    );
};