import React, { useEffect, useState } from 'react';
import profileStyle from './styles/profile.module.css';
import { useAuth } from '../../utils/auth';

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
    <main style = {{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
      {userBuilds?.map
        ((build, index) => (
          <div style = 
          {{ border: '2px solid red', margin: '5% 0'}}>
            <h2>Build {index+1}</h2>
            <div style = {{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
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
                <div>
                  <img src = {part.imageLink} style = {{width: '10%'}}></img>
                  <h3>{part.name}</h3>
                  <h3>R$ {part.price}</h3>
                </div>
              )}</div></div>))}
    </main>
  )
}

export default Profile;
