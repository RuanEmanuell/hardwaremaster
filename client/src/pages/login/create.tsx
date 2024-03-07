import React, { useState } from 'react';
import loginComponentStyle from './styles/login.module.css';
import GoogleIcon from '../../images/google.png'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../confidential/firebase.config';
import { Link, useNavigate } from 'react-router-dom';

const CreateAccount: React.FC = () => {

  const [email, setEmail] = useState<string>("");
  const [emailCheckError, setEmailCheckError] = useState<boolean>(false);

  const [user, setUser] = useState<string>("");
  const [userCheckError, setUserCheckError] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>("");

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [confirmPasswordCheckError, setConfirmPasswordCheckError] = useState<boolean>(false);

  const navigate = useNavigate();

  function checkUser(){
    let userCheck = false;

    if (user.length < 5) {
      userCheck = true;
    }

    if (user.length > 20) {
      userCheck = true;
    }

    setUserCheckError(userCheck);
    return userCheck;
  }

  function checkEmail() {
    let emailCheck = true;

    if (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email)) {
      emailCheck = false;
    }

    setEmailCheckError(emailCheck);
    return emailCheck;
  }


  function checkPassword() {
    let passwordCheck = false;

    if (password.length < 6) {
      passwordCheck = true;
      setPasswordCheckMessage("⚠ Senha deve ter pelo menos 6 caracteres");
    }

    if (password.length > 20) {
      passwordCheck = true;
      setPasswordCheckMessage("⚠ Senha deve no máximo 20 caracteres");
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

  function handleCreateUserClick() {
    let userInvalid = checkUser();
    let emailinvalid = checkEmail();
    let passwordinvalid = checkPassword();
    let confirmPasswordinvalid = checkConfirmPassword();

    if (!userInvalid && !emailinvalid 
       && !passwordinvalid && !confirmPasswordinvalid) {
      createUser(user, email, password);
    }
  }

  async function createUser(user:string, email: string, password: string) {
    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      const saveUserToDB = await fetch(
        'http://localhost:3001/users/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authId: newUser.user.uid,
          type: 'user',
          email: newUser.user.email,
          name: user,
          photo: ''
        })
      }
      )
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
            value={user}
            onChange={(event) => setUser(event.target.value)}
            placeholder='Digite seu nome de usuário...'></input>
              <p className={loginComponentStyle.passwordCheckError}
            style={{ display:userCheckError ? 'block' : 'none' }}>⚠ Nome de usuário deve ter entre 5 e 20 caracteres.</p>
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
            <Link to='/login'>
              <p className={loginComponentStyle.createAccount}>Já tem uma conta? Fazer login...</p>
            </Link>
          </span>
          <span className={loginComponentStyle.googleButtonContainer}>
            <button className={loginComponentStyle.googleButton} onClick={loginGoogle} type="button">
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