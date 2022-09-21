import React, {Fragment} from 'react';
import './App.css';
import {Home} from "./page/home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Video} from "./page/video";
import {ChartModel} from "./page/video/children/ChartModel";
import {GalleryModel} from "./page/video/children/GalleryModel";
import {Provider} from "react-redux";
import {store} from "./store";

function App() {
    return (
        <Provider store={store}>
            <Fragment>
                <div className={"App"}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/video" element={<Video/>}/>
                            <Route path="/video/gallery" element={<GalleryModel/>}/>
                            <Route path="/video/chart" element={<ChartModel/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </Fragment>
        </Provider>
    );
}

export default App;
