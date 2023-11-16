import React, {useState} from 'react';
import TextInput from '../TextInput/TextInput';
import {styles} from './styles';

const TreeSearch = ({onSearch = f => f}) => {
  // states
  const [searchText, setSearchText] = useState('');

  // functions
  const handleSearch = value => {
    setSearchText(value);
    onSearch(value);
  };
  return (
    <>
      <div style={styles.searchWrapper}>
        <div style={styles.searchIconWrapper}>
          {/* <Icon name="search" style={styles.searchIcon} /> */}
        </div>
        <TextInput
          inputStyle={styles.searchInput}
          wrapperStyle={styles.searchInputWrapper}
          type="search"
          placeholder="جستجو"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
    </>
  );
};

export default TreeSearch;
