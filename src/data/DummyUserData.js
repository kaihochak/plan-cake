export default DummyUserData = [
    {
        _id: 1,
        username: 'Alice',
        email: '123@yahoo.com',
        passwordHash: '123',
        profile: {
            bio: "Short biography or description about the user",
            location: "User's location (optional)",
            avatar: '/assets/avatars/avatar1.jpg',
            followers: [2, 3, 4], // Array of UserIDs who follow the user
            following: [2, 3, 4],
        },
        films: {
            watchlist: [1, 3, 5], 
            watched: [1, 3, 5],
            liked: [1, 3, 5],
            disliked: [1, 3, 5], 
            ratingReivews: [1, 2, 3],
        },
        events: {
            createdEvents: [1, 2, 3],
            savedEvents: [1, 2, 3], 
            invitedEvents: [1, 2, 3],
            participatingEvents: [1, 2, 3],
        },
        messages: [1, 2, 3],
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
        _id: 2,
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
            watchlist: [2, 4], 
            watched: [2, 4],
            liked: [2, 4],
            disliked: [2, 4], 
            ratingReivews: [2, 4],
        },
        events: {
            createdEvents: [2, 4],
            savedEvents: [2, 4], 
            invitedEvents: [2, 4],
            participatingEvents: [2, 4],
        },
        messages: [2, 4],
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
        _id: 3,
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
            watchlist: [1, 4, 5], 
            watched: [1, 4, 5],
            liked: [1, 4, 5],
            disliked: [1, 4, 5], 
            ratingReivews: [1, 4, 5],
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
        _id: 4,
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
            watchlist: [2], 
            watched: [2],
            liked: [2],
            disliked: [2], 
            ratingReivews: [2],
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
        _id: 5,
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
            watchlist: [1, 2, 4], 
            watched: [1, 2, 4],
            liked: [1, 2, 4],
            disliked: [1, 2, 4], 
            ratingReivews: [1, 2, 4],
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

