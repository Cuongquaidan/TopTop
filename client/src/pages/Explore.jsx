import React, { useCallback, useEffect, useRef, useState } from "react";

import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import {
    StackedCarousel,
    ResponsiveContainer,
} from "react-stacked-center-carousel";
import ExploreTrendItem from "../components/explore/ExploreTrendItem";
import categories from "../data/Categories";
import Categories from "../components/Categories";
import ExploreItem from "../components/explore/ExploreItem";
import createAxiosInstance from "../libs/axios/AxiosInstance";
import { BASE_URL, SUMMARY_API } from "../shared/Route";
import useGetPostByCursor from "../hooks/useGetPostByCursor";
import { useDispatch, useSelector } from "react-redux";
import { setPageData, setPageScrollTop } from "../redux/features/postSlice";

function Explore() {
    const ref = useRef();
    const [data1, setData1] = useState([]);
    const scrollRef = useRef(null);
    const pageKey = "explore";
    const dispatch = useDispatch();
    const { data: postsData, scrollTop } = useSelector((state) => state.post.pages[pageKey]);
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const axiosInstance = createAxiosInstance(BASE_URL);
                const resjson = await axiosInstance.get(SUMMARY_API.post.get.getTop9TrendingVideo);
                setData1(resjson.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    },[])
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
      } = useGetPostByCursor(10, true);
      console.log(data, fetchNextPage, hasNextPage, isFetchingNextPage);
      const observerRef = useRef(null);
    
      const setLastItemRef = useCallback(
        (node) => {
          if (observerRef.current) observerRef.current.disconnect();
    
          observerRef.current = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            },
            { threshold: 1.0 }
          );
    
          if (node) observerRef.current.observe(node);
        },
        [hasNextPage, isFetchingNextPage]
      );
        useEffect(() => {
          if (data && postsData.length === 0) {
            const flatData = data.pages.flatMap(page => page.data);
            dispatch(setPageData({ page: pageKey, data: flatData }));
          }
        }, [data, postsData.length, dispatch]);
      
    return (
        <div className="p-4 px-10 min-w-0 "
        >
            <p className="font-bold italic text-xl ">Thịnh hành hôm nay</p>
           {
            data1 && data1.length > 0 && (
                <div
                style={{ width: "90%", position: "relative", height: "30vh" }}
                className="mx-auto"
            >
                <ResponsiveContainer
                    carouselRef={ref}
                    render={(parentWidth, carouselRef) => {
                        // If you want to use a ref to call the method of StackedCarousel, you cannot set the ref directly on the carousel component
                        // This is because ResponsiveContainer will not render the carousel before its parent's width is determined
                        // parentWidth is determined after your parent component mounts. Thus if you set the ref directly it will not work since the carousel is not rendered
                        // Thus you need to pass your ref object to the ResponsiveContainer as the carouselRef prop and in your render function you will receive this ref object
                        let currentVisibleSlide = 9;
                        if (parentWidth <= 1440) currentVisibleSlide = 9;
                        if (parentWidth <= 1080) currentVisibleSlide = 7;
                        return (
                            <StackedCarousel
                                ref={carouselRef}
                                slideComponent={ExploreTrendItem}
                                slideWidth={200}
                                carouselWidth={parentWidth}
                                data={data1}
                                currentVisibleSlide={currentVisibleSlide}
                                maxVisibleSlide={9}
                                useGrabCursor
                            />
                        );
                    }}
                />
                <>
                    <div
                        style={{
                            position: "absolute",
                            top: "40%",
                            left: 40,
                            zIndex: 10,
                        }}
                        onClick={() => {
                            ref.current?.goBack();
                        }}
                        className="text-white cursor-pointer bg-black/20 rounded-full p-2"
                    >
                        <FaChevronLeft />
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            top: "40%",
                            right: 40,
                            zIndex: 10,
                        }}
                        onClick={() => {
                            ref.current?.goNext(6);
                        }}
                        className="text-white cursor-pointer bg-black/20 rounded-full p-2"
                    >
                        <FaChevronRight />
                    </div>
                </>
            </div>
            )
           }
            <p className="font-bold italic text-xl mt-10 ">Bạn có thể thích</p>
            <Categories></Categories>
            <div className="grid grid-cols-5 gap-4 mt-4">
            {data?.pages.map((page, i) =>
          page.data.map((item, j) => (
            <div
              key={item._id}
              ref={
                i === data.pages.length - 1 &&
                j === page.data.length - 1
                  ? setLastItemRef 
                  : null
              }
            >
              <ExploreItem  item={item} />
            </div>
                 ))
                  )}
               
            </div>
        </div>
    );
}

export default Explore;
