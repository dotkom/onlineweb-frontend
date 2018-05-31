import React, { FormEvent } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import FilterList from '../components/FilterList';
import JobList from '../components/JobList';
import { IJob } from '../models/Job';
import { ITags, Tags, ITag } from '../models/Tag';

export interface IFilterableJobListProps {
  jobs: IJob[];
  tags: Tags;
  handleTagChange: Function;
  handleReset: Function;
  handleFilterChange: Function;
  filterText: string;
}

const FilterableJobList = (props: IFilterableJobListProps) => (
  <Grid>
    <Row>
      <Col md={4}>
        <div className="page-header">
          <h2>KARRIEREMULIGHETER</h2>
        </div>
      </Col>
    </Row>

    <Row>
      <FilterList
        tags={props.tags}
        handleTagChange={(type: string, changedTag: ITag, switchMode: boolean) =>
          props.handleTagChange(type, changedTag, switchMode)}
        handleReset={() => props.handleReset()}
        handleFilterChange={(e: FormEvent<HTMLFormElement>) => props.handleFilterChange(e)}
        filterText={props.filterText}
      />

      <JobList
        jobs={props.jobs}
        tags={props.tags}
        filterText={props.filterText}
      />
    </Row>
  </Grid>
);

export default FilterableJobList;
