import { Octokit } from "@octokit/core";
import { BsArrowUpRight } from "react-icons/bs";
import { useState, useEffect, useCallback } from "react";

//Use octokit to increase the API rate limit
const octokit = new Octokit({ auth: process.env.REACT_APP_AUTH_KEY });

function dateConverter(init: string): string {
  const date = new Date(init);
  const nowdate = new Date();
  const diff = nowdate.getTime() - date.getTime();
  const hours = Math.trunc(diff / 1000 / 60 / 60);

  if (hours < 24) {
    if (hours < 1) return "just now";
    let measurement = hours === 1 ? "hour" : "hours";
    return `${hours.toString()} ${measurement} ago`;
  } else {
    const options = { day: "numeric", month: "long", year: "numeric" } as const;
    const time = new Intl.DateTimeFormat("en-US", options).format(date);
    return `on ${time}`;
  }
}

function Language({
  languages_url,
  repo_url,
}: {
  languages_url: string;
  repo_url: string;
}) {
  const [data, setData] = useState<any>([]);

  const handleRequest = useCallback(async () => {
    try {
      const response = await octokit.request(languages_url);
      return setData(response.data);
    } catch (error: any) {
      console.error(error.message);
    }
  }, [languages_url]);

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  const array = [];
  let total_count = 0;
  for (let index in data) {
    array.push(index);
    total_count += data[index];
  }

  return (
    <div className="flex flex-wrap pl-8">
      {array.length
        ? array.map((language) => (
            <div
              key={language}
              className="rounded-full w-fit px-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-opacity-80 my-0.5 inline-block mx-0.5 pb-0.5"
            >
              <span className="font-medium text-xs leading-5 text-white dark:text-emerald-900">
                {language}:{" "}
                {Math.trunc((data[language] / total_count) * 1000) / 10} %
              </span>
            </div>
          ))
        : "code yet to be deployed."}
    </div>
  );
}

export default function Project({
  title,
  description,
  projectLink,
  langLink,
  date,
}: {
  title: string;
  description: string;
  projectLink: string;
  langLink: string;
  date: string;
}) {
  return (
    <a href={projectLink} className="group" target="_blank" rel="noreferrer">
      <div className="dark:group-hover:bg-stone-900/75 group-hover:bg-emerald-100/75 rounded-lg py-4 lg:grid lg:grid-cols-6 group-hover:drop-shadow hover:bg-left">
        <div className="lg:col-start-1 lg:col-end-2 pr-4 pt-1 pl-8 lg:pl-2">
          <p className="text-sm">Last updated: {dateConverter(date)}</p>
        </div>
        <div className="lg:col-span-5 lg:col-end-7 pl-8 mb-2">
          <span className="group-hover:text-emerald-300 text-2xl font-semibold">
            {title}{" "}
            <span>
              <BsArrowUpRight
                size={15}
                className="group-hover:text-emerald-400 dark:text-white text-black dark:group-hover:text-emerald-400 inline-block ml-1 mb-1
              group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </span>
          <p>
            {description ? description : "No description for this project yet."}
          </p>
        </div>
        <div className="col-start-2 col-span-5">
          {/* Languages go here */}
          <Language languages_url={langLink} repo_url={projectLink} />
        </div>
      </div>
    </a>
  );
}
