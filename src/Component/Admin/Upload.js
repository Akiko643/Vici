import React from "react";
import { useDoc } from "../../Hooks/firebase";

function Upload({ path, header, text }) {
    const { data, updateRecord } = useDoc(path);
    // console.log(path);
    return (
        <button
            className="pa-5"
            onClick={() => {
                let { chapters } = data;
                chapters.push({ header: header, text: text });
                updateRecord({ chapters: chapters, ...data })
                    .then((e) => {
                        console.log("Uploaded! ");
                    })
                    .catch((e) => console.log(e.error, "error"));
            }}
        >
            Upload
        </button>
    );
}

export default Upload;
