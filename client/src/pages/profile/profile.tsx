import React, { useEffect, useState } from 'react';
import profileStyle from './styles/profile.module.css';
import { useAuth } from '../../utils/auth';
import NavBar from '../../components/global/navbar';
import EditIcon from '../../images/edit.png';
import DeleteIcon from '../../images/delete.png';
import { useNavigate } from 'react-router-dom';

interface Build{
  _id: string;
  userId: string;
  cpuId: string;
  gpuId: string;
  moboId: string;
  ramId: string;
  powerId: string;
  ssdId: string;
  caseId: string;
}

interface Part {
  _id: string;
  type: string;
  name: string;
  brand: string;
  price: string;
  imageLink: string;
  partQuantity: number
}


const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [userBuilds, setUserBuildList] = useState<any[] | undefined>(undefined);
  const [userParts, setUserPartList] = useState<any[] | undefined>(undefined);

  const navigate = useNavigate();

  async function getUserBuildList() {
    try {
      const response = await fetch(`http://localhost:3001/builds/users/${currentUser?.uid}`);
      const builds: Build[] = await response.json();
      setUserBuildList(builds);
    } catch (err) {
      console.log(err);
    }
  }

  async function getPartList() {
    try {
      if (userBuilds) {
        const response = await fetch('http://localhost:3001/list/parts');
        const parts: Part[] = await response.json();
        setUserPartList(parts);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function editBuild(buildId: string){
    navigate(`/manualbuild?buildId=${buildId}`);
  }

  async function deleteBuild(buildId: string){
    try {
      await fetch(`http://localhost:3001/builds/delete/${buildId}`, {
        method: 'DELETE',
        headers: {'Content-type' : 'application/json'}
      });
      getUserBuildList();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserBuildList();
  }, [currentUser]);

  useEffect(() => {
    getPartList();
  }, [userBuilds]);

  return (
    <div>
      <NavBar />
      <div className={profileStyle.profileScreen}>
        <main>
          <div className={profileStyle.buildsContainer}>
            {userBuilds?.map
              ((build: Build, index) => (
                <div className={profileStyle.buildBox} key = {index}>
                  <div className={profileStyle.buildInfoAndButtons}>
                    <h2 className={profileStyle.buildLabel}>Build {index + 1}</h2>
                    <div className={profileStyle.buildButtons}>
                      <div>
                        <img src={EditIcon} onClick = {() => editBuild(build._id)}></img>
                        <img src={DeleteIcon} onClick = {() => deleteBuild(build._id)}></img>
                      </div>
                    </div>
                  </div>
                  <div className={profileStyle.partBox}>
                    {userParts?.filter
                      ((part:Part, index) => (part._id === (
                        part.type === 'cpu' ? build.cpuId :
                          part.type === 'gpu' ? build.gpuId :
                            part.type === 'mobo' ? build.moboId
                              : part.type === 'ram' ? build.ramId
                                : part.type === 'power' ? build.powerId
                                  : part.type === 'ssd' ? build.ssdId
                                    : build.caseId))).map
                      (part =>
                        <div className={profileStyle.partSpecsBox} key = {part.name}>
                          <div className={profileStyle.partSpecsImg}>
                            <img src={part.imageLink}></img>
                          </div>
                          <h4>{part.name}</h4>
                          <h4>R$ {part.price}</h4>
                        </div>
                      )}</div>
                </div>))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profile;
