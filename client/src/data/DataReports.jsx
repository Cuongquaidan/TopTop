const reports = [
  {
    _id: "r001",
    reporter: {
      _id: "u012",
      username: "linhnguyen",
      display_name: "Linh Nguyễn"
    },
    reportedUser: {
      _id: "u008",
      username: "petdaily",
      display_name: "Pet Daily 🐶🐱"
    },
    reportedPost: {
      _id: 5,
      caption: "Mèo nhà tui nay lại quậy 😼 #catsoftiktok #funnycat"
    },
    reason: "nudity",
    description: "Hình ảnh có nội dung nhạy cảm.",
    status: "pending",
    reviewedBy: null,
    action: "none",
    createdAt: "2025-04-17T10:00:00Z",
    updatedAt: "2025-04-17T10:00:00Z",
    deletedAt: null,
    isDeleted: false
  },
  {
    _id: "r002",
    reporter: {
      _id: "u015",
      username: "huynguyen",
      display_name: "Huy Nguyễn"
    },
    reportedUser: {
      _id: "u007",
      username: "shadow_user",
      display_name: "Shadow User"
    },
    reportedPost: {
      _id: 4,
      caption: "Cover bài mới nèee 🎤 #cover #musicchallenge"
    },
    reason: "hate_speech",
    description: "Có lời lẽ mang tính thù ghét trong caption.",
    status: "action_taken",
    reviewedBy: {
      _id: "admin01",
      username: "admin_master"
    },
    action: "restrict_post",
    createdAt: "2025-04-15T12:00:00Z",
    updatedAt: "2025-04-16T09:00:00Z",
    deletedAt: null,
    isDeleted: false
  },
  {
    _id: "r003",
    reporter: {
      _id: "u009",
      username: "creator99",
      display_name: "Top Creator"
    },
    reportedUser: {
      _id: "u006",
      username: "mod_admin",
      display_name: "Moderator Admin"
    },
    reportedPost: {
      _id: 2,
      caption: "Bánh tráng nướng xịn xò ở Đà Nẵng 😋"
    },
    reason: "false_info",
    description: "Nội dung không đúng sự thật.",
    status: "reviewed",
    reviewedBy: {
      _id: "admin02",
      username: "super_admin"
    },
    action: "none",
    createdAt: "2025-04-14T08:30:00Z",
    updatedAt: "2025-04-14T15:00:00Z",
    deletedAt: null,
    isDeleted: false
  },
  {
    _id: "r004",
    reporter: {
      _id: "u003",
      username: "funny_dancer",
      display_name: "Funny Dancer"
    },
    reportedUser: {
      _id: "u002",
      username: "admin_master",
      display_name: "Admin Master"
    },
    reportedPost: {
      _id: 1,
      caption: "Chuyến đi Đà Lạt thật chill 🍃"
    },
    reason: "spam",
    description: "Nội dung đăng đi đăng lại nhiều lần.",
    status: "pending",
    reviewedBy: null,
    action: "none",
    createdAt: "2025-04-16T11:45:00Z",
    updatedAt: "2025-04-16T11:45:00Z",
    deletedAt: null,
    isDeleted: false
  },
  {
    _id: "r005",
    reporter: {
      _id: "u001",
      username: "tiktokuser01",
      display_name: "TikTok User 01"
    },
    reportedUser: {
      _id: "u004",
      username: "banhammered",
      display_name: "Banned Forever"
    },
    reportedPost: {
      _id: 3,
      caption: "Tập yoga buổi sáng để bắt đầu ngày mới 💪🧘‍♀️"
    },
    reason: "harassment",
    description: "Bình luận xúc phạm người dùng khác.",
    status: "action_taken",
    reviewedBy: {
      _id: "admin01",
      username: "admin_master"
    },
    action: "ban_user",
    createdAt: "2025-04-15T09:10:00Z",
    updatedAt: "2025-04-17T10:00:00Z",
    deletedAt: null,
    isDeleted: false
  }
];

export default reports;