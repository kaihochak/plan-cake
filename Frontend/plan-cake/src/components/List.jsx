import React from 'react';

const List = ({ items, isFilterVisible, isParticipantsVisible, layout }) => {
  // Example filter state (you might have a more complex filter state depending on your needs)
  const [filter, setFilter] = React.useState('');

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter items based on filter state
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {isFilterVisible && (
        <div>
          <input
          className='w-full p-2 mb-4 rounded-md'
            type="text"
            placeholder="Filter events..."
            value={filter}
            onChange={handleFilterChange}
          />
          {/* Other filters can be added here */}
        </div>
      )}
      <div className={layout === 'grid' ? 'grid grid-cols-2 gap-4' : 'flex flex-col'}>
        {filteredItems.map((item) => (
          <div key={item.id} className="event-card">
            <img src={item.image} alt={item.title} />
            <div className="event-info">
              <h3>{item.title}</h3>
              <p>{item.date}</p>
              {isParticipantsVisible && (
                <div className="participants">
                  {/* Render participant avatars or icons here */}
                  {item.participants.map((participant) => (
                    <img key={participant.id} src={participant.avatar} alt={participant.name} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
