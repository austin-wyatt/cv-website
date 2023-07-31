import './global.css'
import './CSSDefinitions/App.css';

import { connect } from 'react-redux';
import { RootState } from './types';
import * as actions from './Redux/actions'
import TitleBar from './Components/TitleBar';
import { Routes, Route, Outlet } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProjectsPage from './Pages/ProjectsPage';
import AboutPage from './Pages/AboutPage';
import MiscPage from './Pages/MiscPage';
import Footer from './Components/Footer';
import backgroundImage from './Resources/background3.png'

interface IProps {
    title: string,
    setTitle: (title: string) => void
}

const App = (props: IProps) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LayoutsWithNavbar {...props} />}>
                    <Route path="/" element={<HomePage {...props} />} />
                    <Route path="/projects" element={<ProjectsPage {...props} />} />
                    <Route path="/about" element={<AboutPage {...props} />} />
                    <Route path="/misc" element={<MiscPage {...props} />} />
                </Route>
            </Routes>

            <Footer />
        </div>
    );
}

const LayoutsWithNavbar = (props: any) => {
    return (
        <>
            <TitleBar title={props.title} />
            <div style={{ position: "relative", width: "auto", height: "auto", backgroundImage: `url(${backgroundImage})`, backgroundColor: "white" }}>
                <div className='Dark-Primary' style={{ width: "65%", margin: "auto", minWidth: 350, display: "flex", flexDirection: "column", alignContent: "center" }}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

let ConnectedApp = connect((state: RootState) => ({ title: state.titleState.title }), actions)((args: IProps) => <App {...args} />)

export default ConnectedApp;
