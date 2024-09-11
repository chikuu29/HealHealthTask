import { IconType } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import * as TiIcons from "react-icons/ti";
import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as GrIcons from "react-icons/gr";
import * as GoIcons from "react-icons/go";
import * as HiIcons from "react-icons/hi";
import * as SiIcons from "react-icons/si";
import * as FcIcons from "react-icons/fc";
import * as TbIcons from "react-icons/tb";
import * as IconsIcons from "@chakra-ui/icons";
const allIcons = {
  ...FaIcons,
  ...FiIcons,
  ...AiIcons,
  ...GiIcons,
  ...MdIcons,
  ...TiIcons,
  ...RiIcons,
  ...IoIcons,
  ...BsIcons,
  ...BiIcons,
  ...GrIcons,
  ...GoIcons,
  ...HiIcons,
  ...SiIcons,
  ...TbIcons,
  ...FcIcons,
  ...IconsIcons
};
const DynamicIcon = (iconName: string): IconType => {
  const IconComponent = allIcons[iconName as keyof typeof allIcons] as IconType;
  if (!IconComponent) {
    // throw new Error(`Icon "${iconName}" not found in any library`);
    const FallbackIcon = allIcons[
      "FcHighPriority" as keyof typeof allIcons
    ] as IconType;
    return FallbackIcon

  }
  return IconComponent;
};

export default DynamicIcon;
