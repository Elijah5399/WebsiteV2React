import { FaLanguage } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { TbTools } from "react-icons/tb";
import "devicon/devicon.min.css"; //css file from the devicon node module, contains all the icons we use here!

function Icon({
  name,
  iconName,
}: {
  name: string;
  iconName: string;
}): JSX.Element {
  return (
    <div className="group/icon mx-0.5 py-2.5 px-2.5 flex flex-col items-center">
      <i className={iconName + " text-5xl"}></i>
      <div
        className="my-1 h-5 group-hover/icon:flex hidden rounded-full text-center 
      bg-gradient-to-r from-emerald-400 to-teal-400 bg-opacity-80 
      group-hover/icon:-mb-6 text-xs w-fit group-hover/icon:-mx-4 justify-center pt-0.5"
      >
        <p className=" text-emerald-100 dark:text-emerald-900 mx-2">{name}</p>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="flex flex-col items-center py-1 text-black dark:text-white pb-2">
      <div>
        <span className="text-xl font-semibold antialiased tracking-wide">
          Languages
        </span>
        <span className="inline-block pl-2">
          <FaLanguage size={30} className="relative top-2" />
        </span>
      </div>

      <div className="flex py-2 flex-wrap mx-1 gap-y-1">
        <Icon iconName="devicon-python-plain colored" name="Python" />
        <Icon iconName="devicon-java-plain colored" name="Java" />
        <Icon iconName="devicon-c-plain colored" name="C/C++" />
        <Icon iconName="devicon-php-plain colored" name="PHP" />
        <Icon iconName="devicon-javascript-plain colored" name="JavaScript" />
        <Icon iconName="devicon-typescript-plain colored" name="TypeScript" />
      </div>
      <div className="pt-2">
        <span className="text-xl font-semibold antialiased tracking-wide">
          Stacks & Frameworks
        </span>
        <span className="inline-block pl-2">
          <BsStack size={20} className="relative top-1" />
        </span>
      </div>
      <div className="flex flex-wrap py-2 mx-1 gap-y-1">
        <Icon iconName="devicon-html5-plain colored" name="HTML5" />
        <Icon iconName="devicon-css3-plain colored" name="CSS3" />
        <Icon iconName="devicon-react-original colored" name="React" />
        <Icon iconName="devicon-nextjs-original" name="Next.js" />
        <Icon iconName="devicon-nodejs-plain colored" name="Node.js" />
        <Icon iconName="devicon-express-original" name="Express.js" />
        <Icon iconName="devicon-mongodb-plain colored" name="MongoDB" />
        <Icon iconName="devicon-mysql-plain colored" name="MySQL" />
        <Icon iconName="devicon-docker-plain colored" name="Docker" />
        <Icon iconName="devicon-googlecloud-plain colored" name="GCloud" />
        <Icon
          iconName="devicon-amazonwebservices-original colored"
          name="AWS"
        />
      </div>
      <div className="">
        <span className="text-xl font-semibold antialiased tracking-wide">
          Other skills
        </span>
        <span className="inline-block pl-2">
          <TbTools size={20} className="relative top-1" />
        </span>
      </div>
      <div className="flex flex-wrap py-2 mx-1 gap-y-1">
        <Icon iconName="devicon-git-plain colored" name="Git" />
        <Icon iconName="devicon-github-original" name="GitHub" />
      </div>
    </div>
  );
}
