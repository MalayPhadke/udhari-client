import React, { useState } from 'react'
import AmountChangeWS from './AmountChangeWS'
import profileImg from './profile-pic.png' 
import Axios from "axios";
import RemoveUdhari from './RemoveUdhari';
import {config} from "../../config";

export default function ManageUdhariWS(props) {
  const [amount, setAmount] = useState(0);
  let UdhariMsg = props.UdhariStatus === "Udhari_to_get" ? "Money to be recieved from" : "Money to be payed to"
  
  const updateAmount = (newAmount) => {
    setAmount(newAmount);
  }

  const MoneyReceived = () => {
    Axios.put(`${config.SERVER_URI}/${props.username}/manageUdhari`, {status: "Udhari_to_pay", amount: Number(amount), name: props.name})
      .then(res => {
        if(res.data.result.removedFromUser){
          alert("Removed");
          props.removeEntry(props.name);
        }else {
          props.manageEntry(res.data.entry, props.name)
        }
      })
  }
  
  const MoneyPayed = () =>{
    Axios.put(`${config.SERVER_URI}/${props.username}/manageUdhari`, {status: "Udhari_to_get", amount: Number(amount), name: props.name})
      .then(res => {
        if(res.data.result.removedFromUser){
          alert("Removed");
          props.removeEntry(props.name);
        }else {
          props.manageEntry(res.data.entry, props.name)
        }
      })
  }
  
  let UdhariColor = props.UdhariStatus === "Udhari_to_pay" ?"#EE6055" : "#60D394" ;
  
  const UdhariStyle = {
    color : `${UdhariColor}`
  }

  function UdhariClose(){
    props.divCloseHandler(true)
    props.toResponsiveMainScreen()
    if(props.isResponsive){
      setTimeout(() => {
        props.managerStatusHandler()
      }, 250)
    }
    else{
      props.managerStatusHandler()
    }
  }
  return (
    <>
    {!props.isResponsive && <button className='add-Udhari-close' onClick={UdhariClose}>&#xd7;</button>}    

    {props.isResponsive && <span className="material-symbols-outlined add-Udhari-close" onClick={UdhariClose}>chevron_right</span> }
    <div className='manage-Udhari-box'>

      <div className='manage-Udhari-img-name'>
      <img src={profileImg} alt="" className='manage-Udhari-img' />
      <p className='manage-Udhari-name'>{props.name}</p>
      </div>

      <div className='manage-Udhari-status'>
      <p className='manage-Udhari-status-msg' style={UdhariStyle}>{UdhariMsg}</p>
        <p className='manage-Udhari-tag' style={{ backgroundColor : `${UdhariColor}`}}>&#8377;{props.UdhariAmount}</p>
      </div>

      <div className='manage-Udhari-personal-details-box'>
        <h3 className='manage-Udhari-personal-details'>Personal Details</h3>
        {/* <hr className='manage-Udhari-hr' /> */}
        <div>
          <p>Contact</p>
          <p>{props.contact}</p>
        </div>

        <div>
          <p>Email</p>
          <p>{props.email}</p>
        </div>

        <div>
          <p>UPI id</p>
          <p>{props.upi_id}</p>
        </div>
  
      </div>

      <div className='manage-Udhari-section'>
        <h3 className='manage-Udhari-personal-details'>Udhari</h3>
      <AmountChangeWS receiveHandler={MoneyReceived} payedHandler={MoneyPayed} updateAmount={updateAmount}/>
      </div>
      <div>
        <RemoveUdhari key = {props.removeUdhariKey} name = {props.name} username={props.username} removeEntry={props.removeEntry} UdhariClose = {UdhariClose} />
      </div>
      
    </div>
    </>
  )
}