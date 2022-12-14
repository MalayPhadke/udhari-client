import React, {useState, useEffect} from 'react'
// import MainList from './MainList'
import Navbar from './Navbar'
import Workspace from './Workspace'
import Axios from 'axios';
import MainListTile from './MainListTile'
import Img from './images/profile-pic.png'
import {useNavigate} from "react-router-dom";
import { config } from '../config';

export default function MainScreen(props) {
  const [isManagerOn, setIsManagerOn] = useState(false)
  const [entries, setEntries] = useState([]);
  const [filtered, setFilteredEntry] = useState(entries);

  const [activeDiv, setActiveDiv] = useState(1);
  

  const [isDivClose, setIsDivClose] = useState(false)
  const [isAdded, setIsAdded] = useState(true);

  const navigate = useNavigate();

  //responsive for mobile...->
  const [isResponsive, setIsResponsive] = useState(false);
  const [isResponsiveNavbarOn, setIsResponsiveNavbarOn] = useState(false);
  const [isResponsiveMainListOn, setIsResponsiveMainListOn] = useState(false);
  const [isResponsiveWorkspaceOn, setIsResponsiveWorkspaceOn] = useState(false);
  
  window.onresize = function() {
    if (window.innerWidth <= 820){
      setIsResponsive(true);
      setIsResponsiveMainListOn(true);
    }
    else{
      setIsResponsive(false);
      setIsResponsiveMainListOn(false);
      setIsResponsiveNavbarOn(false);
      setIsResponsiveWorkspaceOn(false);
    }
  }
  function toResponsiveNavbar(){
    setIsResponsiveMainListOn(false);
    setIsResponsiveNavbarOn(true);

  }

  function toManageUdhariWS(feeback){
    setIsManagerOn(feeback)
  }

  const updateEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
    setFilteredEntry([...filtered, newEntry]);
  }
  const manageEntry = (newEntry, name) => {
    const editedEntries = filtered.map(item => {
      if(item.name === name){
        return newEntry;
      }else {
        return item;
      }
    });
    setEntries(editedEntries);
    setFilteredEntry(editedEntries);
  }
  const removeEntry = (name) => {
    let newEntries = filtered.filter(item => {return item.name !== name})
    setEntries(newEntries);
    setFilteredEntry(newEntries);
  }

  useEffect(() => {
    Axios.get(`${config.SERVER_URI}/${props.username}`)
      .then(res => {
        // console.log(res.data.entries);
        setEntries(res.data.entries);
        setFilteredEntry(res.data.entries);
      })
      .catch(e => {
        console.log(e);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchUdhari = (e) => {
    let query = e.target.value;
    let result = entries.filter((data) => {
      return data.name.search(query) !== -1;
    });
    setEntries(result);
    if(!query){
      setEntries(filtered);
    }
  } 
  function toAddUdhariWS(){
    setIsAdded(false)
    setIsResponsiveMainListOn(false)
    setIsResponsiveWorkspaceOn(true)
  } 
  
  function Redirect(){
    useEffect(() => {
      navigate("/");
    })
  }

  if(!props.isLoggedIn){
    alert("Need to be LoggedIn");
    Redirect();
  }else{
  return (
    <div className='mainscreen-container'>
    
    { ((isResponsiveNavbarOn) || !isResponsive)  &&  <Navbar isLoggedIn={props.isLoggedIn} username={props.username} isResponsiveNavbarOn = {isResponsiveNavbarOn} responsiveNavbarHandler ={setIsResponsiveNavbarOn} responsiveMainListHandler ={setIsResponsiveMainListOn} />}
    
    
    {((isResponsiveMainListOn) || !isResponsive) && 
    (<div className='mainlist'>
    {isResponsive && 
    <>
    <span onClick={toResponsiveNavbar} className="material-symbols-outlined nav-menu-button"> menu</span>
    <div className='mainlist-search-addUdhari-box'>
    <input type="text" name="search" className='mainlist-search' placeholder='Search' onChange={searchUdhari}/>
    
    <button className='workspace-addUdhari' onClick = {toAddUdhariWS} id='mainlist-addUdhari'>Add Udhari</button>
    
    </div>
    </>
    }
    {!isResponsive && 
    <div className='mainlist-search-box'>
    <input type="text" name="search" className='mainlist-search' placeholder='Search' onChange={searchUdhari}/> 
    </div>
    }
        <div className='mainlist-list'>
          {entries && entries.length > 0 ? entries.map((item) => {
                  return (
                    <>
                <MainListTile
                      key = {item._id}
                      id={item._id}
                      img={Img}
                      name={item.name}
                      UdhariStatus = {item.udhari.status}
                      UdhariAmount = {item.udhari.amount}
                      managerHandler = {toManageUdhariWS}
                      manageActiveDiv = {setActiveDiv}
                      activeDiv={activeDiv}
             
                      isDivClose = {isDivClose}
                      divCloseHandler = {setIsDivClose}
                      isResponsive = {isResponsive}
                      responsiveMainListHandler = {setIsResponsiveMainListOn}
                      responsiveWorkspaceHandler = {setIsResponsiveWorkspaceOn}
                      /> 
                  </>
                    )}) : <h1>No entries found. Please Add Udhari.</h1>}
    </div>
    </div>)}
  { ((isResponsiveWorkspaceOn) || !isResponsive) && 
        <Workspace  
          managerStatus={isManagerOn} 
          managerStatusHandler={toManageUdhariWS} 
          isManagerOn={isManagerOn} 
          username={props.username} 
          updateEntry={updateEntry} 
          entries={entries} 
          activeDiv = {activeDiv}  
          divCloseHandler = {setIsDivClose}       
          removeEntry={removeEntry}

          manageEntry={manageEntry}

          
          isResponsive = {isResponsive}
          responsiveWorkspaceHandler = {setIsResponsiveWorkspaceOn}
          responsiveMainListHandler = {setIsResponsiveMainListOn}
          isAdded = {isAdded}
          isAddedHandler = {setIsAdded}

         />}    
      </div>
  )
}
}

//key = {item._id + "key"} 
// name = {item.name}