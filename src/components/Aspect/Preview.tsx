import React, { forwardRef, MutableRefObject, RefObject, useEffect, useState } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';

import { useHelper } from '../../hooks/useHelper';
import { TypeSize } from './type';

// type PropsPreview = {
//   src: string;
//   onChange: (name: string, src: string, size: TypeSize) => void;
// };

// export const PreviewR = forwardRef<HTMLInputElement, PropsPreview>((props, ref) => {
//   return <Preview {...props} ref={ref} />;
// });

type Props = {
  src: string;
  onChange: (name: string, src: string, size: TypeSize) => void;
};

export const Preview = React.memo(({ src, ...props }: Props) => {
  const { loadImage } = useHelper();
  const handleOnChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files || files?.length === 0) return;
    const file = files[0];

    const img = new Image();
    img.onload = () => {
      props.onChange(file.name, URL.createObjectURL(file), { w: img.naturalWidth, h: img.naturalHeight });
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(file);
  };
  const handleOnDropFiles = (files: File[]) => {
    // const files = event.currentTarget.files;
    // if (!files || files?.length === 0) return;
    const file = files[0];

    // const img = new Image();
    // img.onload = () => {
    //   props.onChange(file.name, URL.createObjectURL(file), { w: img.naturalWidth, h: img.naturalHeight });
    //   URL.revokeObjectURL(img.src);
    // };

    // img.src = URL.createObjectURL(file);

    loadImage(file, (image) => {
      props.onChange(file.name, URL.createObjectURL(file), { w: image.naturalWidth, h: image.naturalHeight });
      URL.revokeObjectURL(image.src);
    });
  };

  return (
    <Dropzone
      onDrop={handleOnDropFiles}
      // onDropRejected={handleOnDropFilesRejected}
      multiple={false}
      accept={{ 'image/*': [] }}
    >
      {({ getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive, ...prop }) => {
        return (
          <div
            {...getRootProps()}
            className={`preview ${isDragActive && 'isDragActive'} ${isDragAccept && 'isDragAccept'} ${isDragReject && 'isDragReject'}`}
          >
            <input {...getInputProps()} />
            <img
              src={src}
              alt=""
            />
          </div>
        );
      }}
    </Dropzone>
  );
});
