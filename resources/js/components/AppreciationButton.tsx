import React, {useContext, useState, useEffect} from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import HiddenContext from "../contexts/HiddenContext";
import axios from "axios";

type Props = {
 memory_id: string | number | undefined | null;
};


export default function AppreciationButton({memory_id}: Props){

    const [appreciation, setAppreciation] = useState(false);
   

    useEffect(() => {
      fetchAppreciation();
    }, []);


    const fetchAppreciation = async () => {
      try{
        const {data: {appreciation: appreciationResponse}} = await axios.get("/memories/fetch-appreciation", {
          params: {
            memory_id: memory_id
          }
        });

        setAppreciation(appreciationResponse);

      }catch(error){
        console.log(error);
      }
    };


    const toggleAppreciation = async () => {
      try{
        const {data:{appreciation: appreciationResponse}} = await axios.put("/memories/toggle-appreciation", {
          memory_id: memory_id
        });

        setAppreciation(appreciationResponse);


      }catch(error){
        console.log(error);
      }
    };


    return (
        <Fab  variant="extended" aria-label="like" onClick={toggleAppreciation}>
            <FavoriteIcon 
              style={{
                color: appreciation ? "red" : "initial"
              }}
            />
        </Fab>
    )
}