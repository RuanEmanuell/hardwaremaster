import React, { useEffect, useState } from 'react';
import NavBar from '../../components/global/navbar';
import listStyle from './styles/list.module.css';
import EditIcon from '../../images/edit.png';
import DeleteIcon from '../../images/delete.png';
import FilterBox from '../../components/list/filter';
import SpecCircle from '../../components/list/speccircle';
import StandartButton from '../../components/global/standartbutton';
import CircleButton from '../../components/global/circlebutton';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAuth } from '../../utils/auth';

interface PartData {
  name: string;
  brand: string;
  launch: string;
  shopLink: string;
  shopLink2: string;
  shopLink3: string;
  shopLink4: string;
  imageLink: string;
  costBenefit: string;
  price: string;
  cpu?: {
    cpuSocket: string;
    cpuGeneration: string;
    cpuCores: string;
    cpuThreads: string;
    cpuFrequency: string;
    cpuIgpu: boolean;
    cpuPerformance: string;
    igpuPerformance: string;
    cpuRamType: string;
  };
  gpu?: {
    gpuGeneration: string;
    gpuCores: string;
    gpuMemory: string;
    gpuMemoryType: string;
    gpuMemoryBus: string;
    gpuPerformance: string;
    gpuRecommendedPower: string;
  };
  mobo?: {
    moboChipset: string;
    moboSocketCompatibility: string;
    moboRamCompatibility: string;
    moboSlots: string;
  };
  ram?: {
    ramFrequency: string;
    ramCapacity: string;
    ramType: string;
    ramLatency: string;
  };
  power?: {
    powerWatts: string;
    powerEfficiency: string;
    powerModular: string;
  };
  ssd?: {
    ssdCapacity: string;
    ssdType: string;
    ssdSpeed: string;
  };
  case?: {
    caseForm: string;
    caseFanSupport: string;
    caseWcSupport: string;
  };
}

interface Part {
  _id: string;
  type: string;
  [key: string]: string;
}

interface ListProps { }

const List: React.FC<ListProps> = () => {
  // Visual interface states
  const [interfaceList, setInterfaceList] = useState<Part[]>([]);
  const [fullPartList, setFullPartList] = useState<Part[]>([]);
  const [editingPartId, setEditingPartId] = useState<string | null>(null);

  // Add part type states
  const [partData, setPartData] = useState<{ [key: string]: PartData }>({
    cpu: getInitialPartData('cpu'),
    gpu: getInitialPartData('gpu'),
    mobo: getInitialPartData('mobo'),
    ram: getInitialPartData('ram'),
    power: getInitialPartData('power'),
    ssd: getInitialPartData('ssd'),
    case: getInitialPartData('case'),
  });

  // Filter and order states
  const [filterPartLabel, setfilterPartLabel] = useState<string>('Todas as peças');
  const [firstFilterLabelVisibility, setFirstFilterLabelVisibility] = useState<string>('block');
  const [filterPartMenuVisibility, setFilterPartMenuVisibility] = useState<string>('none');
  const [filterOrderLabel, setFilterOrderLabel] = useState<string>('Relevância');
  const [firstOrderLabelVisibility, setFirstOrderLabelVisibility] = useState<string>('block');
  const [filterOrderMenuVisibility, setFilterOrderMenuVisibility] = useState<string>('none');
  const [selectTypeMenuVisibility, setSelectTypeMenuVisibility] = useState<string>('none');
  const [addPartModalVisibility, setAddPartModalVisibility] = useState<string>('none');
  const [selectedPartType, setSelectedType] = useState<string>('cpu');

  const selectTypeRef = useDetectClickOutside({ onTriggered: closeSelectTypeMenu });

  // Showing infos on screen on page load
  useEffect(() => {
    getPartList();
  }, []);

  // Setting inputs for add part modal based on type
  function getInitialPartData(type: string): PartData {
    return {
      name: '',
      brand: '',
      launch: '',
      shopLink: '',
      shopLink2: '',
      shopLink3: '',
      shopLink4: '',
      imageLink: '',
      costBenefit: '',
      price: '',
      ...(type === 'cpu'
        ? {
          cpuSocket: '',
          cpuGeneration: '',
          cpuCores: '',
          cpuThreads: '',
          cpuFrequency: '',
          cpuIgpu: '',
          cpuPerformance: '',
          igpuPerformance: '',
          cpuRamType: ''
        }
        : type === 'gpu'
          ? {
            gpuGeneration: '',
            gpuCores: '',
            gpuMemory: '',
            gpuMemoryType: '',
            gpuMemoryBus: '',
            gpuPerformance: '',
            gpuRecommendedPower: ''
          }
          : type === 'mobo'
            ? {
              moboChipset: '',
              moboSocketCompatibility: '',
              moboRamCompatibility: '',
              moboSlots: ''
            }
            : type === 'ram'
              ? {
                ramFrequency: '',
                ramCapacity: '',
                ramType: '',
                ramLatency: ''
              }
              : type === 'power'
                ? {
                  powerWatts: '',
                  powerEfficiency: '',
                  powerModular: ''
                }
                : type === 'ssd'
                  ? {
                    ssdCapacity: '',
                    ssdType: '',
                    ssdSpeed: ''
                  }
                  : {
                    caseForm: '',
                    caseFanSupport: '',
                    caseWcSupport: ''
                  }),
    };
  }

  function clearInputs() {
    const newData = { ...(partData[selectedPartType] as any) };

    for (const key in newData) {
      newData[key] = '';
    }

    setPartData({ ...partData, [selectedPartType]: newData });
  }


  // Input states controller
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const newData = { ...partData[selectedPartType], [name]: type === 'checkbox' ? checked : value };
    setPartData({ ...partData, [selectedPartType]: newData });
  };

  // Loading informations for editing part
  function editPart(index: number) {
    const currentPart = interfaceList[index];
    setEditingPartId(currentPart['_id']);
    showModalAddPart(currentPart['type']);
    setPartData({ ...partData, [currentPart.type]: { ...currentPart as any } });
  }

  // Showing modal form for adding or editing part
  function showModalAddPart(partType: string) {
    clearInputs();
    if (partType !== '') {
      setSelectedType(partType);
    }
    setAddPartModalVisibility(addPartModalVisibility === 'none' ? 'block' : 'none');
  }

  // 'Filter by' functions
  function showPartFilterMenu(){
    setFilterPartMenuVisibility('block');
    setFirstFilterLabelVisibility('none');
  }

  function closePartFilterMenu(){
    setFilterPartMenuVisibility('none');
    setFirstFilterLabelVisibility('block');
  }

  function selectFilterPart(filterPartType: string) {
    setfilterPartLabel(partFilterMenu[filterPartType]);
    let filteredList: Part[] = [];
    if (filterPartType === 'all') {
      filteredList = fullPartList!;
    } else {
      filteredList = fullPartList!.filter((part) => part.type === filterPartType);
    }
    filteredList = sortByCriteria(filteredList, filterOrderLabel);
    setInterfaceList(filteredList);
    closePartFilterMenu();
  }

  // 'Order by' functions
  function showPartOrderMenu(){
    setFilterOrderMenuVisibility('block');
    setFirstOrderLabelVisibility('none');
  }

  function closePartOrderMenu(){
    setFilterOrderMenuVisibility('none');
    setFirstOrderLabelVisibility('block');
  }

  function selectFilterOrder(filterOrderType: string) {
    setFilterOrderLabel(orderFilterMenu[filterOrderType]);
    let filteredList: Part[] = [...interfaceList!];

    filteredList = sortByCriteria(filteredList, orderFilterMenu[filterOrderType]);
    setInterfaceList(filteredList);
    closePartOrderMenu();
  }

  function sortByCriteria(list: Part[], criteria: string): Part[] {
    switch (criteria) {
      case 'Menor preço':
        return list.sort(
          (a, b) => parseFloat(a.price.replaceAll('.', '')) - parseFloat(b.price.replaceAll('.', ''))
        );
      case 'Maior preço':
        return list.sort(
          (a, b) => parseFloat(b.price.replaceAll('.', '')) - parseFloat(a.price.replaceAll('.', ''))
        );
      case 'Custo benefício':
        return list.sort((a, b) => parseFloat(b.costBenefit) - parseFloat(a.costBenefit));
      case 'Nome (A-Z)':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'Nome (Z-A)':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return list.sort((a, b) => a._id.localeCompare(b._id));
    }
  }

  function showSelectTypeMenu(){
    setSelectTypeMenuVisibility('block');
  }

  function closeSelectTypeMenu(){
    setSelectTypeMenuVisibility('none');
  }


  // Visual objects for mapping and creating dynamic components
  const partTypeDataMap: { [key: string]: PartData } = {
    cpu: partData['cpu'],
    gpu: partData['gpu'],
    mobo: partData['mobo'],
    ram: partData['ram'],
    power: partData['power'],
    ssd: partData['ssd'],
    case: partData['case'],
  };

  const partFilterMenu: { [key: string]: string } = {
    all: 'Todas as peças',
    cpu: 'Processadores',
    gpu: 'Placas de vídeo',
    mobo: 'Placas-Mãe',
    ram: 'Memórias RAM',
    power: 'Fontes',
    ssd: 'SSDs',
    case: 'Gabinetes',
  };

  const orderFilterMenu: { [key: string]: string } = {
    relevance: 'Relevância',
    price: 'Menor preço',
    price2: 'Maior preço',
    costBenefit: 'Custo benefício',
    title: 'Nome (A-Z)',
    title2: 'Nome (Z-A)',
  };

  // CRUD functions
  async function getPartList() {
    try {
      const response = await fetch('http://localhost:3001/list/parts');
      const data: Part[] = await response.json();
      setFullPartList(data);
      setInterfaceList(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function createOrEditPart() {
    const dataToSend: any = { type: selectedPartType, ...partTypeDataMap[selectedPartType] };

    try {
      await fetch(
        editingPartId
          ? `http://localhost:3001/list/update/${editingPartId}`
          : 'http://localhost:3001/list/post',
        {
          method: editingPartId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend),
        }
      );

      clearInputs();
      setEditingPartId(null);
      getPartList();
      showModalAddPart('');
      if (selectTypeMenuVisibility === 'block') {
        closeSelectTypeMenu();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deletePart(id: string) {
    try {
      await fetch(`http://localhost:3001/list/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      clearInputs();
      getPartList();
    } catch (err) {
      console.log(err);
    }
  }

  async function updatePrice(id: string) {
    try {
      const response = await fetch(`http://localhost:3001/list/currentprice/${id}`);
      const data = await response.json();
      const newPrice = data['preço'];

      await fetch(`http://localhost:3001/list/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: newPrice }),
      });

      getPartList();
    } catch (error) {
      console.log(error);
    }
  };

  const { currentUser } = useAuth();

  const [crudButtonsVisibile, setCrudButtonsVisibility] = useState<boolean>(false);

  useEffect(() => {
    if(currentUser?.email === 'ruanvitorcom540@gmail.com'){
      setCrudButtonsVisibility(true);
    }
  }, [])

  return (
    <div>
      <NavBar />
      <div className={listStyle.mainContainer}>
        <main>
          <h1 className={listStyle.mainTitle}>{filterPartLabel}</h1>
          <div className={listStyle.partFilters}>
            <div className={listStyle.gridSpacer}></div>
            <FilterBox
              firstFilterLabel='Filtrar por'
              onClick={showPartFilterMenu}
              firstFilterDisplayCondition={firstFilterLabelVisibility}
              currentFilter={filterPartLabel}
              isFiltering={filterPartMenuVisibility}
              filterMenu={partFilterMenu}
              selectFilter={selectFilterPart}
              onClickOutside={closePartFilterMenu}
            />
            <FilterBox
              firstFilterLabel='Ordenar por'
              onClick={showPartOrderMenu}
              firstFilterDisplayCondition={firstOrderLabelVisibility}
              currentFilter={filterOrderLabel}
              isFiltering={filterOrderMenuVisibility}
              filterMenu={orderFilterMenu}
              selectFilter={selectFilterOrder}
              onClickOutside={closePartOrderMenu}
            />
            <div className={listStyle.gridSpacer}></div>
          </div>
          <div className={listStyle.partList}>
            {interfaceList.length > 0 ? (
              <>
                {interfaceList.map((part, index) => (
                  <div key={part.id} className={listStyle.partInfo}>
                    <div className={listStyle.partImage}>
                      <img src={part['imageLink']} alt={part['name']} />
                    </div>
                    <div className={listStyle.partSpecs}>
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
                          <p>Tem integrada: {part['cpuIgpu']}</p>
                          <p>Tipo de memória suportada: {part['cpuRamType']}</p>
                          <p>Preço: R$ {part['price']}</p>
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
                          <p>Fonte recomendada: {part['gpuRecommendedPower']}W</p>
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
                      <div style = {{display: crudButtonsVisibile ? 'block' : 'none'}}>
                      <SpecCircle performanceLabel='Custo x Benefício:' performanceRating={part['costBenefit']} />
                      <div className={listStyle.editDeleteButtons}>
                        <button onClick={() => editPart(index)} className={listStyle.editButton}><img src={EditIcon} alt="Edit Icon" /></button>
                        <button onClick={() => deletePart(part['_id'])} className={listStyle.deleteButton}><img src={DeleteIcon} alt="Delete Icon" /></button>
                      </div>
                      <StandartButton onClick={() => updatePrice(part['_id'])} buttonLabel='Atualizar preço' />
                    </div>
                    </div>
                  </div>
                ))}
              </>
            ) : <></>}
            <br></br>
            <div ref={selectTypeRef} style = {{display: crudButtonsVisibile ? 'block' : 'none'}}>
              <div className={listStyle.choosePartType} style={{ display: selectTypeMenuVisibility }}>
                {Object.keys(partTypeDataMap).map((addPart, index) => (
                  <h3 key={index} className={listStyle.partType} onClick={() => showModalAddPart(addPart)}>
                    {addPart}
                  </h3>
                ))}
              </div>
              <CircleButton onClick={showSelectTypeMenu} buttonIcon='+' />
            </div>
          </div>
        </main>
        <div style={{ display: addPartModalVisibility }} className={listStyle.addPartContainer}>
          {selectedPartType ? (
            <div className={listStyle.addPartModal}>
              <div className={listStyle.addPartImg}>
                <div className={listStyle.addPartImgBox}>
                  <img
                    src={partTypeDataMap[selectedPartType]['imageLink']}
                    alt={'Imagem da peça que será adicionada ao sistema'}
                  ></img>
                </div>
              </div>
              <div className={listStyle.addPartInputs}>
                {Object.keys(partTypeDataMap[selectedPartType]).map((key) =>
                  key !== '_id' && key !== 'type' && key !== '__v' ? (
                    <>
                      <label className={listStyle.inputLabel}>{key}:</label>
                      <input
                        type='text'
                        placeholder={key}
                        key={key}
                        name={key}
                        onChange={(event) => handleChange(event)}
                        value={(partTypeDataMap[selectedPartType] as any)[key]}
                      ></input>{' '}
                    </>
                  ) : (
                    <></>
                  )
                )}
              </div>
              <div className={listStyle.saveButtonContainer}>
                <StandartButton onClick={() => createOrEditPart()} buttonLabel='Salvar' />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
