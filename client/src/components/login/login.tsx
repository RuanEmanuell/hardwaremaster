import React, { useState, useEffect } from 'react';
import loginComponentStyle from './styles/login.module.css';
import GoogleIcon from '../../images/google.png';

interface Props {
    onCreateAccountClick: (event: React.MouseEvent) => void;
    onLoginUserClick: (email: string, password: string) => void;
    onGoogleUserClick: () => void;
}

const LoginMenu: React.FC<Props> = ({ onCreateAccountClick, onLoginUserClick, onGoogleUserClick }) => {

    const [email, setEmail] = useState<string>("");
    const [emailCheckError, setEmailCheckError] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>("");

    function checkPassword() {
        let passwordCheck = false;

        if (password.length < 6) {
            passwordCheck = true;
            setPasswordCheckMessage("⚠ Senha deve ter pelo menos 6 caracteres");
        }

        setPasswordCheckError(passwordCheck);
        return passwordCheck;
    }

    function checkEmail() {
        let emailCheck = true;

        if (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email)) {
            emailCheck = false;
        }

        setEmailCheckError(emailCheck);
        return emailCheck;
    }

    function handleLoginUserClick() {
        let emailOk = checkEmail();
        let passwordOk = checkPassword();
        console.log(emailOk, passwordOk);
        if (!emailOk && !passwordOk) {
            onLoginUserClick(email, password);
        }
    }

    function handleGoogleLoginClick(){
        onGoogleUserClick();
    }

    return (
        <>
            <div>
                <h1 className={loginComponentStyle.loginLogo}>HardwareMaster</h1>
                <input
                    className={loginComponentStyle.loginInput}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder='Digite seu email...'></input>
                <p className={loginComponentStyle.passwordCheckError}
                    style={{ display: emailCheckError ? 'block' : 'none' }}>⚠ Email inválido</p>
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
                <p className={loginComponentStyle.passwordCheckError}
                    style={{ display: passwordCheckError ? 'block' : 'none' }}>{passwordCheckMessage}</p>
                <p className={loginComponentStyle.forgotPassword}>Esqueci minha senha</p>
                <span className={loginComponentStyle.loginButtonsContainers}>
                    <button className={loginComponentStyle.loginButton} type="button" onClick={handleLoginUserClick}><h4>Fazer Login</h4></button>
                    <p className={loginComponentStyle.createAccount}
                        onClick={onCreateAccountClick}>Não tem uma conta? Criar uma conta...</p>
                </span>
                <span className={loginComponentStyle.googleButtonContainer}>
                    <button className={loginComponentStyle.googleButton} 
                    type='button'
                    onClick = {handleGoogleLoginClick}>
                        <img src={GoogleIcon}></img>
                        <h4>Entrar com Google</h4>
                    </button>
                </span>
            </div>
        </>
    )
}

export default LoginMenu;