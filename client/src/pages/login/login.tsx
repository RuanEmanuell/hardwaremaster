import React, { createContext, useState } from 'react';
import loginComponentStyle from './styles/login.module.css';
import GoogleIcon from '../../images/google.png';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../connection/firebase.config';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailCheckError, setEmailCheckError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>("");

  const navigate = useNavigate();

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
    if (!emailinvalid && !passwordinvalid) {
      loginUser(email, password);
    }
  }

  async function loginUser(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/list');
    } catch (err) {
      alert(err);
    }
  }

  async function loginGoogle() {
    try {
      const newUser = await signInWithPopup(auth, googleProvider);
      const authId = newUser.user.uid;
      const response = await fetch(`http://localhost:3001/users/${authId}`);
      const user = await response.json();

      if (!user) {
        const saveUserToDB = await fetch(
          'http://localhost:3001/users/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            authId: newUser.user.uid,
            type: 'user',
            email: newUser.user.email,
            name: newUser.user.displayName,
            photo: ''
          })
        }
        )
      }
    navigate('/list');
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