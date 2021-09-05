import Memory from "../types/Memory";
import useFetch from "./useFetch";


export default function useMemories(alias: string): [status: string, data ?: Memory[], error?: string]{


    const {status, data, error} = useFetch<Memory[]>( alias ? `/profile/${alias}/memories` : null);
    
    
    return [status, data, error];
}