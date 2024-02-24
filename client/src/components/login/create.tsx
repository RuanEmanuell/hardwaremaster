import React, { useState, useEffect } from 'react';
import loginComponentStyle from './styles/login.module.css';
import GoogleIcon from '../../images/google.png'

interface Props {
  onHasAccountClick: (event: React.MouseEvent) => void;
}

const CreateAccountMenu: React.FC<Props> = ({ onHasAccountClick }) => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
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
      <br></br>
      <span className={loginComponentStyle.loginButtonsContainers}>
        <button className={loginComponentStyle.loginButton} type="submit"><h4>Criar conta</h4></button>
        <p className={loginComponentStyle.createAccount} onClick={onHasAccountClick}>Já tem uma conta? Fazer login...</p>
      </span>
      <span className={loginComponentStyle.googleButtonContainer}>
        <button className={loginComponentStyle.googleButton} type = "button">
          <img src={GoogleIcon}></img>
          <h4>Criar com Google</h4>
        </button>
      </span>
    </div>
  )
}

export default CreateAccountMenu;