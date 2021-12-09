import React, {useState, useEffect} from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import useAlias from "../hooks/useAlias";

type Props = {
    setIsFollowing?: (isFollowing: boolean) => void,
}


/**
 * This component is used to follow or unfollow a user.
 * Also it can return the following status of the user.
 * @param param0 
 * @returns 
 */

export default function FollowButton({setIsFollowing}: Props) {

    const [isFollowing, setIsFollowingState] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const targetUserAlias = useAlias("target");
    const selfAlias = useAlias("self");


    useEffect(() => {

        if(targetUserAlias){
            axios.get(`/profile/actions/is_following`, {
                params: {
                    followed_user_alias: targetUserAlias
                }
            })
                .then(res => {
                    setIsFollowingState(res.data.followed);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

    }, [targetUserAlias]);

    const follow = () => {
        axios.post("/profile/actions/follow", {
            followed_user_alias: targetUserAlias
        })
            .then(res => {
                setIsFollowingState(true);
                if (setIsFollowing) {
                    setIsFollowing(true);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const unFollow = () => {
        axios.post("/profile/actions/unfollow", {
            followed_user_alias: targetUserAlias
        })
            .then(res => {
                setIsFollowingState(false);
                if (setIsFollowing) {
                    setIsFollowing(false);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    if(isLoading || selfAlias === targetUserAlias) {
        return null;
    }else{
        return ( 
            <Button
                variant={isFollowing ? "outlined" : "contained"}
                color="primary"
                onClick={isFollowing ? unFollow : follow}
            >
                {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
        );
    }


}
