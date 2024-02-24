import React, { useState, useEffect } from 'react';
import loginComponentStyle from './styles/login.module.css';
import GoogleIcon from '../../images/google.png';

interface Props {
    onCreateAccountClick: (event: React.MouseEvent) => void;
}

const LoginMenu: React.FC<Props> = ({ onCreateAccountClick }) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <>
            <div>
                <h1 className={loginComponentStyle.loginLogo}>HardwareMaster</h1>
                <input
                    className={loginComponentStyle.loginInput}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='Digite seu email...'></input>
                <input
                    className={loginComponentStyle.loginInput}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder='Digite sua senha...'></input>
                <p className={loginComponentStyle.forgotPassword}>Esqueci minha senha</p>
                <span className={loginComponentStyle.loginButtonsContainers}>
                    <button className={loginComponentStyle.loginButton} type="submit"><h4>Fazer Login</h4></button>
                    <p className={loginComponentStyle.createAccount}
                        onClick={onCreateAccountClick}
                    >Não tem uma conta? Criar uma conta...</p>
                </span>
                <span className={loginComponentStyle.googleButtonContainer}>
                    <button className={loginComponentStyle.googleButton} type='button'>
                        <img src={GoogleIcon}></img>
                        <h4>Entrar com Google</h4>
                    </button>
                </span>
            </div>
        </>
    )
}

export default LoginMenu;