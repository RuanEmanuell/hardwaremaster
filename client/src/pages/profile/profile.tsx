import React, { useEffect, useRef, useState } from 'react';
import profileStyle from './styles/profile.module.css';
import { useAuth } from '../../utils/auth';
import NavBar from '../../components/global/navbar';
import profileIcon from '../../images/profile.png';
import { useNavigate } from 'react-router-dom';
import StandartButton from '../../components/global/standartbutton';
import User from '../../utils/user';
import Part from '../../utils/part';
import Build from '../../utils/build';
import BuildBox from '../../components/profile/buildbox';
import Loading from '../../components/global/loading';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [userBuilds, setUserBuildList] = useState<Build[] | null>(null);
  const [userParts, setUserPartList] = useState<Part[] | null>(null);

  const [selectedBuildId, setSelectedBuildId] = useState<String>('');
  const deleteBuildRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();

  async function getUserProfile() {
    try {
      const response = await fetch(`http://localhost:3001/users/${currentUser?.uid}`);
      const user = await response.json();
      setUserProfile(user);
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
    setLoading(true);
    if (currentUser) {
      getUserProfile();
    } else {
      setTimeout(() => {
        if (!currentUser) {
          setLoading(false);
        }
      }, 300)
    }
  }, [currentUser]);

  return (
    <div>
      <NavBar />
      <div className={profileStyle.profileScreen}>
        <main>
          {isLoading ?
            <Loading /> :
            <>
              <div className={profileStyle.userProfile}>
                <div className={profileStyle.userPhotoBox}>
                  <img src={userProfile?.photo === '' ? profileIcon : userProfile?.photo} className={profileStyle.userPhoto}></img>
                </div>
                <h1>{userProfile?.name}</h1>
              </div>
              {userBuilds && userBuilds.length === 0 && currentUser ? <div className={profileStyle.signIn}>
                <h2>Parece que você ainda não montou nenhum pc...</h2>
                <StandartButton
                  buttonLabel='Montar PC'
                  onClick={sendToManualBuild}
                />
              </div>
                : !currentUser && !userBuilds ? <div className={profileStyle.signIn}>
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
