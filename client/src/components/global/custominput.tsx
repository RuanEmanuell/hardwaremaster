import React, { ChangeEvent } from 'react';
import globalComponentStyle from './styles/globalcomponents.module.css'

interface Props {
    placeholder: string;
    value : string;
    onChange : (event: ChangeEvent<HTMLInputElement>) => void
}

const CustomInput: React.FC<Props> = ({ placeholder, value, onChange }) => {
    return (
        <input
        className={globalComponentStyle.searchPartInput}
        placeholder= {placeholder}
        value={value}
        onChange={onChange}></input>
    );
};

export default CustomInput;
