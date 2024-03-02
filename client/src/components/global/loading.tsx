import React from 'react';
import globalComponentStyle from './styles/globalcomponents.module.css'

const Loading: React.FC = () => {
  return (
    <div className={globalComponentStyle.loadingSpinnerContainer}>
      <div className={globalComponentStyle.loadingSpinner}></div>
    </div>
  );
};

export default Loading;
