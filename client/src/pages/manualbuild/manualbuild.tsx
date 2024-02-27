import React, { useState, useEffect } from 'react';
import mbStyle from './styles/manualbuild.module.css';
import NavBar from '../../components/global/navbar';
import CpuIcon from '../../images/cpu.png';
import GpuIcon from '../../images/gpu.png';
import SaveIcon from '../../images/save.png';
import ShareIcon from '../../images/share.png';
import RestartIcon from '../../images/restart.png';
import WhatsappIcon from '../../images/whatsapp.png';
import CopyIcon from '../../images/copy.png'
import { useDetectClickOutside } from 'react-detect-click-outside';
import PartSelectorBox from '../../components/manualbuild/partselectorbox';
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import SaveBuildPart from '../../components/manualbuild/savepart';
import StandartButton from '../../components/global/standartbutton';

interface Part {
  _id?: String,
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

  const [allPartsSelected, setAllPartsSelected] = useState<boolean>(false);
  const [totalBuildPrice, setTotalBuildPrice] = useState<number>(0);

  const [saveMenu, setSaveMenuDisplay] = useState<string>('none');

  const saveRef = useDetectClickOutside({ onTriggered: closeSaveMenu });

  const [shareMenu, setShareMenuDisplay] = useState<string>('none');
  const [copiedToTA, setCopiedDisplay] = useState<string>('none');

  const shareRef = useDetectClickOutside({ onTriggered: closeShareMenu });

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  async function getPartList() {
    try {
      const response = await fetch('http://localhost:3001/list/parts');
      const data: Part[] = await response.json();

      const filteredPartList = data.map(item => ({
        _id: item._id,
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
    if (part['type'] === 'mobo' && selectedRam) {
      if (parseInt(part['moboSlots']!) < selectedRam!['partQuantity']) {
        let newRamQuantityAndPrice = {
          ...selectedRam,
          partQuantity: parseInt(part['moboSlots']!),
          price: (parseFloat(selectedRam['price'].replace(',', '.')) / parseInt(part['moboSlots']!)).toFixed(2).toString().replace('.', ',')
        }
        setSelectedRam(newRamQuantityAndPrice);
      }
    }
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

  function shareText(option: string) {
    if (allPartsSelected && copiedToTA === 'none') {
      const buildText =
        `Processador: ${selectedCpu!['name']} - R$ ${selectedCpu!['price']}
       \nPlaca de vídeo: ${selectedGpu!['name']} - R$ ${selectedGpu!['price']}
       \nPlaca mãe: ${selectedMobo!['name']} - R$ ${selectedMobo!['price']} 
       \nRam: ${selectedRam!['name']} x${selectedRam!['partQuantity']} - R$ ${selectedRam!['price']}
       \nFonte de alimentação: ${selectedPower!['name']} - R$ ${selectedPower!['price']}
       \nSSD: ${selectedSsd!['name']} x${selectedSsd!['partQuantity']} - R$ ${selectedSsd!['price']}
       \nGabinete: ${selectedCase!['name']} - R$ ${selectedCase!['price']}
       \n\nPreço Total: R$ ${totalBuildPrice.toFixed(2)}`;

      if (option === 'copy') {
        try {
          navigator.clipboard.writeText(buildText);
          setCopiedDisplay('flex');
        } catch (error) {
          console.log(error);
        }
      } else if (option === 'whatsapp') {
        try {
          const encodedText = encodeURIComponent(buildText);
          window.open(`https://wa.me/?text=${encodedText}`, "_blank");
        } catch (error) {
          console.log(error);
        }
      }
      closeShareMenu();
    }
  }

  function showShareOptions() {
    if (allPartsSelected) {
      setShareMenuDisplay(shareMenu == 'none' ? 'block' : 'none');
    }
  }

  function closeShareMenu() {
    if (shareMenu == 'block') {
      showShareOptions();
    }
  }

  function clearInputs(partType: string) {
    if (partType === 'cpu') {
      setSelectCpuInput('');
    } else if (partType === 'gpu') {
      setSelectGpuInput('');
    } else if (partType === 'mobo') {
      setSelectMoboInput('');
    } else if (partType === 'ram') {
      setSelectRamInput('');
    } else if (partType === 'power') {
      setSelectPowerInput('');
    } else if (partType === 'ssd') {
      setSelectSsdInput('');
    } else if (partType === 'case') {
      setSelectCaseInput('');
    }
  }

  //Fetch API
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

  useEffect(() => {
    if (selectedCpu && selectedGpu && selectedMobo && selectedRam
      && selectedPower && selectedSsd && selectedCase) {
      setAllPartsSelected(true);
    } else {
      setAllPartsSelected(false);
    }
  }, [selectedCpu, selectedGpu, selectedMobo, selectedRam,
    selectedPower, selectedSsd, selectedCase]);

  function openSaveMenu() {
    setTimeout(() => {
      setSaveMenuDisplay('flex');
    }, 1);
  }

  function closeSaveMenu() {
    if (saveMenu === 'flex') {
      setSaveMenuDisplay('none');
    }
  }

  function showSaveBuildMenu() {
    if (allPartsSelected) {
      if (currentUser) {
        openSaveMenu();
      } else {
        navigate('/login');
      }
    }
  }

  async function saveBuild() {
    try{
      const newBuild = await fetch(
        'http://localhost:3001/builds/post', ({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify(
          {
           userId : currentUser?.uid,
           cpuId: selectedCpu?._id, 
           gpuId: selectedGpu?._id, 
           moboId: selectedMobo?._id, 
           ramId: selectedRam?._id, 
           powerId: selectedPower?._id, 
           ssdId: selectedSsd?._id, 
           caseId: selectedCase?._id
          })
        }));
      navigate('/profile');
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <NavBar />
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
              clearInputs={clearInputs}
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
              clearInputs={clearInputs}
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
              clearInputs={clearInputs}
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
              clearInputs={clearInputs}
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
              clearInputs={clearInputs}
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
              clearInputs={clearInputs}
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
              clearInputs={clearInputs}
            />
          </div>
          <div className={mbStyle.finishBuildBox} ref={shareRef}>
            <h2 className={mbStyle.buildPrice}>Preço total: R$ {totalBuildPrice.toFixed(2).toString().replace('.', ',')}</h2>
            <div className={mbStyle.buildButtonsBox}>
              <button className={mbStyle.buildButton}
                style={{ backgroundColor: allPartsSelected ? '#0066FF' : 'grey' }}
                onClick={showSaveBuildMenu}>
                <img src={SaveIcon} alt='Salvar'></img>
              </button>
              <button className={mbStyle.buildButton}
                style={{ backgroundColor: allPartsSelected ? '#00C22B' : 'grey' }}
                onClick={showShareOptions}>
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
          <div className={mbStyle.shareMenu} style={{ display: shareMenu }}>
            <div onClick={() => shareText('whatsapp')}>
              <img src={WhatsappIcon} className={mbStyle.shareOptionImg}></img>
              <p>Compartilhar via Whatsapp</p>
            </div>
            <div onClick={() => shareText('copy')}>
              <img src={CopyIcon} className={mbStyle.shareOptionImg}></img>
              <p>Copiar texto da montagem</p>
            </div>
          </div>
          <div className={mbStyle.saveScreen} style={{ display: saveMenu }}>
            <div className={mbStyle.saveBox} ref={saveRef}>
              <h1>Deseja salvar essa build?</h1>
              <SaveBuildPart
                partLabel='Processador'
                selectedPart={selectedCpu!}
              />
              <SaveBuildPart
                partLabel='Placa de vídeo'
                selectedPart={selectedGpu!}
              />
              <SaveBuildPart
                partLabel='Placa mãe'
                selectedPart={selectedMobo!}
              />
              <SaveBuildPart
                partLabel='RAM'
                selectedPart={selectedRam!}
              />
              <SaveBuildPart
                partLabel='Fonte'
                selectedPart={selectedPower!}
              />
              <SaveBuildPart
                partLabel='SSD'
                selectedPart={selectedSsd!}
              />
              <SaveBuildPart
                partLabel='Gabinete'
                selectedPart={selectedCase!}
              />
              <StandartButton
                buttonLabel='Salvar'
                onClick={saveBuild}
              />
              <StandartButton
                buttonLabel='Cancelar'
                onClick={closeSaveMenu}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManualBuild;
