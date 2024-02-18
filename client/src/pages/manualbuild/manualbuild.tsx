import React from 'react';
import { useState, useEffect } from 'react';
import mbStyle from './styles/manualbuild.module.css';
import NavBar from '../../components/global/navbar';
import CpuIcon from '../../images/cpu.png';

interface Part {
  type: string;
  name: string;
  brand: string;
  price: string;
  imageLink: string;
  cpuCores: string;
  cpuThreads: string;
  cpuFrequency: string;
}

interface Cpu {
  cpuName: string;
  cpuBrand: string;
  cpuCores: string;
  cpuThreads: string;
  cpuFrequency: string;
  cpuImageLink: string;
  cpuPrice: string;
}

const ManualBuild: React.FC = () => {
  const [cpuList, setCpuList] = useState<Cpu[]>([]);
  const [selectedCPU, setSelectedCPU] = useState<Cpu | null>(null);
  const [selectCpuInput, setSelectCpuInput] = useState<string>('');

  async function getPartList() {
    try {
      const response = await fetch('http://localhost:3001/list/parts');
      const data: Part[] = await response.json();
      let temporaryCpuList: Cpu[] = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i]['type'] === 'cpu') {
          temporaryCpuList.push(
            {
              cpuName: data[i]['name'],
              cpuBrand: data[i]['brand'],
              cpuCores: data[i]['cpuCores'],
              cpuFrequency: data[i]['cpuFrequency'],
              cpuThreads: data[i]['cpuFrequency'],
              cpuPrice: data[i]['price'],
              cpuImageLink: data[i]['imageLink']
            });
        };
      }
      setCpuList(temporaryCpuList);
    } catch (err) {
      console.log(err);
    }
  }

  function selectCPU(cpu: Cpu) {
    setSelectedCPU(cpu);
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
              <img src={selectedCPU ? selectedCPU['cpuImageLink'] : CpuIcon}></img>
            </div>
            <div className={mbStyle.partNameAndInputBox}>
              <h3>{selectedCPU ? `${selectedCPU['cpuBrand']} ${selectedCPU['cpuName']}` : 'Selecione um processador'}</h3>
              <input className={mbStyle.partPickerInput}
                placeholder='Digite o nome de um processador...'
                value={selectCpuInput}
                onChange={(event) => handleChange(event)}></input>
              <div className={mbStyle.inputResultBox}>
                {selectCpuInput !== '' ?
                  <div>
                    {cpuList.filter(cpu =>
                      `${cpu['cpuBrand']} ${cpu['cpuName']}`.toLowerCase().trim().includes(selectCpuInput)).map(cpu =>
                        <div className={mbStyle.inputPicker}>
                        <h3 onClick={() => selectCPU(cpu)}>{cpu['cpuBrand']} {cpu['cpuName']}</h3>
                        </div>
                        )}
                  </div>
                  : <></>}
              </div>
            </div>
            <div></div>
            <div></div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ManualBuild;
