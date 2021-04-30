import React, { useState }from 'react'
import {useFirebase} from "../../Hooks/firebase"

function Selector() {
    const [option, setOption] = useState("Education")
    const [option1, setOption1] = useState("")
    // const {useCol} = useFirebase();
    return (
        <>
            <select onChange={(e) => {
                setOption(e.target.value)
                // setOption1(useCol(`/${option}`).data);
            }} value={option}>
                <option value="Education">Education</option>
                <option value="Saab">Saab</option>
                <option value="Fiat">Fiat</option>
                <option value="Audi">Audi</option>
            </select>

            <select onChange={(e) => {
                setOption(e.target.value)
            }} value={option}>
                {/* {
                    
                } */}
            </select>

            <button onClick={() => {
                console.log(option);
            }}>Tap</button>

        </>
    )
}

export default Selector
