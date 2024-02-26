import React, { useState, useEffect } from 'react';
import loginComponentStyle from './styles/login.module.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../confidential/firebase.config';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/global/navbar';

interface Props {

}

const ResetPassword: React.FC<Props> = ({  }) => {
  const [email, setEmail] = useState<string>("");
  const [emailCheckError, setEmailCheckError] = useState<boolean>(false);

  const navigate = useNavigate();

  function checkEmail() {
    let emailCheck = true;

    if (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email)) {
      emailCheck = false;
    }

    setEmailCheckError(emailCheck);
    return emailCheck;
  }

  function handleResetPasswordClick() {
    let emailInvalid = checkEmail();
    if (!emailInvalid) {
      resetPassword(email);
    }
  }

  async function resetPassword(email: string) {
    try {
      const result = await sendPasswordResetEmail(auth, email);
      alert("Email enviado com sucesso! Cheque sua caixa de spam!");
      navigate('/login');
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }


  return (
    <>
      <NavBar />
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
        <br></br>
        <span className={loginComponentStyle.loginButtonsContainers}>
          <button className={loginComponentStyle.loginButton} type="button" onClick={handleResetPasswordClick}><h4>Resetar senha</h4></button>
          <Link to = '/login'>
          <p className={loginComponentStyle.createAccount}>Mudou de idéia? Voltar para a tela de login...</p>
          </Link>
        </span>
      </div>
      </form>
      </div>
    </>
  )
}

export default ResetPassword;