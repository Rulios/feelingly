interface Diary {
    [key: string | number]: any;
    id: string ; 
    name: string;
    description: string;
    visibility: string;
    created_at: string;
}

export default Diary;