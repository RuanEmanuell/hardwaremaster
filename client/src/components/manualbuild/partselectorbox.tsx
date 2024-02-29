import React from "react";
import mbComponentStyle from './styles/manualbuildcomponents.module.css';
import InputResultBox from "./inputresultbox";
import PartInfoBox from "./partinfobox";
import PriceAndChangeButton from "./pricebutton";
import { useDetectClickOutside } from "react-detect-click-outside";
import Part from "../../utils/part";

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
    increasePartQuantity: (part: Part) => void;
    decreasePartQuantity: (part: Part) => void;
    resetSelectedPart: (part: Part) => void;
    selectedCpu?: Part;
    selectedGpu?: Part;
    selectedMobo?: Part;
    selectedRam?: Part;
    selectedPower?: Part;
    selectedSsd?: Part;
    selectedCase?: Part;
    clearInputs: (partType: string) => void;
}

const PartSelectorBox: React.FC<Props> = (
    { partName, selectedPart, partIcon, selectPartLabel, inputPlaceHolder,
        selectPartInput, handleChange, partList, info1, info2, info3,
        selectPart, decreasePartQuantity, increasePartQuantity,
        resetSelectedPart, selectedCpu, selectedGpu, selectedMobo, selectedRam,
        selectedPower, selectedSsd, selectedCase, clearInputs }) => {


    const inputRef = useDetectClickOutside({ onTriggered: () => clearInputs(partList && partList[0] ? partList[0]['type'] : 'cpu') });

    return (
        <div className={mbComponentStyle.partPickerBox}>
            <h2 className={mbComponentStyle.partSelectorName}>{partName}</h2>
            <div className={mbComponentStyle.partPicker}
                ref={inputRef}
                style={{ height: selectPartInput !== '' && !selectedPart ? '130px' : 'fit-content', gridTemplateColumns: selectPartInput !== '' && !selectedPart ? '1fr' : '1fr 3fr 1fr' }}>
                <div className={mbComponentStyle.imgBox} style={{ display: selectPartInput !== '' && !selectedPart ? 'none' : 'flex' }}>
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
                            selectedPart={selectedPart}
                            selectedMobo={selectedMobo}
                            onIncreasePartQuantity={() => increasePartQuantity(selectedPart)}
                            onDecreasePartQuantity={() => decreasePartQuantity(selectedPart)}
                            onChangePartClick={() => resetSelectedPart(selectedPart)}
                        />
                        : <></>}
                </div>
            </div>
        </div>
    );
}

export default PartSelectorBox;