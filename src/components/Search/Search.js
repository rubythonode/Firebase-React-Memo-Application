import React from 'react';
import PropTypes from 'prop-types';
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

Search.PropTypes = {
  updateKeyword: PropTypes.func
}

Search.defaultProps = {
  updateKeyword: () => { console.error('updateKeyword not defined') }
}

export default Search;
