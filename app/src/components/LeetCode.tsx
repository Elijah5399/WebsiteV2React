import { useEffect, useState, useCallback } from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function LeetCode() {
  const API = `https://leetcode-stats-api.herokuapp.com/${process.env.REACT_APP_LEETCODE_USERNAME}`;
  const [data, setData] = useState<any>({});
  const [retrieved, setRetrieved] = useState(false);
  const [errors, setErrors] = useState("");

  const fetchLeetCode = useCallback(async () => {
    try {
      const response = await fetch(API);
      const lcData = await response.json();
      setRetrieved(true);
      setData(lcData);
      //console.log("data is: " + JSON.stringify(data));
    } catch (e: any) {
      setErrors(e.message);
      setRetrieved(true);
    }
  }, [API]);

  useEffect(() => {
    fetchLeetCode();
  }, [fetchLeetCode]);

  return (
    <>
      {retrieved && (
        <div className="flex flex-col pt-4 items-center text-black dark:text-black">
          <div className="border-solid border-[1px] border-black dark:border-emerald-800 bg-white dark:bg-[#282828] rounded-md min-w-max max-w-lg w-full px-4 pt-2 pb-4 dark:text-white">
            <h1>Rank: {data.ranking}</h1>
            <h1 className="text-sm text-gray-600 dark:text-gray-200">
              Solved Problems
            </h1>
            <div className="flex pt-1 flex-col xl:flex-row items-center">
              <div className="shrink-1 relative max-h-[100px] max-w-[100px] z-base mt-2 group/circle">
                <svg
                  className="h-full w-full origin-center -rotate-90 transform"
                  viewBox="0 0 100 100"
                >
                  <circle
                    fill="none"
                    cx="50px"
                    cy="50px"
                    r="46"
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    className="w-[100px] text-gray-400 dark:text-dark-gray-4"
                  ></circle>
                  <circle
                    fill="none"
                    cx="50px"
                    cy="50px"
                    r="46"
                    strokeWidth="5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    className="cursor-pointer text-orange-400 drop-shadow-[0_2px_4px_rgba(255,161,22,0.2)]"
                    strokeDasharray="30.134976181263323 258.89154794899764"
                    strokeDashoffset="0"
                    data-difficulty="ALL"
                  ></circle>
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-default text-center">
                  <div>
                    <div className="text-[24px] font-medium group-hover/circle:hidden">
                      {data.totalSolved}
                    </div>
                    <div className="text-[24px] font-semibold hidden group-hover/circle:inline">
                      {((data.totalSolved / data.totalQuestions) * 100).toFixed(
                        1
                      )}
                      %
                    </div>
                    <div className="whitespace-nowrap text-xs">Solved</div>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 xl:px-6 flex flex-col gap-1">
                <div className="col-start-3 col-span-4 row-start-1 row-span-1">
                  <p className="text-gray-500 dark:text-gray-400 text-xs ml-0.5">
                    Easy{" "}
                    <span className="text-base text-black dark:text-white ml-4">
                      {data.easySolved}
                    </span>{" "}
                    / {data.totalEasy}
                  </p>
                  <div className="relative h-2 w-full overflow-hidden rounded-full max-w-none">
                    <div className="absolute h-full w-full bg-green-600 bg-opacity-50"></div>
                    <div
                      className="absolute h-full rounded-full transition-all duration-300 ease-out bg-emerald-500"
                      style={{
                        width:
                          Math.round((data.easySolved / data.totalEasy) * 100) +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="col-start-3 col-span-4 row-start-2 row-span-1">
                  <p className="text-gray-500 dark:text-gray-400 text-xs ml-0.5">
                    Medium{" "}
                    <span className="text-base text-black dark:text-white ml-4">
                      {data.mediumSolved}
                    </span>{" "}
                    / {data.totalMedium}
                  </p>
                  <div className="relative h-2 w-full overflow-hidden rounded-full max-w-none">
                    <div className="absolute h-full w-full bg-yellow-600 bg-opacity-50"></div>
                    <div
                      className="absolute h-full rounded-full transition-all duration-300 ease-out bg-orange-400"
                      style={{
                        width:
                          Math.round(
                            (data.mediumSolved / data.totalMedium) * 100
                          ) + "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="col-start-3 col-span-4 row-start-3 row-span-2">
                  <p className="text-gray-500 dark:text-gray-400 text-xs ml-0.5">
                    Hard{" "}
                    <span className="text-base text-black dark:text-white ml-4">
                      {data.hardSolved}
                    </span>{" "}
                    / {data.totalHard}
                  </p>
                  <div className="relative h-2 w-full overflow-hidden rounded-full max-w-none">
                    <div className="absolute h-full w-full bg-red-600 bg-opacity-50"></div>
                    <div
                      className="absolute h-full rounded-full transition-all duration-300 ease-out bg-red-600"
                      style={{
                        width:
                          Math.round((data.hardSolved / data.totalHard) * 100) +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!retrieved && (
        <div className="flex flex-col items-center py-4">
          <div className="pl-24">
            <InfinitySpin width="300" />
          </div>
          <p className="inline">Fetching LeetCode data...</p>
        </div>
      )}
    </>
  );
}

/* 
Data format
{
    "status": "success",
    "message": "retrieved",
    "totalSolved": 122,
    "totalQuestions": 2732,
    "easySolved": 48,
    "totalEasy": 685,
    "mediumSolved": 68,
    "totalMedium": 1445,
    "hardSolved": 6,
    "totalHard": 602,
    "acceptanceRate": 53.25,
    "ranking": 537898,
    "contributionPoints": 1032,
    "reputation": 0,
    "submissionCalendar": {
        "1669680000": 2,
        "1678320000": 27,
        "1678406400": 10,
        "1678492800": 1,
        "1678579200": 1,
        "1678665600": 5,
        "1678752000": 5,
        "1678838400": 7,
        "1678924800": 1,
        "1679011200": 1,
        "1679097600": 1,
        "1679184000": 4,
        "1679270400": 3,
        "1679356800": 5,
        "1679875200": 1,
        "1682899200": 14,
        "1682985600": 4,
        "1683072000": 14,
        "1683158400": 5,
        "1683244800": 8,
        "1683331200": 3,
        "1683417600": 3,
        "1683504000": 2,
        "1683590400": 2,
        "1683676800": 2,
        "1683763200": 2,
        "1683849600": 3,
        "1683936000": 5,
        "1684022400": 7,
        "1684108800": 1,
        "1684195200": 2,
        "1684281600": 1,
        "1684368000": 4,
        "1684454400": 2,
        "1684540800": 1,
        "1684627200": 7,
        "1684713600": 3,
        "1684800000": 3,
        "1684886400": 6,
        "1684972800": 8,
        "1685059200": 4,
        "1685145600": 2,
        "1685232000": 4,
        "1685318400": 2,
        "1685404800": 11,
        "1685491200": 2,
        "1685577600": 3,
        "1685664000": 3,
        "1685750400": 2,
        "1685836800": 2,
        "1685923200": 2,
        "1686009600": 9,
        "1686096000": 1,
        "1686182400": 3,
        "1686268800": 1,
        "1686355200": 9
    }
}
*/
