import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './Redux/store'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from "react-dom";


// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );

// root.render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <Provider store={store}>
//                 <App />
//             </Provider>
//         </BrowserRouter>
//     </React.StrictMode>
// );

const rootElement = document.getElementById("root");

const appJSX = (
<React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
</React.StrictMode>
);

if(rootElement?.hasChildNodes()){
    hydrate(appJSX, rootElement)
}
else{
    const root = createRoot(rootElement!);
    root.render(appJSX)
}

