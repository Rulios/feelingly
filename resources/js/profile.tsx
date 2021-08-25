import $ from "jquery";
import bootstrap from "bootstrap";
import useMemories from "./hooks/useMemories";
import useAlias from "./hooks/useAlias";
import useDiaries from "./hooks/useDiaries";
import ProfileButtonNavigation from "./components/ProfileButtonNavigation";
import React, {useEffect, useState, useRef, memo} from "react";
import ReactDOM from "react-dom";
import ProfileMemoryBox from "./components/ProfileMemoryBox";
import { keyBy } from "lodash";
import Diary from "./types/Diary";
import stripHTML from "./utils/stripHTML";
import MemoryModal from "./components/MemoryModal";
import { Memory } from "@material-ui/icons";

/**
 * This line performs a bug fixer. I don't know why, but it seems
 * the need to call once bootstrap to be working on the page. 
 * It's isn't enough by importing it.
 * 
 */
 console.log(bootstrap);

 window.onload = function(){


    let selfAliasDOM:string  = (document.getElementById("s_user_alias") as HTMLInputElement).value;
    let targetAliasDOM:string = (document.getElementById("t_user_alias") as HTMLInputElement).value;

    ReactDOM.render(
        <App /* selfAliasDOM={selfAliasDOM} targetAliasDOM={targetAliasDOM} *//>,
        document.getElementById("root")
    );

 };

/*  interface AppProps{
    selfAliasDOM: string;
    targetAliasDOM: string;
}; */

 function App(){

    //TO DO: LIFT THE STATE FROM PROFILEBUTTONNAVIGATION TO HANDLE IT HERE

    const [profileNavigationOption, setProfileNavigationOption] = useState(0);

    const selfAlias = useAlias("self");
    const targetAlias = useAlias("target");

    return (
        <div>
            <div className="row mt-5">
                <ProfileButtonNavigation defaultValue={profileNavigationOption} newValue={setProfileNavigationOption}/>
                <hr className="mt-2"/>
            </div>

            {(profileNavigationOption === 0 && (targetAlias !== "" || selfAlias !== "")) &&
                <div>
                    <WrittenMemoriesFeed selfAlias={selfAlias} targetAlias={targetAlias}/>
                </div>
            }

            {(profileNavigationOption === 1) &&
                <div>
                    <DiariesFeed/>
                </div>
            }

        </div>
    );

 }

type WrittenMemoriesFeedProps = {
    selfAlias: string;
    targetAlias: string;
}

function toggleBodyOverflow(){
   /*  if(document.body.classList.contains("overflow-hidden")){
        document.body.classList.remove("overflow-hidden");
        document.body.classList.add("overflow-auto");
    }else{
        document.body.classList.add("overflow-hidden");
        document.body.classList.remove("overflow-auto");

    } */
    document.body.classList.toggle("overflow-hidden");
}

function WrittenMemoriesFeed({selfAlias, targetAlias}: WrittenMemoriesFeedProps){
    
    const [statusMemories, memories, errorMemories] = useMemories(targetAlias);
    const [statusDiaries, diaries, errorDiaries] = useDiaries(targetAlias);
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
        <div>
            <div className="row pt-5">
                {memories?.map(({id, title, content, visibility, created_at, diary_id}, index) => {
                    return (
                        <ProfileMemoryBox
                            key={`Diary${diary_id}-Memory${id}`}
                            id={id}
                            title={title}
                            content={stripHTML(content)}
                            visibility={visibility}
                            created_at={created_at}
                            diaryName={diariesName[id]?.name || ""}
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
        

     
     );
 }

 function DiariesFeed(){
     return (
        <div>

        </div>
     );
 }

