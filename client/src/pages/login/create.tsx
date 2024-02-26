import React, { useState } from 'react';
import loginComponentStyle from './styles/login.module.css';
import GoogleIcon from '../../images/google.png'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../confidential/firebase.config';
import { Link, useNavigate } from 'react-router-dom';

interface Props {

}

const CreateAccount: React.FC<Props> = ({ }) => {

  const [email, setEmail] = useState<string>("");
  const [emailCheckError, setEmailCheckError] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>("");

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [confirmPasswordCheckError, setConfirmPasswordCheckError] = useState<boolean>(false);

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
    let emailinvalid = checkEmail();
    let passwordinvalid = checkPassword();
    let confirmPasswordinvalid = checkConfirmPassword();
    if (!emailinvalid && !passwordinvalid && !confirmPasswordinvalid) {
      createUser(email, password);
    }
  }

  async function createUser(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
        <Link to = '/login'>
        <p className={loginComponentStyle.createAccount}>Já tem uma conta? Fazer login...</p>
        </Link>
      </span>
      <span className={loginComponentStyle.googleButtonContainer}>
        <button className={loginComponentStyle.googleButton} type="button">
          <img src={GoogleIcon}></img>
          <h4>Entrar com Google</h4>
        </button>
      </span>
    </div>
    </form>
    </div>
  )
}

export default CreateAccount;