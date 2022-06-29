import "bootstrap";
import $ from "jquery";
import ReactDOM from "react-dom";
import React, {FC, useState, useEffect, useRef} from "react";


import axios from "axios";
import useModal from "./hooks/useModal";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import AddNewMemoryForm from "./components/AddNewMemoryForm";
import MemoryRenderer from "./components/MemoryRenderer";
import CenterMessageVisualizer from "./components/CenterMessageVisualizer";

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
                        <GlobalFeed/>
                    </div>

                </Slider>

            </div>

            <AddNewMemoryForm/>
        </div>
    );
}

function FollowersFeed(){

    const [memories, setMemories] = useState<Memory[]>([]);
    const [amountFetched, setAmountFetched] = useState(0);

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


    if(memories.length === 0){
        return <CenterMessageVisualizer 
            message="Ooops, you don't follow anyone. Start following someone to see their memories here."
            media={<img alt="A person thinking" style={{width: "30%", margin: "auto"}} src="/assets/guy-thinking.png"/>}
        />

    }

    return (
        <div className="">
            <MemoryRenderer memories={memories} columns={1}/>
        </div>
    );
}


function GlobalFeed(){

    const [memories, setMemories] = useState<Memory[]>([]);
    const [amountFetched, setAmountFetched] = useState(0);

    useEffect(() => {

        axios.get("/dashboard/feed-global", {
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
