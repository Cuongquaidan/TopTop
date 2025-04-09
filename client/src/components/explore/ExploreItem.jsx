import React from "react";
import ExploreCategoryVideo from "./ExploreCategoryVideo";
import { Link } from "react-router-dom";

function ExploreItem({ item, ...props }) {
    return (
        <div {...props} className="flex flex-col gap-4 ">
            <ExploreCategoryVideo data={item}></ExploreCategoryVideo>
            <Link to={"#"} className="flex gap-4 items-center">
                <img
                    src={item.user.profile_picture}
                    className="w-10 h-10 rounded-full"
                    alt={item.user.display_name}
                />
                <p>{item.user.username}</p>
            </Link>
        </div>
    );
}

export default ExploreItem;
