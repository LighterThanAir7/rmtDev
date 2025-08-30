import JobListItem from "./JobListItem.tsx";
import type { JobItem } from "../lib/types.ts";
import Spinner from "./Spinner.tsx";
import {useActiveId} from "../lib/hooks.ts";

type JobListProps = {
  isLoading: boolean,
  jobItems: JobItem[]
}

export default function JobList({ isLoading, jobItems }: JobListProps) {
  const activeId = useActiveId();

  return (
    <ul className="job-list">
      {isLoading ? <Spinner /> :  (
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeId}
          />
        ))
      )}
    </ul>
  );
}
