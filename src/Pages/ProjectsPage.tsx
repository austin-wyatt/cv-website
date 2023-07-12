import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../CSSDefinitions/ProjectPage.css';
import textureAtlasImage from '../Resources/texture_atlas_test.png'
import driverClientImage from '../Resources/keyboard-full.png'
import videoControllerGUIImage from '../Resources/video-controller-gui.png'
import videoControllerPlaylistImage from '../Resources/video-controller-playlist.png'
import fileTransferImage from '../Resources/file-transfer-example.png'

interface IProps {
    setTitle: (title: string) => void
}

const textStyle: React.CSSProperties = {
    textAlign: "left",
    margin: 15,
    wordWrap: "normal", 
    whiteSpace: "pre-wrap",
    lineHeight: 1.25
}

const ProjectsPage = (props: IProps) => {

    const location = useLocation();

    let projectName = new URLSearchParams(location.search).get("proj");

    useEffect(() => {
        props.setTitle("Projects")

        if (projectName != "") {
            let element = document.getElementById(projectName + '+')
            element?.scrollIntoView({ block: "start" });
            window.scrollBy(0, -75);
        }
    }, [])

    let macroEmbedSize = window.outerWidth > 500 ? {width: "100%", height: 500} : {width: 300, height: 169}

    return (
        <div className="App Dark-primary">
            <p style={{...textStyle, marginTop: 25}}>
                This page contains detailed descriptions of my most interesting projects. <br/> <br/>
                Note: This is not every project I've ever worked on, but these comprise most of the projects that
                I would consider both complete and technically complicated enough to share.
            </p>
            
            {/* GAME ENGINE */}
            <h1 id="game+" style={{marginTop: 50}}>
                Game Engine
            </h1>
            <div style={{...textStyle, marginTop: 25}}>
                An entirely from-scratch custom OpenGL game engine written in C#. <br/>
                This project was a full time effort completed over the course of an entire year. 
                Including the main project as well as external tooling that I developed, the total lines of code that comprise the project easily surpass 100k+. <br/><br/>
                <a style={{color:"#80A375"}} href="https://github.com/austin-wyatt/GameEngine">GitHub Link</a>
                <br/>
                <h2>Libraries Used:</h2>
                
                <ul className="Projects-List-Styling">
                    <li>
                        OpenTK - Provides C# GLFW bindings as well as a convenient window manager
                    </li>
                    <li>
                        FreeType - Glyph rasterizer
                    </li>
                    <li>
                        Microsoft ClearScript - An embeddable V8 JavaScript engine for C#
                    </li>
                    <li>
                        NVorbis - Ogg file decoder
                    </li>
                </ul>
                <br/>
                <h2>General Features Implemented:</h2>
                <ul className="Projects-List-Styling">
                    <li>
                        <h3>Custom UI Library</h3>
                        <ul className="Projects-List-Styling">
                            <li>
                                Arbitrary unicode font rendering (except for ligatures)
                            </li>
                            <li>
                                Font glyphs are rendered by first being rasterized into a 4000x4000 glyph map that holds all generated glyphs. 
                                Glyphs are strategically placed within cells of this map to minimize wasted memory. When the glyph map becomes full,
                                less-used cells are culled and any glyphs contained within must be reloaded to be used again.
                            </li>
                            <li>
                                A standard selection of default user interface elements: list, button, text input, text field, modals, tooltips, combo boxes, and scrollable views
                            </li>
                            <li>
                                Relative element positioning. Layout based element rendering was (is?) in the works
                            </li>
                            <li>
                                A custom event and property system for handling many of the common user interface states. 
                                These are events such as scrolling, focusing, hovering, clicking, typing, selecting, and dragging
                            </li>
                            <li>
                                Since UI elements are derived from the basic render object of my engine, they can be styled and animated in any way
                            </li>
                            <li>
                                UI elements are stored in a tree hierarchy and support selective updating (which greatly improves performance) as well as event propagation
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h3>Rendering</h3>
                        <ul className="Projects-List-Styling">
                            <li>
                                3D objects can be imported in the .obj format. More formats can be added when necessary but at the moment only .obj is supported
                            </li>
                            <li>
                                Ambient, directional, and spot lighting is supported
                            </li>
                            <li>
                                Instanced object and particle rendering to support very large render batches
                            </li>
                            <li>
                                Randomly generated terrain meshes and optimized handling for loading over 50,000 game tiles at a time
                            </li>
                            <li>
                                Frustum culling to hide objects when out of sight to improve performance
                            </li>
                            <li>
                                Dynamic texture loading and animation system that allows textures within a spritesheet to be loaded as an animation 
                                and applied to any arbitrary renderable object
                            </li>
                            <li>
                                Heavily optimized render path to minimize GPU state changes and maximize performance
                            </li>
                            <li>
                                Support for skyboxes, render post-processing steps, and shader hot swapping
                            </li>
                        </ul>
                        <h3>Gameplay</h3>
                        <ul className="Projects-List-Styling">
                            <li>
                                Terrain is a hex tile system in an open world. Over 50,000 tiles can be loaded at once
                            </li>
                            <li>
                                An entire turn-based strategy game is implemented including abilities, buffs, items, unit variety with unique stats, turn-based combat,
                                unit AI, talent trees, and terrain effects
                            </li>
                            <li>
                                Unit's use a "fog of war" system whereby every unit can only see a certain radius of tiles around them. This vision can be obstructed by
                                obstacles and terrain and potentially spans the entire set of 50,000 loaded tiles. After many major reworks and tweaking, the vision system has been 
                                optimized such that hundreds of units can be present and updating their vision constantly with no performance degradation
                            </li>
                            <li>
                                Standard RPG mechanics have also been implemented including quests, dialogue, and world mapping
                            </li>
                            <li>
                                Unfortunately not as filled out/complete as I'd like, but maybe one day
                            </li>
                        </ul>
                        <h3>Multithreading</h3>
                        <ul className="Projects-List-Styling">
                            <li>
                                The game engine is run within 3 threads: Render, Game Logic, and Audio
                            </li>
                            <li>
                                Many actions require the correct thread context to be completed such as loading new textures, creating 3D objects, and enqueuing a new audio file.
                                This is handled by a series of Dispatch methods within each thread that enqueue the required actions and handle them in periods that are 
                                convenient for the handling thread. Ex, the Game Logic thread would dispatch an action to the Render thread to load the 3D model of a newly spawned tree. 
                                The Render thread would then load that tree into memory at the end of its current render cycle
                            </li>
                            <li>
                                Mutexes are additionally used to ensure thread safety of shared memory when cross-thread dispatches are invoked
                            </li>
                        </ul>
                        <h3>Audio</h3>
                        <ul className="Projects-List-Styling">
                            <li>
                                Uses NVorbis to load ogg files into memory
                            </li>
                            <li>
                                Utilizes a custom built audio manager to prepare, manage playback, and ultimately deallocate audio files
                            </li>
                            <li>
                                Supports directional audio
                            </li>
                        </ul>
                    </li>
                </ul>
                <h2>Media:</h2>
                <h3>Tightly packed texture atlas</h3>
                Rasterized glyphs are tightly packed by placing them in rows with a height of the nearest power of 2 greater than the glyph's height 
                (ie if the glyph is 56 pixels tall, it will be placed in a row with a height of 64 pixels) <br/><br/>

                <img alt="texture atlas" src={textureAtlasImage} style={{width: "90%", height: "auto", margin: "auto"}} loading="lazy"/>

                <h3>In-engine scripting using Microsoft ClearScript</h3>
                insert video here

                <h3>Combat showcase</h3>
                insert video here
            </div>

            {/* KERNEL DRIVER */}
            <h1 id="driver+" style={{marginTop: 50}}>
                Windows Kernel Driver
            </h1>
            <div style={{...textStyle, marginTop: 25}}>
                A kernel driver developed using Windows Driver Kit. 
                This driver intercepts keyboard packets before the hardware information identifying the keyboard is stripped away by the operating system.
                By utilizing this identifying keyboard hardware information,
                the user can have 2 keyboards plugged into their system simultaneously and register one of them within the client application to pair it with the driver.
                The driver will then send all keypress information from the registered keyboard to the client application for handling while nonregistered
                keyboard keypresses will be passed on to Windows normally
                <br/><br/>
                A kernel driver must be used for this because the hardware information is stripped out of the keyboard packet before it is able to be handled by 
                drivers in user space
                <br/><br/>
                <a style={{color:"#80A375"}} href="https://github.com/austin-wyatt/KeyboardMacro">GitHub Link</a>

                <br/>
                <h2>Driver</h2>
                <ul className="Projects-List-Styling">
                    <li>
                        Written in C. Built using WDK (Windows Driver Kit)
                    </li>
                    <li>
                        The driver registers a keyboard when the buttons right ctrl, page up, page down are pressed at the same time on the selected keyboard. 
                        Keyboards must be unregistered via the client. If the keyboard the user is attempting to register is the only keyboard connected 
                        to the system, the registration will fail
                    </li>
                    <li>
                        Buffers keydown events for the registered keyboard until all keydown events have a corresponding keyup. When this occurs, the 
                        macro is complete and the key information is sent to the client via a file connection that the client establishes. (ie if a user
                        pressed a+s+d at the same time, when they let go of the keys the driver would send that a, s, d packet to the client)
                    </li>
                    <li>
                        Some arbitrary key combinations are impossible and return a keyboard error code due to (I assume) the internal wiring of the keyboard. Examples include: most combinations of keys
                        greater than 4 characters long and some sets of adjacent characters such as f+g+h
                    </li>
                </ul>
                <br/>
                <h2>Client Application</h2>
                <ul className="Projects-List-Styling">
                    <li>
                        Written in C++
                    </li>
                    <li>
                        Client GUI implemented with the ImGui library
                    </li>
                    <li>
                        Communicates with the driver by opening a file handle to the device. The client then attempts to synchronously read from the file handle until data is sent from the driver.
                        The data is then validated and processed. If a macro exists that matches the keypresses sent by the driver, the macro is then executed by a cmd instance launched within a detached thread
                    </li>
                </ul>
                <h2>Media:</h2>
                <h3>Client GUI</h3>
                <img alt="driver client" src={driverClientImage} style={{width: "90%", maxWidth: 650, margin: "auto"}} loading="lazy"/>
                <h3>Video Demonstration</h3>
                <iframe style={{width: macroEmbedSize.width, height: macroEmbedSize.height}} src="https://www.youtube.com/embed/eUVDmW6dYFM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>

            {/* YOUTUBE VIDEO CONTROLLER */}
            <h1 id="videocontroller+" style={{marginTop: 50}}>
                YouTube Video Controller
            </h1>
            <div style={{...textStyle, marginTop: 25}}>
                A Google Chrome extension that allows the user to interact with a YouTube tab via a popup interface instead of having to navigate to the page.

                <br/><br/>
                <a style={{color:"#80A375"}} href="https://github.com/austin-wyatt/youtube-video-controller">GitHub Link</a> <br/>
                <a style={{color:"#80A375"}} href="https://chrome.google.com/webstore/detail/youtube-video-controller/ffbpnhedklbikebhoipcgeompghpgljj?hl=en&authuser=0">Chrome Store Link</a>

                <br/>
                <h2>About</h2>
                <ul className="Projects-List-Styling">
                    <li>
                        Written with basic JavaScript and jQuery
                    </li>
                    <li>
                        The project is split into 3 main sections: The main popup menu, the YouTube tab content script, and a script that gets injected into the YouTube tab
                    </li>
                    <li>
                        The main popup menu allows the user to control the playback of videos on any open YouTube tab and also allows the user to select new videos from the video playlist 
                        or recommended video list. By default, the extension will autoplay the next video once the current video completes
                    </li>
                    <li>
                        The YouTube tab content script manages messages sent from the main popup. When it receives a message it passes it to the injected script since content scripts cannot
                        directly interact with DOM elements
                    </li>
                    <li>
                        The injected script does the majority of the heavy lifting in the extension and is what actually controls the embedded YouTube video player. It also collates the 
                        playlist video information, tracks and reports the current video time to the main popup, and selects the next video when the current video ends
                    </li>
                    <li>
                        There are also a handful of quality of life features such as disabling YouTube's automatic idle popup and the ability to set end times on videos
                    </li>
                </ul>
                <h2>Media:</h2>
                <div style={{display:"flex", flexDirection: "row"}}>
                    <div style={{display:"flex", flexDirection: "column"}}>
                        <h3>Popup GUI</h3>
                        <img alt="driver client" src={videoControllerGUIImage} style={{width: "90%", maxWidth: 200, margin: "auto"}} loading="lazy"/>
                    </div>
                    <div style={{display:"flex", flexDirection: "column"}}>
                        <h3>Popup Playlist Menu</h3>
                        <img alt="driver client" src={videoControllerPlaylistImage} style={{width: "90%", maxWidth: 200, margin: "auto"}} loading="lazy"/>
                    </div>
                </div>
            </div>

            {/* DISCORD MUSIC BOT */}
            <h1 id="musicbot+" style={{marginTop: 50}}>
                Discord Music Bot
            </h1>
            <div style={{...textStyle, marginTop: 25}}>
                A React + Electron + Node.js application to play videos to the Discord application via the Discord API

                <br/><br/>
                <a style={{color:"#80A375"}} href="https://github.com/austin-wyatt/discord-music-bot">Frontend GitHub Link</a> <br/>
                <a style={{color:"#80A375"}} href="https://github.com/austin-wyatt/discord-music-bot-backend">Backend GitHub Link</a> <br/>

                <br/>
                <h2>About</h2>
                <ul className="Projects-List-Styling">
                    <li>
                        Uses React + TypeScript run within an Electron instance for the frontend. Uses a basic Node.js application to host the backend
                    </li>
                    <li>
                        Allows YouTube links and local files to be imported into playlists and enqueued as tracks into a playback queue. The playback queue is then streamed to the backend
                        and sent to the Discord application using the Discord API
                    </li>
                    <li>
                        Currently the backend server must be hosted on the same machine that the client is running on but that is only the case for this MVP version of the 
                        project. With only a couple minor tweaks the backend could be hosted on an external server with no issues
                    </li>
                </ul>
                <h2>Media:</h2>
                <h3>Video Demonstration (audio warning)</h3>
                <iframe style={{width: macroEmbedSize.width, height: macroEmbedSize.height}} src="https://www.youtube.com/embed/PY7rFWp1b5k" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>

            {/* LAZY FILE TRANSFER */}
            <h1 id="filetransfer+" style={{marginTop: 50}}>
                File Transfer
            </h1>
            <div style={{...textStyle, marginTop: 25}}>
                A cross platform (Windows and Linux) CLI file transfer application

                <br/><br/>
                <a style={{color:"#80A375"}} href="https://github.com/austin-wyatt/LazyFileTransfer_CMake">GitHub Link</a> <br/>

                <br/>
                <h2>About</h2>
                <ul className="Projects-List-Styling">
                    <li>
                        Written in C++ and uses CMake to manage the build process
                    </li>
                    <li>
                        Allows file transfers between any two machines connected on a network. Transfers can be done over the public internet, local subnets, 
                        and even on the same machine
                    </li>
                    <li>
                        All the user has to do to transfer files is to run the application as a source on the transferring machine 
                        (while supplying the names of the files/folders to transfer as well as their name on the destination) 
                        and then run another instance as a destination on the destination machine
                    </li>
                    <li>
                        Can transfer nested file structures and arbitrarily large files. If I were to revisit this project further, I would implement file compression to reduce
                        network bandwidth and encryption to protect from potential MITM attacks
                    </li>
                </ul>
                <h2>Media:</h2>
                <h3>File Transfer Example</h3>
                <img alt="file transfer" src={fileTransferImage} style={{width: "90%", maxWidth: 650, height: "auto", margin: "auto"}} loading="lazy"/>
            </div>

            {/* WEBSERVER */}
            <h1 id="webserver+" style={{marginTop: 50}}>
                Webserver
            </h1>
            <div style={{...textStyle, marginTop: 25}}>
                A cross platform (Windows and Linux) HTTP (and partially HTTPS) webserver host

                <br/><br/>
                <a style={{color:"#80A375"}} href="https://github.com/austin-wyatt/Webserver_CMake">GitHub Link</a> <br/>

                <br/>
                <h2>About</h2>
                <ul className="Projects-List-Styling">
                    <li>
                        Written in C++ and uses CMake to manage the build process
                    </li>
                    <li>
                        Accepts socket traffic on port 80 and parses it as HTTP or HTTPS. HTTPS handling isn't fully integrated at this point but it is
                        mostly finished once integration with the crypto++ library is implemented (at some point)
                    </li>
                    <li>
                        Supports static website and file hosting. Only files within the server's designated folder can be accessed by the webserver.
                    </li>
                    <li>
                        Supports chunked file transfers, transfer compression, and also has handling to only compress files that can be compressed (ie 
                        the webserver won't attempt to compress a png but will attempt to compress a plaintext file)
                    </li>
                </ul>
            </div>

            {/* WEBSITE */}
            <h1 id="cvwebsite+" style={{marginTop: 50}}>
                This Website
            </h1>
            <div style={{...textStyle, marginTop: 25}}>
                A React.js single page application hosted statically from an AWS S3 bucket.

                <br/><br/>
                <a style={{color:"#80A375"}} href="https://github.com/austin-wyatt/Webserver_CMake">GitHub Link</a> <br/>

                <br/>
                <h2>About</h2>
                <ul className="Projects-List-Styling">
                    <li>
                        Written with React, TypeScript, and uses React Router for page routing without requiring a full refresh
                    </li>
                </ul>
            </div>

            <div style={{ height: 500 }} />
        </div>
    );
}

export default ProjectsPage;
