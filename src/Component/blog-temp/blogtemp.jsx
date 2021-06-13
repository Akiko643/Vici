import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router";
import { useCol, useDoc } from "../../Hooks/firebase";
import "./blog-temp.scss";
export const BlogTemp = (props) => {
  let match = useRouteMatch();
  const { updateRecord } = useCol("/content/contents/Blog");
  const doc = useDoc(`/content/contents/Blog/${match.params.blogId}`);
  const [blogData, setBlogData] = useState({});
  const history = useHistory();
  const { data } = useDoc(`users/${blogData?.publisherId}`);
  const toTime = (timestamp) => {
    var date = new Date(timestamp?.seconds * 1000);
    return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
  };
  const [first, setFirst] = useState(true);
  useEffect(() => {
    setBlogData(doc?.data);
    if (doc?.data?.visits != undefined && first) {
      doc?.updateRecord({visits: doc?.data?.visits+1})
      setFirst(false);
    }
  }, [doc?.data])
  return (
    <div className="blog-container w100 flex-center">
      <div className="blog-mid-container mt-60">
        <div className="flex-row breadcrumb">
          <p onClick={() => history.push("/")} className='pointer'>Home</p>/
          <p onClick={() => history.push("/blog")} className='pointer'>Blog</p>/
          <p onClick={() => history.push(`/blog/${blogData?.category?.name}`)} className='pointer'>
            {blogData?.category?.name}
          </p>
          /<p>{blogData?.header}</p>
        </div>
        <h1 className="fs-40">{blogData?.header}</h1>
        <img src={blogData?.image} className="heading-image" />
        <div className="flex flex-wrap">
          <div className="flex-col handalt">
            <div className="flex-row">
              <img
                src={data?.profilePicUrl}
                alt={data?.displayName}
                className="publisher-profile-img"
              />
              <div className="flex flex-col">
                <div className="c-smallheading side-heading">Puplisher:</div>
                <p onClick={() => {}} className="publisher-name">
                  {data?.displayName}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="c-smallheading side-heading">Хандалт:</div>
              <p className="side-accessed">{blogData?.visits}</p>
            </div>
            <div className="flex flex-col">
              <div className="c-smallheading side-heading">Date:</div>
              <p className="side-date">{toTime(blogData?.createdAt)}</p>
            </div>
          </div>
          <div className="blog-content">
            <p>{blogData?.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
