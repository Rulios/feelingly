import Diary from "../types/Diary";
import useFetch from "./useFetch";



export default function useDiaries(alias: string): 
    [status: string, data ?: Diary[], error?: string] | 
    [null, null, string]{

        //TO DO, CHANGE THIS SHIT

    const {status, data, error} = useFetch<Diary[]>(alias ? `/profile/${alias}/diaries`: null);

    return [status, data, error];
    
}