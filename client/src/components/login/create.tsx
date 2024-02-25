import React, { useState, useEffect } from 'react';
import loginComponentStyle from './styles/login.module.css';
import GoogleIcon from '../../images/google.png'

interface Props {
  onHasAccountClick: (event: React.MouseEvent) => void;
  onCreateUserClick: (email: string, password: string) => void;
}

const CreateAccountMenu: React.FC<Props> = ({ onHasAccountClick, onCreateUserClick }) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
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
      <span className={loginComponentStyle.passwordInputAndEyeButtonBox}>
        <input
          className={`${loginComponentStyle.loginInput} ${loginComponentStyle.passwordInput}`}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          type={!showConfirmPassword ? "password" : "text"}
          placeholder='Confirme sua senha...'></input>
        <h4 className={loginComponentStyle.showPasswordButton} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>👁</h4>
      </span>
      <br></br>
      <span className={loginComponentStyle.loginButtonsContainers}>
        <button className={loginComponentStyle.loginButton} type="button" onClick={() => onCreateUserClick(email, password)}><h4>Criar conta</h4></button>
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