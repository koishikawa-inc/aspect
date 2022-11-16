import React from 'react';
import { MdOutlineWarning } from 'react-icons/md';

import { TypeSize } from './type';

type Props = {
  filename: string;
  size: TypeSize;
};

export const Pixel: React.FC<Props> = ({ filename, size: { w, h } }) => {
  const [w1, w2] = [`${Math.floor(w)}`, `${(w - Math.floor(w)).toFixed(2).split('.')[1]}`];
  const [h1, h2] = [`${Math.floor(h)}`, `${(h - Math.floor(h)).toFixed(2).split('.')[1]}`];

  return (
    <>
      <div className="pixel">
        {w1}.<span>{w2}</span> × {h1}.<span>{h2}</span>
      </div>
      {(w2 !== '00' || h2 !== '00') && <MdOutlineWarning className="icon--warning" />}
    </>
  );
};
