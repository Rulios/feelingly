import React, {FC, useState, useEffect, memo} from "react";
import Diary from "../types/Diary";
import axios from "axios";

export default function useDiaries(): Diary[]{

    useEffect(() =>{

        try{

            const fetchDiaries = async () => {
                return await axios.get("/diaries");
            };

        }catch(error){

        }


    }, []);

    return [];
}