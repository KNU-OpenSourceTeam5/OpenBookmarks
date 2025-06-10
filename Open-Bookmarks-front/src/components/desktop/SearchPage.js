import React from 'react';
import CategorySection from './CategorySection';

const SearchPage = ({ links, currentUser, searchQuery }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        검색 결과: "{searchQuery}"
      </h2>
      <CategorySection
        links={links}
        currentUser={currentUser}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default SearchPage;