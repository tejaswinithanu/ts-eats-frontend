import { Button } from "@mui/material"

export const DualColorButton=({text, triggerClick}:any)=>{
    const handleButtonClick=()=>{
        triggerClick()
    }

    return(
        <Button onClick={handleButtonClick} variant="contained" sx={{ background: 'linear-gradient(45deg, #ff357a, #fff172)' }}>
            {text}
        </Button>
    )
}

export const BorderedButton=({text, triggerClick}:any)=>{
    const handleButtonClick=()=>{
        triggerClick()
    }

    return(
        <Button onClick={handleButtonClick} variant="outlined" sx={{ border:'1px solid var(--primary-color)', color:'black' }}>
            {text}
        </Button>
    )
}