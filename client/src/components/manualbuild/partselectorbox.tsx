import React from "react";
import mbComponentStyle from './styles/manualbuildcomponents.module.css';
import InputResultBox from "./inputresultbox";
import PartInfoBox from "./partinfobox";
import PriceAndChangeButton from "./pricebutton";

interface Part {
    type: string;
    name: string;
    brand: string;
    price: string;
    imageLink: string;
    cpuCores?: string;
    cpuThreads?: string;
    cpuFrequency?: string;
    cpuSocket?: string;
    cpuRamType?: string;
    gpuCores?: string,
    gpuMemory?: string,
    gpuMemoryType?: string,
    gpuRecommendedPower?: string;
    moboChipset?: string,
    moboSocketCompatibility?: string,
    moboRamCompatibility?: string,
    ramFrequency?: string,
    ramCapacity?: string,
    ramType?: string,
    powerWatts?: string,
    powerEfficiency?: string,
    powerModular?: string,
    ssdCapacity?: string,
    ssdType?: string,
    ssdSpeed?: string,
    caseForm?: string,
    caseFanSupport?: string,
    caseWcSupport?: string
  }

interface Props {
    partName: string;
    selectedPart?: Part;
    partIcon: string;
    selectPartLabel: string;
    inputPlaceHolder: string;
    selectPartInput: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, partType: string) => void;
    selectPart: (part: Part) => void;
    partList: Part[];
    info1: string;
    info2: string;
    info3: string;
    resetSelectedPart: (part: Part) => void;
    selectedCpu?: Part;
    selectedGpu?: Part;
    selectedMobo?: Part;
    selectedRam?: Part;
    selectedPower?: Part;
    selectedSsd?: Part;
    selectedCase?: Part;
}

const PartSelectorBox: React.FC<Props> = ({ partName, selectedPart, partIcon, selectPartLabel, inputPlaceHolder, selectPartInput, handleChange, partList, info1, info2, info3, selectPart, resetSelectedPart, selectedCpu, selectedGpu, selectedMobo, selectedRam, selectedPower, selectedSsd, selectedCase }) => {
    return (
        <div className={mbComponentStyle.partPickerBox}>
            <h2 className={mbComponentStyle.partSelectorName}>{partName}</h2>
            <div className={mbComponentStyle.partPicker} style={{height: selectPartInput !== '' && !selectedPart ? '130px' : 'fit-content', gridTemplateColumns: selectPartInput !== '' && !selectedPart ? '1fr' : '1fr 3fr 1fr'}}>
                <div className={mbComponentStyle.imgBox} style = {{display: selectPartInput !== '' && !selectedPart ? 'none' : 'flex'}}>
                    <img src={selectedPart ? selectedPart['imageLink'] : partIcon}></img>
                </div>
                <div className={mbComponentStyle.partNameAndInputBox}>
                    <h3>{selectedPart ? `${selectedPart['name']}` : selectPartLabel}</h3>
                    {!selectedPart ?
                        <div>
                            <input className={mbComponentStyle.partPickerInput}
                                placeholder={inputPlaceHolder}
                                value={selectPartInput}
                                onChange={(event) => handleChange(event, partList[0]['type'])}></input>
                            {selectPartInput !== '' ?
                                <InputResultBox
                                    partList={partList}
                                    selectPartInput={selectPartInput.toLowerCase().trim()}
                                    selectPart={selectPart}
                                    selectedCpu={selectedCpu}
                                    selectedGpu={selectedGpu}
                                    selectedMobo={selectedMobo}
                                    selectedRam={selectedRam}
                                    selectedPower={selectedPower}
                                    selectedSsd={selectedSsd}
                                    selectedCase={selectedCase}
                                />
                                : <></>} </div>
                        : <PartInfoBox
                            info1={info1}
                            info2={info2}
                            info3={info3}
                        />
                    }
                </div>
                <div>
                    {selectedPart ?
                        <PriceAndChangeButton
                            selectedPartPrice={selectedPart['price']}
                            onChangePartClick={() => resetSelectedPart(selectedPart)}
                        />
                        : <></>}
                </div>
            </div>
        </div>
    );
}

export default PartSelectorBox;