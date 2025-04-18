const data = [
  {
    _id: 1,
    user: {
      username: "linhnguyen",
      display_name: "Linh Nguyễn",
      profile_picture: "https://images.pexels.com/photos/12154987/pexels-photo-12154987.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    caption: "Chuyến đi Đà Lạt thật chill 🍃 #dalat #travel",
    tags: ["dalat", "travel"],
    type: "image",
    media: [
      "https://images.pexels.com/photos/31133725/pexels-photo-31133725/free-photo-of-den-d-ng-gi-a-nh-ng-bong-hoa-anh-dao-n-r-luc-ch-ng-v-ng.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/12154981/pexels-photo-12154981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/12154987/pexels-photo-12154987.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ],
    numOfLikes: 1200,
    numOfComments: 85,
    numOfSave: 320,
    numOfShare: 75,
    createdAt: "2025-04-15T08:00:00Z",
    updatedAt: "2025-04-16T09:30:00Z",
    isDeleted: false,
    deletedAt: null,
    state: "recommended"
  },
  {
    _id: 2,
    user: {
      username: "foodie_trung",
      display_name: "Trung Ăn Gì",
      profile_picture: "https://images.pexels.com/photos/5984545/pexels-photo-5984545.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    caption: "Bánh tráng nướng xịn xò ở Đà Nẵng 😋 #foodie #danangfood",
    tags: ["foodie", "danangfood"],
    type: "video",
    media: {
      url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/rn4fzag0udfillzhftwm.mp4",
      thumbnail: "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      duration: 20,
    },
    numOfLikes: 890,
    numOfComments: 47,
    numOfSave: 210,
    numOfShare: 36,
    createdAt: "2025-04-14T11:20:00Z",
    updatedAt: "2025-04-14T15:00:00Z",
    isDeleted: false,
    deletedAt: null,
    state: "normal"
  },
  {
    _id: 3,
    user: {
      username: "hanhpham",
      display_name: "Hạnh Phạm",
      profile_picture: "https://images.pexels.com/photos/2014027/pexels-photo-2014027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    caption: "Tập yoga buổi sáng để bắt đầu ngày mới 💪🧘‍♀️ #yoga #morningroutine",
    tags: ["yoga", "morningroutine"],
    type: "video",
    media: {
      url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
      thumbnail: "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      duration: 18,
    },
    numOfLikes: 1500123,
    numOfComments: 102,
    numOfSave: 480,
    numOfShare: 92,
    createdAt: "2025-04-13T06:00:00Z",
    updatedAt: "2025-04-15T10:00:00Z",
    isDeleted: false,
    deletedAt: null,
    state: "recommended"
  },
  {
    _id: 4,
    user: {
      username: "hoangvu.music",
      display_name: "Hoàng Vũ 🎧",
      profile_picture: "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    caption: "Cover bài mới nèee 🎤 #cover #musicchallenge",
    tags: ["cover", "musicchallenge"],
    type: "video",
    media: {
      url: "https://res.cloudinary.com/dc0iymq7d/video/upload/v1744016022/toptop/sth7incmgszhsuzfkswq.mp4",
      thumbnail: "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      duration: 60,
    },
    numOfLikes: 3103120,
    numOfComments: 265312,
    numOfSave: 1200,
    numOfShare: 305,
    createdAt: "2025-04-10T14:00:00Z",
    updatedAt: "2025-04-11T17:30:00Z",
    isDeleted: true,
    deletedAt: "2025-04-12T00:00:00Z",
    state: "restricted"
  },
  {
    _id: 5,
    user: {
      username: "petdaily",
      display_name: "Pet Daily 🐶🐱",
      profile_picture: "https://images.pexels.com/photos/28169410/pexels-photo-28169410.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    caption: "Mèo nhà tui nay lại quậy 😼 #catsoftiktok #funnycat",
    tags: ["catsoftiktok", "funnycat"],
    type: "image",
    media: [
      "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/11337083/pexels-photo-11337083.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ],
    numOfLikes: 1780,
    numOfComments: 134,
    numOfSave: 390,
    numOfShare: 64,
    createdAt: "2025-04-16T08:00:00Z",
    updatedAt: "2025-04-17T08:45:00Z",
    isDeleted: false,
    deletedAt: null,
    state: "normal"
  }
];
  

export default posts;