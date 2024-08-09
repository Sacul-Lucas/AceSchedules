import { Link } from "react-router-dom"
import { IMaskInput } from "react-imask";
import { ChangeEventHandler, FormEventHandler, SetStateAction } from "react";

interface AuthFormProps {
    formId: string;
    formAction: ((e: { preventDefault: () => void; }) => Promise<void>) | undefined;
    formBttTitle: string;
    formMethod: string;
    userAction?: ChangeEventHandler<HTMLInputElement> | undefined;
    telAction?: FormEventHandler<HTMLInputElement> | undefined | any;
    cnpjAction?: ChangeEventHandler<HTMLInputElement> | undefined;
    emailAction: (e: { target: { value: SetStateAction<string>; }; }) => void;
    senhaAction: (e: { target: { value: SetStateAction<string>; }; }) => void;
    typeAction: FormEventHandler<HTMLLabelElement> | undefined | any;
}

export const AuthForm: React.FC<AuthFormProps> = ({ 
        formId,
        formAction,
        formBttTitle, 
        formMethod, 
        userAction = undefined, 
        telAction = undefined, 
        cnpjAction = undefined, 
        emailAction, 
        senhaAction, 
        typeAction 
    }) => {
    return (
        <section>
            <form className="form-box lg:!w-[32.8dvw] sm:!text-base backdrop-blur-[6px]" 
                id={formId} 
                method={formMethod} 
                onSubmit={formAction}
                >
                <div className="sticky top-0 z-auto w-full h-full">
                    <h2 className="Auth-title lg:!text-5xl sm:text-5xl">{formId}</h2>
                    <div className="mx-8 lg:mx-11">
                        {formId === 'Cadastro' ? 
                            <div>
                                <label htmlFor="usuario">Empresa/Usuário</label>
                                <div className="flex flex-row w-full space-x-3">
                                    <div className="flex-1">
                                        <div className="inputbox">
                                            <input type="text" id="usuario" name="usuario" placeholder="Insira o nome da empresa/usuário" onChange={userAction} required/>
                                        </div>
                                    </div>
                                </div>

                                <label htmlFor="telefone">Telefone</label>
                                <div className="flex flex-row w-full space-x-3">
                                    <div className="flex-1">
                                        <div className="inputbox">
                                            <IMaskInput mask="(00) 0000-0000" type="text" id="telefone" name="telefone" placeholder="Insira o seu telefone" onChange={telAction} required/>
                                        </div>
                                    </div>
                                </div>

                                <label htmlFor="cnpj">CNPJ</label>
                                <div className="flex flex-row w-full space-x-3">
                                    <div className="flex-1">
                                        <div className="inputbox">
                                            <IMaskInput mask="00.000.000/0000-00" type="text" id="cnpj" name="cnpj" placeholder="Insira o seu cnpj" onChange={cnpjAction} required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
            
                        : <div/>}
    
                        <label htmlFor="email">{formId === 'Cadastro' ? 'Email' : 'Email/Usuário'}</label>
                        <div className="flex flex-row w-full space-x-3">
                            <div className="flex-1">
                                <div className="inputbox">
                                    <input autoComplete="on" type="text" id="email" name="email" onChange={emailAction} placeholder={formId === 'Cadastro' ? 'Insira o seu email' : 'Insira o seu email/nome de usuário'} required/>
                                </div>
                            </div>
                        </div>
                        
                        <label htmlFor="senha">Senha</label>
                        <div className="flex flex-row w-full space-x-3">
                            <div className="flex-1">
                                <div className="inputbox">
                                    <input autoComplete="off" type="password" id="senha" name="senha" onChange={senhaAction} placeholder="Insira a sua senha" required/>
                                </div>
                            </div>
                        </div>
                        
                        
                        {formId === 'Login' ?
                                <div className="pt-6 forget">
                                    <span >Ainda não é cadastrado? <Link to="/">Cadastre-se</Link></span>
                                </div>
                        :       <div className="pt-4 forget">
                                    <span >Já é cadastrado? <Link to="/Login">Entrar agora</Link></span>
                                </div>}
                        
                        
                        <div className="typebox">
                            <label htmlFor="types" id="usertype" onChange={typeAction}>
                                Tipo de usuário:
                                <select name="types" id="types" className="ml-2 text-black rounded-lg">
                                    <option value="Empresa">Empresa</option>
                                    <option value="Administrador">Administrador</option>
                                </select>
                            </label>
                        </div>
                        
                        <button 
                            className="Auth mt-8 mb-4 lg:w-[30%] lg:text-base ml-[35%] text-base sm:text-lg sm:w-[30%] sm:ml-[35%] xsm:text-[0.625rem] xsm:w-[40%] xsm:ml-[31%]" 
                            type="submit" 
                            id={formBttTitle} 
                            name={formBttTitle}
                            >
                                {formBttTitle}
                        </button>
                        
                    </div>
                </div>
            </form>
        </section>
    )
}
