import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import { ChakraProvider } from '@chakra-ui/react';
import AboutUs from './components/AboutUs/AboutUs';
import Recents from './components/Recents/Recents';
import Management from './components/Management/Management';
import Contact from './components/Contact/Contact';
import OurTeam from "./components/OurTeam/OurTeam"
import SingleProperty from './components/SingleProperty/SingleProperty';
import SearchResults from './components/SearchResult/SearchResults';
import Common from './components/Common/Common';
import SingleMember from './components/singleMember/SingleMember';


function App() {
  return (
    <ChakraProvider>
      <BrowserRouter basename={ '/' } >
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/about' element={ <AboutUs /> } />
          <Route path='/recents' element={ <Recents /> } />
          <Route path='/management' element={ <Management /> } />
          <Route path='/contact' element={ <Contact /> } />
          <Route path='/ourteam' element={ <OurTeam /> } />
          <Route path='/search' element={ <SearchResults /> } />
          <Route path='/property/:id' element={ <SingleProperty /> } />
          <Route path='/ourteam/:Tid' element={ <SingleMember /> } />
          <Route path='*' element={ <Common /> } />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
