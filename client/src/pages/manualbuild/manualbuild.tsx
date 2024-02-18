import React from 'react';
import { useState, useEffect } from 'react';
import mbStyle from './styles/manualbuild.module.css';
import NavBar from '../../components/global/navbar';
import CpuIcon from '../../images/cpu.png';
import PriceAndChangeButton from '../../components/manualbuild/pricebutton';
import PartInfoBox from '../../components/manualbuild/partinfobox';
import InputResultBox from '../../components/manualbuild/inputresultbox';

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
}

const ManualBuild: React.FC = () => {
  const [cpuList, setCpuList] = useState<Part[]>([]);
  const [selectedCPU, setSelectedCPU] = useState<Part | null>(null);
  const [selectCpuInput, setSelectCpuInput] = useState<string>('');
  const [totalBuildPrice, setTotalBuildPrice] = useState<number>(0)

  async function getPartList() {
    try {
      const response = await fetch('http://localhost:3001/list/parts');
      const data: Part[] = await response.json();
      const filteredCpuList = data
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
      setCpuList(filteredCpuList);
    } catch (err) {
      console.log(err);
    }
  }

  function selectCPU(cpu: Part) {
    setSelectedCPU(cpu);
    setTotalBuildPrice(totalBuildPrice + parseFloat(cpu['price']))
  }

  function resetSelectedCPU() {
    setTotalBuildPrice(totalBuildPrice - parseFloat(selectedCPU!['price']));
    setSelectedCPU(null);
    setSelectCpuInput('');
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSelectCpuInput(value);
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
          <h2>Processador</h2>
          <div className={mbStyle.partPicker}>
            <div className={mbStyle.imgBox}>
              <img src={selectedCPU ? selectedCPU['imageLink'] : CpuIcon}></img>
            </div>
            <div className={mbStyle.partNameAndInputBox}>
              <h3>{selectedCPU ? `${selectedCPU['brand']} ${selectedCPU['name']}` : 'Selecione um processador'}</h3>
              {!selectedCPU ?
                <div>
                  <input className={mbStyle.partPickerInput}
                    placeholder='Digite o nome de um processador...'
                    value={selectCpuInput}
                    onChange={(event) => handleChange(event)}></input>
                  {selectCpuInput !== '' ?
                      <InputResultBox
                      partList={cpuList}
                      selectPartInput={selectCpuInput.toLowerCase().trim()}
                      selectPart={selectCPU}
                      />
                    : <></>} </div>
                : <PartInfoBox
                  info1={`Núcleos: ${selectedCPU['cpuCores']}, Threads: ${selectedCPU['cpuThreads']}`}
                  info2={`Frequência: ${selectedCPU['cpuFrequency']} GHz`}
                  info3={`Socket: ${selectedCPU['cpuSocket']}`}
                />
              }
            </div>
            <div>
              {selectedCPU ?
                <PriceAndChangeButton
                  selectedPartPrice={selectedCPU['price']}
                  onChangePartClick={resetSelectedCPU}
                />
                : <></>}
            </div>
          </div>
          <h2 className={mbStyle.buildPrice}>Preço total: R$ {totalBuildPrice}</h2>
        </main>
      </div>
    </div>
  )
}

export default ManualBuild;
