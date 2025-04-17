import FollowerItem from "../components/FollowerItem";

const data = [
    {
        postId: 2,
        user: {
            username: "foodie_trung",
            display_name: "Trung Ăn Gì",
            profile_picture:
                "https://images.pexels.com/photos/5984545/pexels-photo-5984545.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Bánh tráng nướng xịn xò ở Đà Nẵng 😋 #foodie #danangfood",
        tags: ["foodie", "danangfood"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 20,
        },
        numOfLikes: 890,
        numOfComments: 47,
        numOfSave: 210,
        numOfShare: 36,
    },
    {
        postId: 3,
        user: {
            username: "hanhpham",
            display_name: "Hạnh Phạm",
            profile_picture:
                "https://images.pexels.com/photos/2014027/pexels-photo-2014027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        caption:
            "Tập yoga buổi sáng để bắt đầu ngày mới 💪🧘‍♀️ #yoga #morningroutine",
        tags: ["yoga", "morningroutine"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 18,
        },
        numOfLikes: 1500123,
        numOfComments: 102,
        numOfSave: 480,
        numOfShare: 92,
    },
    {
        postId: 5,
        user: {
            username: "hoangvu.music",
            display_name: "Hoàng Vũ 🎧",
            profile_picture:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Cover bài mới nèee 🎤 #cover #musicchallenge",
        tags: ["cover", "musicchallenge"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 60,
        },
        numOfLikes: 3103120,
        numOfComments: 265312,
        numOfSave: 1200,
        numOfShare: 305,
    },
    {
        postId: 6,
        user: {
            username: "hoangvu.music",
            display_name: "Hoàng Vũ 🎧",
            profile_picture:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Cover bài mới nèee 🎤 #cover #musicchallenge",
        tags: ["cover", "musicchallenge"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 60,
        },
        numOfLikes: 3103120,
        numOfComments: 265312,
        numOfSave: 1200,
        numOfShare: 305,
    },
    {
        postId: 7,
        user: {
            username: "hoangvu.music",
            display_name: "Hoàng Vũ 🎧",
            profile_picture:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Cover bài mới nèee 🎤 #cover #musicchallenge",
        tags: ["cover", "musicchallenge"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 60,
        },
        numOfLikes: 3103120,
        numOfComments: 265312,
        numOfSave: 1200,
        numOfShare: 305,
    },
    {
        postId: 8,
        user: {
            username: "hoangvu.music",
            display_name: "Hoàng Vũ 🎧",
            profile_picture:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Cover bài mới nèee 🎤 #cover #musicchallenge",
        tags: ["cover", "musicchallenge"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 60,
        },
        numOfLikes: 3103120,
        numOfComments: 265312,
        numOfSave: 1200,
        numOfShare: 305,
    },
    {
        postId: 9,
        user: {
            username: "hoangvu.music",
            display_name: "Hoàng Vũ 🎧",
            profile_picture:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Cover bài mới nèee 🎤 #cover #musicchallenge",
        tags: ["cover", "musicchallenge"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 60,
        },
        numOfLikes: 3103120,
        numOfComments: 265312,
        numOfSave: 1200,
        numOfShare: 305,
    },
    {
        postId: 10,
        user: {
            username: "hoangvu.music",
            display_name: "Hoàng Vũ 🎧",
            profile_picture:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        },
        caption: "Cover bài mới nèee 🎤 #cover #musicchallenge",
        tags: ["cover", "musicchallenge"],
        type: "video",
        media: {
            url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
            thumbnail:
                "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            duration: 60,
        },
        numOfLikes: 3103120,
        numOfComments: 265312,
        numOfSave: 1200,
        numOfShare: 305,
    },
];

const Follow=()=>{
    return(
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-3 mx-auto max-w-[1000px] min-w-[400px]">
            {data.map((item,index)=>
                <FollowerItem item={item} key={index}/>
            )}
        </div>
    )
}

export default Follow