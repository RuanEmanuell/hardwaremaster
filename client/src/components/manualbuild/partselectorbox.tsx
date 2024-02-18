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
    gpuCores?: string,
    gpuMemory?: string,
    gpuMemoryType?: string,
  }

interface Props {
    partName: string;
    selectedPart?: Part;
    partIcon: string;
    selectPartLabel: string;
    inputPlaceHolder: string;
    selectPartInput: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, partType: string) => void;
    selectPart: (part: Part, partType:string) => void;
    partList: Part[];
    info1: string;
    info2: string;
    info3: string;
    resetSelectedPart: (part: Part) => void;
}

const PartSelectorBox: React.FC<Props> = ({ partName, selectedPart, partIcon, selectPartLabel, inputPlaceHolder, selectPartInput, handleChange, partList, info1, info2, info3, selectPart, resetSelectedPart }) => {
    return (
        <div>
            <h2>{partName}</h2>
            <div className={mbComponentStyle.partPicker}>
                <div className={mbComponentStyle.imgBox}>
                    <img src={selectedPart ? selectedPart['imageLink'] : partIcon}></img>
                </div>
                <div className={mbComponentStyle.partNameAndInputBox}>
                    <h3>{selectedPart ? `${selectedPart['brand']} ${selectedPart['name']}` : selectPartLabel}</h3>
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