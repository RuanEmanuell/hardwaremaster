import { useEffect, useState } from 'react';
import editIcon from './images/edit.png';
import deleteIcon from './images/delete.png';
import './App.css';
import SpecCircle from './components/speccircle';
import OrangeButton from './components/orangebutton';
import PerformanceBox from './components/performancebox';

function App() {
  const [fullList, setFullList] = useState(null);
  const [editingCpuId, setEditingCpuId] = useState(null);
  const [formData, setFormData] = useState({
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
  const [isSelectingType, setSelecting] = useState('none');
  const [isAdding, setAdding] = useState('none');

  useEffect(() => {
    fetchApi();
  }, []);

  function clearInputs(){
    setFormData({
      ...formData,
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
  }

  function selectingPartType(){
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

  async function createOrEditCpu() {
    if (editingCpuId) {
      try {
        const response = await fetch(`http://localhost:3001/update/${editingCpuId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'cpu',
            name: formData.cpuName,
            brand: formData.cpuBrand,
            launchDate: formData.cpuLaunch,
            generation: formData.cpuGeneration,
            cores: formData.cpuCores,
            threads: formData.cpuThreads,
            frequency: formData.cpuFrequency,
            price: formData.cpuPrice,
            igpu: formData.cpuIgpu,
            performance: formData.cpuPerformance,
            igpuPerformance: formData.igpuPerformance,
            costBenefit: formData.costBenefit,
            shopLink: formData.cpuLink,
            shopLink2: formData.cpuLink2,
            shopLink3: formData.cpuLink3,
            imageLink: formData.cpuImage,
          }),
        });
        clearInputs();
        setEditingCpuId(null);
        fetchApi();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch('http://localhost:3001/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'cpu',
            name: formData.cpuName,
            brand: formData.cpuBrand,
            launchDate: formData.cpuLaunch,
            generation: formData.cpuGeneration,
            cores: formData.cpuCores,
            threads: formData.cpuThreads,
            frequency: formData.cpuFrequency,
            price: formData.cpuPrice,
            igpu: formData.cpuIgpu,
            performance: formData.cpuPerformance,
            igpuPerformance: formData.igpuPerformance,
            costBenefit: formData.costBenefit,
            shopLink: formData.cpuLink,
            shopLink2: formData.cpuLink2,
            shopLink3: formData.cpuLink3,
            imageLink: formData.cpuImage,
          }),
        });
        clearInputs();
        fetchApi();
      } catch (err) {
        console.log(err);
      }
    }
    showModalAddCpu();
  }

  async function editCpu(index) {
    setAdding(true);
    let currentCPU = fullList[index];
    setEditingCpuId(currentCPU['_id']);
    setFormData({
      ...formData,
      cpuName: currentCPU['name'],
      cpuBrand: currentCPU['brand'],
      cpuLaunch: currentCPU['launchDate'],
      cpuGeneration: currentCPU['generation'],
      cpuCores: currentCPU['cores'],
      cpuThreads: currentCPU['threads'],
      cpuFrequency: currentCPU['frequency'],
      cpuPrice: currentCPU['price'],
      cpuLink: currentCPU['shopLink'],
      cpuLink2: currentCPU['shopLink2'],
      cpuLink3: currentCPU['shopLink3'],
      cpuImage: currentCPU['imageLink'],
      cpuIgpu: currentCPU['igpu'],
      cpuPerformance: currentCPU['performance'],
      igpuPerformance: currentCPU['igpuPerformance'],
      costBenefit: currentCPU['costBenefit'],
    });
  }

  async function deleteCpu(id) {
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

  const HandleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  function showModalAddCpu() {
    clearInputs();
    if (isAdding == 'none') {
      setAdding('block');
    } else {
      setAdding('none');
    }
  }


  let inputPlaceholders =
    ['Nome', 'Marca', 'Lançamento', 'Geração', 'Núcleos', 'Threads', 'Frequência', 'Preço', 'Link de loja', 'Link de loja 2', 'Link de loja 3', 'Link da Imagem']

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
                  <button onClick={() => editCpu(index)} className="editButton"><img src={editIcon}></img></button>
                  <button onClick={() => deleteCpu(part['_id'])} className="deleteButton"><img src={deleteIcon}></img></button>
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
                <SpecCircle performanceLabel='Performance:' performanceRating={part['performance']}/>
                <SpecCircle performanceLabel='Custo x Benefício:' performanceRating={part['costBenefit']} />
                <br></br>
                <div className="editDeleteButtons">
                  <button onClick={() => editCpu(index)} className="editButton"><img src={editIcon}></img></button>
                  <button onClick={() => deleteCpu(part['_id'])} className="deleteButton"><img src={deleteIcon}></img></button>
                </div>
                <OrangeButton onClick={() => updatePrice(part['_id'])} buttonLabel='Atualizar preço' />
              </div>
            </div> :
            <></>
          )}
        </> : <></>}
        <br></br>
        <div className="choosePartType" style={{ display: isSelectingType }}>
          <h3 className="partType">CPU</h3>
          <h3 className="partType">GPU</h3>
          <h3 className="partType">MOBO</h3>
          <h3 className="partType">RAM</h3>
          <h3 className="partType">POWER</h3>
          <h3 className="partType">SSD</h3>
          <h3 className="partType">CASE</h3>
        </div>
        <button className="addCpu" onClick={selectingPartType}><h1>+</h1></button>
      </div>
      </div>
      <div style={{ display: isAdding }} className="addCpuScreen">
        <div className="addCpuArea">
          <button className="addCpu closeAddScreen" onClick={showModalAddCpu}><h1>X</h1></button>
          <div className="imageAndPerformanceArea">
            <div className="cpuImage addCpuImage">
              <img src={formData.cpuImage}></img>
            </div>
            <div className="cpuImage cpuOtherInformation">
              <div className="cpuIgpu">
                <h3>Integrada:</h3>
                <input
                  type="checkbox"
                  checked={formData.cpuIgpu}
                  onChange={HandleChange}
                  name="cpuIgpu"
                  className="igpuCheckbox"
                />
              </div>
              <PerformanceBox 
              label = 'Performance: '
              value = {formData.cpuPerformance} 
              onChange = {HandleChange} 
              name = 'cpuPerformance'/>
              <PerformanceBox 
              label = 'Integrada (iGPU): '
              value = {formData.igpuPerformance} 
              onChange = {HandleChange} 
              name = 'igpuPerformance'/>
              <PerformanceBox 
              label = 'Custo X Benefício: '
              value = {formData.costBenefit} 
              onChange = {HandleChange} 
              name = 'costBenefit'/>
            </div>
          </div>
          <div className="addInputBox">
            <div className="addInputArea">
              {Object.keys(formData).map((fieldName, index) => (
                fieldName != 'cpuIgpu' && fieldName != 'igpuPerformance' &&
                  fieldName != 'cpuPerformance' && fieldName != 'costBenefit'
                  ?
                  <input
                    key={fieldName}
                    value={formData[fieldName]}
                    onChange={HandleChange}
                    placeholder={inputPlaceholders[index]}
                    name={fieldName}
                    className="addInput"
                  />
                  : <></>
              ))}
              <OrangeButton onClick={createOrEditCpu} buttonLabel='Salvar'/>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
