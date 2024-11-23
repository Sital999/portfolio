export interface INavBarBtn {
  title: string;
  link?: string;
  soonCard?: boolean;
}

export const navbarBtns: Array<INavBarBtn> = [
  { title: "Home", link: "/", soonCard: false },
  { title: "About Me", link: "#about-me", soonCard: false },
  { title: "Contact", link: "#contact", soonCard: false },
];
