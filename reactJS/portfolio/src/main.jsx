import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import Schedule from './compenents/Etudinet/Overview/scheduleCalen.jsx'
import Chart from './compenents/Etudinet/Overview/charts/chartsGroup/ChartOfArea.jsx'
import Home from './pages/Home/Home.jsx'
import Ensignemnt from './pages/Ensiegnemnt/Ensignemnt.jsx'
import Etudinet from './pages/Etudient/Etudinet.jsx'
import Router from './Router/Router.jsx'
import All from './compenents/CopHome/BanniereAccueil/All.jsx'
import Chatbot from './Chatbot.jsx'
import CreateGroup from './compenents/groupProjet/CreateGroup.jsx'
createRoot(document.getElementById('root')).render(
  
    <StrictMode>
          
        {/* <Home /> */}
     <App />
    {/* <h1>hello</h1> */}
    {/* <Testapi/> */}
    {/* <CreateGroup /> */}
    {/* <Chatbot /> */}
    {/* <ProfileAvatar/> */}
    {/* <All/> */}
    
    
   
    </StrictMode>
)
