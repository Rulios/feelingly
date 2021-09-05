import {createContext} from 'react';
import Memory from '../types/Memory';
import Diary from '../types/Diary';

/**
 * This context stores all the related data with memories and diaries, needed to perform
 * operations and rendering at profile.tsx
 */

export default createContext({
    memoriesFetch: {
        status: "" as string | null,
        memories: [] as Memory[] | undefined | null,
        errorMemories: "" as string  | undefined | null
    },

    diariesFetch: {
        status: ""  as string | null,
        diaries: [] as Diary[] | undefined | null,
        errorDiaries: "" as string  | undefined
    }

});
