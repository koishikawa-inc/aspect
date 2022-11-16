import { motion } from 'framer-motion';
import { ChangeEvent, FocusEvent, forwardRef } from 'react';

import { useInput } from '../../hooks/useInput';
import { PropsInput } from './type';

export const InputPixel = forwardRef<HTMLInputElement, PropsInput>(({ ...props }, ref) => {
  const { dir, focus, isCalcRatio, isLockPixelWidth } = props;
  const { variants, propsInput } = useInput(props, ref);

  const variants_pixel = {
    normal: { ...variants.normal },
    focus: {
      ...variants.focus,
      background: 'rgb( 249 117 15 / 1)',
    },
    target: {
      ...variants.target,
      background: 'rgb( 249 117 15 / 0.1)',
    },
    nonTarget: {
      ...variants.nonTarget,
    },
  };

  const stateInputPixel = (dir: string) => {
    if (focus.type === 'pixel' && focus.dir === dir) {
      return 'focus';
    } else if (focus.type === 'pixel' && isCalcRatio) {
      return 'nonTarget';
    } else if (focus.type === 'pixel' && !isCalcRatio) {
      return 'target';
    } else if (focus.type === 'ratio' && !isLockPixelWidth === (dir === 'width')) {
      return 'target';
    } else if (focus.type === 'ratio' && isLockPixelWidth === (dir === 'width')) {
      return 'nonTarget';
    }
    return 'normal';
  };

  return (
    <motion.input
      {...propsInput}
      name={`pixel_${dir}`}
      variants={variants_pixel}
      animate={stateInputPixel(dir)}
    />
  );
});
