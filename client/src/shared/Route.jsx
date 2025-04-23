export const BASE_URL = "http://localhost:3000";

export const SUMMARY_API = {
  auth: {
    register: "auth/register",
    login: {
      other: "auth/login/other",
      phone: "auth/login/phone",
    },
  },
  post:{
    upload:{
      video:"post/upload/video",
      image:"post/upload/image",
    },
    get:{
      all:"post/all",
      byID:"post/ID/:postID",
      byUser:"post/user/:user",
    },
    update:{
      like:"post/like",
      unLike:"post/unlike",
      save:"post/save",
      unSave:"post/unsave",
      share:"post/share",
    }
  },
  user:{
    get:{
      all:"user/all",
      byID:"user/:userID"
    }
  }
}