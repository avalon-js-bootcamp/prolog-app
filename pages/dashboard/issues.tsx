import { IssueList } from "@features/issues";
import { PageContainer } from "@features/layout";
import type { NextPage } from "next";

const IssuesPage: NextPage = () => {
	return (
		<PageContainer
			title="Issues"
			info="Overview of errors, warnings, and events logged from your projects."
		>
			<IssueList />
		</PageContainer>
	);
};

export default IssuesPage;
