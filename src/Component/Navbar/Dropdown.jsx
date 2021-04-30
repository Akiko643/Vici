import React, { useState } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';
const Dropdown = ({ listName }) => {
    const [click, setClick] = useState(false);
    return (
        <>
            <ul
                onClick={() => setClick(!click)}
                className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
            >
                {listName.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link
                                className={item.cName}
                                to={item.path}
                                onClick={() => setClick(false)}
                            >
                                {item.name}
                            </Link>
                            <hr className={'ml-5 mr-5'}/>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default Dropdown;
