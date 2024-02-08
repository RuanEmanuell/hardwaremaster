import { useEffect, useState } from 'react';
import editIcon from './images/edit.png';
import deleteIcon from './images/delete.png';
import './App.css';
import SpecCircle from './components/speccircle';
import OrangeButton from './components/orangebutton';

function App() {
  const [cpuList, setCpuList] = useState(null);
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
  const [isAdding, setAdding] = useState('none');

  useEffect(() => {
    fetchApi();
  }, []);

  async function fetchApi() {
    try {
      const response = await fetch('http://localhost:3001/teste');
      const data = await response.json();
      setCpuList(data);
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
        fetchApi();
      } catch (err) {
        console.log(err);
      }
    }
    showModalAddCpu();
  }

  async function editCpu(index) {
    setAdding(true);
    let currentCPU = cpuList[index];
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
      <div className="cpuList">
        {cpuList ? <>
          {cpuList.map((cpu, index) =>
            <div key={cpu.id} className="cpuInfo">
              <div className="cpuImage">
                <img src={cpu['imageLink']}></img>
              </div>
              <div className="cpuSpecs">
                <h1>{cpu['name']}</h1>
                <p>Marca: {cpu['brand']}</p>
                <p>Lançamento: {cpu['launchDate']}</p>
                <p>Geração: {cpu['generation']}</p>
                <p>Núcleos: {cpu['cores']}</p>
                <p>Threads: {cpu['threads']}</p>
                <p>Frequência: {cpu['frequency']}GHZ</p>
                <p>Preço: R$ {cpu['price']}</p>
                <p>Tem integrada: {cpu['igpu'] ? 'Sim' : 'Não'}</p>
                <SpecCircle performanceLabel='Performance:' performanceRating={cpu['performance']} />
                <SpecCircle performanceLabel='Integrada (iGPU):' performanceRating={cpu['igpuPerformance']} />
                <SpecCircle performanceLabel='Custo x Benefício:' performanceRating={cpu['costBenefit']} />
                <div className="editDeleteButtons">
                  <button onClick={() => editCpu(index)} className="editButton"><img src={editIcon}></img></button>
                  <button onClick={() => deleteCpu(cpu['_id'])} className="deleteButton"><img src={deleteIcon}></img></button>
                </div>
                <OrangeButton onClick={() => updatePrice(cpu['_id'])} buttonLabel='Atualizar preço' />
              </div>
            </div>
          )}
        </> : <></>}
        <br></br>
        <button className="addCpu" onClick={showModalAddCpu}><h1>+</h1></button>
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
              <div
                className="performanceBox">
                <h3>Performance:</h3>
                <input
                  value={formData.cpuPerformance}
                  onChange={HandleChange}
                  name='cpuPerformance'
                  className="performanceInput"></input>
              </div>
              <div className="performanceBox">
                <h3>Performance (iGPU):</h3>
                <input
                  value={formData.igpuPerformance}
                  onChange={HandleChange}
                  name='igpuPerformance'
                  className="performanceInput"></input>
              </div>
              <div className="performanceBox">
                <h3>CxB:</h3>
                <input
                  value={formData.costBenefit}
                  onChange={HandleChange}
                  name='costBenefit'
                  className="performanceInput"></input>
              </div>
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
