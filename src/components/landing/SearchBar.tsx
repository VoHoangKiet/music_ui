import { Input } from 'antd';
import styled from 'styled-components';

const StyledSearch = styled(Input.Search)`
  .ant-input {
    border-radius: 15px;
    color: #333;
    background-color: transparent;
    border-color: black;
  }
  .ant-input-search-button {
    border-radius: 15px;
    background-color: #333;
    color: white;
    &:hover{
    background-color: #333 !important;
    }
  }
`;

export const SearchBar = () => {
  const onSearch = (value: any) => {
    console.log('Search value:', value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
      <StyledSearch 
        placeholder="Search Song"
        onSearch={onSearch}
        enterButton
      />
    </div>
  );
};
