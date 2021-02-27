import React from 'react';
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

  return (
    <Modal className="backdrop" onClick={handleClick}>
      {/* <ModalImage> */}
      <ProfilePictureComponent title={title} avatar={selectedImg} />
      {/* <img src={selectedImg} alt="enlarged pic" /> */}
      {selectedImg}
      {/* </ModalImage> */}
    </Modal>
  );
};

export default ModalComponent;
