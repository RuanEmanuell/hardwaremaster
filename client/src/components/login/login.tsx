import React, { useState, useEffect } from 'react';
import loginComponentStyle from './styles/login.module.css';
import GoogleIcon from '../../images/google.png';

interface Props {
    onCreateAccountClick: (event: React.MouseEvent) => void;
    onLoginUserClick: (email: string, password: string) => void;
}

const LoginMenu: React.FC<Props> = ({ onCreateAccountClick, onLoginUserClick }) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <>
            <div>
                <h1 className={loginComponentStyle.loginLogo}>HardwareMaster</h1>
                <input
                    className={loginComponentStyle.loginInput}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='Digite seu email...'></input>
                <span className={loginComponentStyle.passwordInputAndEyeButtonBox}>
                    <input
                        className={`${loginComponentStyle.loginInput} ${loginComponentStyle.passwordInput}`}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type={!showPassword ? "password" : "text"}
                        placeholder='Digite sua senha...'>
                    </input>
                    <h4 className={loginComponentStyle.showPasswordButton} onClick={() => setShowPassword(!showPassword)}>👁</h4>
                </span>
                <p className={loginComponentStyle.forgotPassword}>Esqueci minha senha</p>
                <span className={loginComponentStyle.loginButtonsContainers}>
                    <button className={loginComponentStyle.loginButton} type="button" onClick={() => onLoginUserClick(email, password)}><h4>Fazer Login</h4></button>
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