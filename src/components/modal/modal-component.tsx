import React, { useEffect, useState } from 'react';
import { useViewport } from '../../context/viewPortContext';
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';
import { Modal } from './modal.styles';

export const ModalComponent = ({
  setSelectedImg,
  selectedImg,
  title,
}: {
  setSelectedImg: React.Dispatch<React.SetStateAction<string | null>>;
  selectedImg: string;
  title: string;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as Element;
    if (target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  // const [height, setHeight] = useState(0);
  // const [width, setWidth] = useState(0);

  // useEffect(() => {
  //   const width = window.innerWidth;
  //   const height = window.innerHeight;

  //   setHeight(height);
  //   setWidth(width);
  //   console.log(`Model open`);
  // }, [selectedImg]);

  // const { width, height } = useViewport();

  const width = 500;
  const height = 500;

  return (
    <Modal className="backdrop" onClick={handleClick}>
      <ProfilePictureComponent
        title={title}
        avatar={selectedImg}
        height={height}
        width={width}
      />
      {selectedImg}
    </Modal>
  );
};

export default ModalComponent;
