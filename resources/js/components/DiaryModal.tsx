import React, {useRef, useContext} from "react";
import Diary from "../types/Diary";
import Memory from "../types/Memory";

import CloseModalButton from "./CloseModalButton";
import MemoryRenderer from "./MemoryRenderer";
import FixedModal from "./FixedModal";

type Props = {
    diary?: Diary | null;
    memories?: Memory[] | null; 
    shouldOpen: boolean;
    handleClose: () => void; 
};

export default function DiaryModal({
    diary, memories, shouldOpen, handleClose
}: Props){
    

    return (
        <FixedModal>

            <div className={`${shouldOpen ? "show" : "d-none"}`}>

                <div className="c-modal">     
            
                    <div className="content p-3">
                    
                        <div className="sticky-top">
                            <CloseModalButton onClick={handleClose}/>
                        </div>

                        <div className="inline">

                            <div>
                                <h4 className="title">
                                    {diary?.name}
                                </h4>

                                <br />

                                <div className="details">

                                    <div className="">
                                        Description
                                    </div>

                                    <div className="">
                                        {`written by ${diary?.user_name}`}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <hr/>

                        <div className="row">
                            <MemoryRenderer
                                memories={memories}
                                columns={2}
                            />
                        </div>

                    </div>  
                        
                </div>
                
            </div>
        </FixedModal>
    );

};