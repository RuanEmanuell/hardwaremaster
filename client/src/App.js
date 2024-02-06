import { useEffect, useState } from 'react';
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
    cpuPerfomance: '',
    cpuPrice: '',
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
          perfomance: formData.cpuPerfomance,
          price: formData.cpuPrice,
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
    <div>
      {cpuList ? <>
        {cpuList.map((cpu) =>
        <div key={cpu.id}>
          <h1>{cpu['name']}</h1>
          <h2>R$ {cpu['price']}</h2>
          <img src={cpu['imageLink']} width={100}></img>
          <button onClick={()=>editCpu(cpu['_id'])}>Editar</button>
          <button onClick={()=>deleteCpu(cpu['_id'])}>Deletar</button>
          <button onClick={()=>updatePrice(cpu['_id'])}>Atualizar preço</button>
          </div>
        )}
      </> : <></>}
      <br></br>
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
  );
}

export default App;
