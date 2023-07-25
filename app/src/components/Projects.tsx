import Project from "./Project";
import { useState, useCallback, useEffect } from "react";
import { Octokit } from "@octokit/core";
import { RiEmotionSadLine } from "react-icons/ri";

//Use octokit to increase the API rate limit
const octokit = new Octokit({ auth: process.env.REACT_APP_AUTH_KEY });
const allReposURL = "/user/repos?sort=updated&direction=desc";
const specificRepoURL = `/repos/${process.env.REACT_APP_GITHUBUSERNAME}`;

function LoadingProject(): JSX.Element {
  return (
    <div className="w-full grid grid-cols-6 pt-1 py-4">
      <div className="col-start-1 col-span-1 h-fit my-1 flex flex-col">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-2xl inline-block animate-pulse my-0.5"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-2xl inline-block animate-pulse my-0.5"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-2xl inline-block animate-pulse my-0.5"></div>
      </div>
      <div className="col-start-2 col-span-5 h-fit ml-4 flex flex-col mt-1">
        <div className="h-6 w-60 bg-slate-200 dark:bg-slate-800 rounded-2xl inline-block animate-pulse my-0.5"></div>
        <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded-2xl inline-block animate-pulse mt-2"></div>
        <div className="h-6 w-8/12 bg-slate-200 dark:bg-slate-800 rounded-2xl inline-block animate-pulse mt-3"></div>
      </div>
    </div>
  );
}

export default function Projects({
  numProjects,
}: {
  numProjects: number;
}): JSX.Element {
  //numProjects is the number of projects we retrieve from GitHub
  const [projectsArray, setProjectsArray] = useState<any[]>([]);
  const [retrieved, setRetrieved] = useState<boolean>(false);
  const [errors, setErrors] = useState("");
  const fetchRepos = useCallback(async () => {
    let repoList = [];
    try {
      // getting all repos
      const response = await octokit.request(allReposURL);
      // slicing to the length
      repoList = [...response.data.slice(0, numProjects)]; //set to 4 projects retrieved
      // adding specified repos
      let updList = [];
      try {
        for (let repoName of repoList) {
          const response = await octokit.request(
            `${specificRepoURL}/${repoName.name}`
          );
          updList.push(response.data);
        }
      } catch (error: any) {
        setRetrieved(true);
        setErrors(error.message);
        console.error(error.message);
      }
      // setting projectArray
      setProjectsArray(updList);
      setRetrieved(true);
    } catch (error: any) {
      setRetrieved(true);
      setErrors(error.message);
      console.error(error.message);
    }
  }, [numProjects]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return (
    <div>
      {!retrieved /*
        <div className="flex flex-col items-center py-4">
          <div className="pl-24">
            <InfinitySpin width="300" />
          </div>
          <p className="inline">Fetching projects from GitHub...</p>
        </div> */ && (
        <div className="flex flex-col">
          <LoadingProject />
          <LoadingProject />
          <LoadingProject />
          <LoadingProject />
        </div>
      )}
      {errors && (
        <div className="flex flex-col items-center py-12">
          <RiEmotionSadLine size={40} className="text-black" />
          <p className="pt-4">
            Oops! Something went wrong when loading projects from GitHub. Try
            again later!
          </p>
        </div>
      )}
      {retrieved &&
        projectsArray.map((proj) => (
          <Project
            key={proj.name}
            title={proj.name}
            description={proj.description}
            projectLink={proj.svn_url}
            langLink={proj.languages_url}
            date={proj.pushed_at}
          />
        ))}
    </div>
  );
}
