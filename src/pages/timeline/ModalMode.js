import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { ToggleButton } from 'primereact/togglebutton';
import { useSelector } from "react-redux";
import { TIMELINE } from "constants/timeline";
import PostForm from './PostForm';
import { closeModal } from "store/modules/modal";
import PostJobModal from './PostJobModal';

const ModalMode = ({ onHide, post, imageUrl }) => {
  const modalName = useSelector(state => state.modal.name);
  const modalVisible = modalName === TIMELINE.EDITPOST || modalName === TIMELINE.CREATEPOST || modalName === TIMELINE.ACTIVEUSERPICTURE || modalName === TIMELINE.POSTIMAGE;
  const [toggle, setToggle] = useState(true)
  const createPost_Title = "Create a Post";
  const EditPost_Title = "Edit your Post";
  const dialogTitle = modalName === TIMELINE.EDITPOST ? EditPost_Title : modalName === TIMELINE.CREATEPOST ? createPost_Title : "";

  const toggleModal = () => {
    const displayPostForm = toggle === true ? false : true;
    setToggle(displayPostForm);
  }

  const onModalClose = () => {
    closeModal();
    onHide();
  }

  return (
    <>
      <Dialog header={dialogTitle} visible={modalVisible} onHide={onModalClose} style={{ width: "60rem" }} className='dialogModal-timeline'>
        {/* {
          (modalName === TIMELINE.CREATEPOST || modalName === TIMELINE.CREATEJOB) &&
          < ToggleButton
            checked={toggle}
            onChange={toggleModal} />
        } */}
        {
          (modalName === TIMELINE.CREATEPOST || modalName === TIMELINE.EDITPOST) && toggle &&
          <PostForm
            post={post}
            clearModalInput={onHide}
          />
        }
        {
          !toggle &&
          <PostJobModal
          />
        }
        {
          imageUrl &&
          (modalName === TIMELINE.ACTIVEUSERPICTURE || modalName === TIMELINE.POSTIMAGE) &&
          <div>
            <img src={imageUrl} className="timeline-profilepic-expanded"
            />
          </div>
        }
      </Dialog>
    </>

  );
}

export default ModalMode;
