import React, { useState } from "react";
import { useFirebase, useCol, useDoc } from "../../Hooks/firebase";

function Selectorsub({ path, option, setOption, id, setId }) {
    // console.log("path", path);
    const { data } = useCol(path);
    // const [option, setOption] = useState("");
    // const { data } = useDoc("content/contents");
    // console.log(data, "data");
    return (
        <>
            <select
                onChange={(e) => {
                    setOption(e.target.value);
                    setId(e.target.value);
                    console.log(e);
                    // console.log(id, "id");
                    console.log(id, option);
                }}
                // value={option}
                selectedIndex={id}
            >
                <option disabled selected value>
                    {" "}
                    -- select an option --{" "}
                </option>
                {data ? (
                    data.map((d) => {
                        return <option value={d.id}>{d.name}</option>;
                    })
                ) : (
                    <></>
                )}

                {/* <option value="Education">Education</option>
                <option value="Saab">Saab</option>
                <option value="Fiat">Fiat</option>
                <option value="Audi">Audi</option> */}
            </select>
        </>
    );
}

export default Selectorsub;
