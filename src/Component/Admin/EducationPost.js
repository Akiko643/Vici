import React from 'react';
import { useState } from 'react';
import { useCol, useFirebase } from '../../Hooks/firebase';

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
                            deleteRecord(data[index].id);
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
            <div>
                {values.map((data, index) => {
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
                                onChange={(e) =>
                                    setValues(...values, values[index][first])
                                }
                                value={second}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EducationPost;
