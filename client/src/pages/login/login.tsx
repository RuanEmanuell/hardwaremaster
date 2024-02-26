import React, { createContext, useState } from 'react';
import loginComponentStyle from './styles/login.module.css';
import GoogleIcon from '../../images/google.png';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../src/confidential/firebase.config';
import { Link } from 'react-router-dom';

interface Props {

}

const Login: React.FC<Props> = ({ }) => {
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
    let emailinvalid = checkEmail();
    let passwordinvalid = checkPassword();
    console.log(emailinvalid, passwordinvalid);
    if (!emailinvalid && !passwordinvalid) {
      loginUser(email, password);
    }
  }

  async function loginUser(email: string, password: string) {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredentials.user);
    } catch (err) {
      alert(err);
    }
  }

  async function loginGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className={loginComponentStyle.loginScreen}>
      <form className={loginComponentStyle.loginBox}>
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
          <Link to='/login/resetpassword'>
            <p className={loginComponentStyle.forgotPassword}>Esqueci minha senha</p>
          </Link>
          <span className={loginComponentStyle.loginButtonsContainers}>
            <button className={loginComponentStyle.loginButton} type="button" onClick={handleLoginUserClick}><h4>Fazer Login</h4></button>
            <Link to='/login/createaccount'>
              <p className={loginComponentStyle.createAccount}>Não tem uma conta? Criar uma conta...</p>
            </Link>
          </span>
          <span className={loginComponentStyle.googleButtonContainer}>
            <button className={loginComponentStyle.googleButton}
              type='button'
              onClick={loginGoogle}>
              <img src={GoogleIcon}></img>
              <h4>Entrar com Google</h4>
            </button>
          </span>
        </div>
      </form>
    </div>
  )
}

export default Login;