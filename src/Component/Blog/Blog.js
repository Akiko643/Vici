import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { SuggestPagination } from './SuggestPagination'
import "./Blog.scss";
import { BlogItemComp } from "./BlogItemComp";
import leftchevron from "./zuun-chevron.svg";
import rightchevron from "./baruun-chevron.svg";
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router";
import { BlogTemp } from "../blog-temp/blogtemp";
import { useCol, useDoc, useFirebase } from "../../Hooks/firebase";
import { BlogCategoryTemp } from "../BlogCategoryTemp/BlogCategoryTemp";
export const Blog = () => {
  const [selectedLPT, setSelectedLPT] = useState(0);
  const match = useRouteMatch();
  const [latestData, setLatestData] = useState([]);
  const { firebase } = useFirebase();
  const { createRecord } = useCol("content/contents/Blog");
  const [first, setFirst] = useState(true);
  const [topData, setTopData] = useState([]);
  const history = useHistory();
  const fakeData = {
    id: "12345678",
    likes: 0,
    visits: 0,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    category: {
      name: "Mental Health",
      id: "npS7S1PKncs7Mc7d1k76",
    },
    createdAt: {
      seconds: 1622908800,
      nanoseconds: 0,
    },
    header: "Header bla bla bla bla bla ",
    image:
      "https://i.pinimg.com/originals/22/be/53/22be53bc84f7ad15fa13d9355c9767b8.jpg",
    publisherId: "78NcGolcgpUkr9JMRPaaTWdnENI3",
  };
  const { data } = useCol("content/contents/categories");
  const getLatest = async () => {
    let latestData = await firebase
      .firestore()
      .collection("content/contents/Blog")
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    latestData = latestData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTopData(latestData);
  };
  const getPopular = async () => {
    let popularData = await firebase
      .firestore()
      .collection("content/contents/Blog")
      .orderBy("visits", "desc")
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    popularData = popularData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTopData(popularData);
  };
  const getTrending = async () => {
    let trendingData = await firebase
      .firestore()
      .collection("content/contents/Blog")
      .orderBy("likes", "desc")
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    trendingData = trendingData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTopData(trendingData);
  };
  const topChange = async (ind) => {
    if (ind == 0) {
      await getLatest();
    } else if (ind == 1) {
      await getPopular();
    } else if (ind == 2) {
      await getTrending();
    }
    setSelectedLPT(ind);
  };
  useEffect(async () => {
    await getLatest();
  }, []);
  // useEffect(() => {

  // }, [createRecord])
  return (
    <>
      <Navbar />
      <Switch>
        <Route path={`${match.path}/:categoryId`} >
          <BlogCategoryTemp />
        </Route>
        {/* <Route path={`${match.path}`} */}
        <Route path={match.path}>
          <div className="blog-body-container">
            <div className="blog-body mb-60">
              <div className="flex-row">
                <BlogItemComp data={topData[0]} size="big" classStr={"w60"} />
                <div className="w40 ml-20">
                  <div className="flex-row justify-between lpt">
                    <div
                      className={`pointer ${
                        selectedLPT === 0 ? "selected-lpt" : "nt-selected-lpt"
                      }`}
                      onClick={() => topChange(0)}
                    >
                      LATEST
                    </div>
                    <div
                      className={`pointer ${
                        selectedLPT === 1 ? "selected-lpt" : "nt-selected-lpt"
                      }`}
                      onClick={() => topChange(1)}
                    >
                      POPULAR
                    </div>
                    <div
                      className={`pointer ${
                        selectedLPT === 2 ? "selected-lpt" : "nt-selected-lpt"
                      }`}
                      onClick={() => topChange(2)}
                    >
                      TRENDING
                    </div>
                  </div>
                  <BlogItemComp
                    data={topData[1]}
                    size="small"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    data={topData[2]}
                    size="small"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    data={topData[3]}
                    size="small"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    data={topData[4]}
                    size="small"
                    classStr={"w100"}
                  />
                </div>
              </div>
              <div className="line" />
              <div className="flex-row">
                <div className="w60">
                  <BlogItemComp
                    data={topData[5]}
                    size="medium"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    data={topData[6]}
                    size="medium"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    data={topData[7]}
                    size="medium"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    data={topData[8]}
                    size="medium"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    data={topData[9]}
                    size="medium"
                    classStr={"w100"}
                  />
                </div>
                <div className="w40">
                  <div className="categories-text">Categories</div>
                  {data?.map((category, index) => {
                    return (
                      <div className="category-item" key={index} onClick={() => history.push('/blog/' + category.name)}>
                        #{category.name}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="line" />
              <SuggestPagination />
            </div>
          </div>
        </Route>
      </Switch>
      <Footer />
    </>
  );
};