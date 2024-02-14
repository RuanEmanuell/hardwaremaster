import { useEffect, useState } from 'react';
import editIcon from './images/edit.png';
import deleteIcon from './images/delete.png';
import './App.css';
import FilterBox from './components/filter';
import SpecCircle from './components/speccircle';
import OrangeButton from './components/orangebutton';

function App() {
  //Visual interface states
  const [interfaceList, setInterfaceList] = useState(null);
  const [fullPartList, setFullPartList] = useState(null);
  const [editingPartId, setEditingPartId] = useState(null);

  //Add part type states
  const [cpuData, setCpuData] = useState(getInitialPartData('cpu'));
  const [gpuData, setGpuData] = useState(getInitialPartData('gpu'));
  const [moboData, setMoboData] = useState(getInitialPartData('mobo'));
  const [ramData, setRamData] = useState(getInitialPartData('ram'));
  const [powerData, setPowerData] = useState(getInitialPartData('power'));
  const [ssdData, setSsdData] = useState(getInitialPartData('ssd'));
  const [caseData, setCaseData] = useState(getInitialPartData('case'));

  //Filter and order states
  const [filterPart, setFilterPart] = useState('Todas as peças');
  const [isFirstFilterVisible, setFirstFilterVisible] = useState('block');
  const [isFilteringPart, setPartFilterVisibility] = useState('none');
  const [filterOrder, setFilterOrder] = useState('Relevância');
  const [isFirstOrderVisible, setFirstOrderVisible] = useState('block');
  const [isFilteringOrder, setOrderFilterVisibility] = useState('none');
  const [isSelectingType, setSelecting] = useState('none');
  const [isAdding, setAdding] = useState('none');
  const [selectedPartType, setSelectedType] = useState('cpu');

  //Showing infos on screen on page load
  useEffect(() => {
    fetchApi();
  }, []);

  //Setting inputs for add part modal based on type
  function getInitialPartData(type) {
    return {
      ...(type === 'cpu'
        ? {
          name: '',
          brand: '',
          launch: '',
          cpuSocket: '',
          cpuGeneration: '',
          cpuCores: '',
          cpuThreads: '',
          cpuFrequency: '',
          shopLink: '',
          shopLink2: '',
          shopLink3: '',
          imageLink: '',
          cpuIgpu: false,
          cpuPerformance: '',
          igpuPerformance: '',
          costBenefit: ''
        }
        : type === 'gpu' ? {
          name: '',
          brand: '',
          launch: '',
          gpuGeneration: '',
          gpuCores: '',
          gpuMemory: '',
          gpuMemoryType: '',
          gpuMemoryBus: '',
          shopLink: '',
          shopLink2: '',
          shopLink3: '',
          imageLink: '',
          gpuPerformance: '',
          costBenefit: ''
        } : type === 'mobo' ? {
          name: '',
          brand: '',
          launch: '',
          moboChipset: '',
          moboSocketCompatibility: '',
          moboRamCompatibility: '',
          moboSlots: '',
          shopLink: '',
          shopLink2: '',
          shopLink3: '',
          imageLink: '',
          costBenefit: ''
        } : type === 'ram' ? {
          name: '',
          brand: '',
          launch: '',
          ramFrequency: '',
          ramCapacity: '',
          ramType: '',
          ramLatency: '',
          shopLink: '',
          shopLink2: '',
          shopLink3: '',
          imageLink: '',
          costBenefit: ''
        } : type === 'power' ? {
          name: '',
          brand: '',
          launch: '',
          powerWatts: '',
          powerEfficiency: '',
          powerModular: '',
          shopLink: '',
          shopLink2: '',
          shopLink3: '',
          imageLink: '',
          costBenefit: ''
        } : type === 'ssd' ? {
          name: '',
          brand: '',
          launch: '',
          ssdCapacity: '',
          ssdType: '',
          ssdSpeed: '',
          shopLink: '',
          shopLink2: '',
          shopLink3: '',
          imageLink: '',
          costBenefit: ''
        } : {
          name: '',
          brand: '',
          launch: '',
          caseForm: '',
          caseFanSupport: '',
          caseWcSupport: '',
          shopLink: '',
          shopLink2: '',
          shopLink3: '',
          imageLink: '',
          costBenefit: ''
        })
    };
  }

  function clearInputs() {
    setCpuData(getInitialPartData('cpu'));
    setGpuData(getInitialPartData('gpu'));
    setMoboData(getInitialPartData('mobo'));
    setRamData(getInitialPartData('ram'));
    setPowerData(getInitialPartData('power'));
    setSsdData(getInitialPartData('ssd'));
    setCaseData(getInitialPartData('case'));
  }

  function toggleSelecting() {
    if (isSelectingType == 'none') {
      setSelecting('block');
    } else {
      setSelecting('none');
    }
  }

  //Input states controller
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const data = partTypeDataMap[selectedPartType];

    if (selectedPartType === 'cpu') {
      setCpuData({ ...cpuData, [name]: type === 'checkbox' ? checked : value });
    } else if (selectedPartType === 'gpu') {
      setGpuData({ ...gpuData, [name]: value });
    } else if (selectedPartType === 'mobo') {
      setMoboData({ ...moboData, [name]: value });
    } else if (selectedPartType === 'ram') {
      setRamData({ ...ramData, [name]: value });
    } else if (selectedPartType === 'power') {
      setPowerData({ ...powerData, [name]: value });
    } else if (selectedPartType === 'ssd') {
      setSsdData({ ...ssdData, [name]: value });
    } else if (selectedPartType === 'case') {
      setCaseData({ ...caseData, [name]: value });
    }
  };

  //Loading informations for editing part
  function editPart(index) {
    const currentPart = interfaceList[index];
    setEditingPartId(currentPart['_id']);
    showModalAddPart(currentPart['type']);
    if (currentPart['type'] === 'cpu') {
      setCpuData({ ...currentPart });
    } else if (currentPart['type'] === 'gpu') {
      setGpuData({ ...currentPart });
    } else if (currentPart['type'] === 'mobo') {
      setMoboData({ ...currentPart });
    } else if (currentPart['type'] === 'ram') {
      setRamData({ ...currentPart });
    } else if (currentPart['type'] === 'power') {
      setPowerData({ ...currentPart });
    } else if (currentPart['type'] === 'ssd') {
      setSsdData({ ...currentPart });
    } else if (currentPart['type'] === 'case') {
      setCaseData({ ...currentPart });
    }
  }

  //Showing modal form for adding or editing part
  function showModalAddPart(partType) {
    clearInputs();
    setSelectedType(partType);
    if (isAdding == 'none') {
      setAdding('block');
    } else {
      setAdding('none');
    }
  }

  //'Filter by' functions
  function changePartFilterVisibility() {
    if (isFilteringPart == 'none') {
      setPartFilterVisibility('block');
      setFirstFilterVisible('none');
    } else {
      setPartFilterVisibility('none');
      setFirstFilterVisible('block');
    }

    if (isFilteringOrder == 'block') {
      setOrderFilterVisibility('none');
      setFirstOrderVisible('block');
    }
  }

  function selectFilterPart(filterPartType) {
    setFilterPart(partFilterMenu[filterPartType]);
    let filteredList = [];
    if (filterPartType === 'all') {
      filteredList = fullPartList;
    } else {
      filteredList = fullPartList.filter(part => part.type === filterPartType);
    }
    setInterfaceList(filteredList);
    changePartFilterVisibility();
  }

  //'Order by' functions
  function changeOrderFilterVisibility() {
    if (isFilteringOrder == 'none') {
      setOrderFilterVisibility('block');
      setFirstOrderVisible('none');
    } else {
      setOrderFilterVisibility('none');
      setFirstOrderVisible('block');
    }

    if (isFilteringPart == 'block') {
      setPartFilterVisibility('none');
      setFirstFilterVisible('block');
    }
  }

  function selectFilterOrder(filterOrderType) {
    setFilterOrder(orderFilterMenu[filterOrderType]);
    let filteredList = [...interfaceList];
    if (filterOrderType == 'price') {
      filteredList = interfaceList.sort((a, b) => parseFloat(a.price.replaceAll('.', '')) - parseFloat(b.price.replaceAll('.', '')));
    } else if (filterOrderType == 'price2') {
      filteredList = interfaceList.sort((a, b) => parseFloat(b.price.replaceAll('.', '')) - parseFloat(a.price.replaceAll('.', '')));
    } else if (filterOrderType == 'costBenefit') {
      filteredList = interfaceList.sort((a, b) => b.costBenefit - a.costBenefit);
    } else if (filterOrderType == 'title') {
      filteredList = interfaceList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterOrderType == 'title2') {
      filteredList = interfaceList.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filterOrderType == 'relevance') {
      filteredList = interfaceList.sort((a, b) => a._id.localeCompare(b._id));
    }
    setInterfaceList(filteredList)
    changeOrderFilterVisibility();
  }

  //Visual objects for maping and creating dynamic components
  const partTypeDataMap = {
    cpu: cpuData,
    gpu: gpuData,
    mobo: moboData,
    ram: ramData,
    power: powerData,
    ssd: ssdData,
    case: caseData
  }

  const partFilterMenu = {
    all: 'Todas as peças',
    cpu: 'Processadores',
    gpu: 'Placas de vídeo',
    mobo: 'Placas-Mãe',
    ram: 'Memórias RAM',
    power: 'Fontes',
    ssd: 'SSDs',
    case: 'Gabinetes'
  }

  const orderFilterMenu = {
    relevance: 'Relevância',
    price: 'Menor preço',
    price2: 'Maior preço',
    costBenefit: 'Custo benefício',
    title: 'Nome (A-Z)',
    title2: 'Nome (Z-A)'
  }

  ///////////////////////CRUD functions/////////////////////////////////////////
  async function fetchApi() {
    try {
      const response = await fetch('http://localhost:3001/list');
      const data = await response.json();
      setFullPartList(data);
      setInterfaceList(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function createOrEditPart() {
    const dataToSend = { type: selectedPartType, ...partTypeDataMap[selectedPartType] };

    try {
      const response = await fetch(editingPartId ? `http://localhost:3001/update/${editingPartId}` : 'http://localhost:3001/post', {
        method: editingPartId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      clearInputs();
      setEditingPartId(null);
      fetchApi();
      showModalAddPart();
      if (isSelectingType == 'block') {
        toggleSelecting();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deletePart(id) {
    try {
      await fetch(`http://localhost:3001/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      clearInputs();
      fetchApi();
    } catch (err) {
      console.log(err);
    }
  }

  async function updatePrice(id) {
    try {
      const response = await fetch(`http://localhost:3001/currentprice/${id}`);
      const data = await response.json();
      const newPrice = data['preço'];

      await fetch(`http://localhost:3001/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: newPrice }),
      });

      fetchApi();
    } catch (error) {
      console.log(error);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="mainContainer">
      <div className="gridSpacer"></div>
      <main>
        <h1 className="mainTitle">{filterPart}</h1>
        <div className="partFilters">
          <div className="gridSpacer"></div>
          <FilterBox firstFilterLabel='Filtrar por'
            onClick={changePartFilterVisibility}
            firstFilterDisplayCondition={isFirstFilterVisible}
            currentFilter={filterPart}
            isFiltering={isFilteringPart}
            filterMenu={partFilterMenu}
            selectFilter={selectFilterPart}
          />
          <FilterBox firstFilterLabel='Ordenar por'
            onClick={changeOrderFilterVisibility}
            firstFilterDisplayCondition={isFirstOrderVisible}
            currentFilter={filterOrder}
            isFiltering={isFilteringOrder}
            filterMenu={orderFilterMenu}
            selectFilter={selectFilterOrder}
          />
        </div>
        <div className="partList">
          {interfaceList ? (
            <>
              {interfaceList.map((part, index) => (
                <div key={part.id} className="partInfo">
                  <div className="partImage">
                    <img src={part['imageLink']} alt={part['name']} />
                  </div>
                  <div className="partSpecs">
                    <h1>{part['name']}</h1>
                    <p>Marca: {part['brand']}</p>
                    {part['type'] === 'cpu' ? (
                      <>
                        <p>Lançamento: {part['launch']}</p>
                        <p>Socket: {part['cpuSocket']}</p>
                        <p>Geração: {part['cpuGeneration']}</p>
                        <p>Núcleos: {part['cpuCores']}</p>
                        <p>Threads: {part['cpuThreads']}</p>
                        <p>Frequência: {part['cpuFrequency']}GHZ</p>
                        <p>Preço: R$ {part['price']}</p>
                        <p>Tem integrada: {part['cpuIgpu'] ? 'Sim' : 'Não'}</p>
                        <SpecCircle performanceLabel='Performance:' performanceRating={part['cpuPerformance']} />
                        <SpecCircle performanceLabel='Integrada (iGPU):' performanceRating={part['igpuPerformance']} />
                      </>
                    ) : part['type'] === 'gpu' ? (
                      <>
                        <p>Lançamento: {part['launch']}</p>
                        <p>Geração: {part['gpuGeneration']}</p>
                        <p>Núcleos: {part['gpuCores']}</p>
                        <p>Memória: {part['gpuMemory']}GB</p>
                        <p>Tipo de memória: {part['gpuMemoryType']}</p>
                        <p>Interface da memória: {part['gpuMemoryBus']} bits</p>
                        <p>Preço: R$ {part['price']}</p>
                        <SpecCircle performanceLabel='Performance:' performanceRating={part['gpuPerformance']} />
                      </>
                    ) : part['type'] === 'mobo' ? (
                      <>
                        <p>Chipset: {part['moboChipset']}</p>
                        <p>Socket compatível: {part['moboSocketCompatibility']}</p>
                        <p>Tipo de RAM compatível: {part['moboRamCompatibility']}</p>
                        <p>Slots de RAM: {part['moboSlots']}</p>
                        <p>Preço: R$ {part['price']}</p>
                      </>
                    ) : part['type'] === 'ram' ? (
                      <>
                        <p>Frequência: {part['ramFrequency']}MHZ</p>
                        <p>Capacidade: {part['ramCapacity']}GB</p>
                        <p>Tipo da memória: {part['ramType']}</p>
                        <p>Latência: {part['ramLatency']}</p>
                        <p>Preço: R$ {part['price']}</p>
                      </>
                    ) : part['type'] === 'power' ? (
                      <>
                        <p>Watts: {part['powerWatts']}W</p>
                        <p>Efficiência: {part['powerEfficiency']}</p>
                        <p>Modular: {part['powerModular']}</p>
                        <p>Preço: R$ {part['price']}</p>
                      </>
                    ) : part['type'] === 'ssd' ? (
                      <>
                        <p>Capacidade: {part['ssdCapacity']}GB</p>
                        <p>Tipo do SSD: {part['ssdType']}</p>
                        <p>Velocidade (Leitura): {part['ssdSpeed']}MB/s</p>
                        <p>Preço: R$ {part['price']}</p>
                      </>
                    ) : part['type'] === 'case' ? (
                      <>
                        <p>Formato do Gabinete: {part['caseForm']}</p>
                        <p>Suporte a fans: {part['caseFanSupport']}</p>
                        <p>Suporte a Water Cooler: {part['caseWcSupport']}</p>
                        <p>Preço: R$ {part['price']}</p>
                      </>
                    ) : null}
                    <SpecCircle performanceLabel='Custo x Benefício:' performanceRating={part['costBenefit']} />
                    <div className="editDeleteButtons">
                      <button onClick={() => editPart(index)} className="editButton"><img src={editIcon} alt="Edit Icon" /></button>
                      <button onClick={() => deletePart(part['_id'])} className="deleteButton"><img src={deleteIcon} alt="Delete Icon" /></button>
                    </div>
                    <OrangeButton onClick={() => updatePrice(part['_id'])} buttonLabel='Atualizar preço' />
                  </div>
                </div>
              ))}
            </>
          ) : <></>}
          <br></br>
          <div className="choosePartType" style={{ display: isSelectingType }}>
            {Object.keys(partTypeDataMap).map((addPart, index) => (
              <h3 key={index} className="partType" onClick={() => showModalAddPart(addPart)}>
                {addPart}
              </h3>
            ))}
          </div>
          <button className="addPart" onClick={toggleSelecting}><h1>+</h1></button>
        </div>
        <div style={{ display: isAdding }} className="addPartContainer">
          {selectedPartType ?
            <div className="addPartModal">
              <div className="addPartImg">
                <div className="addPartImgBox">
                  <img src={
                    partTypeDataMap[selectedPartType]['imageLink']}></img>
                </div>
              </div>
              <div className="addPartInputs">
                {Object.keys(partTypeDataMap[selectedPartType]).map((key) =>
                  key != '_id' && key != 'type' && key != '__v' ?
                    <>
                      <label className="inputLabel">{key}:</label>
                      <input
                        type={key == 'cpuIgpu' ? 'checkbox' : 'text'}
                        placeholder={key}
                        key={key}
                        name={key}
                        onChange={(event) => handleChange(event)}
                        checked={partTypeDataMap[selectedPartType][key]}
                        value={partTypeDataMap[selectedPartType][key]}></input> </> : <></>)}
              </div>
              <div className="saveButtonContainer">
                <OrangeButton onClick={() => createOrEditPart()} buttonLabel='Salvar' />
              </div>
            </div> : <></>}
        </div>
      </main>
      <div className="gridSpacer"></div>
    </div>
  );
}


export default App;
