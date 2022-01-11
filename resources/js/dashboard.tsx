import "bootstrap";
import $ from "jquery";
import ReactDOM from "react-dom";
import React, {FC, useState, useEffect, useRef} from "react";

import AddNewMemoryBundle from "./components/AddNewMemoryBundle";

import axios from "axios";
import useModal from "./hooks/useModal";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import MemoryRenderer from "./components/MemoryRenderer";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import Memory from "./types/Memory";

window.onload = () =>{
    
    ReactDOM.render(
        <App/>,
        document.getElementById("root")
        );
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ffffff" //white
        },

        secondary: {
            main: "#00baff"
        }
    },

    typography:{
        fontFamily: "Roboto Slab",
    }
});

const useStyles = makeStyles({  
    tab: {
        boxShadow: "none",
        marginBottom: "1em"
    }
});
    
    
function App(): JSX.Element{
        /**TOGGLER */
        //TO DOOOOO, IMPLEMENT THE DASHBOARD FETCHING AND MEMORY BOX HEERE
        
    const [ tabIndex, setTabIndex ] = useState(0);

    const classes = useStyles();

    const sliderRef = useRef() as React.MutableRefObject<Slider>;



    useEffect(() => {
        sliderRef.current.slickGoTo(tabIndex);
    }, [tabIndex]);

    //for the tabs
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabIndex(newValue);
    };

    //for the swipeable views
    const handleChangeIndex = (index:number) => {
        setTabIndex(index);
    };



    //TO DO: FIX THE FUCKING MODAL, MAKE IT SHOW FULL SCREEN. NOT ONLY THE DIV
    
    return (
        <div>

            <div>
                <ThemeProvider theme={theme}>
                    <AppBar position="static" className={classes.tab}>
                        <Tabs
                            value={tabIndex}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                            centered
                        >
                            <Tab label="Following"  />
                            <Tab label="Global"  />
                        </Tabs>
                    </AppBar>
                </ThemeProvider>
                
                <Slider beforeChange={(oldIndex, newIndex) => handleChangeIndex(newIndex)} 
                    ref={sliderRef}
                    accessibility={false}
                    arrows={false}
                    dots={false}
                    draggable={true}
                    infinite={false}
                    slidesToShow={1}
                    slidesToScroll={1}
                >
                    <div >
                        <FollowersFeed/>
                    </div>
                    
                    <div>
                        dawdd
                    </div>

                </Slider>

            </div>

            <AddNewMemoryBundle/>
        </div>
    );
}

function FollowersFeed(){

    const [memories, setMemories] = useState<Memory[]>([]);
    const [amountFetched, setAmountFetched] = useState(0);

    console.log(memories)

    useEffect(() => {

        axios.get("/dashboard/feed-followers", {
            params:{
                amountFetched: amountFetched
            }
        })
        .then(function(response){
            setMemories(memories.concat(response.data));
            setAmountFetched(amountFetched + response.data.length);
        })
        .catch(error => {
            console.log(error);
        });

    }, []);

    return (
        <div className="">
            <MemoryRenderer memories={memories} columns={1}/>
        </div>
    );
}


