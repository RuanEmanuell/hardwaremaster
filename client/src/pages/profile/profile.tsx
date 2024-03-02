import React, { useEffect, useRef, useState } from 'react';
import profileStyle from './styles/profile.module.css';
import { useAuth } from '../../utils/auth';
import NavBar from '../../components/global/navbar';
import EditIcon from '../../images/edit.png';
import DeleteIcon from '../../images/delete.png';
import { useNavigate } from 'react-router-dom';
import StandartButton from '../../components/global/standartbutton';
import Part from '../../utils/part';
import Build from '../../utils/build';
import BuildBox from '../../components/profile/buildbox';
import Loading from '../../components/global/loading';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();

  const [userBuilds, setUserBuildList] = useState<Build[] | null>(null);
  const [userParts, setUserPartList] = useState<Part[] | null>(null);

  const [selectedBuildId, setSelectedBuildId] = useState<String>('');
  const deleteBuildRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();

  async function getUserBuildList() {
    try {
      const response = await fetch(`http://localhost:3001/builds/users/${currentUser?.uid}`);
      const builds: Build[] = await response.json();
      setUserBuildList(builds);
      getPartList();
    } catch (err) {
      console.log(err);
    }
  }

  async function getPartList() {
    try {
      const response = await fetch('http://localhost:3001/list/parts');
      const parts: Part[] = await response.json();
      setUserPartList(parts);
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

  useEffect(() => {
      getUserBuildList();
  }, [currentUser]);

  return (
    <div>
      <NavBar />
      <div className={profileStyle.profileScreen}>
        <main>
          {!currentUser && !userParts ?
            <Loading/> : <div></div>
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
