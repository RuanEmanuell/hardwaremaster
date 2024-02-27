import React, { useEffect, useState } from 'react';
import profileStyle from './styles/profile.module.css';
import { useAuth } from '../../utils/auth';

const Profile: React.FC = () => {
  const {currentUser} = useAuth();
  const [userBuilds, setUserBuildList] = useState<any[] | undefined>(undefined);
  const [userParts, setUserPartList] = useState<any[] | undefined>(undefined);

  async function getUserBuildList(){
    try {
      const response = await fetch('http://localhost:3001/builds/builds');
      const builds: any[] = await response.json();
      const userBuildsList = builds.filter(build => build.userId === currentUser?.uid);
      setUserBuildList(userBuildsList);
    } catch (error) {
      console.error("Failed to fetch user builds:", error);
    }
  }

  async function getPartList(){
    try {
      if(userBuilds){
      const response = await fetch('http://localhost:3001/list/parts');
      const parts: any[] = await response.json();
      const userPartsList = parts.filter(part => part._id === userBuilds[0].gpuId);
      setUserPartList(userPartsList);
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
        {userParts && userParts.length > 0 ? userParts[0].name : ''}
      </div>
  )
}

export default Profile;
