import React, { useState, useEffect } from 'react';
import loginComponentStyle from './styles/login.module.css';
import GoogleIcon from '../../images/google.png'

interface Props {
  onHasAccountClick: (event: React.MouseEvent) => void;
  onCreateUserClick: (email: string, password: string) => void;
}

const CreateAccountMenu: React.FC<Props> = ({ onHasAccountClick, onCreateUserClick }) => {

  const [email, setEmail] = useState<string>("");
  const [emailCheckError, setEmailCheckError] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>("");

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [confirmPasswordCheckError, setConfirmPasswordCheckError] = useState<boolean>(false);

  function checkPassword() {
    let passwordCheck = false;

    if (password.length < 6) {
      passwordCheck = true;
      setPasswordCheckMessage("⚠ Senha deve ter pelo menos 6 caracteres");
    }

    setPasswordCheckError(passwordCheck);
    return passwordCheck;
  }

  function checkConfirmPassword() {
    let confirmPasswordCheck = true;

    if (confirmPassword === password) {
      confirmPasswordCheck = false;
    }

    setConfirmPasswordCheckError(confirmPasswordCheck);

    return confirmPasswordCheck;
  }

  function checkEmail() {
    let emailCheck = true;

    if (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email)) {
      emailCheck = false;
    }

    setEmailCheckError(emailCheck);
    return emailCheck;
  }

  function handleCreateUserClick() {
    let emailOk = checkEmail();
    let passwordOk = checkPassword();
    let confirmPasswordOk = checkConfirmPassword();
    console.log(emailOk, passwordOk, confirmPasswordOk);
    if (!emailOk && !passwordOk && !confirmPasswordOk) {
      onCreateUserClick(email, password);
    }
  }

  return (
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
      <span className={loginComponentStyle.passwordInputAndEyeButtonBox}>
        <input
          className={`${loginComponentStyle.loginInput} ${loginComponentStyle.passwordInput}`}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          type={!showConfirmPassword ? "password" : "text"}
          placeholder='Confirme sua senha...'></input>
        <h4 className={loginComponentStyle.showPasswordButton} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>👁</h4>
      </span>
      <p className={loginComponentStyle.passwordCheckError}
        style={{ display: confirmPasswordCheckError ? 'block' : 'none' }}>⚠ Senhas não correspondem</p>
      <br></br>
      <span className={loginComponentStyle.loginButtonsContainers}>
        <button className={loginComponentStyle.loginButton} type="button" onClick={handleCreateUserClick}><h4>Criar conta</h4></button>
        <p className={loginComponentStyle.createAccount} onClick={onHasAccountClick}>Já tem uma conta? Fazer login...</p>
      </span>
      <span className={loginComponentStyle.googleButtonContainer}>
        <button className={loginComponentStyle.googleButton} type="button">
          <img src={GoogleIcon}></img>
          <h4>Criar com Google</h4>
        </button>
      </span>
    </div>
  )
}

export default CreateAccountMenu;