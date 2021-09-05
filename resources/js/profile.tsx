import $ from "jquery";
import bootstrap from "bootstrap";
import useMemories from "./hooks/useMemories";
import useAlias from "./hooks/useAlias";
import useDiaries from "./hooks/useDiaries";
import ProfileButtonNavigation from "./components/ProfileButtonNavigation";
import React, {useEffect, useState, useRef, useContext} from "react";
import ReactDOM from "react-dom";
import ProfileMemoryBox from "./components/ProfileMemoryBox";
import { keyBy } from "lodash";
import Diary from "./types/Diary";
import stripHTML from "./utils/stripHTML";
import MemoryModal from "./components/MemoryModal";
import ProfileContext from "./contexts/ProfileContext";
//import {HiddenContextProvider, HiddenContextConsumer} from "./contexts/HiddenContext";
import HiddenContext from "./contexts/HiddenContext";

/**
 * This line performs a bug fixer. I don't know why, but it seems
 * the need to call once bootstrap to be working on the page. 
 * It's isn't enough by importing it.
 * 
 */
 console.log(bootstrap);

 window.onload = function(){

    ReactDOM.render(
        <App/>,
        document.getElementById("root")
    );

 };


 function App(){

    //TO DO: LIFT THE STATE FROM PROFILEBUTTONNAVIGATION TO HANDLE IT HERE

    const [profileNavigationOption, setProfileNavigationOption] = useState(0);

    const selfAlias = useAlias("self");
    const targetAlias = useAlias("target");

    const [statusMemories, memories, errorMemories] = useMemories(targetAlias);
    const [statusDiaries, diaries, errorDiaries] = useDiaries(targetAlias);

    return (
        <HiddenContext.Provider value={{
            selfAlias: selfAlias,
            targetAlias: targetAlias
        }}>
            <ProfileContext.Provider value= {{
                memoriesFetch: {
                    status: statusMemories,
                    memories: memories,
                    errorMemories: errorMemories
                },
                diariesFetch:{
                    status: statusDiaries,
                    diaries: diaries,
                    errorDiaries: errorDiaries
                }
                
            }}>
                <div>
                    <div className="row mt-5">
                        <ProfileButtonNavigation defaultValue={profileNavigationOption} newValue={setProfileNavigationOption}/>
                        <hr className="mt-2"/>
                    </div>

                    {(profileNavigationOption === 0 && (targetAlias !== "" || selfAlias !== "")) &&
                        <div>
                            <WrittenMemoriesFeed />
                        </div>
                    }

                    {(profileNavigationOption === 1) &&
                        <div>
                            <DiariesFeed/>
                        </div>
                    }

                </div>
            </ProfileContext.Provider>
        </HiddenContext.Provider>
        
    );

 }



function toggleBodyOverflow(){
    document.body.classList.toggle("overflow-hidden");
}

function WrittenMemoriesFeed(){
    
    const {diariesFetch: {diaries}} = useContext(ProfileContext);
    const [diariesName, setDiariesName] = useState(keyBy(diaries, "id"));

    const [selectedMemoryIndex, setSelectedMemoryIndex] = useState(-1);
    const [modalOpen, setModalOpen] = useState(false);


    
    useEffect(() => {
        setDiariesName(keyBy(diaries, "id"));
    }, [diaries]);

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
        <ProfileContext.Consumer>
            {
                ({memoriesFetch : {memories}}) => (
                    <div>
                        <div className="row pt-5">
                            {memories?.map(({id, title, content, visibility, created_at, diary_id, diary_name}, index) => {
                                return (
                                    <ProfileMemoryBox
                                        key={`Diary${diary_id}-Memory${id}`}
                                        id={id}
                                        title={title}
                                        content={stripHTML(content)}
                                        visibility={visibility}
                                        created_at={created_at}
                                        diaryName={diary_name || ""}
                                        onClick={() => handleClickMemory(index)}
                                    />
                                )
                            })}
                        </div>

                            
                        <MemoryModal
                            memory={memories ? memories[selectedMemoryIndex] : null}
                            shouldOpen={modalOpen}
                            handleClose={handleCloseMemory}
                        />
                    </div>
                )
            }
            
        </ProfileContext.Consumer>
     );
 }
 

 function DiariesFeed(){
     return (
        <div>

        </div>
     );
 }

