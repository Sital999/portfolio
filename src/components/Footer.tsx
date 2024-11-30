import { socialMedia } from "@constants/socialMedia";
import { cn } from "@lib/utils";
import { themeAtom } from "@store/theme";
import { useAtom } from "jotai";

const Footer = () => {
  const [theme] = useAtom(themeAtom);
  return (
    <div
      id="contact"
      className="flex gap-4 justify-center items-center pb-4 lg:pb-14"
    >
      {socialMedia.map((sm, index) => {
        const IconComponent = sm.icon;
        return (
          <a href={sm.link} target="_blank" key={index}>
            <IconComponent
              className={cn(
                "h-6 w-6 ",
                theme.darkMode ? "text-stone-300" : "text-stone-600"
              )}
            />
          </a>
        );
      })}
    </div>
  );
};

export default Footer;
