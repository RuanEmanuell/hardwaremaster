import React from "react";
import mbComponentStyle from './styles/manualbuildcomponents.module.css';


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
    partList: Part[];
    selectPartInput: string;
    selectPart: (part: Part) => void;
}


const InputResultBox: React.FC<Props> = ({ partList, selectPartInput, selectPart }) => {
    return (
        <div className={mbComponentStyle.inputResultBox}>
            <div>
                {partList.filter(part =>
                    `${part['brand']} ${part['name']}`.toLowerCase().trim().includes(selectPartInput)).map(part =>
                        <div className={mbComponentStyle.inputPicker} onClick={() => selectPart(part)}>
                            <div className={mbComponentStyle.inputPickerNameAndImg}>
                                <img src={part['imageLink']} className={mbComponentStyle.inputImg}></img>
                                <h3>{part['name']}</h3>
                            </div>
                            <h3 className={mbComponentStyle.inputPrice}>R$ {part['price']}</h3>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default InputResultBox;