import React, { useState } from 'react';
import loginComponentStyle from './styles/login.module.css';
import { auth } from '../../confidential/firebase.config';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import queryString from 'query-string';

const CreateNewPassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>("");
  
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const oobCode = queryParams.oobCode as string;

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

  function handleCreateNewPasswordClick() {
    let passwordInvalid = checkPassword();
    if (!passwordInvalid) {
      createNewPassword(password);
    }
  }

  async function createNewPassword(password: string) {
    try {
      await confirmPasswordReset(auth, oobCode!, password);
      alert("Nova senha criada com sucesso! Você já pode usar ela para fazer login");
      navigate('/login');
    } catch (err) {
      alert(err);
    }
  }


  return (
    <div className={loginComponentStyle.loginScreen}>
      <form className={loginComponentStyle.loginBox}>
        <div>
          <h1 className={loginComponentStyle.loginLogo}>HardwareMaster</h1>
          <span className={loginComponentStyle.passwordInputAndEyeButtonBox}>
            <input
              className={`${loginComponentStyle.loginInput} ${loginComponentStyle.passwordInput}`}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={!showPassword ? "password" : "text"}
              placeholder='Digite sua nova senha...'>
            </input>
            <h4 className={loginComponentStyle.showPasswordButton} onClick={() => setShowPassword(!showPassword)}>👁</h4>
          </span>
          <p className={loginComponentStyle.passwordCheckError}
            style={{ display: passwordCheckError ? 'block' : 'none' }}>{passwordCheckMessage}</p>
          <br></br>
          <span className={loginComponentStyle.loginButtonsContainers}>
            <button className={loginComponentStyle.loginButton} type="button" onClick={handleCreateNewPasswordClick}><h4>Criar nova senha</h4></button>
          </span>
        </div>
      </form>
    </div>
  )
}

export default CreateNewPassword;