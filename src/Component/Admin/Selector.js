import React, { useState } from "react";
import { useFirebase, useCol, useDoc } from "../../Hooks/firebase";
import Selectorsub from "./Selectorsub";
import Upload from "./Upload";
function Selector({ text }) {
    const { data } = useDoc("content/contents");
    const [option, setOption] = useState("");
    const [option1, setOption1] = useState("");
    const [header, setHeader] = useState("");
    const [id, setId] = useState("");
    // console.log(data, "data");
    // console.log(option, "option");
    return (
        <div className="flex w75 justify-between">
            <div className="flex w50 justify-between">
                <select
                    className="pa-5"
                    onChange={(e) => {
                        setOption(e.target.value);
                    }}
                    // value={option}
                >
                    <option disabled selected value>
                        {" "}
                        -- select an option --{" "}
                    </option>
                    {data ? (
                        data.list.map((d) => {
                            return <option value={d}>{d}</option>;
                        })
                    ) : (
                        <></>
                    )}
                </select>
                {option !== "" ? (
                    <Selectorsub
                        path={`content/contents/${option}`}
                        option={option1}
                        setOption={setOption1}
                        id={id}
                        setId={setId}
                    />
                ) : (
                    <select>
                        <option disabled selected value>
                            {" "}
                            -- select an option --{" "}
                        </option>
                    </select>
                )}
                <input
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                    placeholder="content header here ..."
                />
            </div>
            {option && id ? (
                <Upload
                    path={`content/contents/${option}/${id}`}
                    header={header}
                    text={text}
                />
            ) : (
                <div> select path to submit </div>
            )}
        </div>
    );
}

export default Selector;
