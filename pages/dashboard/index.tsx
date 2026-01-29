import { PageContainer } from "@features/layout";
import { ProjectList } from "@features/projects";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageContainer
      title="Projects"
      info="Overview of your projects sorted by alert level."
    >
      <ProjectList />
    </PageContainer>
  );
};

export default Home;
