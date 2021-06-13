import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { SuggestPagination } from "./SuggestPagination";
import "./Blog.scss";
import { BlogItemComp } from "./BlogItemComp";
// import leftchevron from "./zuun-chevron.svg";
// import rightchevron from "./baruun-chevron.svg";
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router";
// import { BlogTemp } from "../blog-temp/blogtemp";
import { useCol, useDoc, useFirebase } from "../../Hooks/firebase";
import { BlogCategoryTemp } from "../BlogCategoryTemp/BlogCategoryTemp";
export const Blog = () => {
  const [selectedLPT, setSelectedLPT] = useState(0);
  const match = useRouteMatch();
  const { firebase } = useFirebase();
  // const [first, setFirst] = useState(true);
  const [topData, setTopData] = useState([]);
  const history = useHistory();
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
  return (
    <>
      <Navbar />
      <Switch>
        <Route path={`${match.path}/:categoryId`}>
          <BlogCategoryTemp />
        </Route>
        {/* <Route path={`${match.path}`} */}
        <Route path={match.path}>
          <div className="blog-body-container">
            <div className="blog-body mb-60">
              <div className="flex-row">
                <BlogItemComp data={topData[0]} size="big" classStr={"w60"} />
                <div className="w40 ml-20">
                  <div className="flex-row lpt">
                    <div
                      className={`pointer mr-50 ${
                        selectedLPT === 0 ? "selected-lpt" : "nt-selected-lpt"
                      }`}
                      onClick={() => topChange(0)}
                    >
                      LATEST
                    </div>
                    <div
                      className={`pointer mr-50 ${
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
                    index={0}
                    data={topData[1]}
                    size="small"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    index={1}
                    data={topData[2]}
                    size="small"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    index={2}
                    data={topData[3]}
                    size="small"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    index={3}
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
                    index={0}
                    data={topData[5]}
                    size="medium"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    index={1}
                    data={topData[6]}
                    size="medium"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    index={2}
                    data={topData[7]}
                    size="medium"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    index={3}
                    data={topData[8]}
                    size="medium"
                    classStr={"w100"}
                  />
                  <BlogItemComp
                    index={4}
                    data={topData[9]}
                    size="medium"
                    classStr={"w100"}
                  />
                </div>
                <div className="w40">
                  <div className="categories-text">Categories</div>
                  {data?.map((category, index) => {
                    return (
                      <div
                        className="category-item"
                        key={index}
                        onClick={() => history.push("/blog/" + category.name)}
                      >
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
