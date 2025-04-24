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
      byCursor:"post/getByCursor",
      getTop9TrendingVideo: "post/getTop9TrendingVideo",
    },
    update:{
      like:"post/like",
      unLike:"post/unlike",
      save:"post/save",
      unSave:"post/unsave",
      share:"post/share",
    },
    import: "post/import",
  },
  user:{
    get:{
      all:"user/all",
      byID:"user/:userID",
      famous:"user/famous"
    },
    import:"user/import",
    put:{
      update:"user/update"
    }
  },
  report :{
    import:"report/import",
    get:{
      all:"report/all",
    }
  },
}