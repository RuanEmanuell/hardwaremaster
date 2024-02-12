import { useEffect, useState } from 'react';
import editIcon from './images/edit.png';
import deleteIcon from './images/delete.png';
import './App.css';
import SpecCircle from './components/speccircle';
import OrangeButton from './components/orangebutton';

function App() {
  const [fullList, setFullList] = useState(null);
  const [editingPartId, setEditingPartId] = useState(null);
  const [cpuData, setCpuData] = useState(getInitialPartData('cpu'));
  const [gpuData, setGpuData] = useState(getInitialPartData('gpu'));
  const [isSelectingType, setSelecting] = useState('none');
  const [isAdding, setAdding] = useState('none');
  const [selectedPartType, setSelectedType] = useState('cpu');

  useEffect(() => {
    fetchApi();
  }, []);

  function getInitialPartData(type) {
    return {
      ...(type === 'cpu'
        ? {
          name: '',
          brand: '',
          launch: '',
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
          costBenefit: '',
        }
        : {
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
          costBenefit: '',
        }),
    };
  }

  function clearInputs() {
    setCpuData(getInitialPartData('cpu'));
    setGpuData(getInitialPartData('gpu'));
  }

  function toggleSelecting() {
    setSelecting((prevState) => (prevState === 'none' ? 'block' : 'none'));
  }

  async function fetchApi() {
    try {
      const response = await fetch('http://localhost:3001/list');
      const data = await response.json();
      setFullList(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function createOrEditPart() {
    const isCpu = selectedPartType === 'cpu';
    const dataToSend = isCpu ? { type: selectedPartType, ...cpuData, price: 0 } : { type: selectedPartType, ...gpuData, price: 0 };

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

  function editPart(index) {
    const currentPart = fullList[index];
    setEditingPartId(currentPart['_id']);
    showModalAddPart(currentPart['type']);
    if (currentPart['type'] === 'cpu') {
      setCpuData({ ...currentPart });
    } else if (currentPart['type'] === 'gpu') {
      setGpuData({ ...currentPart });
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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const data = selectedPartType === 'cpu' ? cpuData : gpuData;

    if (selectedPartType === 'cpu') {
      setCpuData({ ...data, [name]: type === 'checkbox' ? checked : value });
    } else if (selectedPartType === 'gpu') {
      setGpuData({ ...data, [name]: type === 'checkbox' ? checked : value });
    }
  };

  function showModalAddPart(partType) {
    clearInputs();
    setSelectedType(partType);
    setAdding((prevState) => (prevState === 'none' ? 'block' : 'none'));
  }

  const partTypeDataMap = {
    cpu: cpuData,
    gpu: gpuData,
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
                    <p>Lançamento: {part['launch']}</p>
                    <p>Geração: {part['cpuGeneration']}</p>
                    <p>Núcleos: {part['cpuCores']}</p>
                    <p>Threads: {part['cpuThreads']}</p>
                    <p>Frequência: {part['cpuFrequency']}GHZ</p>
                    <p>Preço: R$ {part['price']}</p>
                    <p>Tem integrada: {part['cpuIgpu'] ? 'Sim' : 'Não'}</p>
                    <SpecCircle performanceLabel='Performance:' performanceRating={part['cpuPerformance']} />
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
                      <p>Lançamento: {part['launch']}</p>
                      <p>Geração: {part['gpuGeneration']}</p>
                      <p>Núcleos: {part['gpuCores']}</p>
                      <p>Memória: {part['gpuMemory']}GB</p>
                      <p>Tipo de memória: {part['gpuMemoryType']}</p>
                      <p>Interface da memória: {part['gpuMemoryBus']}</p>
                      <p>Preço: R$ {part['price']}</p>
                      <br></br>
                      <SpecCircle performanceLabel='Performance:' performanceRating={part['gpuPerformance']} />
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
            <h3 className="partType" onClick={() => showModalAddPart('cpu')}>CPU</h3>
            <h3 className="partType" onClick={() => showModalAddPart('gpu')}>GPU</h3>
            <h3 className="partType" onClick={() => showModalAddPart('mobo')}>MOBO</h3>
            <h3 className="partType" onClick={() => showModalAddPart('ram')}>RAM</h3>
            <h3 className="partType" onClick={() => showModalAddPart('power')}>FONTE</h3>
            <h3 className="partType" onClick={() => showModalAddPart('ssd')}>SSD</h3>
            <h3 className="partType" onClick={() => showModalAddPart('case')}>GABINETE</h3>
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
      </div>
      <div></div>
    </div>
  );
}

export default App;
