import {useJobItemsContext} from "../context/JobItemsContextProvider.tsx";

export default function ResultsCount() {
  const { totalNumberOfResults } = useJobItemsContext();

  return <p className="count"><strong>{totalNumberOfResults}</strong> results</p>;
}
