const DummyUserData = [
    {
        _id: "1",
        username: "Alice",
        email: "123@yahoo.com",
        passwordHash: "123",
        profile: {
            bio: "Short biography or description about the user",
            location: "Chicago, IL, USA",
            avatar: "/assets/avatars/avatar1.jpg",
            followers: [2, 3, 4],
            following: [2, 3, 4]
        },
        films: {
            watchlist: [
                {
                    _id: "823464",
                    name: "The Matrix",
                    poster: "/assets/posters/matrix.jpg"
                },
                {
                    _id: "300",
                    name: "The Science of Sleep",
                    poster: "/assets/posters/killbill.jpg"

                },
                {
                    _id: "24",
                    name: "The Kill Bill",
                    poster: "/assets/posters/killbill.jpg"
                },
                {
                    _id: "634492",
                    name: "Kill My Brother",
                    poster: "/assets/posters/matrix.jpg"
                }
            ],
            watched: [],
            liked: [],
            disliked: [],
            ratingReviews: []
        },
        messages: [1, 2, 3],
        preferences: {
            notificationSettings: {
                eventReminders: true,
                newFollowerAlerts: true
            },
            privacySettings: {
                profileVisibility: "public",
                eventVisibility: "public"
            }
        }
    },
    {
        _id: "2",
        username: 'Bob',
        email: 'abc@abc.com',
        passwordHash: '123',
        profile: {
            bio: "Short biography or description about the user",
            location: "User's location (optional)",
            avatar: '/assets/avatars/avatar2.jpg',
            followers: [1, 3, 4], // Array of UserIDs who follow the user
            following: [1, 3, 4],
        },
        films: {
            watchlist: [
                {
                    _id: "823464",
                    name: "The Matrix",
                    poster: "/assets/posters/matrix.jpg"
                },
                {
                    _id: "24",
                    name: "The Kill Bill",
                    poster: "/assets/posters/killbill.jpg"
                },
                {
                    _id: "604755",
                    name: "Kill My Brother",
                    poster: "/assets/posters/matrix.jpg"
                }
            ],
            watched: [],
            liked: [],
            disliked: [],
            ratingReviews: []
        },
        events: {
            createdEvents: [1, 2],
            savedEvents: [1, 2],
            invitedEvents: [1, 2],
            participatingEvents: [1, 2],
        },
        messages: [1, 2],
        preferences: {
            notificationSettings: {
                eventReminders: true,
                newFollowerAlerts: true
            },
            privacySettings: {
                profileVisibility: 'public',
                eventVisibility: 'public'
            }
        },
    },
    {
        _id: "3",
        username: 'Charlie',
        email: '2938@ifd.ca',
        passwordHash: '123',
        profile: {
            bio: "Short biography or description about the user",
            location: "User's location (optional)",
            avatar: '/assets/avatars/avatar3.jpg',
            followers: [1, 2, 4], // Array of UserIDs who follow the user
            following: [1, 2, 4],
        },
        films: {
            watchlist: [
                {
                    _id: "2",
                    name: "The Matrix",
                    poster: "/assets/posters/matrix.jpg"
                },
                {
                    _id: "300",
                    name: "The Science of Sleep",
                    poster: "/assets/posters/killbill.jpg"

                },
                {
                    _id: "24",
                    name: "The Kill Bill",
                    poster: "/assets/posters/killbill.jpg"
                },
                {
                    _id: "604755",
                    name: "Kill My Brother",
                    poster: "/assets/posters/matrix.jpg"
                }
            ],
            watched: [],
            liked: [],
            disliked: [],
            ratingReviews: []
        },
        events: {
            createdEvents: [1, 3],
            savedEvents: [1, 3],
            invitedEvents: [1, 3],
            participatingEvents: [1, 3],
        },
        messages: [1, 3],
        preferences: {
            notificationSettings: {
                eventReminders: true,
                newFollowerAlerts: true
            },
            privacySettings: {
                profileVisibility: 'public',
                eventVisibility: 'public'
            }
        },
    },
    {
        _id: "4",
        username: 'Dana',
        email: 'dana@dana.com',
        passwordHash: '123',
        profile: {
            bio: "Short biography or description about the user",
            location: "User's location (optional)",
            avatar: '/assets/avatars/avatar4.jpg',
            followers: [1, 2, 3], // Array of UserIDs who follow the user
            following: [1, 2, 3],
        },
        films: {
            watchlist: [
                {
                    _id: "1",
                    name: "The Matrix",
                    poster: "/assets/posters/matrix.jpg"
                },
                {
                    _id: "508947",
                    name: "The Kill Bill",
                    poster: "/assets/posters/killbill.jpg"
                },
                {
                    _id: "604755",
                    name: "Kill My Brother",
                    poster: "/assets/posters/matrix.jpg"
                }
            ],
            watched: [],
            liked: [],
            disliked: [],
            ratingReviews: []
        },
        events: {
            createdEvents: [1, 3],
            savedEvents: [1, 3],
            invitedEvents: [1, 3],
            participatingEvents: [1, 3],
        },
        messages: [1, 3],
        preferences: {
            notificationSettings: {
                eventReminders: true,
                newFollowerAlerts: true
            },
            privacySettings: {
                profileVisibility: 'public',
                eventVisibility: 'public'
            }
        },
    },
    {
        _id: "5",
        username: 'Eve',
        email: 'eve@eve.com',
        passwordHash: '123',
        profile: {
            bio: "Short biography or description about the user",
            location: "User's location (optional)",
            avatar: '/assets/avatars/avatar5.jpg',
            followers: [1, 2, 3], // Array of UserIDs who follow the user
            following: [1, 2, 3],
        },
        films: {
            watchlist: [
                {
                    _id: "1",
                    name: "The Matrix",
                    poster: "/assets/posters/matrix.jpg"
                },
                {
                    _id: "618588",
                    name: "The Kill Bill",
                    poster: "/assets/posters/killbill.jpg"
                },
                {
                    _id: "604755",
                    name: "Kill My Brother",
                    poster: "/assets/posters/matrix.jpg"
                }
            ],
            watched: [],
            liked: [],
            disliked: [],
            ratingReviews: []
        },
        events: {
            createdEvents: [1, 2],
            savedEvents: [1, 2],
            invitedEvents: [1, 2],
            participatingEvents: [1, 2],
        },
        messages: [1, 2],
        preferences: {
            notificationSettings: {
                eventReminders: true,
                newFollowerAlerts: true
            },
            privacySettings: {
                profileVisibility: 'public',
                eventVisibility: 'public'
            }
        },
    }
]

export default DummyUserData;