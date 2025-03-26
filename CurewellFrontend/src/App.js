import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homepage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Viewdoctor from './pages/viewdoctor';
import Viewspec from './pages/viewspec';
import ViewSpecPage from './pages/viewspec';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewdocPage from './pages/viewdoctor';
import AddDocPage from './pages/adddoctor';
import Login from './components/login';
import UpdateDocPage from './pages/updatedoctor';
import ViewSurgeryPage from './pages/viewsurgery';
import AddSurgeryPage from './pages/addsurgery';
import UpdateSurgeryPage from './pages/updatesurgery';
import AddSpecialisation from './components/addspec';
import UpdateSpecialisation from './components/updatespec';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/viewdoc' element={<ViewdocPage />}/>
      <Route path = '/viewspec' element={<ViewSpecPage />} />
      <Route path="/viewsurgery" element={<ViewSurgeryPage />} />
      <Route path='/addsurgery' element = {<AddSurgeryPage />} />
      <Route path='/add-doctor' element={<AddDocPage />}></Route>
      <Route path='/update-doctor/:id' element={<UpdateDocPage />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/addspecialisation' element={<AddSpecialisation />} />
      <Route path='/updatesurgery/:surgId' element={<UpdateSurgeryPage />}></Route>
      <Route path='/viewspecialisation' element={<ViewSpecPage />} />
      <Route path='/updatespecialisation/:id' element={<UpdateSpecialisation />} />
      
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
