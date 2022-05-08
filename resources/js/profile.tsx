import $ from "jquery";
import "bootstrap";
import React, {useEffect, useState, useRef, useContext} from "react";
import ReactDOM from "react-dom";

import Memory from "./types/Memory";
import Diary from "./types/Diary";

import useMemories from "./hooks/useMemories";
import useAlias from "./hooks/useAlias";
import useDiaries from "./hooks/useDiaries";
import useModal from "./hooks/useModal";

import HiddenContext from "./contexts/HiddenContext";

import ProfileButtonNavigation from "./components/ProfileButtonNavigation";
import ProfileDiaryBox from "./components/ProfileDiaryBox";
import DiaryModal from "./components/DiaryModal";
import MemoryRenderer from "./components/MemoryRenderer";
import FollowButton from "./components/FollowButton";

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
           
            <div>
                <div className="row mt-5">
                    <ProfileButtonNavigation defaultValue={profileNavigationOption} newValue={setProfileNavigationOption}/>
                    <hr className="mt-2"/>
                </div>

                {(profileNavigationOption === 0 && (targetAlias !== "" || selfAlias !== "")) &&
                    <div className="">
                        <WrittenMemoriesFeed memories={memories}/>
                    </div>
                }

                {(profileNavigationOption === 1) &&
                    <div>
                        <DiariesFeed memories={memories} diaries={diaries}/>
                    </div>
                }

            </div>
        </HiddenContext.Provider>
        
    );

 }



interface WrittenMemoriesFeedProps{
    memories : Memory[] | undefined;
}
function WrittenMemoriesFeed({memories}: WrittenMemoriesFeedProps){

     return (
        <MemoryRenderer
            memories={memories}
            columns={2}
        />
     );
 }
 
interface DiariesFeedProps{
    memories : Memory[] | undefined;
    diaries : Diary[] | undefined;
}
 function DiariesFeed({memories, diaries}: DiariesFeedProps){

    const {open, openModal, closeModal} = useModal();
    const [selectedDiaryIndex, setSelectedDiaryIndex] = useState(-1);

    const handleClickDiary = (diaryIndexPosition: number) => {
        setSelectedDiaryIndex(diaryIndexPosition);
        openModal();
    }

    /**
     * Sets the modal open state to false to close it
     */
     const handleCloseDiaryModal = () => {
        closeModal();
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

            {open && 
                        
                <DiaryModal
                    diary={diaries ? diaries[selectedDiaryIndex] : null}
                    memories={memories?.filter(filterMemoryByDiaryID)}
                    shouldOpen={open}
                    handleClose={handleCloseDiaryModal}
                />
            }
        </div>
     );
 }

