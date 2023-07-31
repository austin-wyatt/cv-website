import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../CSSDefinitions/MenuPopout.css'

interface IProps{
    setMenuState: (open: boolean, newPath?: boolean) => void
}

const menuOptions = [
{
    title: "Overview",
    path: "/",
    current: false
},
{
    title: "Projects",
    path: "/projects",
    current: false
},
{
    title: "About",
    path: "/about",
    current: false
},
{
    title: "Miscellaneous",
    path: "/misc",
    current: false
},
]

const MenuPopout = (props: IProps) => {
    const [closingMenu, setMenuClosing] = useState(false)
    const [fadeClassName, setFadeClassName] = useState("")

    const location = useLocation();

    const closeMenu = (newPath: boolean = false) => {
        if(!closingMenu){
            setMenuClosing(true);
            setFadeClassName("Menu-Fade-Out");

            setTimeout(() => {
                props.setMenuState(false, newPath);
            }, 250);
        }
    }

    return (
    <div className={fadeClassName}>
        <div className={"Dark-secondary Menu-Popout " + fadeClassName} onClick={() => {}}>
            <div className='Menu-List'>
                <div className='Menu-Header'>
                    Pages
                </div>
                {
                    menuOptions.map((item) => 
                    (
                        <div key={item.title}>
                        {item.current = item.path == location.pathname}
                        <Link to={item.path} style={{textDecoration: "inherit", color: "inherit", pointerEvents: closingMenu ? "none" : "inherit"}} onClick={(e) => closeMenu(!item.current)}>
                            <div className={'Menu-List-Item ' + (item.current ? "Menu-List-Item-Selected" : "")}>
                                {item.title}
                            </div>
                        </Link>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="Menu-Background" onClick={(e) => closeMenu()} />
    </div>
    )
}

export default MenuPopout;