import React from 'react';
import { useState, useEffect } from 'react';
import mbStyle from './styles/home.module.css';
import NavBar from '../../components/global/navbar';

interface Part{
  type: string;
  name: string;
}

const ManualBuild: React.FC = () => {
  const [cpuList, setCpuList] = useState<Part[]>([]);
  const [selectedCPU, setSelectedCPU] = useState<string>('');

  async function getPartList() {
    try {
      const response = await fetch('http://localhost:3001/list/parts');
      const data: Part[] = await response.json();
      let temporaryCpuList: Part[] = [];
      for(var i=0; i<data.length; i++){
        if(data[i]['type']=== 'cpu'){
          temporaryCpuList.push(data[i]);
        };
      }
      setCpuList(temporaryCpuList);
    } catch (err) {
      console.log(err);
    }
  }

  function selectCPU(cpuName:string){
    setSelectedCPU(cpuName);
  }

  useEffect(() => {
    getPartList();
  }, []);

  return (
    <div >
      <NavBar isHamburguerMenuOptionVisible={true} />
      <h1>Processador:</h1>
      {selectedCPU}
      {cpuList.length > 0 ? <div>
        {cpuList.map(cpu => <h1 onClick = {() => selectCPU(cpu['name'])}>{cpu['name']}</h1>)}
      </div> : <></>}
    </div>
  )
}

export default ManualBuild;
