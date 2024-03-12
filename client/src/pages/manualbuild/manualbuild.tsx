import React, { useState, useEffect, useRef } from 'react';
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
import { useLocation, useNavigate } from 'react-router-dom';
import SaveBuildPart from '../../components/manualbuild/savepart';
import StandartButton from '../../components/global/standartbutton';
import queryString from 'query-string';
import Part from '../../utils/part';
import Build from '../../utils/build';
import Loading from '../../components/global/loading';

const ManualBuild: React.FC = () => {

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const automaticBuild = queryParams.automaticMode as string;

  const [buildMode, setBuildMode] = useState<string>(automaticBuild ? 'automatic' : 'manual');

  const cpuBrands = ['Intel', 'AMD', 'Tanto faz'];
  const gpuBrands = ['NVIDIA', 'AMD', 'Intel', 'Tanto faz'];

  const [budgetSlideValue, setBudgetSlide] = useState<number>(3000);
  const [preferedCpuBrand, setPreferedCpuBrand] = useState<string>(cpuBrands[2]);
  const [preferedGpuBrand, setPreferedGpuBrand] = useState<string>(gpuBrands[3]);

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

  const [shareMenu, setShareMenuDisplay] = useState<string>('none');
  const [copiedToTA, setCopiedDisplay] = useState<string>('none');

  const [userBuildLoaded, setUserBuildLoaded] = useState<boolean>(false);

  const shareRef = useDetectClickOutside({ onTriggered: closeShareMenu });

  const saveRef = useRef<HTMLDialogElement>(null);

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const buildId = queryParams.buildId as string;

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
        bestPriceLink: item.bestPriceLink,
        imageLink: item.imageLink,
        cpuCores: item.cpuCores,
        cpuFrequency: item.cpuFrequency,
        cpuThreads: item.cpuThreads,
        cpuSocket: item.cpuSocket,
        cpuRamType: item.cpuRamType,
        cpuIgpu: item.cpuIgpu,
        cpuPerformance: item.cpuPerformance,
        gpuCores: item.gpuCores,
        gpuMemory: item.gpuMemory,
        gpuMemoryType: item.gpuMemoryType,
        gpuPerformance: item.gpuPerformance,
        gpuRecommendedPower: item.gpuRecommendedPower,
        moboChipset: item.moboChipset,
        moboSocketCompatibility: item.moboSocketCompatibility,
        moboRamCompatibility: item.moboRamCompatibility,
        moboSlots: item.moboSlots,
        moboType: item.moboType,
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
        partQuantity: 1,
        costBenefit: item.costBenefit
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

  function fixPrice(price: string) {
    return parseFloat(price.replace(',', '.'));
  }

  function selectPart(part: Part) {
    setNewPartValues(part, part);
    setTotalBuildPrice(totalBuildPrice + fixPrice(part['price']));
    if (part['type'] === 'mobo' && selectedRam) {
      if (part['moboSlots']! < selectedRam!['partQuantity']) {
        let newRamQuantityAndPrice = {
          ...selectedRam,
          partQuantity: part['moboSlots']!,
          price: (fixPrice(selectedRam['price']) / selectedRam['partQuantity'] * part['moboSlots']!).toFixed(2).toString()
        }
        setSelectedRam(newRamQuantityAndPrice);
      }
    }
  }

  function increasePartQuantity(part: Part) {
    let maxNumber: number = 4;
    if (selectedMobo && selectedMobo['moboSlots'] && part.type === 'ram') {
      maxNumber = selectedMobo!['moboSlots'];
    }
    if (part.partQuantity < maxNumber) {
      let newPartQuantity = part.partQuantity + 1;
      let newPrice = (fixPrice(part['price']) + fixPrice(part['price']) / (newPartQuantity - 1)).toFixed(2).toString();
      newPrice = newPrice.replace('.', ',');
      let newPart = { ...part, partQuantity: newPartQuantity, price: newPrice }
      setNewPartValues(part, newPart);
      setTotalBuildPrice(totalBuildPrice + (fixPrice(newPrice) / newPartQuantity));
    }
  }

  function decreasePartQuantity(part: Part) {
    if (part.partQuantity > 1) {
      let newPartQuantity = part.partQuantity - 1;
      let newPrice = (fixPrice(part['price']) - (fixPrice(part['price']) / part.partQuantity)).toFixed(2).toString();
      newPrice = newPrice.replace('.', ',');
      let newPart = { ...part, partQuantity: newPartQuantity, price: newPrice }
      setNewPartValues(part, newPart);
      setTotalBuildPrice(totalBuildPrice - (fixPrice(newPrice) / newPartQuantity));
    }
  }

  function resetSelectedPart(part: Part) {
    setNewPartValues(part, undefined);
    setTotalBuildPrice(totalBuildPrice - fixPrice(part['price']));
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
    if(automaticBuild){
      setBuildMode('automatic');
    }
  }

  function shareText(option: string) {
    if (allPartsSelected && copiedToTA === 'none') {
      const buildText =
        `Processador: ${selectedCpu!['name']} - R$ ${selectedCpu!['price']}
       \nPlaca de vídeo: ${selectedGpu!['name']} - R$ ${selectedGpu!['price']}
       \nPlaca mãe: ${selectedMobo!['name']} - R$ ${selectedMobo!['price']} 
       \nRam: ${selectedRam!['name']} (x${selectedRam!['partQuantity']}) - R$ ${selectedRam!['price']}
       \nFonte de alimentação: ${selectedPower!['name']} - R$ ${selectedPower!['price']}
       \nSSD: ${selectedSsd!['name']} (x${selectedSsd!['partQuantity']}) - R$ ${selectedSsd!['price']}
       \nGabinete: ${selectedCase!['name']} - R$ ${selectedCase!['price']}
       \n\nPreço Total: R$ ${totalBuildPrice.toFixed(2).replace('.', ',')}`;

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

  async function getUserBuildPartList() {
    try {
      const response = await fetch(`http://localhost:3001/builds/users/${currentUser?.uid}`);
      const allUserBuilds: Build[] = await response.json();
      const temporarySelectedBuild = allUserBuilds.find(build => build._id === buildId);

      if (temporarySelectedBuild && partList.length > 0) {
        const temporarySelectedCpu = partList.find(part => part._id === temporarySelectedBuild.cpuId);
        const temporarySelectedGpu = partList.find(part => part._id === temporarySelectedBuild.gpuId);
        const temporarySelectedMobo = partList.find(part => part._id === temporarySelectedBuild.moboId);
        const temporarySelectedRam = partList.find(part => part._id === temporarySelectedBuild.ramId);
        const temporarySelectedPower = partList.find(part => part._id === temporarySelectedBuild.powerId);
        const temporarySelectedSsd = partList.find(part => part._id === temporarySelectedBuild.ssdId);
        const temporarySelectedCase = partList.find(part => part._id === temporarySelectedBuild.caseId);

        temporarySelectedRam!.partQuantity = temporarySelectedBuild.ramQuantity;
        temporarySelectedSsd!.partQuantity = temporarySelectedBuild.ssdQuantity;

        temporarySelectedSsd!.price = (fixPrice(temporarySelectedSsd!.price) * temporarySelectedSsd!.partQuantity).toString();
        temporarySelectedSsd!.price = temporarySelectedSsd!.price.replaceAll('.', ',');

        temporarySelectedRam!.price = (fixPrice(temporarySelectedRam!.price) * temporarySelectedRam!.partQuantity).toString();
        temporarySelectedRam!.price = temporarySelectedRam!.price.replaceAll('.', ',');

        let temporaryBuildPrice =
          fixPrice(temporarySelectedCpu!.price) +
          fixPrice(temporarySelectedGpu ? temporarySelectedGpu!.price : '0.0') +
          fixPrice(temporarySelectedMobo!.price) +
          fixPrice(temporarySelectedRam!.price) +
          fixPrice(temporarySelectedPower!.price) +
          fixPrice(temporarySelectedSsd!.price) +
          fixPrice(temporarySelectedCase!.price);

        setSelectedCpu(temporarySelectedCpu);
        if (temporarySelectedGpu) {
          setSelectedGpu(temporarySelectedGpu);
        }
        setSelectedMobo(temporarySelectedMobo);
        setSelectedRam(temporarySelectedRam);
        setSelectedPower(temporarySelectedPower);
        setSelectedSsd(temporarySelectedSsd);
        setSelectedCase(temporarySelectedCase);
        setTotalBuildPrice(temporaryBuildPrice);
        setUserBuildLoaded(true);
        setBuildMode('manual');
      }
    } catch (err) {
      console.log(err);
    }
  }

  function changeSlider(event: React.ChangeEvent<HTMLInputElement>) {
    setBudgetSlide(parseInt(event.target.value));
  }

  function getAutomaticPCParts() {
    try{
    let willHaveGpu = true;

    let currentAvailableBudget = budgetSlideValue * 1.05;

    if (currentAvailableBudget < 2500) {
      willHaveGpu = false;
    }

    let automaticSelectedCpuBrand: string = preferedCpuBrand;

    if (preferedCpuBrand === cpuBrands[2]) {
      automaticSelectedCpuBrand = 'AMD/Intel';
    }

    const cpuPerformanceBonus = currentAvailableBudget;

    let possibleCpus = partList.filter(part => part.type === 'cpu'
      && fixPrice(part.price) < (willHaveGpu ? currentAvailableBudget / 4 : (currentAvailableBudget < 10000 ? currentAvailableBudget / 2 : currentAvailableBudget / 1.5))
      && (!willHaveGpu ? part.cpuIgpu!.length > 3 : (currentAvailableBudget < 3500 ? part.cpuIgpu!.length <= 3 : part.type === 'cpu'))
      && automaticSelectedCpuBrand.includes(part.brand)).sort((a, b) => ((b.costBenefit / cpuPerformanceBonus) * b.cpuPerformance! * ((b.cpuCores! + b.cpuThreads!)) * (b.cpuRamType?.includes('DDR5') ? 2 : 1)) - ((a.costBenefit / cpuPerformanceBonus) * a.cpuPerformance! * ((a.cpuCores! + a.cpuThreads!)) * (a.cpuRamType?.includes('DDR5') ? 2 : 1)));

    console.log(possibleCpus);
    setSelectedCpu(possibleCpus[0]);

    currentAvailableBudget -= fixPrice(possibleCpus[0].price);

    let automaticSelectedGpuBrand: string = preferedGpuBrand;
    if (preferedGpuBrand === gpuBrands[3]) {
      automaticSelectedGpuBrand = 'NVIDIA/AMD/Intel';
    }

    let possibleGpus: Part[] | undefined;

    const gpuPerformanceBonus = currentAvailableBudget;

    if (willHaveGpu) {
      possibleGpus = partList.filter(part => part.type === 'gpu'
        && fixPrice(part.price) < (currentAvailableBudget < 10000 ? currentAvailableBudget / 2 : currentAvailableBudget / 1.25)
        && automaticSelectedGpuBrand.includes(part.brand)).sort((a, b) => ((b.costBenefit / gpuPerformanceBonus + b.gpuPerformance!) - (a.costBenefit / gpuPerformanceBonus + a.gpuPerformance!)));
      setSelectedGpu(possibleGpus[0]);
      console.log(possibleGpus);
      currentAvailableBudget -= fixPrice(possibleGpus[0].price);
    }

    let possibleMobos = partList.filter(part => part.type === 'mobo'
      && fixPrice(part.price) < currentAvailableBudget / 2.5
      && possibleCpus[0].cpuSocket === part.moboSocketCompatibility
      && possibleCpus[0].cpuRamType?.includes(part.moboRamCompatibility!)).sort((a, b) => b.costBenefit - a.costBenefit);

    setSelectedMobo(possibleMobos[0]);

    console.log(possibleMobos);

    currentAvailableBudget -= fixPrice(possibleMobos[0].price);

    let possibleRams = partList.filter(part => part.type === 'ram'
      && fixPrice(part.price) < currentAvailableBudget / 3
      && currentAvailableBudget / 3 < 500 ? part.ramCapacity! <= 8 : part.type === 'ram'
    && possibleMobos[0].moboRamCompatibility!.includes(part.ramType!)
    ).sort((a, b) => b.costBenefit - a.costBenefit);

    if (budgetSlideValue >= 2000) {
      possibleRams[0].price = (fixPrice(possibleRams[0].price) * 2).toString().replace('.', ',');
      possibleRams[0].partQuantity = 2;
    }

    setSelectedRam(possibleRams[0]);

    currentAvailableBudget -= fixPrice(possibleRams[0].price);

    let possiblePowers = partList.filter(part => part.type === 'power'
      && fixPrice(part.price) < currentAvailableBudget / 2
      && part.powerWatts! >= (possibleGpus ? possibleGpus[0].gpuRecommendedPower! : 0)
    ).sort((a, b) => b.costBenefit - a.costBenefit);

    setSelectedPower(possiblePowers[0]);

    currentAvailableBudget -= fixPrice(possiblePowers[0].price);

    let possibleSsds = partList.filter(part => part.type === 'ssd'
      && fixPrice(part.price) < currentAvailableBudget / 2
    ).sort((a, b) => (b.costBenefit * b.ssdCapacity! * b.ssdSpeed!) - (a.costBenefit * a.ssdCapacity! * a.ssdSpeed!));

    setSelectedSsd(possibleSsds[0]);

    console.log(possibleSsds);

    currentAvailableBudget -= fixPrice(possibleSsds[0].price);

    let possibleCases = partList.filter(part => part.type === 'case'
      && fixPrice(part.price) < currentAvailableBudget
    ).sort((a, b) => (b.costBenefit / currentAvailableBudget * b.caseFanSupport! * (b.caseWcSupport! / 25)) - (a.costBenefit * a.caseFanSupport!) * (b.caseWcSupport! / 25));

    setSelectedCase(possibleCases[0]);

    currentAvailableBudget -= fixPrice(possibleCases[0].price)

    let automaticBuildPrice: number =
      fixPrice(possibleCpus[0].price) +
      fixPrice(possibleGpus ? possibleGpus[0].price : '0.0') +
      fixPrice(possibleMobos[0].price) +
      fixPrice(possibleRams[0].price) +
      fixPrice(possiblePowers[0].price) +
      fixPrice(possibleSsds[0].price) +
      fixPrice(possibleCases[0].price);

    setTotalBuildPrice(automaticBuildPrice);

    setBuildMode('manual');
  }catch(err){
    alert('Não achamos nenhum PC possível com os filtros aplicados. Tente novamente!');
  }
  }


  function openModal() {
    if (allPartsSelected) {
      if (currentUser) {
        saveRef.current!.showModal();
      } else {
        navigate('/login');
      }
    }
  };

  function closeModal() {
    saveRef.current!.close();
  };


  async function saveBuild() {
    try {
      await fetch(
        buildId ?
          `http://localhost:3001/builds/update/${buildId}` :
          'http://localhost:3001/builds/post', ({
            method: buildId ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                userId: currentUser?.uid,
                cpuId: selectedCpu?._id,
                gpuId: selectedGpu?._id,
                moboId: selectedMobo?._id,
                ramId: selectedRam?._id,
                powerId: selectedPower?._id,
                ssdId: selectedSsd?._id,
                caseId: selectedCase?._id,
                ramQuantity: selectedRam?.partQuantity,
                ssdQuantity: selectedSsd?.partQuantity
              })
          }));
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  }


  //Fetch API
  useEffect(() => {
    getPartList();
  }, []);


  useEffect(() => {
    if (buildId) {
      getUserBuildPartList();
    }
  }, [partList, currentUser]);

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
    if (selectedCpu && selectedMobo && selectedRam
      && selectedPower && selectedSsd && selectedCase) {
      setAllPartsSelected(true);
    } else {
      setAllPartsSelected(false);
    }
  }, [selectedCpu, selectedGpu, selectedMobo, selectedRam,
    selectedPower, selectedSsd, selectedCase]);

  useEffect(() => {
   setBuildMode(automaticBuild ? 'automatic':'manual');
  },[automaticBuild])

  return (
    <div>
      <NavBar />
      <div className={mbStyle.mainContainer}>
        <main>
          {partList.length === 0 || buildId && !userBuildLoaded ? <Loading /> :
            <>
              <h1 className={mbStyle.pageTitle}>Montagem {automaticBuild ? 'Automática' : 'Manual'}</h1>
              {buildMode === 'automatic' ?
                <div>
                  <div className={mbStyle.automaticBuildFiltersContainer}>
                    <div className={mbStyle.automaticBuildFilterBox}>
                      <h2>Orçamento</h2>
                      <input
                        type='range'
                        className={mbStyle.budgetSlider}
                        value={budgetSlideValue}
                        onChange={(event) => changeSlider(event)}
                        min='1500'
                        max='20000'
                        step='500'
                      ></input>
                      <h3>R$ {budgetSlideValue}</h3>
                    </div>
                    <div className={mbStyle.automaticBuildFilterBox}>
                      <h2>Marca de processador preferida</h2>
                      {cpuBrands.map((cpuBrand) => <StandartButton
                        buttonLabel={cpuBrand}
                        backgroundColor={preferedCpuBrand === cpuBrand ? '#0066FF' : '#DB5510'}
                        onClick={() => setPreferedCpuBrand(cpuBrand)}
                      />)}
                      <h3>{preferedCpuBrand}</h3>
                    </div>
                    <div className={mbStyle.automaticBuildFilterBox}>
                      <h2>Marca de placa de vídeo preferida</h2>
                      {gpuBrands.map((gpuBrand) => <StandartButton
                        buttonLabel={gpuBrand}
                        backgroundColor={preferedGpuBrand === gpuBrand ? '#0066FF' : '#DB5510'}
                        onClick={() => setPreferedGpuBrand(gpuBrand)}
                      />)}
                      <h3>{preferedGpuBrand}</h3>
                    </div>
                  </div>
                  <div className={mbStyle.findPcButtonBox}>
                    <StandartButton
                      buttonLabel='Achar meu PC ideal'
                      onClick={getAutomaticPCParts}
                    />
                  </div>
                </div> :
                <>
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
                      partName='Placa de vídeo (opcional)'
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
                        onClick={openModal}>
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
                  {!currentUser ? <div></div> :
                    <dialog ref={saveRef}>
                      <div className={mbStyle.saveScreen}>
                        <div className={mbStyle.saveBox}>
                          <h1>Deseja salvar essa build?</h1>
                          <SaveBuildPart
                            partLabel='Processador'
                            selectedPart={selectedCpu!}
                          />
                          {selectedGpu ?
                            <SaveBuildPart
                              partLabel='Placa de vídeo'
                              selectedPart={selectedGpu!}
                            />
                            : <></>}
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
                            backgroundColor='green'
                          />
                          <StandartButton
                            buttonLabel='Cancelar'
                            onClick={closeModal}
                            backgroundColor='red'
                          />
                        </div>
                      </div>
                    </dialog>
                  }
                </>
              }
            </>
          }

        </main>
      </div>
    </div>
  );
};

export default ManualBuild;
