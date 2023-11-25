import { Box } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, Radio, RadioGroup, FormControlLabel, 
    FormLabel, Button} from "@mui/material";

const FeedbackLayout = ({state,dispatch})=>{
    return (
    <>
        <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                {console.log(state)}
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
                                    <FormControlLabel name="optionRadio" value={data.forRespond} control={<Radio/>} label={data.actual}/>
                                )
                            }) }
                        </RadioGroup>
                    </FormControl> : <></>
                }
                {
                state.data.optionSelect.length > 0 ?
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{state.data.text}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={state.selectedValue}
                            label={state.data.text}
                            onChange={(e)=>{dispatch({type:"selectedValue",payload:e.target.value})}}
                        >
                            {state.data.optionSelect.map((data)=>{
                                return <MenuItem value={data.forRespond}>{data.actual}</MenuItem>
                            })}
                        </Select>
                    </FormControl> : <></>
                }
        </Box>
    </>
    );
}

export default FeedbackLayout;