import { Link } from "react-router-dom"

export const AuthForm = ({ formId, formAction, title, formBttTitle, formType, formMethod, emailAction, senhaAction, typeAction }: string | undefined | any) => {
    return (
        <section>
            <form className="form-box lg:!w-[32.8dvw] sm:!text-base" 
                id={formId} 
                method={formMethod} 
                onSubmit={formAction}
                >
                <div className="sticky top-0 z-auto w-full h-full">
                    <h2 className="lg:!text-5xl sm:text-5xl">{title}</h2>
                    <div className="pt-6 mx-8 lg:mx-11">
                        {formType === 'cadastro' ? 
                            <div>
                                <label htmlFor="usuario">Empresa/Usuário</label>
                                <div className="flex flex-row w-full space-x-3">
                                    <div className="flex-1">
                                        <div className="inputbox">
                                            <input type="text" id="usuario" name="usuario" placeholder="Insira o nome da empresa/usuário"/>
                                        </div>
                                    </div>
                                </div>

                                <label htmlFor="telefone">Telefone</label>
                                <div className="flex flex-row w-full space-x-3">
                                    <div className="flex-1">
                                        <div className="inputbox">
                                            <input type="text" id="telefone" name="telefone" placeholder="Insira o seu telefone"/>
                                        </div>
                                    </div>
                                </div>

                                <label htmlFor="cnpj">CPF/CNPJ</label>
                                <div className="flex flex-row w-full space-x-3">
                                    <div className="flex-1">
                                        <div className="inputbox">
                                            <input type="text" id="cnpj" name="cnpj" placeholder="Insira o seu cpf/cnpj"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
            
                        : <div/>}
    
                        <label htmlFor="email">{formType === 'cadastro' ? 'Email' : 'Email/Usuário'}</label>
                        <div className="flex flex-row w-full space-x-3">
                            <div className="flex-1">
                                <div className="inputbox">
                                    <input type="text" id="email" name="email" onChange={emailAction} placeholder={formType === 'cadastro' ? 'Insira o seu email' : 'Insira o seu email/nome de usuário'} />
                                </div>
                            </div>
                        </div>
                        
                        <label htmlFor="senha">Senha</label>
                        <div className="flex flex-row w-full space-x-3">
                            <div className="flex-1">
                                <div className="inputbox">
                                    <input type="password" id="senha" name="senha" onChange={senhaAction} placeholder="Insira a sua senha" />
                                </div>
                            </div>
                        </div>
                        
                        
                        {formType === 'Login' ?
                                <div className="pt-6 forget">
                                    <label htmlFor="remember">Ainda não é cadastrado? <Link id="remember" type="text" to="/"><a>Cadastre-se</a></Link></label>
                                </div>
                        :       <div className="pt-4 forget">
                                    <label htmlFor="remember">Já é cadastrado? <Link id="remember" type="text" to="/Login"><a>Entrar agora</a></Link></label>
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