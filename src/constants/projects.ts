import AAT from "@assets/images/aat.png";
import Bettercollected from "@assets/images/bettercollected.png";
import SplitContract from "@assets/images/split_contract.png";
import { StaticImageData } from "next/image";

export interface IProject {
  title: string;
  description: string;
  githubLink: string;
  deployedLink: string;
  img: StaticImageData;
}

export const ProjectLsit: Array<IProject> = [
  {
    title: "BetterCollected",
    description:
      "Better Collected is a privacy-focused platform that empowers organizations to manage online forms with a strong emphasis on data protection, transparency, and compliance with privacy regulations like GDPR and CCPA. It allows businesses to create custom-branded forms, import existing ones from platforms like Google Forms and Typeform, and provide users with clear informed consent and control over their data, including options for deletion requests. With features like custom URLs, scalable workspaces, and seamless integration, Better Collected ensures efficient, secure, and privacy-compliant data collection, making it an ideal choice for businesses prioritizing trust and user-centric practices.",
    githubLink: "https://github.com/bettercollected/bettercollected",
    deployedLink: "https://bettercollected.com/",
    img: Bettercollected,
  },
  {
    title: "Autonomous Agent Testing",
    description:
      "The Autonomous Agent Testing platform is designed to test the implementation of CIP-1694 (Cardano Improvement Proposal) within the Cardano blockchain ecosystem. It enables developers to simulate and monitor autonomous agents that play a crucial role in decentralized governance, focusing on proposal creation, voting, and decision-making processes. The dashboard provides insights into agent activity, governance actions, and transaction volumes over time, helping ensure that the system operates smoothly and adheres to CIP-1694's objectives for decentralized governance. Features include agent status tracking, governance logs, and transaction analytics, making it an essential tool for testing and validating decentralized governance features on the Cardano blockchain.",
    githubLink: "https://github.com/cardanoapi/autonomous-agents",
    deployedLink: "https://agents.cardanoapi.io/",
    img: AAT,
  },
  {
    title: "Split Contract",
    description:
      "A split contract on the Cardano blockchain enables agreements with multiple stakeholders, assigning each a specific percentage of the total shares or benefits. It ensures clarity by defining exact entitlements, fairness through transparent and proportional allocation, and efficiency by automating distributions. Ideal for use cases like revenue sharing, royalties, and investment returns, it leverages Cardano’s secure, decentralized platform to streamline operations, foster trust, and simplify contractual relationships.",
    githubLink: "",
    deployedLink: "https://paymentsplitter.cardanoapi.io/",
    img: SplitContract,
  },
];
