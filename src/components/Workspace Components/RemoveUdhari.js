import Axios from "axios";
import {config} from "../../config";
export default function RemoveUdhari(props){
    const removeUdhari = () => {
        if(window.confirm("Are you sure you want to delete this Udhari?")){
            Axios.put(`${config.SERVER_URI}/${props.username}/removeUdhari`, {name: props.name})
            .then(res => {alert(res.data)})
            .catch(e => {console.log(e)});
            props.removeEntry(props.name);
            props.UdhariClose();
        }
    }
    return (
        <button onClick={removeUdhari} className='remove-Udhari-button'>Delete Udhari</button>
    )

}