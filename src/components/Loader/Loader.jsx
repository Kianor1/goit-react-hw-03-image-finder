import React from 'react';
import { DNA } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => (
  <div className={s.loader}>
    <DNA
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  </div>
);

export default Loader;
