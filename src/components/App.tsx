import Background from "./Background.tsx";
import Footer from "./Footer.tsx";
import Header, {HeaderTop} from "./Header.tsx";
import Container from "./Container.tsx";
import Logo from "./Logo.tsx";
import BookmarksButton from "./BookmarksButton.tsx";
import SearchForm from "./SearchForm.tsx";
import Sidebar, {SidebarTop} from "./Sidebar.tsx";
import JobItemContent from "./JobItemContent.tsx";
import ResultsCount from "./ResultsCount.tsx";
import SortingControls from "./SortingControls.tsx";
import PaginationControls from "./PaginationControls.tsx";
import {Toaster} from "react-hot-toast";
import JobListSearch from "./JobListSearch.tsx";

function App() {
	return (
		<>
			<Background />
			<Header>
				<HeaderTop>
					<Logo />
					<BookmarksButton />
				</HeaderTop>
				<SearchForm />
			</Header>
			<Container>
				<Sidebar>
					<SidebarTop>
						<ResultsCount />
						<SortingControls />
					</SidebarTop>
					<JobListSearch />
					<PaginationControls />
				</Sidebar>
				<JobItemContent />
			</Container>
			<Footer />

			<Toaster position="top-right" />
		</>
	);
}

export default App;