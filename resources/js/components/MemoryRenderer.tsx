import Memory from "../types/Memory";
import {useState} from "react";
import ProfileMemoryBox from "./ProfileMemoryBox";
import MemoryModal from "./MemoryModal";

type Props = {
    memories: Memory[] | null | undefined;    
};


function toggleBodyOverflow(){
    document.body.classList.toggle("overflow-hidden");
}

/**
 * This component serves as a bundler for joining two component types at a time. 
 * The Memory Box and the Memory Modal. 
 * Both are handled here in this component. 
 * 
 * @param memories as Props
 * @returns 
 */

export default function MemoryRender({memories}: Props){
    const [selectedMemoryIndex, setSelectedMemoryIndex] = useState(-1);
    const [modalOpen, setModalOpen] = useState(false);

    /**
     * Gets the memory position and updates the state.
     * The memory position refers to its parent array. 
     * So it can be shown at the modal. 
     * 
     * Also it sets the modal to be open
     * @param memoryPosition 
     */

    const handleClickMemory = (memoryPosition: number) => {
            setSelectedMemoryIndex(memoryPosition);
            setModalOpen(true);
            toggleBodyOverflow();
    }

    /**
     * Sets the modal open state to false to close it
     */
    const handleCloseMemory = () => {
        setModalOpen(false);
        toggleBodyOverflow();
    };

    return (
        <div>
            <div className="row pt-5">
                {memories?.map((memory, index) => {
                    return (
                        <ProfileMemoryBox
                            key={`Diary${memory.diary_id}-Memory${index}`}
                            memory={memory}
                            onClick={() => handleClickMemory(index)}
                        />
                    )
                })}
            </div>

            {modalOpen && 
            
                <MemoryModal
                    memory={memories ? memories[selectedMemoryIndex] : null}
                    shouldOpen={modalOpen}
                    handleClose={handleCloseMemory}
                />
            }
        </div>
    );
}
