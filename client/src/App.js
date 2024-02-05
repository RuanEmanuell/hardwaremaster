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
        body: JSON.stringify({ name: cpuName, brand: 'AMD', launchDate: '2019', generation: '3000' })
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
        body: JSON.stringify({ name: 'teste', brand: 'AMD', launchDate: '2019', generation: '3000' })
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



  const HandleChange = (event) => {
    setCpuName(event.target.value);
  }


  return (
    <div>
      {cpuList ? <>
        {cpuList.map((cpu) =>
        <div>
          <h1 key={cpu.id}>{cpu['name']}</h1>
          <button onClick={()=>editCpu(cpu['_id'])}>Editar</button>
          <button onClick={()=>deleteCpu(cpu['_id'])}>Deletar</button>
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
