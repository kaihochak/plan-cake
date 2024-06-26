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