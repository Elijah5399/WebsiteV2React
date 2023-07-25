import ModeToggle from "./toggler/ModeToggle";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import Skills from "./Skills";
import Projects from "./Projects";
import InteractiveName from "./InteractiveName";
import MyTypography from "./MyTypography";
import LeetCode from "./LeetCode";
import { BsArrowUpRight } from "react-icons/bs";
import { useRef, useState, useEffect } from "react";
import Highlight from "./Highlight";

export default function MainPage() {
  const abt = useRef<HTMLElement>(null);
  const proj = useRef<HTMLElement>(null);
  const sk = useRef<HTMLElement>(null);
  const scrollContainer = useRef<HTMLElement>(null);
  const [currSection, setCurrSection] = useState("about");

  function smoothScroller(x: HTMLElement | null): void {
    if (x !== null) {
      x.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    function elemChange() {
      const abt_bottom = abt.current?.getBoundingClientRect().bottom;
      const proj_bottom = proj.current?.getBoundingClientRect().bottom;
      if (abt_bottom === undefined || proj_bottom === undefined) {
        return;
      }
      if (abt_bottom > 0) {
        setCurrSection("about");
      } else if (proj_bottom > 0) {
        setCurrSection("project");
      } else {
        setCurrSection("skills");
      }
    }
    if (scrollContainer !== null && scrollContainer.current !== null) {
      scrollContainer.current.addEventListener("scroll", elemChange);
    }
  }, []);
  return (
    <div className="relative">
      <Highlight />
      <ModeToggle />
      <div className="lg:max-h-screen bg-emerald-50 dark:bg-black pt-20 lg:pt-0">
        <div className="mx-auto px-6 font-sans min-h-screen lg:max-h-screen max-w-screen-xxl selection:bg-emerald-500">
          <div className="lg:flex lg:justify-between lg:gap-4 lg:max-h-screen">
            <header className="lg:sticky lg:top-0 lg:flex lg:w-1/2 lg:flex-control lg:justify-between lg:py-24 lg:max-h-screen">
              <div className="lg:pl-60">
                <InteractiveName />

                <h2 className="text-2xl font-light text-black dark:text-white my-4">
                  Computer Science Undergraduate
                </h2>
                <MyTypography />
                <div id="links" className="mb-8 w-max hidden lg:block">
                  <ul>
                    <li
                      className="hover:cursor-pointer py-0.5"
                      onClick={() => smoothScroller(abt.current)}
                    >
                      <div
                        className={
                          "transition-[width] duration-300 h-0.5 mb-1 inline-block " +
                          (currSection === "about"
                            ? "bg-black dark:bg-white w-20"
                            : "bg-gray-700 dark:bg-gray-300 w-12")
                        }
                      ></div>
                      <span
                        className={
                          "antialiased text-md tracking-widest " +
                          (currSection === "about"
                            ? "text-black dark:text-white font-bold"
                            : "text-gray-700 dark:text-gray-300 ")
                        }
                      >
                        {" "}
                        About
                      </span>
                    </li>
                    <li
                      className="hover:cursor-pointer py-0.5"
                      onClick={() => smoothScroller(proj.current)}
                    >
                      <div
                        className={
                          "transition-[width] duration-300 h-0.5 mb-1 inline-block " +
                          (currSection === "project"
                            ? "bg-black dark:bg-white w-20"
                            : "bg-gray-700 dark:bg-gray-300 w-12")
                        }
                      ></div>
                      <span
                        className={
                          "antialiased text-md tracking-widest " +
                          (currSection === "project"
                            ? "text-black dark:text-white font-bold"
                            : "text-gray-700 dark:text-gray-300 ")
                        }
                      >
                        {" "}
                        Projects
                      </span>
                    </li>
                    <li
                      className="hover:cursor-pointer py-0.5"
                      onClick={() => smoothScroller(sk.current)}
                    >
                      <div
                        className={
                          "transition-[width] duration-300 h-0.5 mb-1 inline-block " +
                          (currSection === "skills"
                            ? "bg-black dark:bg-white w-20"
                            : "bg-gray-700 dark:bg-gray-300 w-12")
                        }
                      ></div>
                      <span
                        className={
                          "antialiased text-md tracking-widest " +
                          (currSection === "skills"
                            ? "text-black dark:text-white font-bold"
                            : "text-gray-700 dark:text-gray-300 ")
                        }
                      >
                        {" "}
                        Skills
                      </span>
                    </li>
                  </ul>
                </div>
                <div id="icons" className="flex flex-row pb-10 pt-2">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/elijah-chia/"
                    className="pr-2"
                  >
                    <BsLinkedin
                      size={40}
                      className="hover:text-emerald-400 dark:text-white text-black dark:hover:text-emerald-400"
                      title="LinkedIn"
                    />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/Elijah5399"
                    className="px-2"
                  >
                    <BsGithub
                      size={40}
                      className="hover:text-emerald-400 dark:text-white text-black dark:hover:text-emerald-400"
                      title="GitHub"
                    />
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://leetcode.com/ElijahChia/"
                    className="px-2"
                  >
                    <SiLeetcode
                      size={40}
                      className="hover:text-emerald-400 dark:text-white text-black dark:hover:text-emerald-400"
                      title="LeetCode"
                    />
                  </a>
                </div>
              </div>
            </header>
            <main
              className="lg:w-1/2 text-gray-600 dark:text-gray-300 overflow-auto lg:max-h-2/3 no-scrollbar"
              ref={scrollContainer}
            >
              <div className="lg:py-24 lg:pr-60 lg:max-h-2/3">
                <section
                  id="about"
                  className="scroll-mt-16 lg:scroll-mt-24"
                  ref={abt}
                >
                  <h1 className="text-3xl font-bold text-emerald-600">
                    About Me
                  </h1>
                  <hr className="border-emerald-600" />
                  <p className="text-lg mt-4">
                    I&apos;m currently a Year 2 student studying Computer
                    Science at the National University of Singapore. I&apos;ve
                    spent the past few years learning front-end and back-end web
                    development, and found an interest in creating{" "}
                    <span className="text-black font-semibold dark:text-white">
                      robust
                    </span>
                    ,{" "}
                    <span className="text-black font-semibold dark:text-white">
                      beautiful
                    </span>{" "}
                    web pages using different technologies.
                  </p>
                  <p className="text-lg mt-4">
                    Having participated in multiple hackathons, I&apos;ve also
                    developed non-web applications and software, such as
                    telegram bots and executable Java applications. In the
                    process, I&apos;ve learnt the importance of developing
                    understandable, reusable code with good documentation, and
                    I&apos;ve developed a passion for making software which can{" "}
                    <span className="text-black font-semibold dark:text-white">
                      impact lives
                    </span>
                    .
                  </p>
                  <p className="text-lg my-4">
                    In my free time, I learn to use new technologies, watch
                    anime, and play sports.
                  </p>
                </section>
                <section id="projects" ref={proj}>
                  <h1 className="text-3xl font-bold text-emerald-600">
                    My Recent Projects
                  </h1>
                  <hr className="border-emerald-600" />
                  <Projects numProjects={4} />
                </section>
                <section id="skills" ref={sk}>
                  <h1 className="text-3xl font-bold text-emerald-600">
                    My Skills
                  </h1>
                  <hr className="border-emerald-600" />
                  <Skills />
                </section>
                <section id="leetcode">
                  <h1 className="text-3xl font-bold text-emerald-600">
                    My LeetCode Progress
                  </h1>
                  <hr className="border-emerald-600" />
                  <LeetCode />
                </section>
                <section id="others" className="mt-4 mb-4">
                  <h1 className="text-3xl font-bold text-emerald-600">
                    Others
                  </h1>
                  <hr className="border-emerald-600" />
                  <div className="flex flex-col items-start px-2 py-4">
                    <a
                      href="Elijah_Resume_120723.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="group bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full mb-1">
                        See my résumé
                        <BsArrowUpRight
                          size={15}
                          className="dark:text-white text-black inline-block ml-1 mb-1
                            group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </button>
                    </a>
                    <a
                      href="https://elijahchia.vercel.app"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="group bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full my-1">
                        See my first website!
                        <BsArrowUpRight
                          size={15}
                          className=" dark:text-white text-black inline-block ml-1 mb-1
                              group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </button>
                    </a>
                  </div>
                </section>
                <hr className="border-gray-400" />
                <footer className="pt-2 pb-4">
                  <p className="text-sm">
                    Built by Elijah using{" "}
                    <a
                      href="https://nextjs.org/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-black dark:text-white font-semibold hover:text-emerald-400"
                    >
                      Next.js
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://tailwindcss.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-black dark:text-white font-semibold hover:text-emerald-400"
                    >
                      Tailwind CSS
                    </a>
                    , deployed with{" "}
                    <a
                      href="https://vercel.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-black dark:text-white font-semibold hover:text-emerald-400"
                    >
                      Vercel
                    </a>{" "}
                    and shared on{" "}
                    <a
                      href="https://github.com/Elijah5399/PersonalWebsiteV2"
                      target="_blank"
                      rel="noreferrer"
                      className="text-black dark:text-white font-semibold hover:text-emerald-400"
                    >
                      GitHub
                    </a>
                    . Inspired by
                    <a
                      href="https://brittanychiang.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-black dark:text-white font-semibold hover:text-emerald-400"
                    >
                      {" "}
                      brittanychiang.com
                    </a>
                  </p>
                </footer>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
