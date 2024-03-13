import React from 'react';
import profileComponentStyle from './styles/profilecomponents.module.css';
import Part from '../../utils/part';
import ProfileBuildPart from './profilebp';
import Build from '../../utils/build';

interface Props {
  userParts: Part[];
  build: Build;
  calculateBuildPrice: (partPrice: string) => void;
}

const PartBox: React.FC<Props> = ({ userParts, build, calculateBuildPrice }) => {
  const buildPartType: { [key: string]: string } = {
    'cpu'   : build.cpuId,
    'gpu'   : build.gpuId,
    'mobo'  : build.moboId,
    'ram'   : build.ramId,
    'power' : build.powerId,
    'ssd'   : build.ssdId,
    'case'  : build.caseId,
  };
  return (
    <div className={profileComponentStyle.partBox}>
      {!userParts ? <></> :
      <>
      {userParts.filter
        ((part: Part) => (part._id === buildPartType[part['type']])).map
        (part =>
          <ProfileBuildPart
            key = {part.name}
            part={part}
            build={build}
            calculateBuildPrice = {calculateBuildPrice}
          />
        )}
        </>}
        </div>
  )
}

export default PartBox;