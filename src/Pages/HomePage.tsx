import { useEffect } from 'react';
import ProjectPreview from '../Components/ProjectPreview';
import copyIcon from "../Resources/copy-icon.svg"
import placeholderImage from '../Resources/guy.png'
import chromeExtensionImage from '../Resources/chromeextension.png'
import discordImage from '../Resources/discord-image.png'
import keyboardImage from '../Resources/keyboard-preview.png'
import websiteImage from '../Resources/cv-website-preview.png'
import webserverImage from '../Resources/webserver-preview.png'
import fileTransferImage from '../Resources/file-transfer-preview.png'

interface IProps {
    setTitle: (title: string) => void
}

const headerStyle: React.CSSProperties =
{
    display: "flex",
    margin: "30px 0px 0px 25px"
}

const textBoxStyle: React.CSSProperties =
{
    width: "auto",
    margin: "10px 15px 25px",
    padding: "10px 15px", borderRadius: 5,
    height: "auto",
    textAlign: "left",
    backgroundColor: "rgb(41, 45, 62)",
    wordWrap: "normal",
    lineHeight: 1.5
}

const copyIconStyle: React.CSSProperties =
{
    width: 16,
    height: 16,
    position: "relative",
    top: 3,
    left: 5,
    cursor: "pointer"
}

const projectList = [
    {
        title: "Game Engine",
        image: placeholderImage,
        url: "/projects?proj=game",
        description: `A completely from scratch OpenGL game engine developed full time over the course of a year. 
      \nFeatures a custom built UI library, turn-based strategy features, in-engine scripting, and more.`
    },
    {
        title: "Windows Kernel Driver",
        image: keyboardImage,
        url: "/projects?proj=driver",
        description: `A Windows kernel driver that allows the user to intercept all keypresses from a specified keyboard for use in activating user-defined scripts.`
    },
    {
        title: "Youtube Video Controller",
        image: chromeExtensionImage,
        url: "/projects?proj=videocontroller",
        description: `A Google Chrome extension designed to give greater control over youtube playlists.
      \nCurrently maintains around 90 active users.`
    },
    {
        title: "Discord Music Bot",
        image: discordImage,
        url: "/projects?proj=musicbot",
        description: `A desktop application made to manage audio files from various sources and then play that audio within the Discord application. 
      \nUtilizes the official Discord API.`
    },
    {
        title: "File Transfer",
        image: fileTransferImage,
        url: "/projects?proj=filetransfer",
        description: `A lightweight, cross platform, FTP alternative for transferring files over a network.
      \nUseful for build scripts and automatic update processes.`
    },
    {
        title: "Webserver",
        image: webserverImage,
        url: "/projects?proj=webserver",
        description: `A C++, cross platform, http (and partially https/TLS) webserver client.
      \nUtilizes CMake to target builds for Windows and Linux.`
    },
    {
        title: "This Website",
        image: websiteImage,
        url: "/projects?proj=cvwebsite",
        description: `A React.js single page application hosted from an AWS S3 bucket as a static website.`
    },
]

const HomePage = (props: IProps) => {
    useEffect(() => {
        props.setTitle("Overview")
    }, [])

    return (
        <div className="App Dark-primary">
            <div style={{ height: 25 }} />
            <h1 style={headerStyle}>
                About
            </h1>
            <div style={textBoxStyle}>
                TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test
            </div>

            <h1 style={headerStyle}>
                Notable Projects
            </h1>
            <div style={{ ...textBoxStyle, display: "flex", flexWrap: "wrap" }}>
                {projectList.map((item) => (
                    <div style={{ minWidth: 125, minHeight: 150, textAlign: "center", margin: "0px 20px 10px 0px" }} key={item.title}>
                        <ProjectPreview projectData={item} />
                    </div>
                ))}
            </div>

            <h1 style={headerStyle}>
                Work Experience
            </h1>
            <div style={textBoxStyle}>
                TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test TEST test
            </div>

            <h1 style={headerStyle}>
                Certifications
            </h1>
            <div style={textBoxStyle}>
                AWS Certified Developer - Associate
                <div style={{ fontSize: 12 }}>
                    Verification ID: <a href="https://aws.amazon.com/verification" style={{ color: "inherit" }}>V9LXGYFC0JF1QX3F</a>
                    <img src={copyIcon} alt="copy to clipboard" title="Copy to clipboard" onClick={() => { navigator.clipboard.writeText("V9LXGYFC0JF1QX3F") }} style={copyIconStyle} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
