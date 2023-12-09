// Example data for My Events
const myEventsData = [
  {
    id: 1,
    title: 'Before Trilogy Movie Night',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: './src/assets/posters/before.jpeg',
    participants: [
      { id: 'p1', avatar: '/path/to/avatar1.jpg', name: 'Alice' },
      { id: 'p2', avatar: '/path/to/avatar2.jpg', name: 'Bob' },
      // Add more participants as needed
    ],
    location: 'Kais House',
  },
  {
    id: 2,
    title: 'Kubrick Marathon',
    date: '09 Oct 2023',
    time: '06:00PM',
    image: './src/assets/posters/kubrick.jpg', // Replace with actual image path
    participants: [
      { id: 'p3', avatar: '/path/to/avatar3.jpg', name: 'Charlie' },
      { id: 'p4', avatar: '/path/to/avatar4.jpg', name: 'Dana' },
      // Add more participants as needed
    ],
    location: 'Kais House',
  },
  // Add more events as needed
];

export default myEventsData;
