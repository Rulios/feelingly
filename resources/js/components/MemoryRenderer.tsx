import Memory from "../types/Memory";
import {useState} from "react";
import MemoryBox from "./MemoryBox";
import MemoryModal from "./MemoryModal";

type Props = {
    memories: Memory[] | null | undefined;    
    columns: 1 | 2 ; //represents the amounts of columns that the memories will be displayed in
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

export default function MemoryRenderer({memories, columns}: Props){
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
            <div className="row pt-2">
                {memories?.map((memory, index) => {


                    return (
                        <div className={`col-md-${12/columns as number}`} key={index}>
                            <MemoryBox
                                key={`Diary${memory.diary_id}-Memory${index}`}
                                memory={memory}
                                onClick={() => handleClickMemory(index)}
                            />
                        </div>
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
