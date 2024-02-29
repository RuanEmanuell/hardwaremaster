import React from "react";
import mbComponentStyle from './styles/manualbuildcomponents.module.css';
import warningIcon from '../../images/warning.png';
import Part from "../../utils/part";

interface Props {
    partList: Part[];
    selectPartInput: string;
    selectPart: (part: Part) => void;
    selectedCpu?: Part;
    selectedGpu?: Part;
    selectedMobo?: Part;
    selectedRam?: Part;
    selectedPower?: Part;
    selectedSsd?: Part;
    selectedCase?: Part;
}


const InputResultBox: React.FC<Props> = ({ partList, selectPartInput, selectPart, selectedCpu, selectedGpu, selectedMobo, selectedRam, selectedPower, selectedSsd, selectedCase }) => {

    function checkPartIncompatibility(part: Part) {
        let incompatiblePartsReason: string = '';
        if (part['type'] === 'cpu') {
            if (selectedMobo && selectedMobo['moboSocketCompatibility'] != part['cpuSocket']) {
                incompatiblePartsReason = 'Placa mãe';
            } else if (selectedRam && !part['cpuRamType']!.includes(selectedRam['ramType']!)) {
                incompatiblePartsReason = 'RAM';
            }
        } else if (part['type'] === 'gpu') {
            if (selectedPower && selectedPower['powerWatts']! < part['gpuRecommendedPower']!) {
                incompatiblePartsReason = 'Fonte';
            }
        } else if (part['type'] === 'mobo') {
            if (selectedCpu && selectedCpu['cpuSocket'] != part['moboSocketCompatibility']) {
                incompatiblePartsReason = 'Processador';
            } else if (selectedRam && !part['moboRamCompatibility']!.includes(selectedRam['ramType']!)) {
                incompatiblePartsReason = 'RAM';
            }
        } else if (part['type'] === 'ram') {
            if (selectedCpu && !selectedCpu['cpuRamType']!.includes(part['ramType']!)) {
                incompatiblePartsReason = 'Processador';
            } else if (selectedMobo && !selectedMobo['moboRamCompatibility']!.includes(part['ramType']!)) {
                incompatiblePartsReason = 'Placa Mãe';
            }
        } else if (part['type'] === 'power') {
            if (selectedGpu && selectedGpu['gpuRecommendedPower']! > part['powerWatts']!) {
                incompatiblePartsReason = 'Placa de vídeo';
            }
        }
        return incompatiblePartsReason;
    }

    return (
        <div className={mbComponentStyle.inputResultBox}>
            <div>
                {partList.filter(part =>
                    `${part['brand']} ${part['name']}`.toLowerCase().trim().includes(selectPartInput)).map(part => {
                        let incompatiblePartReason = checkPartIncompatibility(part);
                        return (
                            <div className={`${mbComponentStyle.inputPicker} ${incompatiblePartReason != '' ? mbComponentStyle.incompatiblePart : ''}`}
                                onClick={() => { if (incompatiblePartReason == '') { selectPart(part) } }}
                                key={part['name']}>
                                <div className={mbComponentStyle.inputPickerNameAndImg}>
                                    <img src={part['imageLink']} className={mbComponentStyle.inputImg}></img>
                                    <h3>{part['name']}</h3>
                                </div>
                                <div className={mbComponentStyle.incompatiblePartBox} style={{ display: incompatiblePartReason != '' ? 'flex' : 'none' }}>
                                    <img src={warningIcon} className={mbComponentStyle.incompatibleImg}></img>
                                    <h4 className={mbComponentStyle.inputPrice}>Incompatível com {incompatiblePartReason} escolhido(a)</h4>
                                </div>
                                <h3 className={mbComponentStyle.inputPrice} style={{ display: incompatiblePartReason != '' ? 'none' : 'block' }}>R$ {part['price']}</h3>
                            </div>)
                    }
                    )}
            </div>
        </div>
    );
}

export default InputResultBox;