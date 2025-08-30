export type JobItem = {
	id: number,
	badgeLetters: string,
	title: string,
	company: string,
	daysAgo: number,
	relevanceScore: number,
}

export type JobItemExpanded = JobItem & {
	description: string,
	duration: string,
	location : string,
	qualifications: string[]
	reviews: string[],
	salary: string,
	companyURL: string
	coverImgURL: string
}

export type TSortBy = "relevant" | "recent";
export type TPageDirection = "prev" | "next";