import React from 'react';
import { FaCss3 } from 'react-icons/fa';
import { HiAtSymbol, HiCode } from 'react-icons/hi';
import { MdOutlineWarning } from 'react-icons/md';

import { useHelper } from '../../hooks/useHelper';
import { ButtonCopy } from './ButtonCopy';
import { Pixel } from './Pixel';
import { TypeSize } from './type';

type Props = {
  filename: string;
  size: TypeSize;
};

export const Result: React.FC<Props> = React.memo(({ filename, size, ...props }) => {
  const { getRatio } = useHelper();
  const ratio = getRatio(size);

  return (
    <>
      {[...Array(3)].map((item, i) => {
        const [w, h] = [size.w / (i + 1), size.h / (i + 1)];

        const attr = ` width="${w.toFixed()}" height="${h.toFixed()}"`;
        const tag = `<img src="${filename}" ${attr} alt="" />`;
        const css = `width: ${w.toFixed()}px;\nheight: ${h.toFixed()}px;`;
        const css_ar = `aspect-raio:  ${ratio.w.toFixed()} / ${ratio.h.toFixed()};`;

        return (
          <div
            className="result"
            key={i}
          >
            <div className="result__data">
              <span className="result__resolution">
                <HiAtSymbol />
                <span>{i + 1}</span>:
              </span>
              &nbsp;
              <Pixel
                filename={filename}
                size={{ w, h }}
              />
            </div>
            {/* 
              <input
                type="text"
                className="tag"
                value={tag}
                readOnly
              /> */}

            <div className="result__buttons">
              <ButtonCopy content={tag}>
                <HiCode />
              </ButtonCopy>
              <ButtonCopy content={attr}>Attr</ButtonCopy>
              <ButtonCopy content={css}>w×h</ButtonCopy>
              <ButtonCopy content={css_ar}>w:h</ButtonCopy>
            </div>
          </div>
        );
      })}
    </>
  );
});
