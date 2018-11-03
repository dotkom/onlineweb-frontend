import React from 'react';
import { DateTime } from 'luxon';
import Fuse from 'fuse.js';
import Job from './Job';
import { ITag } from '../models/Tag';
import { IJob } from '../models/Job';

import style from '../less/career.less';

// Checks tags where the only involved factor is whether the button is on or not.
const defaultCheck = (job: IJob, id: number, tag: ITag) => {
  // Job might have multiple tags, such as multiple locations.
  if (Array.isArray(job.tags[id])) {
    // If the tag exists in the list of tags.
    if (job.tags[id].indexOf(tag.name) >= 0) {
      return true;
    }
  } else if (job.tags[id] === tag.id) {
    return true;
  }

  return false;
};

// Move jobs which match the check to the top of the array using
// a stable algorithm. This is used to move full-time jobs and
// sponsored jobs to the top.
const arrangeJobs = (jobs: any, check: any) => {
  const top: any[] = [];
  const remainder: any[] = [];

  jobs.forEach((job: any) => {
    if (check(job)) {
      top.push(job);
    } else {
      remainder.push(job);
    }
  });

  return top.concat(remainder);
};

// Check for the deadline tags. If the difference between the deadline, and
// the current date is less than the deadline specified by the tag, return true.
const deadlineCheck = (job: IJob, id: number, tag: ITag) => {
  if (DateTime.fromISO(job.deadline).isValid) {
    return new Date(job.deadline).getTime() - Date.now() <= tag.deadline;
  } else {
    return false;
  }
};

export interface IJobListProps {
  jobs: IJob[];
  tags: ITag[];
  filterText: string;
}

const JobList = ({ jobs, tags, filterText }: IJobListProps) => {
  const fuse = new Fuse(jobs, {
    shouldSort: false,
    threshold: 0.6, // Fixed wrong spelling, s/treshold/threshold/, behavior may change from this?
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['locations', 'companyName', 'companyName', 'title', 'ingress', 'type'],
  });

  const search = fuse.search(filterText);

  const prefilteredJobs = filterText.length ? search : jobs;

  let jobObjects = prefilteredJobs.reduce((elems: any, job: any) => {
    // Whether we may show this job or not.
    let canShow = true;

    Object.keys(tags).forEach((type: string) => {
      // If this value is true, it means the job contains all the
      // selected tags in the current group of tags.
      let typeCanShow = false;

      // True if no tags in the current tag type are selected.
      let typeAllDisabled = true;

      Object.keys(tags[type]).forEach((tag) => {
        if (tags[type][tag].display) {
          typeAllDisabled = false;

          // If this is a deadline, we use a date-based checking function instead.
          const check = tags[type][tag].deadline ? deadlineCheck : defaultCheck;

          // Checks if the job can displayed based on the current tag or not.
          if (check(job, type, tags[type][tag])) {
            typeCanShow = true;
          }
        }
      });

      if (!(typeCanShow || typeAllDisabled)) {
        canShow = false;
      }
    });

    if (canShow) {
      elems.push(job);
    }

    return elems;
  }, []);

  if (!filterText) {
    jobObjects = jobObjects.sort((a: IJob, b: IJob) => a.title > b.title);
  }

  // First move full-time jobs to the top, then move the sponsored
  // jobs to the top, while retaining the full-time-job sorting.
  const sortedJobs = arrangeJobs(
    arrangeJobs(jobObjects, (job: IJob) => job.type === 'Fastjobb'),
    (job: IJob) => job.featured
  );

  const jobElems = sortedJobs.map((job, i) => <Job {...job} key={i} />);

  return <div className={style.jobList}>{jobElems}</div>;
};

export default JobList;
