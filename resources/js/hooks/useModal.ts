import {useState, useEffect} from 'react';

import toggleBodyOverflow from '../utils/toggleBodyOverflow';

const useModal = () => {
    const [open, onOpenModal] = useState(false);
    const [close, onCloseModal] = useState(false);

    const openModal = () => {
        onOpenModal(true);
        toggleBodyOverflow(); //prevents scrolling while modal is open
    };

    const closeModal = () => {
        onCloseModal(true);
        onOpenModal(false);
        toggleBodyOverflow(); 
    };

    return { open, close, openModal, closeModal };
};

export default useModal;