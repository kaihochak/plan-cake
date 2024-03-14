// Example data for My Events
const DummyEventData = [
  {
    id: 1,
    title: 'Before Trilogy Movie Night',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/before.jpeg',
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p2', avatar: '/assets/avatars/avatar2.jpg', name: 'Bob' },
      { id: 'p3', avatar: '/assets/avatars/avatar3.jpg', name: 'Charlie' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
  {
    id: 2,
    title: 'Kubrick Marathon',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
      { id: 'p5', avatar: '/assets/avatars/avatar5.jpg', name: 'Eve' },
      { id: 'p3', avatar: '/assets/avatars/avatar3.jpg', name: 'Frank' },
      { id: 'p2', avatar: '/assets/avatars/avatar2.jpg', name: 'Bob' }
    ],
    location: 'Kais House',
  },
  {
    id: 3,
    title: 'Kais Birthday',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
  {
    id: 4,
    title: 'Bos Birthday',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
  {
    id: 5,
    title: 'Kais Birthday',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
  {
    id: 6,
    title: 'Kais Birthday',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
  {
    id: 7,
    title: 'Kais Birthday',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
  {
    id: 8,
    title: 'Kais Birthday',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
  {
    id: 9,
    title: 'Before Trilogy Movie Night',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/before.jpeg',
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p2', avatar: '/assets/avatars/avatar2.jpg', name: 'Bob' },
      { id: 'p3', avatar: '/assets/avatars/avatar3.jpg', name: 'Charlie' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
  {
    id: 10,
    title: 'Kubrick Marathon',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
      { id: 'p5', avatar: '/assets/avatars/avatar5.jpg', name: 'Eve' },
      { id: 'p3', avatar: '/assets/avatars/avatar3.jpg', name: 'Frank' },
      { id: 'p2', avatar: '/assets/avatars/avatar2.jpg', name: 'Bob' }
    ],
    location: 'Kais House',
  },
  {
    id: 11,
    title: 'Kais Birthday',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
  {
    id: 12,
    title: 'Bos Birthday',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
  {
    id: 13,
    title: 'Kais Birthday',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
  {
    id: 14,
    title: 'Kais Birthday',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
  {
    id: 15,
    title: 'Kais Birthday',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
  {
    id: 16,
    title: 'Kais Birthday',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: '/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p1', avatar: '/assets/avatars/avatar1.jpg', name: 'Alice' },
      { id: 'p4', avatar: '/assets/avatars/avatar4.jpg', name: 'Dana' },
    ],
    location: 'Kais House',
  },
];

const events = [
  {
    // Event Basic Info
    "EventID": "1",
    "OrganizerID": "1",
    "AdminID": ["1", "2"],
    "Type": "film",
    "isPublic": true,
    "Title": "Movie Night",
    "Description": "A night of fun and laughter",
    "EventUrl": "https://www.eventbrite.com/e/afrobeat-festival-tickets-193286664407",
    "EventImg": "https://images.unsplash.com/photo-1631368853945-6e1b2e3a5f5b",
    "Location": "Lekki",

    // Invited and Attending Users
    "Usernames": [
      {
        "UserID": "1",
        "Username": "Alice"
      },
      {
        "UserID": "2",
        "Username": "Bob"
      },
      {
        "UserID": "_3",
        "Username": "Charlie"
      },
      {
        "UserID": "_4",
        "Username": "Dana"
      },
      {
        "UserID": "_5",
        "Username": "Eve"
      },
      {
        "UserID": "6",
        "Username": "Frank"
      },
      {
        "UserID": "7",
        "Username": "Grace"
      },
      {
        "UserID": "_8",
        "Username": "Hannah"
      }
    ], // userID that starts with _ is a guest user
    "InvitedUsers": ["1", "2", "_3", "_4", "_5", "6", "7", "_8"],
    "AttendingUsers": ["1", "2", "_3"],
    "PendingUsers": ["_4", "_5", "6", "7", "_8"],
    "NotAttendingUsers": [],

    // Availability Options
    "Timezone": "WAT",
    "EventDuration": 3,
    "AvailabilityEnabled": true,
    "DateTimeOptions": [
      {
        "dateTime": "2022-12-01T20:00:00Z",
        "availableUsers": ['1', '2', '_3', '_4', '_5', '6', '7', '_8']
      },
      {
        "dateTime": "2022-12-01T20:15:00Z",
        "availableUsers": ['1', '2', '_3', '_4', '_5', '6', '7', '_8']
      },
      {
        "dateTime": "2022-12-01T20:30:00Z",
        "availableUsers": ['1', '2', '_3', '_4', '_5', '6', '7', '_8']
      },
      {
        "dateTime": "2022-12-01T20:45:00Z",
        "availableUsers": ['1', '2', '_3', '_4', '_5', '6', '7', '_8']
      },
      {
        "dateTime": "2022-12-01T21:00:00Z",
        "availableUsers": ['1', '2', '_3', '_4', '_5', '6', '7', '_8']
      },
      {
        "dateTime": "2022-12-01T21:15:00Z",
        "availableUsers": ['1', '2', '_3', '_4', '_5', '6', '7', '_8']
      },
      {
        "dateTime": "2022-12-01T21:30:00Z",
        "availableUsers": ['1', '2', '_3', '_4', '_5', '6', '7', '_8']
      },
      {
        "dateTime": "2022-12-01T21:45:00Z",
        "availableUsers": ['1', '2', '_3', '_4', '_5', '6', '7', '_8']
      },
      {
        "dateTime": "2022-12-01T22:00:00Z",
        "availableUsers": ['1', '2', '_3', '_4', '_5', '6', '7', '_8']
      },
      {
        "dateTime": "2022-12-01T22:15:00Z",
        "availableUsers": ['1', '2', '_3', '_4', '_5', '6', '7', '_8']
      },
      {
        "dateTime": "2022-12-01T22:30:00Z",
        "availableUsers": ['1', '2', '_3', '_4', '_5', '6', '7', '_8']
      },
      {
        "dateTime": "2022-12-01T22:45:00Z",
        "availableUsers": ['1', '2', '_3', '_4', '_5', '6', '7', '_8']
      },
    ], // usernames are used because the user can enter availability without logging in
    "ConfirmedDateTime": "2022-12-01T20:00:00Z",

    // Film Options - full film info linked to the film collection
    "AddFilmEnabled": 0, // 0 - disabled, 1 - everyone, 2 - only admin
    "FilmPollEnabled": 0, // 0 - disabled, 1 - everyone, 2 - only attending, 3 - only attending and pending
    "VoteLimit": "3",
    "FilmsPool": [
      {
        "FilmID": "1",
        "Title": "The Matrix",
        "Year": "1999",
        "Image": "https://images.unsplash.com/photo-1631368853945-6e1b2e3a5f5b",
        "Director": "Lana Wachowski, Lilly Wachowski",
        "Genre": "Action, Sci-Fi",
        "Rating": "8.7",
        "Runtime": "136",
        "Votes": [ 
          {
            "UserID": "1",
            "Timestamp": "2022-12-01T20:00:00Z"
          },
          {
            "UserID": "2",
            "Timestamp": "2022-12-01T20:00:00Z"
          }
        ],
        "VotesCount": "2",
      },
      {
        "FilmID": "2",
        "Title": "The Matrix Reloaded",
        "Year": "2003",
        "Image": "https://images.unsplash.com/photo-1631368853945-6e1b2e3a5f5b",
        "Director": "Lana Wachowski, Lilly Wachowski",
        "Genre": "Action, Sci-Fi",
        "Rating": "7.2",
        "Runtime": "138",
        "Votes": [
          {
            "UserID": "1",
            "Timestamp": "2022-12-01T20:00:00Z"
          }
        ],
        "VotesCount": "1",
      },
      {
        "FilmID": "3",
        "Title": "The Matrix Revolutions",
        "Year": "2003",
        "Image": "https://images.unsplash.com/photo-1631368853945-6e1b2e3a5f5b",
        "Director": "Lana Wachowski, Lilly Wachowski",
        "Genre": "Action, Sci-Fi",
        "Rating": "6.7",
        "Runtime": "129",
        "Votes": [
          {
            "UserID": "2",
            "Timestamp": "2022-12-01T20:00:00Z"
          }
        ],
        "VotesCount": "1",
      }
    ],  
    "ConfirmedFilms": [
      {
        "FilmID": "1",
        "Title": "The Matrix",
        "Year": "1999",
        "Image": "https://images.unsplash.com/photo-1631368853945-6e1b2e3a5f5b",
        "Director": "Lana Wachowski, Lilly Wachowski",
        "Genre": "Action, Sci-Fi",
        "Rating": "8.7",
        "Runtime": "136",
        "Votes": [
          {
            "UserID": "1",
            "Timestamp": "2022-12-01T20:00:00Z"
          },
          {
            "UserID": "2",
            "Timestamp": "2022-12-01T20:00:00Z"
          }
        ],
        "VotesCount": "2",
        // full user ratings and reviews linked to the ratingReview collection
        "UserRatings": [
          {
            "RatingID": "1",
            "UserID": "1",
            "Rating": 5
          },
          {
            "RatingID": "2",
            "UserID": "2",
            "Rating": 4
          }
        ],
      },
      {
        "FilmID": "2",
        "Title": "The Matrix Reloaded",
        "Year": "2003",
        "Image": "https://images.unsplash.com/photo-1631368853945-6e1b2e3a5f5b",
        "Director": "Lana Wachowski, Lilly Wachowski",
        "Genre": "Action, Sci-Fi",
        "Rating": "7.2",
        "Runtime": "138",
        "Votes": [
          {
            "UserID": "1",
            "Timestamp": "2022-12-01T20:00:00Z"
          }
        ],
        "VotesCount": "1",
        "Ratings": [
          {
            "UserID": "1",
            "Rating": 5
          }
        ],
      },
    ],

    // Comments - full comments hiarachy linked to the comment collection
    "Comments": {
      "1": {
        "CommentID": "1",
        "UserID": "1",
        "CommentText": "This is a great event",
        "Votes": {
          "Upvotes": 5,
          "Downvotes": 1
        },
        "Timestamp": "2022-12-01T20:00:00Z"
      },
      "2": {
        "CommentID": "2",
        "UserID": "2",
        "CommentText": "I love it",
        "Votes": {
          "Upvotes": 3,
          "Downvotes": 0
        },
        "Timestamp": "2022-12-01T20:00:00Z"
      },
      "3": {
        "CommentID": "3",
        "UserID": "3",
        "CommentText": "I am excited",
        "Votes": {
          "Upvotes": 2,
          "Downvotes": 0
        },
        "Timestamp": "2022-12-01T20:00:00Z"
      }
    }
  },
]

export { DummyEventData, events };

