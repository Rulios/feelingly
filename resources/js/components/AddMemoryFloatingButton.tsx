import Modal from "react-modal";
import AddFloatButton from "./AddFloatButton";

import useModal from "../hooks/useModal";
import NewMemoryModal from "./NewMemoryModal";



Modal.setAppElement('#root');

/**
 * This is a bundle component. It consists of a add floating button, which
 * the when clicked, it will open the Modal to Add a New Memory.
 * @returns 
 */

export default function AddNewMemoryBundle(){

    const {open, openModal, closeModal} = useModal();

    return(
        <div className="mt-5">

            <div>
                <AddFloatButton _onClick={openModal}/>
            </div>

            <NewMemoryModal closeModal={closeModal} open={open}/>
        </div>
    );
}



