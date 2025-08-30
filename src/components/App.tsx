import Background from "./Background.tsx";
import Footer from "./Footer.tsx";
import Header, {HeaderTop} from "./Header.tsx";
import Container from "./Container.tsx";
import {useState} from "react";
import Logo from "./Logo.tsx";
import BookmarksButton from "./BookmarksButton.tsx";
import SearchForm from "./SearchForm.tsx";
import Sidebar, {SidebarTop} from "./Sidebar.tsx";
import JobItemContent from "./JobItemContent.tsx";
import ResultsCount from "./ResultsCount.tsx";
import SortingControls from "./SortingControls.tsx";
import JobList from "./JobList.tsx";
import PaginationControls from "./PaginationControls.tsx";
import {useDebounce, useJobItems} from "../lib/hooks.ts";
import {Toaster} from "react-hot-toast";
import {RESULTS_PER_PAGE} from "../lib/constants.ts";

function App() {
	// State
	const [searchText, setSearchText] = useState('');
	const debouncedSearchText = useDebounce(searchText, 250);
	const { jobItems, isLoading } = useJobItems(debouncedSearchText);
	const [currentPage, setCurrentPage] = useState(1);

	// Derived
	const totalNumberOfResults = jobItems?.length || 0;
	const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);
	const startSlice = currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE;
	const endSlice = currentPage * RESULTS_PER_PAGE;
	const jobItemsSliced = jobItems?.slice(startSlice, endSlice) || [];

	// Handlers
	const handlePageChange = (direction: 'next' | 'prev') => {
		if (direction === 'next') {
			setCurrentPage((prevPage) => ++prevPage);
		} else if (direction === 'prev') {
			setCurrentPage((prevPage) => --prevPage);
		}
	}

	return (
		<>
			<Background />
			<Header>
				<HeaderTop>
					<Logo />
					<BookmarksButton />
				</HeaderTop>
				<SearchForm searchText={searchText} setSearchText={setSearchText} />
			</Header>
			<Container>
				<Sidebar>
					<SidebarTop>
						<ResultsCount totalNumberOfResults={totalNumberOfResults} />
						<SortingControls />
					</SidebarTop>
					<JobList isLoading={isLoading} jobItems={jobItemsSliced} />
					<PaginationControls
						currentPage={currentPage}
						handlePageChange={handlePageChange}
						totalNumberOfPages={totalNumberOfPages}
					/>
				</Sidebar>
				<JobItemContent />
			</Container>
			<Footer />

			<Toaster position="top-right" />
		</>
	);
}

export default App;