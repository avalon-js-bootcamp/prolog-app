import { getProjects } from "@api/projects";
import type { Project } from "@api/projects.types";
import { useQuery } from "@tanstack/react-query";

export function useGetProjects() {
  return useQuery<Project[], Error>(["projects"], getProjects);
}
