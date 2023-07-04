import burgerMenu from "../Resources/burger-menu.svg"
import "../CSSDefinitions/TitleBar.css"
import { useEffect, useState } from "react";
import MenuPopout from "./MenuPopout";

interface IProps
{
    title: string,
}

function TitleBar(props: IProps){
    const [menuToggled, setMenuToggled] = useState(false)

    const toggleMenu = (shouldBeOpen: boolean, navigated: boolean = false) => {
        setMenuToggled(shouldBeOpen);
        let scrollTop = document.documentElement.scrollTop;
        document.body.classList.toggle("Hide-Overflow", shouldBeOpen);

        //fix undesirable 'scroll to top' functionality when closing menu (except when navigating to a new page)
        if(shouldBeOpen){
            document.body.style.top = -scrollTop + "px";
        }
        else{
            scrollTop = -parseInt(document.body.style.top);
            document.body.style.top = "0px";

            if(navigated)
                window.scrollTo(0, 0);
            else
                window.scrollTo(0, scrollTop);
        }
    };


    return(
        <>
        <div className='Top-bar Dark-secondary' />
        <div className={"Sticky-Title-Bar"}>
            <div className='Top-bar Dark-secondary'>
                <div className="Title-Bar">
                    {
                        menuToggled ? 
                        (
                            <MenuPopout setMenuState={toggleMenu}/>
                        ) : null
                    }
                    <img src={burgerMenu} alt="burger menu" className="Burger-Menu" onClick={() => toggleMenu(!menuToggled)}/>
                    <div>
                        {props.title}
                    </div>
                    {/* <div style={{marginLeft: "auto", marginRight: 15}}>
                        {"<Insert Name>"}
                    </div> */}
                </div>
            </div>
        </div>
        </>
    )
}

export default TitleBar;