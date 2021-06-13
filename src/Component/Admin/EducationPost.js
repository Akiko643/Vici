import React from 'react';
import { useState } from 'react';
import { useCol, useFirebase } from '../../Hooks/firebase';
import Editor from './Editor';
import Upload from './Upload';

const EducationPost = () => {
    const { data, deleteRecord, createRecord, updateRecord } = useCol(
        'content/contents/Education'
    );
    const [index, setIndex] = useState();
    const [fieldVisible, setFieldVisible] = useState(false);
    const [newField, setNewField] = useState('');
    const { firestore } = useFirebase();
    const [curPost, setCurPost] = useState({});
    const [values, setValues] = useState([]);
    const [value, setValue] = React.useState('**Experienced coder**');
    const [header, setHeader] = useState('');
    // var dataTable;
    /*
    0: {id: 09asdfapsdofi}
    1: {image: asdlkfmasldkfmasdf}
    2: 
    */

    const select = (e) => {
        setIndex(e.target.selectedIndex);
        var temp = [];
        for (const key in data[e.target.selectedIndex - 1]) {
            temp.push({ [key]: data[e.target.selectedIndex - 1]?.[key] });
        }
        console.log(temp);
        setValues(temp);
    };

    return (
        <div>
            <div className='flex'>
                <select onChange={(e) => select(e)} selectedIndex={index}>
                    <option disabled selected value>
                        {' '}
                        -- select an option --{' '}
                    </option>
                    {data ? (
                        data.map((d) => {
                            return <option>{d.name}</option>;
                        })
                    ) : (
                        <></>
                    )}
                </select>
                {index ? (
                    <button
                        onClick={() => {
                            deleteRecord(data[index - 1].id);
                        }}
                    >
                        Delete field
                    </button>
                ) : (
                    <></>
                )}
                {fieldVisible ? (
                    <input
                        placeholder='new field'
                        value={newField}
                        onChange={(e) => setNewField(e.target.value)}
                    ></input>
                ) : (
                    <> </>
                )}
                <button
                    onClick={
                        fieldVisible
                            ? () => {
                                  if (newField !== '') {
                                      const id = firestore
                                          .collection('temp')
                                          .doc().id;
                                      console.log(id);
                                      createRecord(id, {
                                          name: newField,
                                          id,
                                          chapters: [],
                                          image: '',
                                          questions: [],
                                      });
                                      setNewField('');
                                  }
                                  setFieldVisible(false);
                              }
                            : () => setFieldVisible(true)
                    }
                >
                    {fieldVisible
                        ? newField === ''
                            ? 'Cancel'
                            : 'Create'
                        : 'Create new field'}
                </button>
            </div>
            <input
                value={header}
                placeholder='content header'
                onChange={(e) => {
                    setHeader(e.target.value);
                    if (header === '') {
                        console.log(header);
                    }
                }}
            ></input>
            <Editor value={value} setValue={setValue} />
            {index && header !== '' ? (
                <Upload
                    category='Education'
                    fieldID={data[index - 1].id}
                    post={{ header, value }}
                />
            ) : (
                <div>select field and header</div>
            )}
            {/* <div>
                {values?.map((data, index) => {
                    let first, second;
                    for (const key in data) {
                        console.log(key);
                        first = key;
                        second = data[key];
                    }
                    return (
                        <div className='flex'>
                            {`${first}: `}{' '}
                            <input
                                onChange={(e) => {
                                    const temp = values[index];
                                    setValues(
                                        ...values,
                                        (temp[first] = e.target.value)
                                    );

                                    console.log(e.target.value);
                                }}
                                value={values[index][first]}
                            />
                        </div>
                    );
                })}
            </div> */}
        </div>
    );
};

export default EducationPost;
