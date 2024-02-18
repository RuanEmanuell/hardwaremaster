import React from 'react';
import { useState, useEffect } from 'react';
import mbStyle from './styles/manualbuild.module.css';
import NavBar from '../../components/global/navbar';
import PartSelectorBox from '../../components/manualbuild/partselectorbox';
import CpuIcon from '../../images/cpu.png';
import GpuIcon from '../../images/gpu.png';

interface Part {
  type: string;
  name: string;
  brand: string;
  price: string;
  imageLink: string;
  cpuCores?: string;
  cpuThreads?: string;
  cpuFrequency?: string;
  cpuSocket?: string;
  gpuCores?: string,
  gpuMemory?: string,
  gpuMemoryType?: string,
}

const ManualBuild: React.FC = () => {
  const [cpuList, setCPUList] = useState<Part[]>([]);
  const [selectedCPU, setSelectedCPU] = useState<Part | undefined>(undefined);
  const [selectCPUInput, setSelectCPUInput] = useState<string>('');
  const [gpuList, setGPUList] = useState<Part[]>([]);
  const [selectedGPU, setSelectedGPU] = useState<Part | undefined>(undefined);
  const [selectGPUInput, setSelectGPUInput] = useState<string>('');
  const [totalBuildPrice, setTotalBuildPrice] = useState<number>(0)

  async function getPartList() {
    try {
      const response = await fetch('http://localhost:3001/list/parts');
      const data: Part[] = await response.json();
      const filteredCPUList = data
        .filter(item => item.type === 'cpu')
        .map(item => ({
          type: item.type,
          name: item.name,
          brand: item.brand,
          price: item.price,
          imageLink: item.imageLink,
          cpuCores: item.cpuCores,
          cpuFrequency: item.cpuFrequency,
          cpuThreads: item.cpuThreads,
          cpuSocket: item.cpuSocket,
        }));
      setCPUList(filteredCPUList);
      const filteredGPUList = data
        .filter(item => item.type === 'gpu')
        .map(item => ({
          type: item.type,
          name: item.name,
          brand: item.brand,
          price: item.price,
          imageLink: item.imageLink,
          gpuCores: item.gpuCores,
          gpuMemory: item.gpuMemory,
          gpuMemoryType: item.gpuMemoryType,
        }));
      setGPUList(filteredGPUList);
    } catch (err) {
      console.log(err);
    }
  }

  function selectPart(part: Part, partType:string) {
    if(partType === 'cpu'){
    setSelectedCPU(part);
    }else if(partType ==='gpu'){
      setSelectedGPU(part);
    }
    setTotalBuildPrice(totalBuildPrice + parseFloat(part['price']))
  }

  function resetSelectedPart(partType: string) {
    if (partType === 'cpu') {
      setTotalBuildPrice(totalBuildPrice - parseFloat(selectedCPU!['price']));
      setSelectedCPU(undefined);
      setSelectCPUInput('');
    } else if (partType === 'gpu') {
      setTotalBuildPrice(totalBuildPrice - parseFloat(selectedGPU!['price']));
      setSelectedGPU(undefined);
      setSelectGPUInput('');
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, partType: string) {
    const value = event.target.value;
    if (partType === 'cpu') {
      setSelectCPUInput(value);
    } else if (partType === 'gpu') {
      setSelectGPUInput(value);
    }
  }


  useEffect(() => {
    getPartList();
  }, []);

  return (
    <div >
      <NavBar isHamburguerMenuOptionVisible={true} />
      <div className={mbStyle.mainContainer}>
        <main>
          <h1 className={mbStyle.pageTitle}>Montagem Manual</h1>
          <PartSelectorBox
            partName='Processador'
            selectedPart={selectedCPU}
            partIcon={CpuIcon}
            selectPartLabel={'Selecione um processador'}
            inputPlaceHolder={'Digite o nome de um processador...'}
            selectPartInput={selectCPUInput.toLowerCase().trim()}
            handleChange={handleChange}
            selectPart={selectPart}
            partList={cpuList}
            info1={selectedCPU ? `Núcleos: ${selectedCPU!['cpuCores']}, Threads: ${selectedCPU!['cpuThreads']}` : ''}
            info2={selectedCPU ? `Frequência: ${selectedCPU!['cpuFrequency']} GHz` : ''}
            info3={selectedCPU ? `Socket: ${selectedCPU!['cpuSocket']}` : ''}
            resetSelectedPart={resetSelectedPart}
          />
          <PartSelectorBox
            partName='Placa de vídeo'
            selectedPart={selectedGPU}
            partIcon={GpuIcon}
            selectPartLabel={'Selecione uma placa de vídeo'}
            inputPlaceHolder={'Digite o nome de uma placa de vídeo...'}
            selectPartInput={selectGPUInput.toLowerCase().trim()}
            handleChange={handleChange}
            selectPart={selectPart}
            partList={gpuList}
            info1={selectedGPU ? `Núcleos: ${selectedGPU!['gpuCores']}` : ''}
            info2={selectedGPU ? `Memória: ${selectedGPU!['gpuMemory']}GB` : ''}
            info3={selectedGPU ? `Tipo da memória: ${selectedGPU!['gpuMemoryType']}` : ''}
            resetSelectedPart={resetSelectedPart}
          />
          <h2 className={mbStyle.buildPrice}>Preço total: R$ {totalBuildPrice.toFixed(3)}</h2>
        </main>
      </div>
    </div>
  )
}

export default ManualBuild;
