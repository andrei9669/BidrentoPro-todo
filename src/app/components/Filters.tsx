import React from 'react';
import styled from 'styled-components';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

import { IFilters } from 'interfaces';
import { ALL, DONE, NOT_DONE } from 'utils/constants';

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
`;

interface Props {
  filters: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
}

const Filters: React.FC<Props> = (props) => {
  const {
    filters: { checkedFilter, titleFilter },
    setFilters,
  } = props;

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFilters((s) => ({
      ...s,
      checkedFilter: e.target.value as 'all' | 'done' | 'not done',
    }));
  };

  const handleSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((s) => ({ ...s, titleFilter: event.target.value }));
  };

  return (
    <Layout>
      <div>
        <InputLabel id="done/not filter">(Not)Done filter</InputLabel>
        <Select
          id="done/not filter"
          labelId="done/not filter"
          value={checkedFilter}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value={ALL}>Both</MenuItem>
          <MenuItem value={DONE}>Done</MenuItem>
          <MenuItem value={NOT_DONE}>Not Done</MenuItem>
        </Select>
      </div>
      <div>
        <TextField
          variant="outlined"
          value={titleFilter}
          label="Search"
          onChange={handleSearchFilter}
          fullWidth
        />
      </div>
    </Layout>
  );
};

export default Filters;
