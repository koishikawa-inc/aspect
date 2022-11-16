export type TypeSize = {
  w: number;
  h: number;
};

export type TypeFile = {
  name: string;
  src: string;
};

export type TypeAspect = {
  id: string;
  file: TypeFile;
  size: TypeSize;
};

type TypeFocus = {
  type: string; //'pixel' | 'ratio' | '';
  dir: string; //'width' | 'height' | '';
};

type PropsInput = {
  dir: "width" | "height";
  size: TypeSize;
  focus: TypeFocus;
  isCalcRatio: boolean;
  isLockPixelWidth: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
};
