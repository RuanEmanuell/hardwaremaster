import { useEffect, useState } from 'react';
import editIcon from './images/edit.png';
import deleteIcon from './images/delete.png';
import './App.css';

function App() {
  const [cpuList, setCpuList] = useState(null);
  const [formData, setFormData] = useState({
    cpuName: '',
    cpuBrand: '',
    cpuLaunch: '',
    cpuGeneration: '',
    cpuCores: '',
    cpuThreads: '',
    cpuFrequency: '',
    cpuIgpu: '',
    cpuPrice: '',
    cpuPerformance: '',
    igpuPerformance:'',
    costBenefit:'',
    cpuLink: '',
    cpuLink2: '',
    cpuLink3: '',
    cpuImage: '',
  });

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

  async function createCpu() {
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
        cpuIgpu: '',
        cpuPrice: '',
        cpuPerformance: '',
        igpuPerformance:'',
        costBenefit:'',
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

  async function editCpu(id) {
    try {
      const response = await fetch(`http://localhost:3001/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'teste', brand: 'AMD', launchDate: '2019', generation: '3000', preço: '0' })
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
        cpuIgpu: '',
        cpuPrice: '',
        cpuPerformance: '',
        igpuPerformance:'',
        costBenefit:'',
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
        cpuPerfomance: '',
        cpuPrice: '',
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

  async function updatePrice(id){
    let newPrice = '';
    const response = await fetch(`http://localhost:3001/currentprice/${id}`);
    const data = await response.json();
    newPrice = data['preço'];
    try {
      const response = await fetch(`http://localhost:3001/update/${id}`, {
        method: 'PUT',
        headers:{'Content-Type':  'application/json'},
        body:JSON.stringify({price: newPrice})
      })
      fetchApi();
    } catch (error) {
      
    }
  }



  const HandleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  return (
    <div className="mainContainer">
    <div></div>
    <div>
      {cpuList ? <>
        {cpuList.map((cpu) =>
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
          <p>Integrada: {cpu['igpu'] ? 'Sim' : 'Não'}</p>
          <div className="dualSpecBox">
          <p>Performance: </p> <div className="specCircle">{cpu['performance']}</div>
          </div>
          <div className="dualSpecBox">
          <p>Performance(iGPU): </p> <div className="specCircle">{cpu['performance']}</div>
          </div>
          <div className="dualSpecBox">
          <p>CxB: </p> <div className="specCircle">{cpu['costBenefit']}</div>
          </div>
          <div className="editDeleteButtons">
          <button onClick={()=>editCpu(cpu['_id'])} className="editButton"><img src={editIcon}></img></button>
          <button onClick={()=>deleteCpu(cpu['_id'])} className="deleteButton"><img src={deleteIcon}></img></button>
          </div>
          <button onClick={()=>updatePrice(cpu['_id'])} className="updatePriceButton">Atualizar preço</button>
          </div>
          </div>
        )}
      </> : <></>}
      <br></br>
      <div style={{display: 'none'}}>
      {Object.keys(formData).map((fieldName) => (
        <input
          key={fieldName}
          value={formData[fieldName]}
          onChange={HandleChange}
          placeholder={fieldName}
          name={fieldName}
        />
      ))}
      <button onClick={createCpu}>Postar dados</button>
      </div>
      <button className="addCpu"><h1>+</h1></button>
    </div>
    <div></div>
    </div>
  );
}

export default App;
