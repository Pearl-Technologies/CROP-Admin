import React, {useContext} from 'react';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { AdminContext } from 'src/@core/context/adminContest';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CommunicationMedium() {
    // const [all, setAll] = useState(false);
    // const [sms, setSms] = useState(false);
    // const [email, setEmail] = useState(false);
    // const [app, setApp] = useState(false);

    // const handelChange =()=>{
    //     setAll(x=>!x)
    // }
    // useEffect(()=>{
    //         setSms(all)
    //         setEmail(all)
    //         setApp(all)
            
    // },[all])
    const {all, handelChange, sms, setSms, email, setEmail, app, setApp, local, regional, national, setNational, setRegional, setLocal} = useContext(AdminContext)
    

  return (
    <div>
      <Checkbox {...label} checked={all} onChange={handelChange}/>All
      <Checkbox {...label} defaultChecked color="success" checked={sms} onChange={()=>setSms(x=>!x)}/>SMS
      <Checkbox {...label} defaultChecked color="success" checked={email} onChange={()=>setEmail(x=>!x)}/>Email
      <Checkbox {...label} defaultChecked color="success" checked={app} onChange={()=>setApp(x=>!x)}/>App Notification
      <Checkbox {...label} defaultChecked color="success" checked={local} onChange={()=>setLocal(x=>!x)}/>Local Notification
      <Checkbox {...label} defaultChecked color="success" checked={regional} onChange={()=>setRegional(x=>!x)}/>Regional Notification
      <Checkbox {...label} defaultChecked color="success" checked={national} onChange={()=>setNational(x=>!x)}/>National Notification
    </div>
  );
}