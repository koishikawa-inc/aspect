import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';

import { motion } from 'framer-motion';
import React, { ReactNode, useState } from 'react';
import { HiCheck, HiClipboard } from 'react-icons/hi';

import Tippy from '@tippyjs/react';

type Props = {
  children: ReactNode;
  content: string;
};

export const ButtonCopy: React.FC<Props> = ({ content, children, ...props }) => {
  const [state, setState] = useState('none');

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(content);
    setState('done');

    setTimeout(() => {
      setState('none');
    }, 1000);
  };

  const handleOnHoverStart = () => {
    setState('will');
  };

  const handleOnHoverEnd = () => {
    setState('none');
  };

  return (
    <Tippy
      content={content}
      placement="bottom"
      theme="translucent"
    >
      <motion.button
        className="btn--copy"
        onClick={handleOnClick}
        onHoverStart={handleOnHoverStart}
        onHoverEnd={handleOnHoverEnd}
        data-is-copy={state === 'done'}
        layout
      >
        {state === 'none' && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {children}
          </motion.span>
        )}
        {state === 'will' && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <HiClipboard />
          </motion.span>
        )}
        {state === 'done' && (
          <motion.span
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: [null, 1, 1, 1, 0], scale: [null, 1.2, 1.0, 1, 0, 0] }}
            transition={{
              duration: 1,
              times: [0, 0.78, 0.85, 0.9, 1],
            }}
          >
            <HiCheck />
          </motion.span>
        )}
      </motion.button>
    </Tippy>
  );
};
