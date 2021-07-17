import React, {FC, useState, useEffect, memo} from "react";
import Memory from "../types/Memory";
import axios from "axios";



export default function useMemories(alias:string): [Memory[], (newMemories: any)=>void]{

    const [memories, setMemories] = useState([]);

    useEffect(() =>{
        axios.get(`/profile/${alias}/memories`)
        .then(({data}) => {
            setMemories(data);
        })
        .catch(err =>{
            console.log(err);
        });

    }, []);

    return [memories, setMemories];
}