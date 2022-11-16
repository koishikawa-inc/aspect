import './aspect.scss';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { HiPlus, HiTrash } from 'react-icons/hi';
import { MdAspectRatio } from 'react-icons/md';
import { TfiLayoutGrid4Alt, TfiSplitH, TfiSplitV } from 'react-icons/tfi';

import { useHelper } from '../../hooks/useHelper';
import { Inputs } from './Inputs';
import { presets } from './presets';
import { Preview } from './Preview';
import { Ratio } from './Ratio';
import { Result } from './Result';
import { TypeAspect, TypeSize } from './type';

type Props = {
  data: TypeAspect;
  onChange: (data: TypeAspect) => void;
  onAdd?: (id: string) => void;
  onDelete?: (id: string) => void;
};
export const Aspect: React.FC<Props> = React.memo(({ data, ...props }) => {
  const { getRatio } = useHelper();

  const {
    file: { name, src },
    size,
  } = data;
  const [preset, setPreset] = useState('');

  const [ratio, setRatio] = useState(getRatio(size)); // ratioをsizeからの計算に統一すると入力のUXが悪くなる

  useEffect(() => {
    const matchSize = presets.find((p) => {
      return p.size.h === size.h && p.size.w === size.w;
    });

    const matchRatio = presets.find((p) => {
      const r1 = getRatio(p.size);
      const r2 = getRatio(size);

      return r1.h === r2.h && r1.w === r2.w;
    });

    setPreset(matchSize?.value || matchRatio?.value || '');
  }, [size]);

  const handleOnChangeImage = (name: string, src: string, size: TypeSize) => {
    props.onChange({ ...data, file: { name, src }, size });
  };

  // const handleOnClickBtnClear = () => {
  //   props.onChange({ ...data, file: { name: '', src: '' } });
  //   setPreset('');
  // };

  const handleOnChangePreset = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    setPreset(value);

    const selected = presets.find((item) => item.value === value);

    if (selected) {
      props.onChange({ ...data, file: { name: '', src: '' }, size: selected.size });
      setRatio(getRatio(selected.size));
    }
  };

  const handleOnChangeSize = (size: TypeSize) => {
    props.onChange({ ...data, size });
  };

  const handleOnChangeRatio = (ratio: TypeSize) => {
    setRatio(ratio);
  };

  return (
    <div className="aspect">
      <div className="content">
        <div className="aspect__body">
          <div className="block--preview">
            <div className="select">
              <select
                onChange={handleOnChangePreset}
                value={preset}
              >
                <option disabled>preset</option>
                {presets.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <Preview
              src={src || `//placehold.jp/${size.w.toFixed()}x${size.h.toFixed()}.png`}
              onChange={handleOnChangeImage}
            />

            <Ratio size={getRatio(size)} />
          </div>

          <div className="block--input">
            <Inputs
              size={size}
              ratio={ratio}
              onChangeSize={handleOnChangeSize}
              onChangeRatio={handleOnChangeRatio}
            />
          </div>
          <div className="block--result">
            <Result
              filename={name || `//placehold.jp/${size.w.toFixed()}x${size.h.toFixed()}.png`}
              size={size}
            />
          </div>
        </div>
      </div>
      <button
        className="btn--icon action-delete"
        onClick={() => {
          props.onDelete?.(data.id);
        }}
        // disabled={data.length === 1}
      >
        <HiTrash />
      </button>
    </div>
  );
});
