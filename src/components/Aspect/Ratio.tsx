import React from 'react';

import { TypeSize } from './type';

type Props = { size: TypeSize };
export const Ratio: React.FC<Props> = React.memo(({ size: { w, h } }) => {
  return (
    <div className="ratio">
      <span>{w}</span>&nbsp;:&nbsp;<span>{h}</span>
    </div>
  );
});
