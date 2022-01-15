import { useEffect, useState } from "react";
import Diary from "../types/Diary";
import useFetch from "./useFetch";
import axios from "axios";



export default function useDiaries(alias: string): 
    [status: string, data ?: Diary[], error?: string] {

        //TO DO, CHANGE THIS SHIT

    //const {status, data, error}: any = {};



    //const {status, data, error} = useFetch<Diary[]>(alias ? `/profile/${alias}/diaries`: null);
    let [data, setData] = useState<Diary[]>([]);
    let [error, setError] = useState("");
    let [status, setStatus] = useState("");

    useEffect(() => {

        if(alias){
            axios.get(`/profile/${alias}/diaries`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                setError(err);
            });

        }
    }, [alias]);

    return [status, data, error];

    
}