import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [cpuList, setCpuList] = useState(null);
  const [cpuName, setCpuName] = useState('');

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
        body: JSON.stringify({ name: cpuName, brand: 'AMD', launchDate: '2019', generation: '3000', price: '0', shopLink:'https://www.kabum.com.br/produto/333145/processador-amd-ryzen-5-4600g-3-7ghz-4-2ghz-max-turbo-cache-11mb-am4-video-integrado-100-100000147box?gad_source=1', imageLink: 'https://tpucdn.com/cpu-specs/images/chips/2319-front.small.jpg'})
      });
      setCpuName('');
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
      setCpuName('');
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
      setCpuName('');
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
    setCpuName(event.target.value);
  }


  return (
    <div>
      {cpuList ? <>
        {cpuList.map((cpu) =>
        <div key={cpu.id}>
          <h1>{cpu['name']}</h1>
          <h2>{cpu['price']}</h2>
          <img src={cpu['imageLink']} width={100}></img>
          <button onClick={()=>editCpu(cpu['_id'])}>Editar</button>
          <button onClick={()=>deleteCpu(cpu['_id'])}>Deletar</button>
          <button onClick={()=>updatePrice(cpu['_id'])}>Atualizar preço</button>
          </div>
        )}
      </> : <></>}
      <br></br>
      <input value={cpuName} onChange={HandleChange}></input>
      <input></input>
      <input></input>
      <input></input>
      <button onClick={createCpu}>Postar dados</button>
    </div>
  );
}

export default App;
