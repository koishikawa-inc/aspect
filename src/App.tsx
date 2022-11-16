import './App.scss';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { HiDocumentDownload, HiPlus } from 'react-icons/hi';
import uuid from 'react-uuid';

import { Aspect } from './components/Aspect';
import { TypeAspect } from './components/Aspect/type';
import { useHelper } from './hooks/useHelper';

function App() {
  const { loadImage } = useHelper();
  const [data, setData] = useState<TypeAspect[]>([{ id: uuid(), file: { name: '', src: '' }, size: { w: 1920, h: 1080 } }]);

  const handleOnDropFiles = (files: File[]) => {
    for (const file of files) {
      loadImage(file, (image) => {
        const newItem = {
          id: uuid(),
          file: {
            name: file.name,
            src: URL.createObjectURL(file),
          },
          size: { w: image.naturalWidth, h: image.naturalHeight },
        };
        setData((current) => [...current, newItem]);
      });
    }
  };

  const handleOnDropFilesRejected = (fileRejections: FileRejection[]) => {
    console.log('rejected', fileRejections);
  };

  const onAdd = (id: string) => {
    const newItem = { id: uuid(), file: { name: '', src: '' }, size: { w: 1920, h: 1080 } };

    const i = data.findIndex((item) => item.id === id);
    setData((current) => [...current.slice(0, i + 1), newItem, ...current.slice(i + 1)]);
  };

  const onDelete = (id: string) => {
    const i = data.findIndex((item) => item.id === id);
    setData((current) => [...current.slice(0, i), ...current.slice(i + 1)]);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="content">
          <div className="header__body">
            <h1>Aspect</h1>
            <p className="credit">created by Hiroto Sawada</p>
          </div>
        </div>
      </header>
      <main>
        <div className="section">
          <div className="content">
            <Dropzone
              onDrop={handleOnDropFiles}
              onDropRejected={handleOnDropFilesRejected}
              accept={{ 'image/*': [] }}
            >
              {({ getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive, ...prop }) => {
                return (
                  <div
                    {...getRootProps()}
                    className={`dropzone ${isDragActive && 'isDragActive'} ${isDragAccept && 'isDragAccept'} ${isDragReject && 'isDragReject'}`}
                  >
                    <input {...getInputProps()} />
                    <div>
                      Add Images
                      <p style={{ fontSize: '2em' }}>
                        <HiDocumentDownload />
                      </p>
                      <p>Drag &amp; drop some files here, or click to select files</p>
                      {isDragReject && <p>画像以外のファイルが含まれています</p>}
                    </div>
                  </div>
                );
              }}
            </Dropzone>
          </div>
        </div>

        <div>
          <AnimatePresence initial={true}>
            {data.map((item, i) => {
              const handleOnChange = ({ file, size }: TypeAspect) => {
                setData((current) => current.map((d) => (item.id === d.id ? { ...d, file, size } : d)));
              };

              return (
                <div
                  className="aspect__wrapper"
                  key={item.id}
                >
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ overflow: 'hidden' }}
                    key={`${item.id}-1`}
                  >
                    <div className="section--aspect">
                      <Aspect
                        data={item}
                        onChange={handleOnChange}
                        onAdd={onAdd}
                        onDelete={onDelete}
                      />
                    </div>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, x: '-50%', y: '50%', scale: 0 }}
                    animate={{ opacity: 1, x: '-50%', y: '50%', scale: 1 }}
                    exit={{ opacity: 0, x: '-50%', y: '50%', scale: 0 }}
                    transition={{ duration: 0.6 }}
                    className="btn--icon action-add"
                    onClick={() => onAdd(item.id)}
                    key={`${item.id}-2`}
                    style={{ display: 'block' }}
                  >
                    <HiPlus />
                  </motion.button>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* <footer>
        <ul className="description">
          <li>縦横ピクセル数を入力して、縦横アスペクト比を計算する</li>
          <li>縦（横）ピクセル数を入力して、横（縦）ピクセル数を計算する</li>
          <li>縦（横）比を入力して、横（縦）ピクセル数を計算する</li>
          <li>2倍のピクセル数を計算する</li>
          <li>3倍のピクセル数を計算する</li>
        </ul>
      </footer> */}
    </div>
  );
}

export default App;
