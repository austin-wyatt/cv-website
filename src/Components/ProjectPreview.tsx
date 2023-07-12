import { useEffect, useState } from "react"
import "../CSSDefinitions/ProjectPreview.css"
import ExpandedProjectPreview from "./ExpandedProjectPreview"

interface IProps{
    projectData: {
        title: string,
        image: string,
        url: string,
        description: string
    },
}

const imageStyle: React.CSSProperties = {
    height: 48,
    width: 48,
    borderRadius: 15,
}

const ProjectPreview = (props: IProps) => {
    //state value to determine whether the expanded preview should be open
    const [openBlock, setOpenBlock] = useState(false);
    //state value to determine if the expanded preview is currently in the process
    //of closing
    const [closingBlock, setBlockClosing] = useState(false);
    //state value to determine if the mouse-event intercepting modal should be
    //be rendered. This differs from openBlock due to the modal needing to be removed
    //before the closing animation finishes
    const [blockingModalOpen, setBlockingModalState] = useState(false);

    const [closeBlockFunc, setCloseBlockFunc] = useState<() => void>(() => () => {});

    const containerID = "project-preview-" + props.projectData.title;
    const expandedID = "project-preview-expanded" + props.projectData.title;

    useEffect(() => {
        let containerElement = document.getElementById(containerID)
        let expandedElement = document.getElementById(expandedID)

        //capture a local variable to ensure state data is available immediately
        //for the event handlers
        let blockIsOpen = openBlock;

        const handleEnter = () => {
            if(!blockIsOpen && !closingBlock){
                setOpenBlock(true);
                setBlockingModalState(true);
                blockIsOpen = true;

                expandedElement?.classList.toggle("Project-Preview-Expanded-Open", true);
                expandedElement?.classList.toggle("Project-Preview-Expanded-Close", false);

                //check if the expanded preview needs extra placement handling
                let bounds = containerElement?.getBoundingClientRect();
                if((window.outerWidth < 360 && bounds ? (bounds?.left + 300 >  window.outerWidth) : false) && expandedElement)
                {
                    //minimum screen size case, just fit the preview wherever it can go
                    expandedElement.style.right = '0px'
                }
                else if((bounds ? (bounds?.left + 300 >  window.outerWidth) : false) && expandedElement){
                    //the overflow-x case, place the preview from the top right corner of the parent instead of the top left
                    expandedElement.style.right = (window.outerWidth - (bounds?.right ? bounds?.right : 0))  + 'px';
                }
                else if(expandedElement){
                    //base case, everything should fit and display correctly
                    expandedElement.style.right = '';
                }
            }
        }

        const handleExit = () => {
            if(!closingBlock && blockIsOpen){
                setBlockingModalState(false);
                setBlockClosing(true);

                expandedElement?.classList.toggle("Project-Preview-Expanded-Open", false);
                expandedElement?.classList.toggle("Project-Preview-Expanded-Close", true);

                setTimeout(() => {
                    //sanity check the blocking modal since it can get stuck open without this extra assurance
                    setBlockingModalState(false);
                    setOpenBlock(false);
                    blockIsOpen = false;
                    
                    setBlockClosing(false);
                }, 250)
            }
        }

        setCloseBlockFunc(() => handleExit);

        //open/close handlers for the expanded preview
        containerElement?.addEventListener("mouseenter", handleEnter)
        expandedElement?.addEventListener("mouseleave", handleExit)

        return () => {
            containerElement?.removeEventListener("mouseenter", handleEnter)
            expandedElement?.removeEventListener("mouseleave", handleExit)
        }
    }, []);

    return(
        <div>
        
        {blockingModalOpen ? 
        <div className="Project-Preview-Modal" onClick={() => closeBlockFunc()}/>
        :
        null}

        <div className="Project-Preview-Expanded" style={{visibility: openBlock ? "visible" : "hidden"}} id={expandedID} >
            {openBlock ? <ExpandedProjectPreview projectData={props.projectData} /> : null}
        </div>

        <div className="Project-Preview-Container-Style" id={containerID}>
            <div style={{marginBottom: 10, height: 33}}>
                {props.projectData.title}
            </div>
            <img alt={props.projectData.title} src={props.projectData.image} style={imageStyle}/>
        </div>

            
        </div>
    );
}

export default ProjectPreview;