import { useEffect } from 'react';
import copyIcon from "../Resources/copy-icon.svg"
import '../CSSDefinitions/AboutPage.css'

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

const AboutPage = (props: IProps) => {
    useEffect(() => {
        props.setTitle("About")
    }, [])

    return (
        <div className="App Dark-primary">
            <div style={{...headerStyle, width: "100%"}}>
                <h1 style={{margin: "auto"}}>Austin Johnston</h1>
            </div>
            <h1 style={headerStyle}>
                Work Experience
            </h1>
            <div style={{...textBoxStyle, lineHeight: 1}}>
                <h2>Reynolds and Reynolds</h2>
                <h3>Software Developer</h3>
                Aug 2019 - Aug 2021 

                <br/><br/>
                <ul className="About-List-Styling">
                    <li>
                        Worked on a team of developers to migrate a suite of 7 legacy applications developed with native windows handling to a modern
                        cross-platform tech stack utilizing .NET Core, React, Typescript, and PostgreSQL
                    </li>
                    <li>
                        Optimized the deployment process for versioning, updating, and deploying co-dependent packages in the codebase, decreasing
                        deployment time by 80% (from 70 minutes to 15 minutes)
                    </li>
                    <li>
                        Decreased system update time by 95% by designing a new automatic update system for machines running locked down operating
                        systems and completely removing the need for a tech to manually update each system individually
                    </li>
                    <li>
                        Researched and enacted a debugging approach that rapidly lead to the elimination of 100% of known bugs in a class of hard to
                        track down issues resulting from a complicated, multi-process application initialization routine
                    </li>
                    <li>
                        Increased developer efficiency by over 30% on common operations by designing and compiling a suite of 5 DevOps tools to
                        simplify click/command intensive actions in the codebase. These tools achieved widespread adoption by the team and became a
                        requirement for new team members to learn
                    </li>
                    <li>
                        Onboarded 3 new team members, introducing the team's tools, practices, and culture
                    </li>
                    <li>
                        Designed and implemented a total backend overhaul for a large class of network operations resulting in an increase in efficiency
                        of affected network calls by 50%. Additionally, completed this overhaul well ahead of schedule
                    </li>
                </ul>
                <br/><br/>

                <h2>Freelancing</h2>
                <h3>Software Developer</h3>
                Oct 2022 - Current
                <br/><br/>
                <ul className="About-List-Styling">
                    <li>
                        Worked with several clients to build small to medium sized applications to suit their needs
                    </li>
                    <li>
                        Developed a desktop application to play audio to a server in the Discord voice chat application
                        <ul className="About-List-Styling">
                            <li>
                                Utilizes React, Electron, Node.js, TypeScript, the youtube-dl open source library, and Discord's developer API
                            </li>
                            <li>
                                Supports playing audio from a YouTube video link or a local audio/video file
                            </li>
                            <li>
                                <a href="/projects?proj=musicbot" style={{color:"inherit"}}>Link to project entry</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        Created a web scraping program for a Russian language corpus website
                        <ul className="About-List-Styling">
                            <li>
                                Utilizes Node.js and JavaScript
                            </li>
                            <li>
                                Takes a list of words as input, scrapes the website for all instances of those words and returns that to the user
                            </li>
                        </ul>
                    </li>
                    <li>
                        Built a match collator for a popular video game
                        <ul className="About-List-Styling">
                            <li>
                                Utilizes C++, MySQL, and the cURL C++ library
                            </li>
                            <li>
                                Gathers a list of game match IDs played by the lowest ranked users in the video game Dota 2
                            </li>
                            <li>
                                Works by gathering match data and player names from the game developer's official API and then furnishing that data with a
                                3rd party API to retrieve more detailed player skill information where required
                            </li>
                        </ul>
                    </li>
                </ul>

                <br/><br/><br/>
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

export default AboutPage;
