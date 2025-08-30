type ResultsCountProps = {
  totalNumberOfResults: number;
}

export default function ResultsCount({ totalNumberOfResults }: ResultsCountProps) {


  return <p className="count"><strong>{totalNumberOfResults}</strong> results</p>;
}
