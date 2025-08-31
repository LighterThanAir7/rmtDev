import {useJobItemsContext} from "../context/JobItemsContextProvider.tsx";
import JobList from "./JobList.tsx";

export default function JobListSearch() {
	const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();

	return <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
}