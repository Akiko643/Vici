import React from "react";
import { useHistory } from "react-router";
import { useDoc } from "../../Hooks/firebase";
export const BlogItemComp = (props) => {
  const { data, size, classStr = "", index } = props;
  const toSmall = (text) => {
    return text?.split(" ")?.slice(0, 30)?.join(" ") + "...";
  };
  const toTime = (timestamp) => {
    var date = new Date(timestamp?.seconds * 1000);
    return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
  };
  if (size === "big") {
    return (
      <BigItem
        index={index}
        classStr={classStr}
        id={data?.id}
        image={data?.image}
        header={data?.header}
        category={data?.category}
        publisherId={data?.publisherId}
        createdAt={toTime(data?.createdAt)}
      />
    );
  } else if (size === "medium") {
    return (
      <MediumItem
        index={index}
        classStr={classStr}
        id={data?.id}
        image={data?.image}
        header={data?.header}
        category={data?.category}
        text={toSmall(data?.text)}
      />
    );
  } else if (size === "small") {
    return (
      <SmallItem
        index={index}
        classStr={classStr}
        id={data?.id}
        image={data?.image}
        header={data?.header}
        category={data?.category}
      />
    );
  } else if (size === "smallcol") {
    return (
      <SmallColItem
        index={index}
        classStr={classStr}
        id={data?.id}
        image={data?.image}
        header={data?.header}
        category={data?.category}
        publisherId={data?.publisherId}
        createdAt={toTime(data?.createdAt)}
      />
    );
  }
  return (
    <MediumItem
      index={index}
      classStr={classStr}
      id={data?.id}
      image={data?.image}
      header={data?.header}
      category={data?.category}
      text={toSmall(data?.text)}
    />
  );
};
const BigItem = ({
  id,
  classStr,
  index,
  image,
  header,
  category,
  createdAt,
  publisherId,
}) => {
  const { data } = useDoc(`users/${publisherId}`);
  const history = useHistory();
  return (
    <div className={`${classStr} flex-col big-item`} key={index}>
      <img
        className="image h-430 bradius-10 pointer"
        src={image}
        onClick={() => history.push(`/blog/${category.name}/${id}`)}
      />
      <div className="blog-tag c-seablue pointer" onClick={() => history.push(`/blog/${category.name}`)}>#{category?.name}</div>
      <div
        className="blog-header pointer"
        onClick={() => history.push(`/blog/${category.name}/${id}`)}
      >
        {header}
      </div>
      <div className="flex-row">
        <div className="publishername flex-row">
          <div className="namecircle" />
          {data?.displayName}
        </div>
        <div className="time">{createdAt}</div>
      </div>
    </div>
  );
};
const MediumItem = ({ id, classStr, index, image, header, category, text }) => {
  const history = useHistory();
  return (
    <div className={`${classStr} flex-row medium-item my-10`} key={index}>
      <img
        className="image bradius-10 w55 h-240 pointer"
        src={image}
        onClick={() => history.push(`/blog/${category.name}/${id}`)}
      />
      <div className="flex-col w45 ml-20 my-10">
        <div
          className="blog-header pointer"
          onClick={() => history.push(`/blog/${category.name}/${id}`)}
        >
          {header}
        </div>
        <div className="blog-tag c-seablue pointer" onClick={() => history.push(`/blog/${category.name}`)}>#{category?.name}</div>
        <div
          className="text"
          onClick={() => history.push(`/blog/${category.name}/${id}`)}
        >
          {text}
        </div>
      </div>
    </div>
  );
};
const SmallItem = ({ id, classStr, index, image, header, category }) => {
  const history = useHistory();
  return (
    <div className={`${classStr} flex-row small-item my-10`} key={index}>
      <img
        className="image bradius-10 w45 h-120 pointer"
        src={image}
        onClick={() => history.push(`/blog/${category.name}/${id}`)}
      />
      <div className="w55 ma-20">
        <div className="blog-tag c-seablue pointer" onClick={() => history.push(`/blog/${category.name}`)}>#{category?.name}</div>
        <div
          className="blog-header pointer"
          onClick={() => history.push(`/blog/${category.name}/${id}`)}
        >
          {header}
        </div>
      </div>
    </div>
  );
};
const SmallColItem = ({
  id,
  classStr,
  index,
  image,
  header,
  category,
  publisherId,
  createdAt,
}) => {
  const { data } = useDoc(`users/${publisherId}`);
  const history = useHistory();
  return (
    <div className={`${classStr} flex-col small-col-item`} key={index}>
      <img
        className="image bradius-10 h-180 pointer"
        src={image}
        onClick={() => history.push(`/blog/${category.name}/${id}`)}
      />
      <div className="blog-tag c-seablue" onClick={() => history.push(`/blog/${category.name}`)}>#{category?.name}</div>
      <div className="blog-header pointer" onClick={() => history.push(`/blog/${category.name}`)}>{header}</div>
      <div className="flex-row my-15">
        <div className="publishername flex-row">
          <div className="namecircle" />
          {data?.displayName}
        </div>
        <div className="time">{createdAt}</div>
      </div>
    </div>
  );
};
