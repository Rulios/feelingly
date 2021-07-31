import $ from "jquery";
import bootstrap from "bootstrap";
import useMemories from "./hooks/useMemories";
import useAlias from "./hooks/useAlias";
import useDiaries from "./hooks/useDiaries";
import ProfileButtonNavigation from "./components/ProfileButtonNavigation";
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import ProfileMemoryBox from "./components/ProfileMemoryBox";


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

 function WrittenMemoriesFeed({selfAlias, targetAlias}: WrittenMemoriesFeedProps){
    
    const [memories] = useMemories(targetAlias);
    const [diaries] = useDiaries(targetAlias);

     return (
        <div className="row pt-5">
            {memories.map(({id, title, content, visibility, created_at, diary_id}) => {
                return (
                    <ProfileMemoryBox
                        key={`Diary${diary_id}-Memory${id}`}
                        id={id}
                        title={title}
                        content={content}
                        visibility={visibility}
                        created_at={created_at}
                        diaryName={"Hola"}
                        onClick={() => console.log("clickes")}
                    />
                )
            })}
        </div>
     );
 }

 function DiariesFeed(){
     return (
        <div>

        </div>
     );
 }

