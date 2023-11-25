import { useRef, useState, useReducer, useEffect } from "react";
import { Box } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, Radio, RadioGroup, FormControlLabel, 
    FormLabel, Button} from "@mui/material";
import axios from "axios";
import FeedbackLayout from "src/layouts/FeedbackLayout";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddButton from '@mui/icons-material/Add';
import EditButton from '@mui/icons-material/Edit';
import DeleteButton from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TextField from '@mui/material/TextField';
import { Autocomplete, Checkbox } from "@mui/material";
import TextareaAutosize from '@mui/base/TextareaAutosize';

const InteractiveChatTrain = ()=>{
    const [trainModel,setTrainModel] = useState([]);
    const host=process.env.HOST;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        maxheight:"100%",
        overflowY:"scroll",
        bgcolor: 'background.paper',
        boxShadow: 24,
        padding:"40px",
        borderRadius:"10px",
        '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: '#F5F5F5',
            borderRadius:'0 10px 10px 0'
          },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
      };

    const initialValue={
        data:{
            text: "",
            foreignKey: "",
            optionRadio: [],
            optionSelect: [],
            optInput: false,
            optInputName: "",
            optSelect: false,
            action: ""
        },
        selectedValue: ""
    }

    function reducer(state,action){
        console.log(action)
        switch(action.type){
            case "setData":
                return ({...state,data:action.payload});
            case "selectedValue":
                return ({...state,selectedValue:action.payload});
            default:
                return state;
        }
    }

    const [state,dispatch]=useReducer(reducer,initialValue);

    const [open, setOpen] = useState(false);
    const [updateOpen,setUpdateOpen] = useState(false);
    const [openTextBox,setOpenTextBox] = useState(false);
    const [textChecked, setTextChecked] = useState(false);
    const [radioSelect,setRadioSelect] = useState("radio");
    const [radioUtSelect,setUtRadioSelect] = useState("radio");
    const [actiontags,setActiontags] = useState([]);
    const [finalUpTags,setFinalUpTags] = useState([]);
    const [page,setPage] = useState(1);
    const [initUptVal,setInitUptVal] = useState([]);
    const [updateTags,setUpdateTags] = useState([]);
    const [actionMenuItems,setActionMenuItems] = useState([]);
    const [modelData,setModalData] = useState({
        actual:"",
        forRespond:"",
        selectType:"",
        foreignKey:""
    });
    const [textInp, setTextInp] = useState("");
    const [labelTxtInp,setLabelTxtInp] = useState("");
    const [actTextInp,setActTextInp] = useState("");
    const [actionRequired,setActionRequired] = useState(false); 
    const [foreignKeyVal,setForeignKeyVal] = useState("649585872b350c878c65be6e");
    const [reload,setreload] = useState(false);
    const actionForm = useRef(null);
    const actionUpdateForm = useRef(null);
    const textBoxForm = useRef(null);
    

    const handleInputChange = (event) => {
        setTextChecked(event.target.checked);
    };
    const handleOpen = async () => {
        if(state.selectedValue!="" && state.selectedValue!=null && state.selectedValue!=undefined){
            let response = await axios.get(`${host}/api/findId?foreignKey=${state.selectedValue}`);
            if(response.data.status){
                toast.error("Data already added kindly update");
            }
            else{
                setOpen(true);
            }
        }
        else{
            toast.error("Please select any one of the value")
        }
    };
    const updateHandleOpen = async () => {
        if(state.selectedValue!="" && state.selectedValue!=null && state.selectedValue!=undefined){
            let response = await axios.get(`${host}/api/findId?foreignKey=${state.selectedValue}`);
            if(response.data.status){
                axios.get(`${host}/api/getFeedbackChat?foreignKey=${state.selectedValue}`)
                .then((res)=>{
                    console.log(res.data.data[0])
                    let { text, action, optInput, optInputName, optSelect, optionRadio, optionSelect } = res.data.data[0];
    
                    setTextInp(text);
                    setActTextInp(action);
                    setTextChecked(optInput);
                    setLabelTxtInp(optInputName);
                    console.log(optionRadio);
                    console.log(optionSelect);
                    if(optionRadio.length>0){
                        setRadioSelect("radio");
                        setUpdateTags(optionRadio);
                        setInitUptVal(optionRadio);
                    }
                    else if(optionSelect.length>0){
                        setRadioSelect("select");
                        setUpdateTags(optionSelect);
                        setInitUptVal(optionSelect);
                    }
                    else if(optionRadio.length==0 && optionSelect.length==0){
                        setRadioSelect("none");
                        setUpdateTags([]);
                        setInitUptVal([]);
                    }
                    setUpdateOpen(true)
                    // dispatch({type:"setData",payload:res?.data?.data[0]});
                })
                .catch((err)=>{
                    console.log(err);
                })  
            }
            else{
                toast.error("No data found kindly add");
            } 
        }
        else{
            toast.error("Please select any one of the value")
        }
    };

    const deleteDataAction = async ()=>{
        console.log("Current Value "+state.selectedValue);
        console.log("Previous Value "+foreignKeyVal);

        if(state.selectedValue && foreignKeyVal){
            try{
                let response = await axios.delete(`${host}/api/deleteFeedbackChat/${foreignKeyVal}`,{
                    data:{
                        forRespond:state.selectedValue
                    }
                });
                console.log(response);
                toast.success(response.data.message);
                dispatch({type:"selectedValue",payload:""});
                setreload(!reload);
            }
            catch(err){
                console.log(err);
                if(err.response?.data?.message){
                    toast.error(err.response.data.message)
                }
                else{
                    toast.error("Internal server error")
                }
            }
        }
        else if(!state.selectedValue){
            toast.error("Please select any one of the value")
        }
        else if(!foreignKeyVal){
            toast.error("Error caching missing")
        }
    }

    const handleClose = () =>{
        setOpen(false);
        setActiontags([]);
        setUpdateTags([]);
        setRadioSelect("radio");
        setTextChecked(false);
        setActionRequired(false);
        setFinalUpTags([]);
        setInitUptVal([]);
        setTextInp("");
        setTextChecked("");
        setLabelTxtInp("");
        setLabelTxtInp("");
        setActTextInp("");
    };
    const updateHanldeClose = () => {
        setUpdateOpen(false);
        setActiontags([]);
        setUpdateTags([]);
        setUtRadioSelect("radio");
        setActionRequired(false);
        setTextChecked(false);
        setFinalUpTags([]);
        setInitUptVal([]);
        setTextInp("");
        setTextChecked("");
        setLabelTxtInp("");
        setLabelTxtInp("");
        setActTextInp("");
    };
    const textBoxHanldeClose = () => {
        setOpenTextBox(false);
        setModalData({
            actual:"",
            forRespond:"",
            selectType:"",
            foreignKey:""
        });
        setUpdateOpen(false);
        setActiontags([]);
        setUpdateTags([]);
        setUtRadioSelect("radio");
        setActionRequired(false);
        setTextChecked(false);
        setFinalUpTags([]);
        setInitUptVal([]);
        setTextInp("");
        setTextChecked("");
        setLabelTxtInp("");
        setLabelTxtInp("");
        setActTextInp("");
    };

    function radioSelectChange(e){
        setRadioSelect(e.target.value);
        if(e.target.value=="none"){
            setUpdateTags(initUptVal);
        }
    }
  
    function radioUtSelectChange(e){
        setUtRadioSelect(e.target.value);
    }

    function handleActionTags(e,value){
        setActiontags(value);
    }

    function handleUpdateActionTags(e,value){
        console.log(value);
        const extractedData = value.map(obj => {
            if (typeof obj == "string") {
              return Object.assign({},{ actual: obj, forRespond: "" });
            } else {
              return obj;
            }
          });
          console.log(extractedData);
          setFinalUpTags(extractedData);
        let cancatArray = [...updateTags,...extractedData]
        let uniqueArray = cancatArray.reduce((acc,data)=>{
            let existingVal = acc.find(datum=> datum.actual==data.actual && datum.forRespond==data.forRespond);
            if(!existingVal){
                acc.push(data);
            }
            return acc;
        },[])
        setUpdateTags(uniqueArray);
    }

    function handleUtActionTags(e,value){
        setUpdateTags(value);
    }

    async function getForeignKey(){
        try{
        let response = await axios.get(`${host}/api/getFeedbackHistory/${foreignKeyVal}`)
        console.log(response.data.data[0].foreignKey)
            if(response?.data?.data[0]?.foreignKey){
                setForeignKeyVal(response.data.data[0].foreignKey);
                setUpdateOpen(false);
                setActiontags([]);
                setUpdateTags([]);
                setUtRadioSelect("radio");
                setActionRequired(false);
                setTextChecked(false);
                setFinalUpTags([]);
                setInitUptVal([]);
                setTextInp("");
                setTextChecked("");
                setLabelTxtInp("");
                setLabelTxtInp("");
                setActTextInp("");
                dispatch({type:"selectedValue",payload:""});
                setreload(!reload);
                setPage(prevPage=>prevPage-1);
            }
        }
        catch(err){
            console.log(err);
                if(err.response?.data?.message){
                    toast.error(err.response.data.message)
                }
                else{
                    toast.error("Internal server error")
                }
        }
    }

    function submitForm(){
        console.log(state);
        if(state.selectedValue){
            axios.get(`${host}/api/getFeedbackChat?foreignKey=${state.selectedValue}`)
            .then((res)=>{
                console.log(res.data.data[0])
                dispatch({type:"selectedValue",payload:""});
                dispatch({type:"setData",payload:res?.data?.data[0]});
                setForeignKeyVal(res.data.data[0].foreignKey);
                setPage(prevPage=>prevPage+1);
            })
            .catch((err)=>{
                console.log(err);
                if(err.response?.data?.message){
                    toast.error(err.response.data.message)
                }
                else{
                    toast.error("Internal server error")
                }
            })
        }
        else{
            toast.error("Please select any one of the value");
        }
    }

    // add form
    function actionFormSubmit(){
        let formData = new FormData(actionForm.current);
        let dataObj={
            text:formData.get("TextInp"),
            foreignKey:state.selectedValue,
            optionRadio:formData.get("radioSelect")=="radio" ? actiontags : [],
            optionSelect:formData.get("radioSelect")=="select" ? actiontags : [],
            optInput:formData.get("requiredInput") ? true : false,
            optInputName:formData.get("requiredInput") ? formData.get("labelInput") : "",
            checkValid:actionRequired,
            action:formData.get("actionText")
        }

        axios.post(`${host}/api/chatTrain`,dataObj,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>{
            console.log(res);
            setOpen(false);
            setUpdateOpen(false);
            setActiontags([]);
            setUpdateTags([]);
            setRadioSelect("radio");
            setUtRadioSelect("radio");
            setActionRequired(false);
            setTextChecked(false);
            setFinalUpTags([]);
            setInitUptVal([]);
            setTextInp("");
            setTextChecked("");
            setLabelTxtInp("");
            setLabelTxtInp("");
            setActTextInp("");
            toast.success(res.data.message);
        })
        .catch((err)=>{
            console.log(err);
            if(err.response?.data?.message){
                toast.error(err.response.data.message)
            }
            else{
                toast.error("Internal server error")
            }
        })
        console.log(dataObj)
    }
    
    // update form
    function updateFormSubmit(){
        let formData = new FormData(actionUpdateForm.current);
        let dataObj={
            text:formData.get("TextInp"),
            foreignKey:state.selectedValue,
            optionRadio:formData.get("radioSelect")=="radio" ? updateTags : [],
            optionSelect:formData.get("radioSelect")=="select" ? updateTags : [],
            optInput:formData.get("requiredInput") ? true : false,
            optInputName:formData.get("requiredInput") ? formData.get("labelInput") : "",
            checkValid:actionRequired,
            action:formData.get("actionText")
        }
        console.log(dataObj)
        axios.put(`${host}/api/updateTrainedRequest/${state.selectedValue}`,dataObj,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>{
            console.log(res);
            setUpdateOpen(false);
            setActiontags([]);
            setUpdateTags([]);
            setRadioSelect("radio");
            setUtRadioSelect("radio");
            setActionRequired(false);
            setTextChecked(false);
            setFinalUpTags([]);
            setInitUptVal([]);
            setTextInp("");
            setTextChecked("");
            setLabelTxtInp("");
            setLabelTxtInp("");
            setActTextInp("");
            toast.success(res.data.message);
        })
        .catch((err)=>{
            console.log(err);
            if(err.response?.data?.message){
                toast.error(err.response.data.message)
            }
            else{
                toast.error("Internal server error")
            }
        })
    }

    // textForm
    async function textFormSubmit(){
        console.log(modelData);
        try{
            let response = await axios.put(`${host}/api/updateResText/${modelData.foreignKey}`,modelData,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            console.log(response);
            if(response.data.status==true){
                setOpenTextBox(false);
                setModalData({
                    actual:"",
                    forRespond:"",
                    selectType:"",
                    foreignKey:""
                });
                setreload(!reload);
                toast.success(response.data.message);
            }
        }
        catch(err){
            console.log(err);
            setOpenTextBox(false);
            setModalData({
                actual:"",
                forRespond:"",
                selectType:"",
                foreignKey:""
            });
            if(err.response?.data?.message){
                toast.error(err.response.data.message)
            }
            else{
                toast.error("Internal server error")
            }
        }
    }

    useEffect(()=>{
        axios.get(`${host}/api/getFeedbackChat?foreignKey=${foreignKeyVal}`)
        .then((res)=>{
            console.log(res.data.data);
            dispatch({type:"setData",payload:res?.data?.data[0]});
        })
        .catch((err)=>{
            if(err.response?.data?.message){
                toast.error(err.response.data.message);
            }
            else{
                toast.error("Internal server error");
            }
        })

        axios.get(`${host}/api/getAdminActionData`)
        .then((res)=>{
            if(res.data.data){
                setActionMenuItems(Object.keys(res.data.data));
            }
        })
        .catch((err)=>{
            if(err.response?.data?.message){
                toast.error(err.response.data.message);
            }
            else{
                toast.error("Internal server error");
            }
        })
    },[reload])
    return(
        <>
        <ToastContainer/>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
            <Button variant="contained" startIcon={<AddButton/>} onClick={handleOpen}>
                Add
            </Button>
            <Button variant="contained" startIcon={<EditButton/>} onClick={updateHandleOpen}>
                Update
            </Button>
            <Button variant="contained" startIcon={<DeleteButton/>} onClick={deleteDataAction}>
                Delete
            </Button>
        </Stack>
        <Box sx={{width:"100%",height:"400px",margin:"10px 0px",padding:"10px",display:"flex",alignItems:"center",
        justifyContent:"center",flexDirection:"column",backgroundColor:"#ffffff",borderRadius:"10px",boxShadow:"2px 2px 10px #b0aaaa"}}>
            {
                state.data.optionRadio.length > 0 ?
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">{state.data.text}</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{display:"flex",alignContent:"center",justifyContent:"center"}}
                        onClick={(e)=>{dispatch({type:"selectedValue",payload:e.target.value})}}
                    >
                        { state.data.optionRadio.map((data)=>{
                            return(
                                <>
                                <FormControlLabel sx={{marginLeft:"10px",marginRight:"2px"}} name="optionRadio" value={data.forRespond} control={<Radio/>} label={data.actual}/>
                                <IconButton>
                                    <EditButton onClick={(e)=>{
                                        e.stopPropagation();
                                        console.log(data)
                                        setOpenTextBox(true);
                                        setModalData({actual:data.actual,forRespond:data.forRespond,selectType:"radio",foreignKey:state.data.foreignKey});
                                    }}/>
                                </IconButton>
                                </>
                            )
                        }) }
                    </RadioGroup>
                </FormControl> : <></>
            }
            {
            state.data.optionSelect.length > 0 ?
                <FormControl fullWidth sx={{display:"flex",flexDirection:"row",width:"100%"}}>
                    <InputLabel id="demo-simple-select-label">{state.data.text}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.selectedValue}
                        label={state.data.text}
                        onChange={(e)=>{dispatch({type:"selectedValue",payload:e.target.value})}}
                        sx={{width:"95%"}}
                    >
                        {state.data.optionSelect.map((data)=>{
                            return <MenuItem onClick={(e)=>{
                                e.stopPropagation();
                                setModalData({actual:data.actual,forRespond:data.forRespond,selectType:"select",foreignKey:state.data.foreignKey});
                            }} value={data.forRespond}>{data.actual}</MenuItem>
                        })}
                    </Select>
                    <IconButton sx={{width:"5%"}}>
                        <EditButton onClick={(e)=>{
                            if(state.selectedValue && modelData.forRespond){
                                setOpenTextBox(true);
                            }
                            else{
                                toast.error("Please select any one of the value")
                            }
                            }}/>
                    </IconButton>
                </FormControl> : <></>
            }
             { 
            state.data.optionRadio.length==0 && state.data.optionSelect.length==0 ? 
            <>
            <h4>{state.data.text}</h4>
            {page > 1 ? 
                <Button style={{marginTop:"20px"}} variant="outlined" onClick={getForeignKey}>Back</Button>
                : <></>}
            </> : 
            <>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
                {page > 1 ? 
                <Button style={{marginTop:"20px"}} variant="outlined" onClick={getForeignKey}>Back</Button>
                : <></>}
                <Button style={{marginTop:"20px"}} variant="contained" onClick={submitForm}>Next</Button>
            </Stack>
            </>
            }
        </Box>
        {/* add data model box start */}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form ref={actionForm}>
                <Box sx={style}>
                    <FormLabel sx={{display:"block",marginBottom:"10px"}}>Display Message</FormLabel>
                    <TextareaAutosize style={{width:"100%",marginBottom:"10px",padding:"10px 5px",
                    outline:"none",font:"inherit",resize:"none", color:"#5b5765"}} onChange={e=>setTextInp(e.target.value)} value={textInp} id="TextInp" name="TextInp" 
                    placeholder="Text" label="Text" variant="outlined" />
                    <FormLabel>Label</FormLabel>
                    <RadioGroup row onChange={radioSelectChange} name="radioSelectElem" defaultValue={radioSelect}>
                        <FormControlLabel name="radioSelect" value="radio" control={<Radio/>} label="Radio"/>
                        <FormControlLabel name="radioSelect" value="select" control={<Radio/>} label="Select"/>
                        <FormControlLabel name="radioSelect" value="none" control={<Radio/>} label="None"/>
                    </RadioGroup>
                { radioSelect=="none" ? 
                <></> : 
                <Autocomplete
                    sx={{marginBottom:"10px"}}
                        multiple
                        id="tags-filled"
                        name="radioselectags"
                        options={actiontags}
                        defaultValue={[]}
                        freeSolo
                        onChange={handleActionTags}
                        getOptionLabel={(option) => {
                            // console.log(option)
                            return option.actual || option
                        }}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            variant="filled"
                            label={radioSelect=="radio" ? "Radio" : "Select" }
                            placeholder="Favorites"
                            />
                        )}
                        /> }
                    <FormControlLabel
                        control={
                            <Checkbox name="actionRequired" checked={actionRequired} onChange={(e)=>setActionRequired(e.target.checked)} inputProps={{ 'aria-label': 'controlled' }} />  
                        }
                        label="Raise Ticket"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="requiredInput" checked={textChecked} onChange={handleInputChange} inputProps={{ 'aria-label': 'controlled' }} />  
                        }
                        label="Input Required"
                    />
                    { textChecked ? <TextField sx={{width:"100%",marginBottom:"10px"}} onChange={e=>setLabelTxtInp(e.target.value)} value={labelTxtInp} name="labelInput" id="labelInput" label="Label Input" variant="outlined" /> : <></> }
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Action</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="actionText"
                        value={actTextInp}
                        label="Action"
                        name="actionText"
                        sx={{marginBottom:"20px"}}
                        onChange={e=>setActTextInp(e.target.value)}
                        >
                            <MenuItem value="">SELECT ACTION</MenuItem>
                        {
                            actionMenuItems.map(data=><MenuItem value={data}>{data}</MenuItem>)
                        }
                        </Select>
                    </FormControl>
                    {/* <TextField sx={{width:"100%",marginBottom:"10px"}} onChange={e=>setActTextInp(e.target.value)} value={actTextInp} name="actionText" id="actionText" label="Action" variant="outlined" /> */}
                    <Button variant="contained" onClick={actionFormSubmit}>Submit</Button>
                </Box>
            </form>
        </Modal>
        {/* add data model box end */}
        {/* update data model box start */}
        <Modal
            open={updateOpen}
            onClose={updateHanldeClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
           <form ref={actionUpdateForm}>
                <Box sx={style}>
                    <FormLabel style={{display:"block",marginBottom:"10px"}}>Display Message</FormLabel>
                    <TextareaAutosize style={{width:"100%",marginBottom:"10px",padding:"10px 5px",
                    outline:"none",font:"inherit",resize:"none",color:"#5b5765"}} onChange={e=>setTextInp(e.target.value)} value={textInp} id="TextInp" name="TextInp" label="Text" variant="outlined" />
                    <FormLabel>Label</FormLabel>
                    <RadioGroup row onChange={radioSelectChange} name="radioSelectElem" defaultValue={radioSelect}>
                        <FormControlLabel name="radioSelect" value="radio" control={<Radio/>} label="Radio"/>
                        <FormControlLabel name="radioSelect" value="select" control={<Radio/>} label="Select"/>
                        <FormControlLabel name="radioSelect" value="none" control={<Radio/>} label="None"/>
                    </RadioGroup>
                { radioSelect=="none" ? 
                <></> : 
                <Autocomplete
                    sx={{marginBottom:"10px"}}
                        multiple
                        id="tags-filled"
                        name="radioselectags"
                        options={updateTags}
                        defaultValue={[]}
                        freeSolo
                        onChange={handleUpdateActionTags}
                        getOptionLabel={(option) => {
                            // console.log(option)
                            return option.actual || option
                        }}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            variant="filled"
                            label={radioSelect=="radio" ? "Radio" : "Select" }
                            placeholder="Favorites"
                            />
                        )}
                        /> }
                    <FormControlLabel
                        control={
                            <Checkbox name="actionRequired" checked={actionRequired} onChange={(e)=>setActionRequired(e.target.checked)} inputProps={{ 'aria-label': 'controlled' }} />  
                        }
                        label="Raise Ticket"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="requiredInput" checked={textChecked} onChange={handleInputChange} inputProps={{ 'aria-label': 'controlled' }} />  
                        }
                        label="Input Required"
                    />
                    { textChecked ? <TextField sx={{width:"100%",marginBottom:"10px"}} onChange={e=>setLabelTxtInp(e.target.value)} value={labelTxtInp} name="labelInput" id="labelInput" label="Label Input" variant="outlined" /> : <></> }
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Action</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="actionText"
                        value={actTextInp}
                        label="Action"
                        name="actionText"
                        sx={{marginBottom:"20px"}}
                        onChange={e=>setActTextInp(e.target.value)}
                        >
                            <MenuItem value="">SELECT ACTION</MenuItem>
                        {
                            actionMenuItems.map(data=><MenuItem value={data}>{data}</MenuItem>)
                        }
                        </Select>
                    </FormControl>
                    {/* <TextField sx={{width:"100%",marginBottom:"10px"}} onChange={e=>setActTextInp(e.target.value)} value={actTextInp} name="actionText" id="actionText" label="Action" variant="outlined" /> */}
                    <Button variant="contained" onClick={updateFormSubmit}>Submit</Button>
                </Box>
            </form>
        </Modal>
        {/* update data model box end */}
        {/* text box update model start */}
        <Modal
            open={openTextBox}
            onClose={textBoxHanldeClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form ref={textBoxForm}>
                <Box sx={style}>
                    <FormLabel sx={{display:"block",marginBottom:"10px"}}>Display Message</FormLabel>
                    <TextareaAutosize style={{width:"100%",marginBottom:"10px",padding:"10px 5px",
                    outline:"none",font:"inherit",resize:"none",color:"#5b5765"}} onChange={(e)=>{
                        setModalData(prevState=>({...prevState,actual:e.target.value}))
                        }} value={modelData.actual} id="openTextInp" name="openTextInp" label="Text" variant="outlined" />
                    <Button variant="contained" onClick={textFormSubmit}>Submit</Button>
                </Box>
            </form>
        </Modal>
        {/* text box update model end */}
        </>
    )
}

export default InteractiveChatTrain;