import { PropsInput } from '../components/Aspect/type';

export const useInput = (props: PropsInput, ref: React.ForwardedRef<HTMLInputElement>) => {
  const variants = {
    normal: { background: 'transparent' },
    focus: {
      color: 'var(--color-body)',
      boxShadow: '8px 8px 24px 4px rgb(0 0 0 / .4), 0 0 50px 0 rgb(0 0 0 / .25)',
    },
    target: {
      scale: 1.0,
    },
    nonTarget: {
      scale: 0.8,
      boxShadow: 'none',
      borderColor: 'transparent',
      background: 'transparent',
    },
  };

  const propsInput = {
    type: 'number',
    min: 1,
    max: 5000,
    ref,
    value: Math.round(props.dir === 'width' ? props.size.w : props.size.h),
    onChange: props.onChange,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
  };

  return { variants, propsInput };
};
