import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';

import { useInput } from '../../hooks/useInput';
import { PropsInput } from './type';

export const InputRatio = forwardRef<HTMLInputElement, PropsInput>(({ ...props }, ref) => {
  const { dir, focus, isCalcRatio } = props;
  const { variants, propsInput } = useInput(props, ref);

  const variants_ratio = {
    normal: { ...variants.normal },
    focus: {
      ...variants.focus,
      background: 'rgba(122, 122, 155, 1)',
    },
    target: {
      ...variants.target,
      background: 'rgba(122, 122, 155, 0.1)',
    },
    nonTarget: {
      ...variants.nonTarget,
    },
  };

  const stateInputRatio = (dir: string) => {
    if (focus.type === 'ratio' && focus.dir === dir) {
      return 'focus';
    } else if (focus.type === 'pixel' && isCalcRatio) {
      return 'target';
    } else if (focus.type === 'pixel' && !isCalcRatio) {
      return 'nonTarget';
    }
    return 'normal';
  };

  return (
    <motion.input
      {...propsInput}
      name={`ratio_${dir}`}
      variants={variants_ratio}
      animate={stateInputRatio(dir)}
    />
  );
});
