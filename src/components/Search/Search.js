import React from 'react';
import './Search.css';

const Search = ({updateKeyword}) => (
  <div className="search_wrapper">
    <input
      type="text"
      className="search"
      placeholder="키워드를 입력하세요"
      onChange={(e) => { updateKeyword(e.target.value) }}
      name="content"
    />
  </div>
)

export default Search;
