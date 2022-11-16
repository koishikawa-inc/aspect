import { motion } from 'framer-motion';
import React, { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import { HiSwitchHorizontal } from 'react-icons/hi';
import { MdAspectRatio } from 'react-icons/md';
import { TfiLayoutGrid4Alt, TfiSplitH, TfiSplitV } from 'react-icons/tfi';

import { useHelper } from '../../hooks/useHelper';
import { InputPixel } from './InputPixel';
import { InputRatio } from './InputRatio';
import { TypeFocus, TypeSize } from './type';

type Props = {
  size: TypeSize;
  ratio: TypeSize;
  onChangeSize: (size: TypeSize) => void;
  onChangeRatio: (ratio: TypeSize) => void;
};

export const Inputs: React.FC<Props> = ({ size, ratio, ...props }) => {
  const { getRatio, getHeight, getWidth } = useHelper();

  const [isCalcRatio, setIsCalcRatio] = useState(true);
  const [isLockPixelWidth, setIsLockPixelWidth] = useState(true);
  const [focus, setFocus] = useState<TypeFocus>({ type: '', dir: '' });
  const [focusHistory, setFocusHistory] = useState<TypeFocus>({ type: '', dir: '' });

  const refPixelWidth = useRef<HTMLInputElement>(null);
  const refPixelHeight = useRef<HTMLInputElement>(null);
  const refRatioWidth = useRef<HTMLInputElement>(null);
  const refRatioHeight = useRef<HTMLInputElement>(null);

  const handleOnChangePixel = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (isCalcRatio) {
      const newSize = e.target.name === 'pixel_width' ? { ...size, w: value } : { ...size, h: value };

      props.onChangeSize(newSize);
      props.onChangeRatio(getRatio(newSize));
    } else {
      const newSize =
        e.target.name === 'pixel_width'
          ? {
              w: value,
              h: getHeight(value, ratio),
            }
          : {
              w: getWidth(value, ratio),
              h: value,
            };

      props.onChangeSize(newSize);
    }
  };

  const handleOnChangeRatio = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    const newRatio = e.target.name === 'ratio_width' ? { ...ratio, w: value } : { ...ratio, h: value };

    const newSize = isLockPixelWidth
      ? {
          ...size,
          h: getHeight(size.w, newRatio),
        }
      : {
          ...size,
          w: getWidth(size.h, newRatio),
        };

    props.onChangeSize(newSize);
    props.onChangeRatio(newRatio);
  };

  const handleOnChangeCalc = () => {
    if (focusHistory.type === 'pixel') {
      setFocus(focusHistory);

      if (focusHistory.dir === 'width') {
        refPixelWidth.current?.focus();
      } else {
        refPixelHeight.current?.focus();
      }
    }

    setIsCalcRatio((current) => !current);
    // setFocus('pixel_width');
  };

  const handleOnChangeLock = () => {
    if (focusHistory.type === 'ratio') {
      setFocus(focusHistory);

      if (focusHistory.dir === 'width') {
        refRatioWidth.current?.focus();
      } else {
        refRatioHeight.current?.focus();
      }
    }

    setIsLockPixelWidth((current) => !current);
    // setFocus('ratio_width');
  };

  const sizeMulti = (n: number) => {
    props.onChangeSize({ w: size.w * n, h: size.h * n });
  };

  const sizeRev = () => {
    props.onChangeSize({ w: size.h, h: size.w });
    props.onChangeRatio({ w: ratio.h, h: ratio.w });
  };

  const handleOnFocus = (e: FocusEvent<HTMLInputElement>) => {
    const [type, dir] = e.currentTarget.name.split('_');
    setFocus({ type, dir });
    // console.log('focus', e.currentTarget.name);
  };
  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    // console.log('blur', e.currentTarget.name);
    setFocusHistory(focus);
    setFocus({ type: '', dir: '' });
  };

  const propsInputPixel = {
    size,
    focus,
    isCalcRatio,
    isLockPixelWidth,
    onChange: handleOnChangePixel,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
  };
  const propsInputRatio = {
    size: ratio,
    focus,
    isCalcRatio,
    isLockPixelWidth,
    onChange: handleOnChangeRatio,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
  };

  return (
    <>
      <div className="input--pixel">
        <div className="input__head">
          <h2 className="input__title">Pixel</h2>
          <button
            className="btn"
            onClick={() => sizeRev()}
          >
            <HiSwitchHorizontal />
          </button>
          <button
            className="btn"
            onClick={() => sizeMulti(1 / 2)}
          >
            ÷2
          </button>
          <button
            className="btn"
            onClick={() => sizeMulti(1 / 3)}
          >
            ÷3
          </button>
          <button
            className="btn"
            onClick={() => sizeMulti(2)}
          >
            x2
          </button>
          <button
            className="btn"
            onClick={() => sizeMulti(3)}
          >
            x3
          </button>
          <button onClick={handleOnChangeCalc}>{isCalcRatio ? <MdAspectRatio /> : <TfiLayoutGrid4Alt />}</button>
        </div>
        <div className="input__form">
          <InputPixel
            {...propsInputPixel}
            dir={'width'}
            ref={refPixelWidth}
          />
          <span>&nbsp;×&nbsp;</span>
          <InputPixel
            {...propsInputPixel}
            dir={'height'}
            ref={refPixelHeight}
          />
        </div>
      </div>
      <div className="input__help">
        {focus.type === 'pixel' && isCalcRatio && 'ピクセルから比率を計算'}
        {focus.type === 'pixel' && !isCalcRatio && focus.dir === 'width' && '幅(ピクセル)と比率から、高さ(ピクセル)を計算'}
        {focus.type === 'pixel' && !isCalcRatio && focus.dir === 'height' && '高さ(ピクセル)と比率から、横幅(ピクセル)を計算'}
      </div>
      <div className="input--ratio">
        <div className="input__head">
          <h2 className="input__title">Ratio</h2>
          <button onClick={handleOnChangeLock}>{isLockPixelWidth ? <TfiSplitV /> : <TfiSplitH />}</button>
        </div>
        <div className="input__form">
          <InputRatio
            {...propsInputRatio}
            dir={'width'}
            ref={refRatioWidth}
          />
          <span>&nbsp;：&nbsp;</span>
          <InputRatio
            {...propsInputRatio}
            dir={'height'}
            ref={refRatioHeight}
          />
        </div>
      </div>
      <div className="input__help">
        {focus.type === 'ratio' && isLockPixelWidth && '比率からピクセル（高さ）を計算'}
        {focus.type === 'ratio' && !isLockPixelWidth && '比率からピクセル（横幅）を計算'}
      </div>
    </>
  );
};
