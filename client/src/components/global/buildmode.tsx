import React, { LegacyRef, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import globalComponentStyle from './styles/globalcomponents.module.css';
import StandartButton from './standartbutton';

interface Props{
    dialogRef : LegacyRef<HTMLDialogElement> | undefined;
    closeModal: () => void;
}

const BuildMode: React.FC <Props> = ({dialogRef, closeModal}) => {
    return (
            <dialog ref={dialogRef}>
                <div className={globalComponentStyle.chooseBuildMode}>
                    <div>
                    <Link to='/manualbuild/?mode=action&automaticMode=yes'>
                    <StandartButton
                        buttonLabel='Montagem Automática'
                        backgroundColor='#0066FF'
                        onClick={closeModal}
                    />
                    </Link>
                    <Link to='/manualbuild'>
                    <StandartButton
                        buttonLabel='Montagem Manual'
                        onClick={closeModal}
                    />
                   </Link>
                </div>
                </div>
            </dialog>
    )
}

export default BuildMode;