const DummyFilmData = [
    {
        // film info
        _id: 1,
        tmdbID: 1,
        description: 'Andy Dufresne (Tim Robbins) is sentenced to two consecutive life terms in prison for the murders of his wife and her lover and is sentenced to a tough prison. However, only Andy knows he didnt commit the crimes. While there, he forms a friendship with Red (Morgan Freeman), experiences brutality of prison life, adapts, helps the warden, etc., all in 19 years.',
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        image: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
        banner: 'https://image.tmdb.org/t/p/w500/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
        releasedYear: '1994',
        duration: '142 min',
        genre: 'Drama',
        cast: [3, 4, 5, 6, 7], // id from  tmdb

        // user-related info
        userInfo: {
            avgRating: 9.3,     // average rating from ratingReviews collection
            ratingsIDs: ["1", "2", "3"], // ratings from ratingReviews collection
            numWatchlists: 100, // number of watchlists
            watchlistedBy: ["3", "4", "5", "6"], // users who have watchlisted this film
            likes: 100,         // number of likes
            likedBy: ["1", "2", "3"], // users who have liked this film
            inEvents: ["1", "2", "3", "4", "5", "6"] // events that this film is in
        }
    },
    {
        // film info
        _id: 2,
        tmdbID: 2,
        description: 'The aging patriarch...',
        title: 'The Godfather',
        director: 'Francis Ford Coppola',
        image: '/assets/posters/godfather.jpg',
        banner: 'https://image.tmdb.org/t/p/w500/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
        releasedYear: '1972',
        duration: '175 min',
        genre: 'Crime, Drama',

        // user-related info
        userInfo: {
            avgRating: 9.2,     // average rating from ratingReviews collection
            ratingsIDs: ["4", "5", "6"], // ratings from ratingReviews collection
            numWatchlists: 100, // number of watchlists
            watchlistedBy: ["3", "4", "5", "6"], // users who have watchlisted this film
            likes: 100,         // number of likes
            likedBy: ["1", "2", "3"], // users who have liked this film
        }
    },
    {
        // film info
        _id: 3,
        tmdbID: 3,
        description: 'A young FBI...',
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        image: '/assets/posters/darkknight.jpg',
        banner: 'https://image.tmdb.org/t/p/w500/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
        releasedYear: '2008',
        duration: '152 min',
        genre: 'Action, Crime, Drama',

        // user-related info
        userInfo: {
            avgRating: 9.0,     // average rating from ratingReviews collection
            ratingsIDs: ["7", "8", "9"], // ratings from ratingReviews collection
            numWatchlists: 100, // number of watchlists
            watchlistedBy: ["3", "4", "5", "6"], // users who have watchlisted this film
            likes: 100,         // number of likes
            likedBy: ["1", "2", "3"], // users who have liked this film
        }
    },
    {
        // film info
        _id: 4,
        tmdbID: 4,
        description: 'The lives of...',
        title: 'The Godfather: Part II',
        director: 'Francis Ford Coppola',
        image: '/assets/posters/godfather2.jpg',
        banner: 'https://image.tmdb.org/t/p/w500/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
        releasedYear: '1974',
        duration: '202 min',
        genre: 'Crime',

        // user-related info
        userInfo: {
            avgRating: 9.0,     // average rating from ratingReviews collection
            ratingsIDs: ["10", "11", "12"], // ratings from ratingReviews collection
            numWatchlists: 100, // number of watchlists
            watchlistedBy: ["3", "4", "5", "6"], // users who have watchlisted this film
            likes: 100,         // number of likes
            likedBy: ["1", "2", "3"], // users who have liked this film
        }
    },
];

export default DummyFilmData;