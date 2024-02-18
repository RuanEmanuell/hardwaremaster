import React from 'react';
import { useState, useEffect } from 'react';
import mbStyle from './styles/manualbuild.module.css';
import NavBar from '../../components/global/navbar';
import CpuIcon from '../../images/cpu.png';
import StandartButton from '../../components/global/standartbutton';

interface Part {
  type: string;
  name: string;
  brand: string;
  price: string;
  imageLink: string;
  cpuCores: string;
  cpuThreads: string;
  cpuFrequency: string;
  cpuSocket: string;
}

interface Cpu {
  cpuName: string;
  cpuBrand: string;
  cpuCores: string;
  cpuThreads: string;
  cpuFrequency: string;
  cpuImageLink: string;
  cpuSocket: string;
  cpuPrice: string;
}

const ManualBuild: React.FC = () => {
  const [cpuList, setCpuList] = useState<Cpu[]>([]);
  const [selectedCPU, setSelectedCPU] = useState<Cpu | null>(null);
  const [selectCpuInput, setSelectCpuInput] = useState<string>('');
  const [totalBuildPrice, setTotalBuildPrice] = useState<number>(0)

  async function getPartList() {
    try {
      const response = await fetch('http://localhost:3001/list/parts');
      const data: Part[] = await response.json();
      const filteredCpuList = data
        .filter(item => item.type === 'cpu')
        .map(item => ({
          cpuName: item.name,
          cpuBrand: item.brand,
          cpuCores: item.cpuCores,
          cpuFrequency: item.cpuFrequency,
          cpuThreads: item.cpuThreads,
          cpuPrice: item.price,
          cpuImageLink: item.imageLink,
          cpuSocket: item.cpuSocket
        }));
      setCpuList(filteredCpuList);
    } catch (err) {
      console.log(err);
    }
  }

  function selectCPU(cpu: Cpu) {
    setSelectedCPU(cpu);
    setTotalBuildPrice(totalBuildPrice + parseFloat(cpu['cpuPrice']))
  }

  function resetSelectedCPU() {
    setTotalBuildPrice(totalBuildPrice - parseFloat(selectedCPU!['cpuPrice']));
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
              <img src={selectedCPU ? selectedCPU['cpuImageLink'] : CpuIcon}></img>
            </div>
            <div className={mbStyle.partNameAndInputBox}>
              <h3>{selectedCPU ? `${selectedCPU['cpuBrand']} ${selectedCPU['cpuName']}` : 'Selecione um processador'}</h3>
              {!selectedCPU ?
                <div>
                  <input className={mbStyle.partPickerInput}
                    placeholder='Digite o nome de um processador...'
                    value={selectCpuInput}
                    onChange={(event) => handleChange(event)}></input>
                  {selectCpuInput !== '' ?
                    <div className={mbStyle.inputResultBox}>
                      <div>
                        {cpuList.filter(cpu =>
                          `${cpu['cpuBrand']} ${cpu['cpuName']}`.toLowerCase().trim().includes(selectCpuInput)).map(cpu =>
                            <div className={mbStyle.inputPicker} onClick={() => selectCPU(cpu)}>
                              <div className={mbStyle.inputPickerNameAndImg}>
                                <img src={cpu['cpuImageLink']} className={mbStyle.inputImg}></img>
                                <h3>{cpu['cpuBrand']} {cpu['cpuName']}</h3>
                              </div>
                              <h3 className={mbStyle.inputPrice}>R$ {cpu['cpuPrice']}</h3>
                            </div>
                          )}
                      </div>
                    </div>
                    : <></>} </div>
                : <div>
                  <p>Núcleos: {selectedCPU['cpuCores']}, Threads: {selectedCPU['cpuThreads']}</p>
                  <p>Frequência: {selectedCPU['cpuFrequency']} GHz</p>
                  <p>Socket: {selectedCPU['cpuSocket']}</p>
                </div>}
            </div>
            <div>
              {selectedCPU ?
                <div>
                  <div className={mbStyle.priceBox}>
                    <h3>Preço:</h3>
                    <p>R$ {selectedCPU['cpuPrice']}</p>
                  </div>
                  <div className={mbStyle.buttonBox}>
                    <StandartButton
                      buttonLabel='Trocar peça'
                      onClick={() => resetSelectedCPU()}
                    />
                  </div>
                </div>
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
