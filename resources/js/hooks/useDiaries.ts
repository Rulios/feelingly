import React, {FC, useState, useEffect, memo} from "react";
import Diary from "../types/Diary";
import axios from "axios";


/* type fetchedOptions = {
    [key:string]: any
} */

export default function useDiaries(alias:string): [Diary[], (newDiaries: any)=>void]{

    const [diaries, setDiaries] = useState([]);

    useEffect(() =>{
        axios.get(`/profile/${alias}/diaries`)
        .then(({data}) => {
            setDiaries(data);
        })
        .catch(err =>{
            console.log(err);
        });

    }, []);

    return [diaries, setDiaries];
}