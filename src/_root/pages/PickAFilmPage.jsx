import React, { useEffect, useState, useParams } from 'react'
import FilmPoll from '@/components/event/FilmPoll'
import GuestList from '@/components/event/GuestList'

const PickAFilmPage = () => {
  const [event, setEvent] = useState(null);
  const { id } = 1; // To be updated
  const [formData, setFormData] = useState({
    guestList: [
      {
        id: "-1",
        name: "Darcy",
        avatar: "/assets/avatars/avatar1.jpg",
        filmsVoted: [
          {id: "604788"}, 
          {id: "823464"}, 
          {id: "300"}, 
          {id: "24"}
        ]
      },
      {
        id: "-2",
        name: "Susan",
        avatar: "/assets/avatars/avatar2.jpg",
        filmsVoted: [
          {id: "634492"},
          {id: "300"},
          {id: "24"}
        ]
      },
      {
        id: "-3",
        name: "Joanna",
        avatar: "/assets/avatars/avatar3.jpg",
        filmsVoted: [
          {id: "300"},
          {id: "24"}
        ]
      }
    ],
    selectedFilms: [
      {
        "adult": false,
        "backdrop_path": "/giPY8826lXfOwFEAX9P93toEfSV.jpg",
        "belongs_to_collection": null,
        "budget": 0,
        "genres": [
          {
            "id": 18,
            "name": "Drama"
          }
        ],
        "homepage": "",
        "id": 604755,
        "imdb_id": null,
        "origin_country": [
          "CN"
        ],
        "original_language": "zh",
        "original_title": "Kill My Brother",
        "overview": "",
        "popularity": 0.6,
        "poster_path": "/8dpWZ7Q4t1OcF7FKWTXgeRFUGt7.jpg",
        "production_companies": [
          {
            "id": 162250,
            "logo_path": null,
            "name": "Xiaoxiang Film Group",
            "origin_country": ""
          }
        ],
        "production_countries": [
          {
            "iso_3166_1": "CN",
            "name": "China"
          }
        ],
        "release_date": "2019-04-12",
        "revenue": 0,
        "runtime": 0,
        "spoken_languages": [],
        "status": "Released",
        "tagline": "",
        "title": "Kill My Brother",
        "video": false,
        "vote_average": 0,
        "vote_count": 0
      },
      {
        "adult": false,
        "backdrop_path": "/lVy5Zqcty2NfemqKYbVJfdg44rK.jpg",
        "belongs_to_collection": {
          "id": 2883,
          "name": "Kill Bill Collection",
          "poster_path": "/tf1nUtw3LJGUGv1EFFi23iz6ngr.jpg",
          "backdrop_path": "/oCLKNACMNrEf4T1EP6BpMXDl5m1.jpg"
        },
        "budget": 30000000,
        "genres": [
          {
            "id": 28,
            "name": "Action"
          },
          {
            "id": 80,
            "name": "Crime"
          }
        ],
        "homepage": "http://www.miramax.com/movie/kill-bill-volume-1",
        "id": 24,
        "imdb_id": "tt0266697",
        "origin_country": [
          "US"
        ],
        "original_language": "en",
        "original_title": "Kill Bill: Vol. 1",
        "overview": "An assassin is shot by her ruthless employer, Bill, and other members of their assassination circle – but she lives to plot her vengeance.",
        "popularity": 68.955,
        "poster_path": "/v7TaX8kXMXs5yFFGR41guUDNcnB.jpg",
        "production_companies": [
          {
            "id": 14,
            "logo_path": "/m6AHu84oZQxvq7n1rsvMNJIAsMu.png",
            "name": "Miramax",
            "origin_country": "US"
          },
          {
            "id": 59,
            "logo_path": "/yH7OMeSxhfP0AVM6iT0rsF3F4ZC.png",
            "name": "A Band Apart",
            "origin_country": "US"
          },
          {
            "id": 39121,
            "logo_path": null,
            "name": "Super Cool ManChu",
            "origin_country": ""
          }
        ],
        "production_countries": [
          {
            "iso_3166_1": "US",
            "name": "United States of America"
          }
        ],
        "release_date": "2003-10-10",
        "revenue": 180906076,
        "runtime": 111,
        "spoken_languages": [
          {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
          },
          {
            "english_name": "Japanese",
            "iso_639_1": "ja",
            "name": "日本語"
          },
          {
            "english_name": "French",
            "iso_639_1": "fr",
            "name": "Français"
          }
        ],
        "status": "Released",
        "tagline": "A roaring rampage of revenge.",
        "title": "Kill Bill: Vol. 1",
        "video": false,
        "vote_average": 7.97,
        "vote_count": 16806
      },
      {
        "adult": false,
        "backdrop_path": "/bHePzkyRcMhnab2qZbhj1bCElnf.jpg",
        "belongs_to_collection": null,
        "budget": 6000000,
        "genres": [
          {
            "id": 35,
            "name": "Comedy"
          },
          {
            "id": 18,
            "name": "Drama"
          },
          {
            "id": 14,
            "name": "Fantasy"
          }
        ],
        "homepage": "http://www.lasciencedesreves-lefilm.com/accueil.htm",
        "id": 300,
        "imdb_id": "tt0354899",
        "origin_country": [
          "FR"
        ],
        "original_language": "fr",
        "original_title": "La Science des rêves",
        "overview": "A man entranced by his dreams and imagination is lovestruck with a French woman and feels he can show her his world.",
        "popularity": 18.811,
        "poster_path": "/1qCq228LsNtUseCnNE7Naw6NBUz.jpg",
        "production_companies": [
          {
            "id": 11911,
            "logo_path": null,
            "name": "Partizan Films",
            "origin_country": ""
          },
          {
            "id": 9,
            "logo_path": "/nda3dTUYdDrJ6rZqBpYvY865aDv.png",
            "name": "Gaumont",
            "origin_country": "FR"
          },
          {
            "id": 591,
            "logo_path": "/q5I5RDwMEiqoNmfaJgd2LraEOJY.png",
            "name": "France 3 Cinéma",
            "origin_country": "FR"
          },
          {
            "id": 6586,
            "logo_path": null,
            "name": "TPS Star",
            "origin_country": "FR"
          },
          {
            "id": 11912,
            "logo_path": null,
            "name": "Mikado Film",
            "origin_country": "IT"
          },
          {
            "id": 104,
            "logo_path": "/9aotxauvc9685tq9pTcRJszuT06.png",
            "name": "Canal+",
            "origin_country": "FR"
          }
        ],
        "production_countries": [
          {
            "iso_3166_1": "FR",
            "name": "France"
          },
          {
            "iso_3166_1": "IT",
            "name": "Italy"
          }
        ],
        "release_date": "2006-06-25",
        "revenue": 9524340,
        "runtime": 105,
        "spoken_languages": [
          {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
          },
          {
            "english_name": "French",
            "iso_639_1": "fr",
            "name": "Français"
          },
          {
            "english_name": "Spanish",
            "iso_639_1": "es",
            "name": "Español"
          }
        ],
        "status": "Released",
        "tagline": "Close your eyes. Open your heart.",
        "title": "The Science of Sleep",
        "video": false,
        "vote_average": 7.001,
        "vote_count": 729
      },
      {
        "adult": false,
        "backdrop_path": "/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg",
        "belongs_to_collection": {
          "id": 1280074,
          "name": "Kong Collection",
          "poster_path": "/40wy7gNJqCpgxQ59LMwxiM5v70H.jpg",
          "backdrop_path": null
        },
        "budget": 150000000,
        "genres": [
          {
            "id": 28,
            "name": "Action"
          },
          {
            "id": 878,
            "name": "Science Fiction"
          },
          {
            "id": 12,
            "name": "Adventure"
          }
        ],
        "homepage": "https://www.godzillaxkongmovie.com",
        "id": 823464,
        "imdb_id": "tt14539740",
        "origin_country": [
          "US"
        ],
        "original_language": "en",
        "original_title": "Godzilla x Kong: The New Empire",
        "overview": "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
        "popularity": 1898.967,
        "poster_path": "/bQ2ywkchIiaKLSEaMrcT6e29f91.jpg",
        "production_companies": [
          {
            "id": 923,
            "logo_path": "/8M99Dkt23MjQMTTWukq4m5XsEuo.png",
            "name": "Legendary Pictures",
            "origin_country": "US"
          }
        ],
        "production_countries": [
          {
            "iso_3166_1": "US",
            "name": "United States of America"
          }
        ],
        "release_date": "2024-03-27",
        "revenue": 521400523,
        "runtime": 115,
        "spoken_languages": [
          {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
          }
        ],
        "status": "Released",
        "tagline": "Rise together or fall alone.",
        "title": "Godzilla x Kong: The New Empire",
        "video": false,
        "vote_average": 6.631,
        "vote_count": 809
      },
      {
        "adult": false,
        "backdrop_path": "/hQ4pYsIbP22TMXOUdSfC2mjWrO0.jpg",
        "belongs_to_collection": null,
        "budget": 0,
        "genres": [
          {
            "id": 18,
            "name": "Drama"
          },
          {
            "id": 35,
            "name": "Comedy"
          },
          {
            "id": 10749,
            "name": "Romance"
          },
          {
            "id": 80,
            "name": "Crime"
          }
        ],
        "homepage": "",
        "id": 2,
        "imdb_id": "tt0094675",
        "origin_country": [
          "FI"
        ],
        "original_language": "fi",
        "original_title": "Ariel",
        "overview": "After the coal mine he works at closes and his father commits suicide, a Finnish man leaves for the city to make a living but there, he is framed and imprisoned for various crimes.",
        "popularity": 25.759,
        "poster_path": "/ojDg0PGvs6R9xYFodRct2kdI6wC.jpg",
        "production_companies": [
          {
            "id": 2303,
            "logo_path": null,
            "name": "Villealfa Filmproductions",
            "origin_country": "FI"
          }
        ],
        "production_countries": [
          {
            "iso_3166_1": "FI",
            "name": "Finland"
          }
        ],
        "release_date": "1988-10-21",
        "revenue": 0,
        "runtime": 73,
        "spoken_languages": [
          {
            "english_name": "Finnish",
            "iso_639_1": "fi",
            "name": "suomi"
          }
        ],
        "status": "Released",
        "tagline": "",
        "title": "Ariel",
        "video": false,
        "vote_average": 7.099,
        "vote_count": 313
      },
      {
        "adult": false,
        "backdrop_path": "/lhsrT0SbPaqmBMHLd5N83j8XAFy.jpg",
        "belongs_to_collection": null,
        "budget": 1530000,
        "genres": [
          {
            "id": 28,
            "name": "Action"
          },
          {
            "id": 18,
            "name": "Drama"
          },
          {
            "id": 53,
            "name": "Thriller"
          }
        ],
        "homepage": "",
        "id": 104,
        "imdb_id": "tt0130827",
        "origin_country": [
          "DE"
        ],
        "original_language": "de",
        "original_title": "Lola rennt",
        "overview": "Lola receives a phone call from her boyfriend Manni. He lost 100,000 DM in a subway train that belongs to a very bad guy. She has 20 minutes to raise this amount and meet Manni. Otherwise, he will rob a store to get the money. Three different alternatives may happen depending on some minor event along Lola's run.",
        "popularity": 36.915,
        "poster_path": "/v0giIi4bTILVhNhJajet3WWY3FA.jpg",
        "production_companies": [
          {
            "id": 96,
            "logo_path": "/9ps82gVzUeNdkjmLzoGDQLiLDio.png",
            "name": "X Filme Creative Pool",
            "origin_country": "DE"
          },
          {
            "id": 46,
            "logo_path": "/3xFdKHLXPGHEbrAkmsepGE8974Y.png",
            "name": "WDR",
            "origin_country": "DE"
          }
        ],
        "production_countries": [
          {
            "iso_3166_1": "DE",
            "name": "Germany"
          }
        ],
        "release_date": "1998-03-03",
        "revenue": 7267585,
        "runtime": 81,
        "spoken_languages": [
          {
            "english_name": "German",
            "iso_639_1": "de",
            "name": "Deutsch"
          },
          {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
          },
          {
            "english_name": "Japanese",
            "iso_639_1": "ja",
            "name": "日本語"
          }
        ],
        "status": "Released",
        "tagline": "Every second of every day you're faced with a decision that can change your life.",
        "title": "Run Lola Run",
        "video": false,
        "vote_average": 7.3,
        "vote_count": 2109
      },
      {
        "adult": false,
        "backdrop_path": "/ahdc4lmShSJOkIGnbUI77xeh2Ze.jpg",
        "belongs_to_collection": null,
        "budget": 0,
        "genres": [
          {
            "id": 35,
            "name": "Comedy"
          },
          {
            "id": 18,
            "name": "Drama"
          },
          {
            "id": 10402,
            "name": "Music"
          },
          {
            "id": 10749,
            "name": "Romance"
          }
        ],
        "homepage": "",
        "id": 333,
        "imdb_id": "tt0303785",
        "origin_country": [
          "CA",
          "US"
        ],
        "original_language": "en",
        "original_title": "Bollywood/Hollywood",
        "overview": "Rahul Seth is a dashing young millionaire who believes he is \"western\" enough to rebel against his mother and grandmother. They are not too keen about his Caucasian girlfriend Kimberly who, to make matters worse, is a pop star. Before you can say \"karmic intervention,\" Kimberly dies in a freak accident and Rahul is devastated. Instead of allowing him to mourn in peace, Rahul's mother sees the opportunity she's been waiting for. She threatens to call off his sister's wedding unless he finds himself a \"nice Indian girl.\" Rahul enlists the services of Sue, a fiercely independent escort whom he believes to be Hispanic, and therefore not \"married\" to the conventions taught to young Indian women. With a wink in her eye, Sue accepts the deal to pose as his Indian bride-to-be. She needs the money and having never been a fan of the typical Indian male, she feels her heart is safe. The charade begins....",
        "popularity": 11.1,
        "poster_path": "/pXIVHT73QG70nZZdsVMwa0OgFUK.jpg",
        "production_companies": [
          {
            "id": 176,
            "logo_path": null,
            "name": "Different Tree Same Wood Productions",
            "origin_country": ""
          }
        ],
        "production_countries": [
          {
            "iso_3166_1": "CA",
            "name": "Canada"
          }
        ],
        "release_date": "2002-10-25",
        "revenue": 0,
        "runtime": 101,
        "spoken_languages": [
          {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
          }
        ],
        "status": "Released",
        "tagline": "Nothing is what it appears to be.",
        "title": "Bollywood/Hollywood",
        "video": false,
        "vote_average": 6.2,
        "vote_count": 26
      },
      {
        "adult": false,
        "backdrop_path": "/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg",
        "belongs_to_collection": null,
        "budget": 175000000,
        "genres": [
          {
            "id": 16,
            "name": "Animation"
          },
          {
            "id": 10751,
            "name": "Family"
          },
          {
            "id": 35,
            "name": "Comedy"
          },
          {
            "id": 14,
            "name": "Fantasy"
          }
        ],
        "homepage": "https://www.disneyplus.com/movies/turning-red/4mFPCXJi7N2m",
        "id": 508947,
        "imdb_id": "tt8097030",
        "origin_country": [
          "US"
        ],
        "original_language": "en",
        "original_title": "Turning Red",
        "overview": "Thirteen-year-old Mei is experiencing the awkwardness of being a teenager with a twist – when she gets too excited, she transforms into a giant red panda.",
        "popularity": 360.568,
        "poster_path": "/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg",
        "production_companies": [
          {
            "id": 2,
            "logo_path": "/wdrCwmRnLFJhEoH8GSfymY85KHT.png",
            "name": "Walt Disney Pictures",
            "origin_country": "US"
          },
          {
            "id": 3,
            "logo_path": "/1TjvGVDMYsj6JBxOAkUHpPEwLf7.png",
            "name": "Pixar",
            "origin_country": "US"
          }
        ],
        "production_countries": [
          {
            "iso_3166_1": "US",
            "name": "United States of America"
          }
        ],
        "release_date": "2022-03-10",
        "revenue": 21328962,
        "runtime": 100,
        "spoken_languages": [
          {
            "english_name": "Cantonese",
            "iso_639_1": "cn",
            "name": "广州话 / 廣州話"
          },
          {
            "english_name": "Mandarin",
            "iso_639_1": "zh",
            "name": "普通话"
          },
          {
            "english_name": "Korean",
            "iso_639_1": "ko",
            "name": "한국어/조선말"
          },
          {
            "english_name": "French",
            "iso_639_1": "fr",
            "name": "Français"
          },
          {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
          }
        ],
        "status": "Released",
        "tagline": "Growing up is a beast.",
        "title": "Turning Red",
        "video": false,
        "vote_average": 7.391,
        "vote_count": 4916
      },
      {
        "adult": false,
        "backdrop_path": "/pwGmXVKUgKN13psUjlhC9zBcq1o.jpg",
        "belongs_to_collection": null,
        "budget": 80000000,
        "genres": [
          {
            "id": 28,
            "name": "Action"
          },
          {
            "id": 14,
            "name": "Fantasy"
          }
        ],
        "homepage": "https://www.madameweb.movie",
        "id": 634492,
        "imdb_id": "tt11057302",
        "origin_country": [
          "US"
        ],
        "original_language": "en",
        "original_title": "Madame Web",
        "overview": "Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present.",
        "popularity": 790.15,
        "poster_path": "/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg",
        "production_companies": [
          {
            "id": 5,
            "logo_path": "/71BqEFAF4V3qjjMPCpLuyJFB9A.png",
            "name": "Columbia Pictures",
            "origin_country": "US"
          },
          {
            "id": 435,
            "logo_path": "/AjzK0s2w1GtLfR4hqCjVSYi0Sr8.png",
            "name": "di Bonaventura Pictures",
            "origin_country": "US"
          }
        ],
        "production_countries": [
          {
            "iso_3166_1": "US",
            "name": "United States of America"
          }
        ],
        "release_date": "2024-02-14",
        "revenue": 100298817,
        "runtime": 116,
        "spoken_languages": [
          {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
          }
        ],
        "status": "Released",
        "tagline": "Her web connects them all.",
        "title": "Madame Web",
        "video": false,
        "vote_average": 5.609,
        "vote_count": 1169
      },
      {
        "adult": false,
        "backdrop_path": "/vTlK3chwsEToSoQJYUcJaHlNhIf.jpg",
        "belongs_to_collection": null,
        "budget": 19000000,
        "genres": [
          {
            "id": 18,
            "name": "Drama"
          },
          {
            "id": 12,
            "name": "Adventure"
          }
        ],
        "homepage": "https://www.arthurtheking.movie/",
        "id": 618588,
        "imdb_id": "tt10720352",
        "origin_country": [
          "US"
        ],
        "original_language": "en",
        "original_title": "Arthur the King",
        "overview": "Over the course of ten days and 435 miles, an unbreakable bond is forged between pro adventure racer Michael Light and a scrappy street dog companion dubbed Arthur. As the team is pushed to their outer limits of endurance in the race, Arthur redefines what victory, loyalty and friendship truly mean.",
        "popularity": 936.539,
        "poster_path": "/gxVcBc4VM0kAg9wX4HVg6KJHG46.jpg",
        "production_companies": [
          {
            "id": 24049,
            "logo_path": "/zOHQ0A3PpNoLLeAxRZwSqNV3nPr.png",
            "name": "Sierra/Affinity",
            "origin_country": "US"
          },
          {
            "id": 8147,
            "logo_path": "/q6HOAdSNgCbeOqwoMVRc6REgbXF.png",
            "name": "Entertainment One",
            "origin_country": "CA"
          },
          {
            "id": 100033,
            "logo_path": "/74LDJbOFdya1ijNT11uh0mM5eg0.png",
            "name": "Tucker Tooley Entertainment",
            "origin_country": "US"
          },
          {
            "id": 169668,
            "logo_path": null,
            "name": "Municipal Pictures",
            "origin_country": "US"
          },
          {
            "id": 11761,
            "logo_path": null,
            "name": "Mark Canton Productions",
            "origin_country": ""
          }
        ],
        "production_countries": [
          {
            "iso_3166_1": "CA",
            "name": "Canada"
          },
          {
            "iso_3166_1": "US",
            "name": "United States of America"
          }
        ],
        "release_date": "2024-03-15",
        "revenue": 31649885,
        "runtime": 107,
        "spoken_languages": [
          {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
          },
          {
            "english_name": "Spanish",
            "iso_639_1": "es",
            "name": "Español"
          }
        ],
        "status": "Released",
        "tagline": "An unexpected encounter. An unlikely bond. An unforgettable adventure.",
        "title": "Arthur the King",
        "video": false,
        "vote_average": 6.7,
        "vote_count": 72
      }
    ],
    file: [],
  });

  /**********************************************************************************
   * Rendering
   **********************************************************************************/

  return (
    <div className='common-container'>
      <div className='flex flex-col w-full max-w-[1024px] mx-auto gap-y-2 pt-12 xl:pt-0 md:pb-32'>
        <h2 className="title">Pick A Film</h2>
        {/* Guests */}
        <GuestList />
        {/* Poster */}
        {/* <SelectedFilm selectedFilms={formData.selectedFilms}/> */}
        {/* Film Poll */}
        <FilmPoll formData={formData} setFormData={setFormData} />
      </div>

    </div>
  )
}

export default PickAFilmPage
