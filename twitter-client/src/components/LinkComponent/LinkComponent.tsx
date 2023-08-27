import { Link } from "react-router-dom";
import { IconType } from "react-icons";
import React from "react";

type LinkProps = {
  label: string;
  to: string;
  icon: IconType;
  active: boolean;
};

const LinkComponent: React.FC<LinkProps> = ({ label, to, icon, active }) => {
  let Icon = icon;

  return (
    <Link to={to} className={`flex items-center group transition my-1`}>
      <div className="transition duration-300 flex p-[12px] justify-start items-center group-hover:bg-[#e7e9ea19] rounded-full">
        <p className="p-1">
          <Icon
            size={26}
            className={`lg:text-white ${
              active ? "text-[#1d9bf0]" : "text-white"
            }`}
          />
        </p>
        <p
          className={`ml-[14px] mr-[16px] ${
            active ? "active" : ""
          } hidden lg:flex`}
          id="link-item"
        >
          {label}
        </p>
      </div>
    </Link>
  );
};

export default LinkComponent;
