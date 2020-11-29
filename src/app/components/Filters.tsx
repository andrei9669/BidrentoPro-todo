import React from 'react';
import styled from 'styled-components';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

import { IFilters } from 'interfaces';
import { ALL, ACTIVE, COMPLETED } from 'utils/constants';

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
`;

const FilterLayout = styled.div`
  min-width: 7rem;
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
      checkedFilter: e.target.value as 'all' | 'active' | 'completed',
    }));
  };

  const handleSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((s) => ({ ...s, titleFilter: event.target.value }));
  };

  return (
    <Layout>
      <FilterLayout>
        <InputLabel id="done/not filter">Filter</InputLabel>
        <Select
          data-cy="filters"
          id="todos filter"
          labelId="todos filter"
          value={checkedFilter}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value={ALL}>All</MenuItem>
          <MenuItem value={ACTIVE}>Active</MenuItem>
          <MenuItem value={COMPLETED}>Completed</MenuItem>
        </Select>
      </FilterLayout>
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
