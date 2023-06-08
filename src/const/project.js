
import letter from "../../public/letter.png";
import mobile from "../../public/mobile.png";
import mobile1 from "../../public/ioe_app.png";
import Social_media from "../../public/social_media.png";
import book from "../../public/book.png";
import ShishuCare from "../../public/baby.png";
import react from "../../public/react.png";

export const Projects = [
  {
    title: "Recommendation Letter",
    description:
      "A web application that helps student and teacher to generate a recommendation letter for Bachelors and Masters.",
    tools: ["Django", "SQL", "JS"],
    img: letter,
  },
  {
    title: "IOE Mobile Application",
    description: ` A mobile application for students of IOE with multiple features
                like attendance, routine , result.`,
    tools: ["DjangoRESTFramework", "SQL", "Flutter"],
    img: mobile,
  },
  {
    title: "IOE portal",
    description:
      "A user-friendly application offering access to academic resources, notices, timetables, and result notifications, all in one convenient platform.",
    tools: ["DjangoRESTFramework", "SQL", "Flutter", "React", "TailwindCSS"],
    img: mobile1,
  },
  {
    title: "Socail Media Clone",
    description:
      "The social media clone is a replica platform that emulating the features and functionalities of popular social media networks",
    tools: ["React", "Node.js", "Express", "Sequelize", "TailwindCSS"],
    img: Social_media,
  },
  {
    title: "BookChowk",
    description:
      "Bookchowk is a platform that provides book lovers to sell or rent variety of books.",
    tools: ["React", "Node.js", "Express", "Sequelize", "TailwindCSS"],
    img: book,
  },
  {
    title: "ShishuCare",
    description:
      "A web application that helps student and teacher to generate a recommendation letter for Bachelors and Masters.",
    tools: ["Next.Js", "Node.js", "Express", "MongoDB", "MaterialUI"],
    img: ShishuCare,
  },
  {
    title: "React Projects",
    description:
      "Multiple react projects like Quiz App , Resturant Website Demo , Note Tracker etc.",
    tools: ["Next.Js", "React", "MaterialUI"],
    img: react,
  },
];
