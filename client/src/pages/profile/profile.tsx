import React, { useEffect, useState } from 'react';
import profileStyle from './styles/profile.module.css';
import { useAuth } from '../../utils/auth';
import NavBar from '../../components/global/navbar';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [userBuilds, setUserBuildList] = useState<any[] | undefined>(undefined);
  const [userParts, setUserPartList] = useState<any[] | undefined>(undefined);

  async function getUserBuildList() {
    try {
      const response = await fetch('http://localhost:3001/builds/builds');
      const builds: any[] = await response.json();
      const userBuildsList = builds.filter(build => build.userId === currentUser?.uid);
      setUserBuildList(userBuildsList);
    } catch (error) {
      console.error("Failed to fetch user builds:", error);
    }
  }

  async function getPartList() {
    try {
      if (userBuilds) {
        const response = await fetch('http://localhost:3001/list/parts');
        const parts: any[] = await response.json();
        setUserPartList(parts);
      }
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
    <NavBar/>
    <div className = {profileStyle.profileScreen}>
    <main>
      <div className={profileStyle.buildsContainer}>
      {userBuilds?.map
        ((build, index) => (
          <div className={profileStyle.buildBox}>
            <h2 className={profileStyle.buildLabel}>Build {index + 1}</h2>
            <div className = {profileStyle.partBox}>
              {userParts?.filter
                (part => (part._id === (
                  part.type === 'cpu' ? build.cpuId :
                    part.type === 'gpu' ? build.gpuId :
                      part.type === 'mobo' ? build.moboId
                        : part.type === 'ram' ? build.ramId
                          : part.type === 'power' ? build.powerId
                            : part.type === 'ssd' ? build.ssdId
                              : build.caseId))).map
                (part =>
                  <div className={profileStyle.partSpecsBox}>
                    <img className={profileStyle.partSpecsImg} src={part.imageLink}></img>
                    <h4>{part.name}</h4>
                    <h4>R$ {part.price}</h4>
                  </div>
                )}</div></div>))}
                </div>
    </main>
    </div>
    </div>
  )
}

export default Profile;
