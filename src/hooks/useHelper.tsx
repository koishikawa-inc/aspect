import { TypeSize } from '../components/Aspect/type';

export const useHelper = () => {
  const gcd = (x: number, y: number): number => {
    if (x % y) {
      return gcd(y, x % y);
    } else {
      return y;
    }
  };

  const getRatio = ({ w, h }: TypeSize): TypeSize => {
    const x = gcd(Math.round(Math.max(w, h)), Math.round(Math.min(w, h)));

    if (x > 0) {
      const ratio = {
        w: Math.round(w) / x,
        h: Math.round(h) / x,
      };

      return ratio;
    } else {
      // console.log("exep", w, h, x);
      return { w, h };
    }
  };

  const getWidth = (height: number, ratio: TypeSize) => {
    return (height * ratio.w) / ratio.h;
  };
  const getHeight = (width: number, ratio: TypeSize) => {
    return (width * ratio.h) / ratio.w;
  };

  const loadImage = (file: File, onLoad: (image: HTMLImageElement) => void) => {
    const img = new Image();
    img.onload = () => {
      onLoad(img);
      // const newItem = {
      //   id: uuid(),
      //   file: {
      //     name: file.name,
      //     src: URL.createObjectURL(file),
      //   },
      //   size: { w: img.naturalWidth, h: img.naturalHeight },
      // };
      // setData((current) => [...current, newItem]);
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  };

  return { gcd, getRatio, getWidth, getHeight, loadImage };
};
