import React, { useState } from 'react';
import { DefineApp } from '../../Core/Components/Utils/DefineApp';

const PasswordRecovery: React.FC = () => {
  // State para armazenar o tipo de recuperação selecionado (email ou telefone)
  const [recoveryOption, setRecoveryOption] = useState<'email' | 'phone'>('email');
  const [inputValue, setInputValue] = useState<string>('');

  const handleRecoveryOptionChange = (option: 'email' | 'phone') => {
    setRecoveryOption(option);
    setInputValue(''); // Limpa o valor do campo ao alternar
  };

  const handleSubmit = async () => {
    try {
      await fetch('/api/userAuth/password-recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: inputValue,
          method: recoveryOption,
        }),
      });
      alert('Um link de recuperação foi enviado!');
    } catch (error) {
      console.error('Erro ao enviar solicitação de recuperação', error);
    }
  };

  return (
    <DefineApp cssPath='src/Core/Css/Owned/Auth.css' appTitle='Ace Schedules - Login' appIcon='src/assets/icons/user-circle-solid.svg' isCssEquiv={true}>
        <div className="sticky top-0 z-auto w-full h-full">
            <h1>Recuperação de senha</h1>
            
            {/* Alternador entre Email e Telefone */}
            <div>
                <button
                onClick={() => handleRecoveryOptionChange('email')}
                style={{ 
                    backgroundColor: recoveryOption === 'email' ? '#007bff' : '#ccc', 
                    color: recoveryOption === 'email' ? '#fff' : '#000',
                    padding: '10px',
                    marginRight: '10px'
                }}
                >
                Recuperar via E-mail
                </button>
                <button
                onClick={() => handleRecoveryOptionChange('phone')}
                style={{
                    backgroundColor: recoveryOption === 'phone' ? '#007bff' : '#ccc',
                    color: recoveryOption === 'phone' ? '#fff' : '#000',
                    padding: '10px'
                }}
                >
                Recuperar via Telefone
                </button>
            </div>

            {/* Formulário Dinâmico com base na opção */}
            {recoveryOption === 'email' ? (
                <div>
                <label htmlFor="email">Digite seu E-mail</label>
                <input
                    type="email"
                    id="email"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
                />
                </div>
            ) : (
                <div>
                <label htmlFor="phone">Digite seu Telefone</label>
                <input
                    type="tel"
                    id="phone"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="(XX) XXXXX-XXXX"
                    style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
                />
                </div>
            )}

            {/* Botão de Submissão */}
            <button
                onClick={handleSubmit}
                style={{
                backgroundColor: '#28a745',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                cursor: 'pointer'
                }}
            >
                Enviar Recuperação de Senha
            </button>
        </div>
    </DefineApp>
  );
};

export default PasswordRecovery;