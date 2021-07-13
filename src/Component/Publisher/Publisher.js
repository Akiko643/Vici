import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useDoc } from '../../Hooks/firebase';

const Publisher = () => {
    const match = useRouteMatch();
    console.log(match);
    // const { data } = useDoc(`users/${match.params.userID}`);
    const { data: blogdata } = useDoc(`content/contents/Blog`);
    blogdata.filter((data) => data.publisherID === match.params.userID);
    // const {}
    return <></>;
};

export default Publisher;
