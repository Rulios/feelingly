import React, {useEffect, useState, useRef} from "react";
import Memory from "../types/Memory";
import VISIBILITY_TYPES from "../utils/VISIBILITY_TYPES";    
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import parseHTML from "html-react-parser";


import {makeStyles} from "@mui/styles";


import UserProfileImage from "./UserProfileImage";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Typography } from "@material-ui/core";
import { CardActionArea } from '@mui/material';

dayjs.extend(relativeTime);
dayjs.extend(utc);

type Props = {
    memory: Memory;
    showProfileImage?: boolean;
    onClick(): void;
}

const LINES_TO_SHOW = 3;


const useStyles = makeStyles({
  multiLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": LINES_TO_SHOW,
    "-webkit-box-orient": "vertical"
  }
});


export default function MemoryBox({
    memory: {id, title, content, visibility, created_at, diary_name, 
        user_alias, user_profile_image},
    showProfileImage = false,
    onClick
}: Props){

    const classes = useStyles();


    const hasClickedAuthor = useRef(false);

    return (
        <Box sx={{ minWidth: 275 }} className="mb-3">    
            <Card variant="outlined">
                <CardActionArea onClick={onClick}>
                    <CardHeader
                        title={<b>{title}</b>}
                        subheader={<i>{`in ${diary_name}`}</i>}
                    />

                    <CardContent>
                        <Typography 
                            className={classes.multiLineEllipsis}
                        >
                            {content}
                        </Typography>
                    </CardContent>

                    <CardHeader 
                        title={<Typography>{user_alias}</Typography>}
                        subheader={dayjs(created_at).utc(true).fromNow()}
                        avatar={<UserProfileImage url={user_profile_image} user={user_alias}/>}
                    />
                </CardActionArea>
            
            </Card>
        </Box>
    );
}