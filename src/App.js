import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import HomePages from './pages/HomePage';
import DataVisuals from './pages/DataVisuals';
import Contact from './pages/Contact';

import NftVisuals from './components/NftVisuals/NftVisuals';
import StockMarketApp from './components/StockMarketApp/StockMarketApp';
import CorruptosVisuals from './components/CorruptosVisuals/CorruptosVisuals';

     
     
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePages/>}/>    
          <Route path="/contact" element={<Contact/> }/>
          <Route path="/dataVisuals" element={<DataVisuals/>}/>
          <Route path="dataVisuals/invisibleFriendsNFT" element={<NftVisuals/>  }/>
          <Route path="dataVisuals/corruptionColombia" element={<CorruptosVisuals/> }/>
          <Route path="dataVisuals/stockMarket" element={<StockMarketApp/>}/>
      </Routes>
   </Router>
  );
}

export default App;
