import React, { useState, useEffect } from 'react';
import mbStyle from './styles/manualbuild.module.css';
import NavBar from '../../components/global/navbar';
import PartSelectorBox from '../../components/manualbuild/partselectorbox';
import CpuIcon from '../../images/cpu.png';
import GpuIcon from '../../images/gpu.png';
import SaveIcon from '../../images/save.png';
import ShareIcon from '../../images/share.png';
import RestartIcon from '../../images/restart.png';

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
  cpuRamType?: string;
  gpuCores?: string,
  gpuMemory?: string,
  gpuMemoryType?: string,
  gpuRecommendedPower?: string;
  moboChipset?: string,
  moboSocketCompatibility?: string,
  moboRamCompatibility?: string,
  moboSlots?: string,
  ramFrequency?: string,
  ramCapacity?: string,
  ramType?: string,
  powerWatts?: string,
  powerEfficiency?: string,
  powerModular?: string,
  ssdCapacity?: string,
  ssdType?: string,
  ssdSpeed?: string,
  caseForm?: string,
  caseFanSupport?: string,
  caseWcSupport?: string,
  partQuantity: number
}

const ManualBuild: React.FC = () => {
  const [partList, setPartList] = useState<Part[]>([]);

  const [selectedCpu, setSelectedCpu] = useState<Part | undefined>(undefined);
  const [selectCpuInput, setSelectCpuInput] = useState<string>('');
  const [selectedGpu, setSelectedGpu] = useState<Part | undefined>(undefined);
  const [selectGpuInput, setSelectGpuInput] = useState<string>('');
  const [selectedMobo, setSelectedMobo] = useState<Part | undefined>(undefined);
  const [selectMoboInput, setSelectMoboInput] = useState<string>('');
  const [selectedRam, setSelectedRam] = useState<Part | undefined>(undefined);
  const [selectRamInput, setSelectRamInput] = useState<string>('');
  const [selectedPower, setSelectedPower] = useState<Part | undefined>(undefined);
  const [selectPowerInput, setSelectPowerInput] = useState<string>('');
  const [selectedSsd, setSelectedSsd] = useState<Part | undefined>(undefined);
  const [selectSsdInput, setSelectSsdInput] = useState<string>('');
  const [selectedCase, setSelectedCase] = useState<Part | undefined>(undefined);
  const [selectCaseInput, setSelectCaseInput] = useState<string>('');

  const [totalBuildPrice, setTotalBuildPrice] = useState<number>(0);

  const [copiedToTA, setCopiedDisplay] = useState<string>('none');

  async function getPartList() {
    try {
      const response = await fetch('http://localhost:3001/list/parts');
      const data: Part[] = await response.json();

      const filteredPartList = data.map(item => ({
        type: item.type,
        name: item.name,
        brand: item.brand,
        price: item.price,
        imageLink: item.imageLink,
        cpuCores: item.cpuCores,
        cpuFrequency: item.cpuFrequency,
        cpuThreads: item.cpuThreads,
        cpuSocket: item.cpuSocket,
        cpuRamType: item.cpuRamType,
        gpuCores: item.gpuCores,
        gpuMemory: item.gpuMemory,
        gpuMemoryType: item.gpuMemoryType,
        gpuRecommendedPower: item.gpuRecommendedPower,
        moboChipset: item.moboChipset,
        moboSocketCompatibility: item.moboSocketCompatibility,
        moboRamCompatibility: item.moboRamCompatibility,
        moboSlots: item.moboSlots,
        ramFrequency: item.ramFrequency,
        ramCapacity: item.ramCapacity,
        ramType: item.ramType,
        powerWatts: item.powerWatts,
        powerEfficiency: item.powerEfficiency,
        powerModular: item.powerModular,
        ssdCapacity: item.ssdCapacity,
        ssdType: item.ssdType,
        ssdSpeed: item.ssdSpeed,
        caseForm: item.caseForm,
        caseFanSupport: item.caseFanSupport,
        caseWcSupport: item.caseWcSupport,
        partQuantity: 1
      }));

      setPartList(filteredPartList);
    } catch (err) {
      console.log(err);
    }
  }

  function setNewPartValues(part: Part, newPartValue: any) {
    if (part['type'] === 'cpu') {
      setSelectedCpu(newPartValue);
      setSelectCpuInput('');
    } else if (part['type'] === 'gpu') {
      setSelectedGpu(newPartValue);
      setSelectGpuInput('');
    } else if (part['type'] === 'mobo') {
      setSelectedMobo(newPartValue);
      setSelectMoboInput('');
    } else if (part['type'] === 'ram') {
      setSelectedRam(newPartValue);
      setSelectRamInput('');
    } else if (part['type'] === 'power') {
      setSelectedPower(newPartValue);
      setSelectPowerInput('');
    } else if (part['type'] === 'ssd') {
      setSelectedSsd(newPartValue);
      setSelectSsdInput('');
    } else if (part['type'] === 'case') {
      setSelectedCase(newPartValue);
      setSelectCaseInput('');
    }
  }

  function selectPart(part: Part) {
    setNewPartValues(part, part);
    setTotalBuildPrice(totalBuildPrice + parseFloat(part['price'].replace('.', '').replace(',', '.')));
  }

  function increasePartQuantity(part: Part) {
    let maxNumber: number = 4;
    if (selectedMobo && selectedMobo['moboSlots'] && part.type === 'ram') {
      maxNumber = parseInt(selectedMobo!['moboSlots']);
    }
    if (part.partQuantity < maxNumber) {
      let newPartQuantity = part.partQuantity + 1;
      let newPrice = (parseFloat(part['price'].replace('.', '').replace(',', '.')) + parseFloat(part['price'].replace('.', '').replace(',', '.')) / (newPartQuantity - 1)).toFixed(2).toString();
      newPrice = newPrice.replace('.', ',');
      let newPart = { ...part, partQuantity: newPartQuantity, price: newPrice }
      setNewPartValues(part, newPart);
      setTotalBuildPrice(totalBuildPrice + (parseFloat(newPrice.replace(',', '.')) / newPartQuantity));
    }
  }

  function decreasePartQuantity(part: Part) {
    if (part.partQuantity > 1) {
      let newPartQuantity = part.partQuantity - 1;
      let newPrice = (parseFloat(part['price'].replace('.', '').replace(',', '.')) - parseFloat(part['price'].replace('.', '').replace(',', '.')) / (newPartQuantity + 1)).toFixed(2).toString();
      newPrice = newPrice.replace('.', ',');
      let newPart = { ...part, partQuantity: newPartQuantity, price: newPrice }
      setNewPartValues(part, newPart);
      setTotalBuildPrice(totalBuildPrice - (parseFloat(newPrice.replace(',', '.')) / newPartQuantity));
    }
  }

  function resetSelectedPart(part: Part) {
    setNewPartValues(part, undefined);
    setTotalBuildPrice(totalBuildPrice - parseFloat(part['price'].replace('.', '').replace(',', '.')));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>, partType: string) {
    const value = event.target.value;
    if (partType === 'cpu') {
      setSelectCpuInput(value);
    } else if (partType === 'gpu') {
      setSelectGpuInput(value);
    } else if (partType === 'mobo') {
      setSelectMoboInput(value);
    } else if (partType === 'ram') {
      setSelectRamInput(value);
    } else if (partType === 'power') {
      setSelectPowerInput(value);
    } else if (partType === 'ssd') {
      setSelectSsdInput(value);
    } else if (partType === 'case') {
      setSelectCaseInput(value);
    }
  }

  function resetBuild() {
    setSelectedCpu(undefined);
    setSelectCpuInput('');
    setSelectedGpu(undefined);
    setSelectGpuInput('');
    setSelectedMobo(undefined);
    setSelectMoboInput('');
    setSelectedRam(undefined);
    setSelectRamInput('');
    setSelectedPower(undefined);
    setSelectPowerInput('');
    setSelectedSsd(undefined);
    setSelectSsdInput('');
    setSelectedCase(undefined);
    setSelectCaseInput('');
    setTotalBuildPrice(0);
  }

  function createBuildClipBoardText() {
    let buildText: string = '';
    if (copiedToTA === 'none') {
      buildText = `Processador: ${selectedCpu!['name']} - R$ ${selectedCpu!['price']} 
Placa de vídeo: ${selectedGpu!['name']} - R$ ${selectedGpu!['price']}
Placa mãe: ${selectedMobo!['name']} - R$ ${selectedMobo!['price']} 
Ram: ${selectedRam!['name']} - R$ ${selectedRam!['price']} x ${selectedRam!['partQuantity']}
Fonte de alimentação: ${selectedPower!['name']} - R$ ${selectedPower!['price']}
SSD: ${selectedSsd!['name']} - R$ ${selectedSsd!['price']} x ${selectedSsd!['partQuantity']}
Gabinete: ${selectedCase!['name']} - R$ ${selectedCase!['price']}
\nPreço Total: R$ ${totalBuildPrice!.toFixed(2)} `

      setCopiedDisplay('flex');
    }
    return buildText;
  }

  useEffect(() => {
    getPartList();
  }, []);

  useEffect(() => {
    if (totalBuildPrice < 0) {
      setTotalBuildPrice(0);
    }
  }, [totalBuildPrice]);

  useEffect(() => {
    setTimeout(() => {
      if (copiedToTA == 'flex') {
        setCopiedDisplay('none')
      }
    }, 2000)
  }, [copiedToTA])

  return (
    <div>
      <NavBar isHamburguerMenuOptionVisible={true} />
      <div className={mbStyle.mainContainer}>
        <main>
          <h1 className={mbStyle.pageTitle}>Montagem Manual</h1>
          <div className={mbStyle.partSelectorsBox}>
            <PartSelectorBox
              partName='Processador'
              selectedPart={selectedCpu}
              partIcon={CpuIcon}
              selectPartLabel={'Selecione um processador'}
              inputPlaceHolder={'Digite o nome de um processador...'}
              selectPartInput={selectCpuInput.toLowerCase().trim()}
              handleChange={handleChange}
              selectPart={selectPart}
              partList={partList.filter(item => item.type === 'cpu')}
              info1={selectedCpu ? `Núcleos: ${selectedCpu['cpuCores']}, Threads: ${selectedCpu['cpuThreads']}` : ''}
              info2={selectedCpu ? `Frequência: ${selectedCpu['cpuFrequency']} GHz` : ''}
              info3={selectedCpu ? `Socket: ${selectedCpu['cpuSocket']}` : ''}
              increasePartQuantity={increasePartQuantity}
              decreasePartQuantity={decreasePartQuantity}
              resetSelectedPart={resetSelectedPart}
              selectedMobo={selectedMobo}
              selectedRam={selectedRam}
            />
            <PartSelectorBox
              partName='Placa de vídeo'
              selectedPart={selectedGpu}
              partIcon={GpuIcon}
              selectPartLabel={'Selecione uma placa de vídeo'}
              inputPlaceHolder={'Digite o nome de uma placa de vídeo...'}
              selectPartInput={selectGpuInput.toLowerCase().trim()}
              handleChange={handleChange}
              selectPart={selectPart}
              partList={partList.filter(item => item.type === 'gpu')}
              info1={selectedGpu ? `Núcleos: ${selectedGpu!['gpuCores']}` : ''}
              info2={selectedGpu ? `Memória: ${selectedGpu!['gpuMemory']}GB` : ''}
              info3={selectedGpu ? `Tipo da memória: ${selectedGpu!['gpuMemoryType']}` : ''}
              increasePartQuantity={increasePartQuantity}
              decreasePartQuantity={decreasePartQuantity}
              resetSelectedPart={resetSelectedPart}
              selectedPower={selectedPower}
            />

            <PartSelectorBox
              partName='Placa-mãe'
              selectedPart={selectedMobo}
              partIcon={GpuIcon}
              selectPartLabel={'Selecione uma placa-mãe'}
              inputPlaceHolder={'Digite o nome de uma placa-mãe...'}
              selectPartInput={selectMoboInput.toLowerCase().trim()}
              handleChange={handleChange}
              selectPart={selectPart}
              partList={partList.filter(item => item.type === 'mobo')}
              info1={selectedMobo ? `Chipset: ${selectedMobo['moboChipset']}` : ''}
              info2={selectedMobo ? `Compatibilidade de socket: ${selectedMobo['moboSocketCompatibility']}` : ''}
              info3={selectedMobo ? `Compatibilidade de RAM: ${selectedMobo['moboRamCompatibility']}` : ''}
              increasePartQuantity={increasePartQuantity}
              decreasePartQuantity={decreasePartQuantity}
              resetSelectedPart={resetSelectedPart}
              selectedCpu={selectedCpu}
              selectedRam={selectedRam}
            />

            <PartSelectorBox
              partName='Memória RAM'
              selectedPart={selectedRam}
              partIcon={GpuIcon}
              selectPartLabel={'Selecione uma memória RAM'}
              inputPlaceHolder={'Digite o nome de uma memória RAM...'}
              selectPartInput={selectRamInput.toLowerCase().trim()}
              handleChange={handleChange}
              selectPart={selectPart}
              partList={partList.filter(item => item.type === 'ram')}
              info1={selectedRam ? `Capacidade: ${selectedRam['ramCapacity']} GB` : ''}
              info2={selectedRam ? `Frequência: ${selectedRam['ramFrequency']} MHz` : ''}
              info3={selectedRam ? `Tipo: ${selectedRam['ramType']}` : ''}
              increasePartQuantity={increasePartQuantity}
              decreasePartQuantity={decreasePartQuantity}
              resetSelectedPart={resetSelectedPart}
              selectedCpu={selectedCpu}
              selectedMobo={selectedMobo}
            />

            <PartSelectorBox
              partName='Fonte de Alimentação'
              selectedPart={selectedPower}
              partIcon={GpuIcon}
              selectPartLabel={'Selecione uma fonte de alimentação'}
              inputPlaceHolder={'Digite o nome de uma fonte de alimentação...'}
              selectPartInput={selectPowerInput.toLowerCase().trim()}
              handleChange={handleChange}
              selectPart={selectPart}
              partList={partList.filter(item => item.type === 'power')}
              info1={selectedPower ? `Potência: ${selectedPower['powerWatts']} Watts` : ''}
              info2={selectedPower ? `Eficiência: ${selectedPower['powerEfficiency']}` : ''}
              info3={selectedPower ? `Modular: ${selectedPower['powerModular']}` : ''}
              increasePartQuantity={increasePartQuantity}
              decreasePartQuantity={decreasePartQuantity}
              resetSelectedPart={resetSelectedPart}
              selectedGpu={selectedGpu}
            />

            <PartSelectorBox
              partName='SSD'
              selectedPart={selectedSsd}
              partIcon={GpuIcon}
              selectPartLabel={'Selecione um SSD'}
              inputPlaceHolder={'Digite o nome de um SSD...'}
              selectPartInput={selectSsdInput.toLowerCase().trim()}
              handleChange={handleChange}
              selectPart={selectPart}
              partList={partList.filter(item => item.type === 'ssd')}
              info1={selectedSsd ? `Capacidade: ${selectedSsd['ssdCapacity']} GB` : ''}
              info2={selectedSsd ? `Tipo: ${selectedSsd['ssdType']}` : ''}
              info3={selectedSsd ? `Velocidade (Leitura): ${selectedSsd['ssdSpeed']} MB/s` : ''}
              increasePartQuantity={increasePartQuantity}
              decreasePartQuantity={decreasePartQuantity}
              resetSelectedPart={resetSelectedPart}
            />

            <PartSelectorBox
              partName='Gabinete'
              selectedPart={selectedCase}
              partIcon={GpuIcon}
              selectPartLabel={'Selecione um gabinete'}
              inputPlaceHolder={'Digite o nome de um gabinete...'}
              selectPartInput={selectCaseInput.toLowerCase().trim()}
              handleChange={handleChange}
              selectPart={selectPart}
              partList={partList.filter(item => item.type === 'case')}
              info1={selectedCase ? `Formato: ${selectedCase['caseForm']}` : ''}
              info2={selectedCase ? `Suporte a fans: ${selectedCase['caseFanSupport']}` : ''}
              info3={selectedCase ? `Suporte a Water Cooler: ${selectedCase['caseWcSupport']}` : ''}
              increasePartQuantity={increasePartQuantity}
              decreasePartQuantity={decreasePartQuantity}
              resetSelectedPart={resetSelectedPart}
            />
          </div>
          <div className={mbStyle.finishBuildBox}>
            <h2 className={mbStyle.buildPrice}>Preço total: R$ {totalBuildPrice.toFixed(2).toString().replace('.', ',')}</h2>
            <div className={mbStyle.buildButtonsBox}>
              <button className={mbStyle.buildButton} style={{ backgroundColor: '#0066FF' }}>
                <img src={SaveIcon} alt='Salvar'></img>
              </button>
              <button className={mbStyle.buildButton}
                style={{ backgroundColor: '#00C22B' }}
                onClick={() => navigator.clipboard.writeText(createBuildClipBoardText())}>
                <img src={ShareIcon} alt='Compartilhar'></img>
              </button>
              <button className={mbStyle.buildButton}
                style={{ backgroundColor: '#c20000' }}
                onClick={resetBuild}>
                <img src={RestartIcon} alt='Reiniciar'></img>
              </button>
            </div>
          </div>
          <div className={mbStyle.copiedToTABox}>
            <div className={mbStyle.copiedToTA} style={{ display: copiedToTA }}>
              <h4>Copiado para a área de transferência</h4>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManualBuild;
