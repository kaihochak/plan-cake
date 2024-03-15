const DummyEventData = [
    {
      _id: 1,
      organizerId: 1,
      adminIds: [1, 2],
      type: "film",
      isPublic: true,
      isFree: true,
      isOnline: true,
      price: 0,
      title: "Movie Night",
      description: "A night of fun and laughter",
      eventUrl: "https://www.eventbrite.com/e/afrobeat-festival-tickets-193286664407",
      eventImg: "https://images.unsplash.com/photo-1631368853945-6e1b2e3a5f5b",
      location: "Lekki",
      usernames: [
        { userId: 1, username: "Alice" },
        { userId: 2, username: "Bob" },
        { userId: 3, username: "Charlie" },
        // Other usernames follow the same convention
      ],
      invitedUsers: [4, 5, 3, 6, 7, 8],
      attendingUsers: [4, 5, 3],
      pendingUsers: [6, 8],
      notAttendingUsers: [7],
      timezone: "WAT",
      eventDuration: 3,
      availabilityEnabled: true,
      dateTimeOptions: [
        { dateTime: "2022-12-01T20:00:00Z", availableUserIds: [1, 2, 3, 4, 5, 6, 7, 8] },
        // Other dateTimeOptions follow the same convention
      ],
      confirmedDateTime: "2022-12-01T20:00:00Z",
      addFilmEnabled: 0,
      filmPollEnabled: 0,
      voteLimit: 3,
      filmsPool: {
        1: [1, 2],
        2: [2, 3],
        3: [3, 1],
      },
      confirmedFilms: [1],
      ratingReviews: {
        1: [1, 2, 3],
      },
      comments: {
        1: {
          commentId: 1,
          userId: 1,
          commentText: "This is a great event",
          votes: { upvotes: 5, downvotes: 1 },
          timestamp: "2022-12-01T20:00:00Z",
          parentComment: null,
          childComments: [2]
        },
        2: {
          commentId: 2,
          userId: 2,
          commentText: "I love it",
          votes: { upvotes: 3, downvotes: 0 },
          timestamp: "2022-12-01T20:00:00Z",
          parentComment: 1,
          childComments: []
        },
        3: {
          commentId: 3,
          userId: 3,
          commentText: "I am excited",
          votes: { upvotes: 2, downvotes: 0 },
          timestamp: "2022-12-01T20:00:00Z",
          parentComment: null,
          childComments: []
        },
      },
    },
    {
      _id: 2,
      organizerId: 1,
      adminIds: [1, 2],
      type: "film",
      isPublic: true,
      isFree: true,
      isOnline: true,
      price: 0,
      title: "Movie Night",
      description: "A night of fun and laughter",
      eventUrl: "https://www.eventbrite.com/e/afrobeat-festival-tickets-193286664407",
      eventImg: "/assets/posters/before.jpeg",
      location: "Kais House",
      usernames: [
        { userId: 1, username: "Alice" },
        { userId: 2, username: "Bob" },
        { userId: 3, username: "Charlie" },
        // Other usernames follow the same convention
      ],
      invitedUsers: [4, 5, 3, 6, 7, 8],
      attendingUsers: [4, 5, 3],
      pendingUsers: [6, 8],
      notAttendingUsers: [7],
      timezone: "WAT",
      eventDuration: 3,
      availabilityEnabled: true,
      dateTimeOptions: [
        { dateTime: "2022-12-01T20:00:00Z", availableUserIds: [1, 2, 3, 4, 5, 6, 7, 8] },
        // Other dateTimeOptions follow the same convention
      ],
      confirmedDateTime: "2022-12-01T20:00:00Z",
      addFilmEnabled: 0,
      filmPollEnabled: 0,
      voteLimit: 3,
      filmsPool: {
        1: [1, 2],
        2: [2, 3],
        3: [3, 1],
      },
      confirmedFilms: [1],
      ratingReviews: {
        1: [1, 2, 3],
      },
      comments: {
        1: {
          commentId: 1,
          userId: 1,
          commentText: "This is a great event",
          votes: { upvotes: 5, downvotes: 1 },
          timestamp: "2022-12-01T20:00:00Z",
          parentComment: null,
          childComments: [2]
        },
        2: {
          commentId: 2,
          userId: 2,
          commentText: "I love it",
          votes: { upvotes: 3, downvotes: 0 },
          timestamp: "2022-12-01T20:00:00Z",
          parentComment: 1,
          childComments: []
        },
        3: {
          commentId: 3,
          userId: 3,
          commentText: "I am excited",
          votes: { upvotes: 2, downvotes: 0 },
          timestamp: "2022-12-01T20:00:00Z",
          parentComment: null,
          childComments: []
        },
      }
    },
    {
      _id: 3,
      organizerId: 2,
      adminIds: [2, 3],
      type: "music",
      isPublic: true,
      isFree: false,
      isOnline: false,
      price: 20,
      title: "Kubrick Marathon",
      description: "An evening of live music performances",
      eventUrl: "https://www.eventbrite.com/e/live-music-concert-tickets-193286664407",
      eventImg: "/assets/posters/kubrick.jpg",
      location: "Central Park",
      usernames: [
        { userId: 1, username: "Alice" },
        { userId: 3, username: "Charlie" },
        // Other usernames follow the same convention
      ],
      invitedUsers: [1, 3, 4, 6, 7, 8],
      attendingUsers: [1, 3, 4],
      pendingUsers: [6, 8],
      notAttendingUsers: [7],
      timezone: "EST",
      eventDuration: 4,
      availabilityEnabled: true,
      dateTimeOptions: [
        { dateTime: "2022-12-15T18:00:00Z", availableUserIds: [1, 3, 4, 6, 7, 8] },
        // Other dateTimeOptions follow the same convention
      ],
      confirmedDateTime: "2022-12-15T18:00:00Z",
      addFilmEnabled: 0,
      filmPollEnabled: 0,
      voteLimit: 3,
      filmsPool: {},
      confirmedFilms: [],
      ratingReviews: {},
      comments: {}
    },
    {
      _id: 4,
      organizerId: 1,
      adminIds: [1, 2],
      type: "film",
      isPublic: true,
      isFree: true,
      isOnline: true,
      price: 0,
      title: "Kais Birthday",
      description: "A night of fun and laughter",
      eventUrl: "https://www.eventbrite.com/e/afrobeat-festival-tickets-193286664407",
      eventImg: "https://images.unsplash.com/photo-1631368853945-6e1b2e3a5f5b",
      location: "Lekki",
      usernames: [
        { userId: 1, username: "Alice" },
        { userId: 2, username: "Bob" },
        { userId: 3, username: "Charlie" },
        // Other usernames follow the same convention
      ],
      invitedUsers: [4, 5, 3, 6, 7, 8],
      attendingUsers: [4, 5, 3],
      pendingUsers: [6, 8],
      notAttendingUsers: [7],
      timezone: "WAT",
      eventDuration: 3,
      availabilityEnabled: true,
      dateTimeOptions: [
        { dateTime: "2022-12-01T20:00:00Z", availableUserIds: [1, 2, 3, 4, 5, 6, 7, 8] },
        // Other dateTimeOptions follow the same convention
      ],
      confirmedDateTime: "2022-12-01T20:00:00Z",
      addFilmEnabled: 0,
      filmPollEnabled: 0,
      voteLimit: 3,
      filmsPool: {
        1: [1, 2],
        2: [2, 3],
        3: [3, 1],
      },
      confirmedFilms: [1],
      ratingReviews: {
        1: [1, 2, 3],
      },
      comments: {
        1: {
          commentId: 1,
          userId: 1,
          commentText: "This is a great event",
          votes: { upvotes: 5, downvotes: 1 },
          timestamp: "2022-12-01T20:00:00Z",
          parentComment: null,
          childComments: [2]
        },
        2: {
          commentId: 2,
          userId: 2,
          commentText: "I love it",
          votes: { upvotes: 3, downvotes: 0 },
          timestamp: "2022-12-01T20:00:00Z",
          parentComment: 1,
          childComments: []
        },
        3: {
          commentId: 3,
          userId: 3,
          commentText: "I am excited",
          votes: { upvotes: 2, downvotes: 0 },
          timestamp: "2022-12-01T20:00:00Z",
          parentComment: null,
          childComments: []
        },
      }
    },
    {
      _id: 5,
      organizerId: 2,
      adminIds: [2, 3],
      type: "music",
      isPublic: true,
      isFree: false,
      isOnline: false,
      price: 20,
      title: "Bos Birthday",
      description: "An evening of live music performances",
      eventUrl: "https://www.eventbrite.com/e/live-music-concert-tickets-193286664407",
      eventImg: "https://images.unsplash.com/photo-1631368853945-6e1b2e3a5f5b",
      location: "Central Park",
      usernames: [
        { userId: 1, username: "Alice" },
        { userId: 3, username: "Charlie" },
        // Other usernames follow the same convention
      ],
      invitedUsers: [1, 3, 4, 6, 7, 8],
      attendingUsers: [1, 3, 4],
      pendingUsers: [6, 8],
      notAttendingUsers: [7],
      timezone: "EST",
      eventDuration: 4,
      availabilityEnabled: true,
      dateTimeOptions: [
        { dateTime: "2022-12-15T18:00:00Z", availableUserIds: [1, 3, 4, 6, 7, 8] },
        // Other dateTimeOptions follow the same convention
      ],
      confirmedDateTime: "2022-12-15T18:00:00Z",
      addFilmEnabled: 0,
      filmPollEnabled: 0,
      voteLimit: 3,
      filmsPool: {},
      confirmedFilms: [],
      ratingReviews: {},
      comments: {}
    },
    {
      _id: 6,
      organizerId: 1,
      adminIds: [1, 2],
      type: "film",
      isPublic: true,
      isFree: true,
      isOnline: true,
      price: 0,
      title: "Movie Night",
      description: "A night of fun and laughter",
      eventUrl: "https://www.eventbrite.com/e/afrobeat-festival-tickets-193286664407",
      eventImg: "https://images.unsplash.com/photo-1631368853945-6e1b2e3a5f5b",
      location: "Lekki",
      usernames: [
        { userId: 1, username: "Alice" },
        { userId: 2, username: "Bob" },
        { userId: 3, username: "Charlie" },
        // Other usernames follow the same convention
      ],
      invitedUsers: [4, 5, 3, 6, 7, 8],
      attendingUsers: [4, 5, 3],
      pendingUsers: [6, 8],
      notAttendingUsers: [7],
      timezone: "WAT",
      eventDuration: 3,
      availabilityEnabled: true,
      dateTimeOptions: [
        { dateTime: "2022-12-01T20:00:00Z", availableUserIds: [1, 2, 3, 4, 5, 6, 7, 8] },
        // Other dateTimeOptions follow the same convention
      ],
      confirmedDateTime: "2022-12-01T20:00:00Z",
      addFilmEnabled: 0,
      filmPollEnabled: 0,
      voteLimit: 3,
      filmsPool: {
        1: [1, 2],
        2: [2, 3],
        3: [3, 1],
      },
      confirmedFilms: [1],
      ratingReviews: {
        1: [1, 2, 3],
      },
      comments: {
        1: {
          commentId: 1,
          userId: 1,
          commentText: "This is a great event",
          votes: { upvotes: 5, downvotes: 1 },
          timestamp: "2022-12-01T20:00:00Z",
          parentComment: null,
          childComments: [2]
        },
        2: {
          commentId: 2,
          userId: 2,
          commentText: "I love it",
          votes: { upvotes: 3, downvotes: 0 },
          timestamp: "2022-12-01T20:00:00Z",
          parentComment: 1,
          childComments: []
        },
        3: {
          commentId: 3,
          userId: 3,
          commentText: "I am excited",
          votes: { upvotes: 2, downvotes: 0 },
          timestamp: "2022-12-01T20:00:00Z",
          parentComment: null,
          childComments: []
        },
      }
    }
];

export default DummyEventData;

