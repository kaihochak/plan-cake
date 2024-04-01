const DummyCommentData = [
  {
    id: "1",
    currentUserId: "1",
    parentId: "3",
    content: "comment goes here",
    author: {
      name: "Josh",
      image: "/assets/avatars/avatar1.jpg",
      id: "8",
    },
    community: {
      id: "2",
      name: "community name",
      image: "comm_img.jpg",
    },
    createdAt: "2:46 PM | 2023-03-25",
    comments: [
      {
        author: {
          image: "/assets/avatars/avatar1.jpg",
        },
      },
    ],
    isComment: false,
  },
  {
    id: "2",
    currentUserId: "2",
    parentId: "1",
    content: "Another insightful comment.",
    author: {
      name: "Emily",
      image: "/assets/avatars/avatar2.jpg",
      id: "9",
    },
    community: {
      id: "3",
      name: "Another Community",
      image: "another_comm_img.jpg",
    },
    createdAt: "10:15 AM | 2023-03-26",
    comments: [],
    isComment: false,
  },
  {
    id: "3",
    currentUserId: "3",
    parentId: "1",
    content: "This is a great post!",
    author: {
      name: "Alex",
      image: "/assets/avatars/avatar3.jpg",
      id: "10",
    },
    community: {
      id: "2",
      name: "community name",
      image: "comm_img.jpg",
    },
    createdAt: "8:30 PM | 2023-03-25",
    comments: [],
    isComment: false,
  },
  {
    id: "4",
    currentUserId: "4",
    parentId: "2",
    content: "Thanks for sharing this.",
    author: {
      name: "Michael",
      image: "/assets/avatars/avatar4.jpg",
      id: "11",
    },
    community: {
      id: "4",
      name: "Tech Geeks",
      image: "tech_geeks_img.jpg",
    },
    createdAt: "9:47 AM | 2023-03-26",
    comments: [],
    isComment: false,
  },
  {
    id: "5",
    currentUserId: "5",
    parentId: "3",
    content: "I have a question about this.",
    author: {
      name: "Samantha",
      image: "/assets/avatars/avatar5.jpg",
      id: "12",
    },
    community: {
      id: "5",
      name: "Question Hub",
      image: "question_hub_img.jpg",
    },
    createdAt: "1:12 PM | 2023-03-26",
    comments: [],
    isComment: false,
  }
]

export default DummyCommentData;
