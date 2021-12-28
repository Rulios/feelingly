import $ from "jquery";
import bootstrap from "bootstrap";
import useMemories from "./hooks/useMemories";
import useAlias from "./hooks/useAlias";
import useDiaries from "./hooks/useDiaries";
import ProfileButtonNavigation from "./components/ProfileButtonNavigation";
import React, {useEffect, useState, useRef, useContext} from "react";
import ReactDOM from "react-dom";
import Memory from "./types/Memory";

import ProfileContext from "./contexts/ProfileContext";
import HiddenContext from "./contexts/HiddenContext";
import ProfileDiaryBox from "./components/ProfileDiaryBox";
import DiaryModal from "./components/DiaryModal";
import MemoryRenderer from "./components/MemoryRenderer";

import FollowButton from "./components/FollowButton";

/**
 * This line performs a bug fixer. I don't know why, but it seems
 * the need to call once bootstrap to be working on the page. 
 * It's isn't enough by importing it.
 * 
 */
 console.log(bootstrap);

 window.onload = function(){

    //this react render should probably change in the future
    ReactDOM.render(
        <FollowButton/>,
        document.getElementById("followBtn")
    );

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
                        <div className="">
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

     return (
        <ProfileContext.Consumer>
            {
                ({memoriesFetch : {memories}}) => (
                    <MemoryRenderer
                        memories={memories}
                        columns={2}
                    />
                )
            }
            
        </ProfileContext.Consumer>
     );
 }
 

 function DiariesFeed(){

    const {diariesFetch: {diaries}, memoriesFetch: {memories}} = useContext(ProfileContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDiaryIndex, setSelectedDiaryIndex] = useState(-1);

    const handleClickDiary = (diaryIndexPosition: number) => {
        setSelectedDiaryIndex(diaryIndexPosition);
        setModalOpen(true);
        toggleBodyOverflow();
    }

    /**
     * Sets the modal open state to false to close it
     */
     const handleCloseDiaryModal = () => {
        setModalOpen(false);
        toggleBodyOverflow();
    };

    const filterMemoryByDiaryID = (memory: Memory) => {
        let hasUserSelectedADiary = selectedDiaryIndex !== -1;

        if(diaries && hasUserSelectedADiary){
            return memory.diary_id === diaries[selectedDiaryIndex].id;
        }
    };

    return (
        <div>
            {
                diaries && 
               
                diaries.map((diary, index) => {
                    return (<ProfileDiaryBox
                        key={`ProfileDiaryBox-${diary.id}`}
                        diary={diary}
                        onClick={() => handleClickDiary(index)}
                    />);
                })
            }

            {modalOpen && 
                        
                <DiaryModal
                    diary={diaries ? diaries[selectedDiaryIndex] : null}
                    memories={memories?.filter(filterMemoryByDiaryID)}
                    shouldOpen={modalOpen}
                    handleClose={handleCloseDiaryModal}
                />
            }
        </div>
     );
 }

