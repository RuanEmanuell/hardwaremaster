import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import profileStyle from './styles/profile.module.css';
import { useAuth } from '../../utils/auth';
import NavBar from '../../components/global/navbar';
import ProfileIcon from '../../images/profile.png';
import EditIcon from '../../images/edit.png';
import { useNavigate } from 'react-router-dom';
import StandartButton from '../../components/global/standartbutton';
import User from '../../utils/user';
import Part from '../../utils/part';
import Build from '../../utils/build';
import BuildBox from '../../components/profile/buildbox';
import Loading from '../../components/global/loading';
import { storage } from '../../confidential/firebase.config';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const storage = getStorage();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [userBuilds, setUserBuildList] = useState<Build[] | null>(null);
  const [userParts, setUserPartList] = useState<Part[] | null>(null);

  const editUserRef = useRef<HTMLDialogElement>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [editUserFile, setEditUserFile] = useState<File | null>(null);
  const [editUserName, setEditUserName] = useState<string>('');
  const [userNameCheckError, setUserNameCheckError] = useState<boolean>(false);

  const [selectedBuildId, setSelectedBuildId] = useState<String>('');
  const deleteBuildRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();

  async function getUserProfile() {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/users/${currentUser?.uid}`);
      const user: User = await response.json();
      setUserProfile(user);
      if (!user) {
        setLoading(false);
      }
      getUserBuildList();
    } catch (err) {
      console.log(err);
    }
  }

  async function getUserBuildList() {
    try {
      const response = await fetch(`http://localhost:3001/builds/users/${currentUser?.uid}`);
      const builds: Build[] = await response.json();
      setUserBuildList(builds);
      if (builds.length > 0) {
        getPartList();
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getPartList() {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/list/parts');
      const parts: Part[] = await response.json();
      setUserPartList(parts);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  function showEditUserMenu() {
    editUserRef.current?.showModal();
    setUserNameCheckError(false);
    setEditUserName(userProfile!.name);
  }

  function closeEditUserMenu() {
    editUserRef.current?.close();
  }

  const editUserImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const imageURL = URL.createObjectURL(file);
      setUserPhoto(imageURL);
      setEditUserFile(file);
    }
  }

  const handleEditName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditUserName(event.target.value);
  }

  async function uploadImageToStorage(file: File) {
    try {
      const storageRef = ref(getStorage(), `userImages/${userProfile?._id}`);
      await uploadBytes(storageRef, file);
  
      const downloadURL = await getDownloadURL(storageRef);
  
      return downloadURL;
    } catch (error) {
      console.error('Erro durante o upload para o Firebase Storage:', error);
      throw error;
    }
  }
  

  async function saveEditUserMenuChanges() {
    if(editUserName.length<5){
      setUserNameCheckError(true);
    }else{
      setLoading(true);
      try {
        let photoURL : unknown;
    
        if (editUserFile) {
          photoURL = await uploadImageToStorage(editUserFile); 
        }
    
      await fetch(`http://localhost:3001/users/update/${userProfile?._id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name: editUserName,
          photo: userPhoto,
        })
      });
      getUserProfile();
      closeEditUserMenu();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
  }

  async function editBuild(buildId: string) {
    navigate(`/manualbuild?buildId=${buildId}`);
  }

  async function deleteBuild() {
    try {
      await fetch(`http://localhost:3001/builds/delete/${selectedBuildId}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
      });
      getUserBuildList();
      closeDeleteBuildMenu();
    } catch (err) {
      console.log(err);
    }
  }

  function showDeleteBuildMenu(buildId: string) {
    setSelectedBuildId(buildId);
    deleteBuildRef.current!.showModal();
  }

  function closeDeleteBuildMenu() {
    deleteBuildRef.current!.close();
  }

  function sendToLoginScreen() {
    navigate('/login');
  }

  function sendToManualBuild() {
    navigate('/manualbuild');
  }

  useEffect(() => {
    getUserProfile();
  }, [currentUser]);

  useEffect(() =>{
    if(userProfile && userProfile.photo){
      const storageRef = ref(storage, `userImages/${userProfile?._id}`);
      getDownloadURL(storageRef).then((url) => {
        setUserPhoto(url)
      });
    }
  }, [userProfile]);

  return (
    <div>
      <NavBar />
      <div className={profileStyle.profileScreen}>
        <main>
          {isLoading ?
            <Loading /> :
            <> {currentUser ?
              <div>
                <div className={profileStyle.userProfile}>
                  <div className={profileStyle.userPhotoBox}>
                    <img src={!userPhoto ? ProfileIcon : userPhoto} className={profileStyle.userPhoto}></img>
                  </div>
                  <div className={profileStyle.userNameBox}>
                    <h1>{userProfile?.name}</h1>
                    <img src={EditIcon} onClick={showEditUserMenu}></img>
                  </div>
                </div>
                <dialog ref={editUserRef}>
                  <div className={profileStyle.editUserProfileBox}>
                    <div className={profileStyle.editUserProfile}>
                      <h1>Editar perfil</h1>
                      <img src={!userPhoto  ? ProfileIcon : userPhoto} className={profileStyle.editUserPhoto}></img>
                      <StandartButton
                        buttonLabel='Editar foto'
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (event) => editUserImage(event as any);
                          input.click();
                        }}
                      />
                      <h2>Nome</h2>
                      <input
                        placeholder='Digite um novo nome de usuário...'
                        value={editUserName}
                        onChange={(event) => handleEditName(event)}
                      ></input>
                      <p className={profileStyle.userNameCheckError}
                        style={{ display: userNameCheckError ? 'block' : 'none' }}>⚠ Nome de usuário deve ter mais de 5 caracteres</p>
                      <div className={profileStyle.saveAndCancelButtons}>
                        <StandartButton
                          buttonLabel='Salvar'
                          backgroundColor='green'
                          onClick={saveEditUserMenuChanges}
                        />
                        <StandartButton
                          buttonLabel='Cancelar'
                          backgroundColor='red'
                          onClick={closeEditUserMenu}
                        />
                      </div>
                    </div>
                  </div>
                </dialog>
              </div> : <></>}
              {userBuilds && userBuilds.length === 0 && currentUser ? <div className={profileStyle.signIn}>
                <h2>Parece que você ainda não montou nenhum pc...</h2>
                <StandartButton
                  buttonLabel='Montar PC'
                  onClick={sendToManualBuild}
                />
              </div>
                : !currentUser ? <div className={profileStyle.signIn}>
                  <h2>Parece que você ainda não tem uma conta...</h2>
                  <StandartButton
                    buttonLabel='Fazer login'
                    onClick={sendToLoginScreen}
                  />
                </div> : <></>}
            </>
          }

          <div className={profileStyle.buildsContainer}>
            {userBuilds?.map
              ((build: Build, index) => (
                <BuildBox
                  key={build._id}
                  build={build}
                  index={index}
                  parts={userParts!}
                  onEditBuildClick={editBuild}
                  onShowDeleteBuildMenuClick={showDeleteBuildMenu}
                />))}
          </div>
          <dialog ref={deleteBuildRef}>
            <div className={profileStyle.deleteBuildMenuBackground}>
              <div className={profileStyle.deleteBuildMenu}>
                <h1>Deseja apagar essa build?</h1>
                <StandartButton
                  buttonLabel='Apagar'
                  onClick={deleteBuild}
                  backgroundColor='green'
                />
                <StandartButton
                  buttonLabel='Cancelar'
                  onClick={closeDeleteBuildMenu}
                  backgroundColor='red'
                />
              </div>
            </div>
          </dialog>
        </main>
      </div>
    </div>
  )
}

export default Profile;
