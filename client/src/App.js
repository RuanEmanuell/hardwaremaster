import { useEffect, useState } from 'react';
import editIcon from './images/edit.png';
import deleteIcon from './images/delete.png';
import './App.css';
import SpecCircle from './components/speccircle';
import OrangeButton from './components/orangebutton';

function App() {
  const [fullList, setFullList] = useState(null);
  const [editingPartId, setEditingPartId] = useState(null);
  const [cpuData, setCpuData] = useState({
    cpuName: '',
    cpuBrand: '',
    cpuLaunch: '',
    cpuGeneration: '',
    cpuCores: '',
    cpuThreads: '',
    cpuFrequency: '',
    cpuPrice: '',
    cpuLink: '',
    cpuLink2: '',
    cpuLink3: '',
    cpuImage: '',
    cpuIgpu: false,
    cpuPerformance: '',
    igpuPerformance: '',
    costBenefit: '',
  });
  const [gpuData, setGpuData] = useState({
    gpuName: '',
    gpuBrand: '',
    gpuLaunch: '',
    gpuGeneration: '',
    gpuCores: '',
    gpuMemory: '',
    gpuMemoryType: '',
    gpuMemoryBus: '',
    shopLink: '',
    shopLink2: '',
    shopLink3: '',
    gpuImage: '',
    gpuPrice: '',
    gpuPerformance: '',
    costBenefit: '',
  });
  const [isSelectingType, setSelecting] = useState('none');
  const [isAdding, setAdding] = useState('none');

  useEffect(() => {
    fetchApi();
  }, []);

  function clearInputs() {
    setCpuData({
      ...cpuData,
      cpuName: '',
      cpuBrand: '',
      cpuLaunch: '',
      cpuGeneration: '',
      cpuCores: '',
      cpuThreads: '',
      cpuFrequency: '',
      cpuIgpu: false,
      cpuPrice: '',
      cpuPerformance: '',
      igpuPerformance: '',
      costBenefit: '',
      cpuLink: '',
      cpuLink2: '',
      cpuLink3: '',
      cpuImage: '',
    });
    setGpuData({
      ...gpuData,
      gpuName: '',
      gpuBrand: '',
      gpuLaunch: '',
      gpuGeneration: '',
      gpuCores: '',
      gpuMemory: '',
      gpuMemoryType: '',
      gpuMemoryBus: '',
      shopLink: '',
      shopLink2: '',
      shopLink3: '',
      gpuImage: '',
      gpuPrice: '',
      gpuPerformance: '',
      costBenefit: ''
    })
  }

  function selectingPartType() {
    if (isSelectingType == 'none') {
      setSelecting('block');
    } else {
      setSelecting('none');
    }
  }

  async function fetchApi() {
    try {
      const response = await fetch('http://localhost:3001/teste');
      const data = await response.json();
      setFullList(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function createOrEditPart(partType) {
    const isCpu = partType === 'cpu';
    const dataToSend = isCpu ? {
      type: partType,
      ...cpuData
    } : {
      type: partType,
      ...gpuData
    };
  
    if (editingPartId) {
      try {
        const response = await fetch(`http://localhost:3001/update/${editingPartId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });
        clearInputs();
        setEditingPartId(null);
        fetchApi();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch('http://localhost:3001/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        });
        clearInputs();
        fetchApi();
      } catch (err) {
        console.log(err);
      }
    }
  }
  
  async function editPart(index, partType) {
    setAdding(true);
    let currentPart = fullList[index];
    setEditingPartId(currentPart['_id']);
  
    if (partType === 'cpu') {
      setCpuData({ ...currentPart });
    } else if (partType === 'gpu') {
      setGpuData({ ...currentPart });
    }
  }

  async function deletePart(id) {
    try {
      const response = await fetch(`http://localhost:3001/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      clearInputs();
      fetchApi();
    } catch (err) {
      console.log(err);
    }
  }

  async function updatePrice(id) {
    let newPrice = '';
    const response = await fetch(`http://localhost:3001/currentprice/${id}`);
    const data = await response.json();
    newPrice = data['preço'];
    try {
      const response = await fetch(`http://localhost:3001/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: newPrice })
      })
      fetchApi();
    } catch (error) {

    }
  }

  const HandleChange = (event, partType) => {
    const { name, value, type, checked } = event.target;
    
    if (partType === 'cpu') {
      setCpuData({
        ...cpuData,
        [name]: type === 'checkbox' ? checked : value,
      });
    } else if (partType === 'gpu') {
      setGpuData({
        ...gpuData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  function showModalAddPart(partType) {
    clearInputs();
    selectingPartType();
    if (isAdding == 'none') {
      setAdding('block');
    } else {
      setAdding('none');
    }
  }

  return (
    <div className="mainContainer">
      <div></div>
      <div>
        <h1 className="mainTitle">Todas as peças</h1>
        <div className="cpuList">
          {fullList ? <>
            {fullList.map((part, index) =>
              part['type'] == 'cpu' ?
                <div key={part.id} className="partInfo">
                  <div className="partImage">
                    <img src={part['imageLink']}></img>
                  </div>
                  <div className="partSpecs">
                    <h1>{part['name']}</h1>
                    <p>Marca: {part['brand']}</p>
                    <p>Lançamento: {part['launchDate']}</p>
                    <p>Geração: {part['generation']}</p>
                    <p>Núcleos: {part['cores']}</p>
                    <p>Threads: {part['threads']}</p>
                    <p>Frequência: {part['frequency']}GHZ</p>
                    <p>Preço: R$ {part['price']}</p>
                    <p>Tem integrada: {part['igpu'] ? 'Sim' : 'Não'}</p>
                    <SpecCircle performanceLabel='Performance:' performanceRating={part['performance']} />
                    <SpecCircle performanceLabel='Integrada (iGPU):' performanceRating={part['igpuPerformance']} />
                    <SpecCircle performanceLabel='Custo x Benefício:' performanceRating={part['costBenefit']} />
                    <div className="editDeleteButtons">
                      <button onClick={() => editPart(index)} className="editButton"><img src={editIcon}></img></button>
                      <button onClick={() => deletePart(part['_id'])} className="deleteButton"><img src={deleteIcon}></img></button>
                    </div>
                    <OrangeButton onClick={() => updatePrice(part['_id'])} buttonLabel='Atualizar preço' />
                  </div>
                </div> : part['type'] == 'gpu' ?
                  <div key={part.id} className="partInfo">
                    <div className="partImage">
                      <img src={part['imageLink']}></img>
                    </div>
                    <div className="partSpecs">
                      <h1>{part['name']}</h1>
                      <p>Marca: {part['brand']}</p>
                      <p>Lançamento: {part['launchDate']}</p>
                      <p>Geração: {part['generation']}</p>
                      <p>Núcleos: {part['cores']}</p>
                      <p>Memória: {part['memory']}GB</p>
                      <p>Tipo de memória: {part['memoryType']}</p>
                      <p>Interface da memória: {part['memoryBus']}</p>
                      <p>Preço: R$ {part['price']}</p>
                      <br></br>
                      <SpecCircle performanceLabel='Performance:' performanceRating={part['performance']} />
                      <SpecCircle performanceLabel='Custo x Benefício:' performanceRating={part['costBenefit']} />
                      <br></br>
                      <div className="editDeleteButtons">
                        <button onClick={() => editPart(index)} className="editButton"><img src={editIcon}></img></button>
                        <button onClick={() => deletePart(part['_id'])} className="deleteButton"><img src={deleteIcon}></img></button>
                      </div>
                      <OrangeButton onClick={() => updatePrice(part['_id'])} buttonLabel='Atualizar preço' />
                    </div>
                  </div> :
                  <></>
            )}
          </> : <></>}
          <br></br>
          <div className="choosePartType" style={{ display: isSelectingType }}>
            <h3 className="partType" onClick={() =>showModalAddPart('cpu')}>CPU</h3>
            <h3 className="partType" onClick={() =>showModalAddPart('gpu')}>GPU</h3>
            <h3 className="partType" onClick={() =>showModalAddPart('mobo')}>MOBO</h3>
            <h3 className="partType" onClick={() =>showModalAddPart('ram')}>RAM</h3>
            <h3 className="partType" onClick={() =>showModalAddPart('power')}>FONTE</h3>
            <h3 className="partType" onClick={() =>showModalAddPart('ssd')}>SSD</h3>
            <h3 className="partType" onClick={() =>showModalAddPart('case')}>GABINETE</h3>
          </div>
          <button className="addPart" onClick={selectingPartType}><h1>+</h1></button>
        </div>
        <div style={{display: isAdding}} className="addPartContainer">
            <div className="addPartModal">
              <div className="addPartImageAndOtherInfo">
                <div className="addPartImage"></div>
              </div>
              <div></div>
            </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
