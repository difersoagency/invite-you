import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const base = (path: React.ReactNode) =>
  function Icon(props: IconProps) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {path}
      </svg>
    );
  };

export const MenuIcon = base(<path d="M4 6h16M4 12h16M4 18h16" />);
export const CloseIcon = base(<path d="M6 6l12 12M18 6L6 18" />);
export const PlusIcon = base(<path d="M12 5v14M5 12h14" />);
export const SearchIcon = base(<><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>);
export const LogoutIcon = base(<><path d="M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3" /><path d="M10 17l-5-5 5-5M5 12h11" /></>);
export const UsersIcon = base(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0113 0" /><path d="M16 4.5a3.5 3.5 0 010 7M21.5 20a6.5 6.5 0 00-4-6" /></>);
export const MusicIcon = base(<><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></>);
export const EnvelopeIcon = base(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>);
export const HeartIcon = base(<path d="M12 20s-7-4.35-9.5-9A5.5 5.5 0 0112 5a5.5 5.5 0 019.5 6C19 15.65 12 20 12 20z" />);
export const RingIcon = base(<><circle cx="12" cy="15" r="6" /><path d="M9 4h6l-1.5 3h-3L9 4z" /></>);
export const UploadIcon = base(<><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" /></>);
export const CheckIcon = base(<path d="M5 12.5l4.5 4.5L19 7.5" />);
export const ArrowLeftIcon = base(<path d="M19 12H5M11 6l-6 6 6 6" />);
export const ArrowRightIcon = base(<path d="M5 12h14M13 6l6 6-6 6" />);
export const PlayIcon = base(<path d="M7 5l12 7-12 7V5z" />);
export const ImageIcon = base(<><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-9 9" /></>);
export const EyeOffIcon = base(<><path d="M3 3l18 18" /><path d="M10.6 6.1A9.7 9.7 0 0112 6c5 0 8.5 4 9.5 6a12 12 0 01-2.6 3.4M6.5 7.5C4.5 8.9 3.1 10.8 2.5 12c1 2 4.5 6 9.5 6 1.6 0 3-.4 4.3-1" /><path d="M9.9 9.9a3 3 0 004.2 4.2" /></>);
export const EyeOpenIcon = base(<><path d="M2.5 12C3.5 10 7 6 12 6s8.5 4 9.5 6c-1 2-4.5 6-9.5 6s-8.5-4-9.5-6z" /><circle cx="12" cy="12" r="3" /></>);
export const CalendarIcon = base(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>);
export const GiftIcon = base(<><rect x="3" y="8" width="18" height="5" rx="1" /><path d="M5 13v7h14v-7M12 8v12M12 8S10.5 3 8 4s0 4 4 4zm0 0s1.5-5 4-4 0 4-4 4z" /></>);
export const UserIcon = base(<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></>);
export const CakeIcon = base(<><path d="M4 21h16M5 21v-7a2 2 0 012-2h10a2 2 0 012 2v7" /><path d="M5 16c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 5 0" /><path d="M12 12V8M12 5.5c.8-.8.8-2 0-2.5-.8.5-.8 1.7 0 2.5z" /></>);
export const LinkIcon = base(<><path d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1" /><path d="M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1" /></>);
export const ChatIcon = base(<path d="M21 12a8 8 0 01-11.6 7.14L4 20l1-4.6A8 8 0 1121 12z" />);
