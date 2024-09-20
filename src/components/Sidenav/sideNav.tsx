import { Icon } from '@iconify/react';
import Link from 'next/link';

const socialMediaLinks = [
  {
    icon: 'mdi:github',
    href: 'https://github.com/MoKenawy',
  },
  {
    icon: 'mdi:linkedin',
    href: 'https://www.linkedin.com/in/mohammedkenawy/',
  },
  {
    icon: 'mdi:twitter',
    href: 'https://twitter.com/mohammedkenawy',
  },
];

export default function SideNav() {
  return (
    <nav className="fixed top-1/2 transform -translate-y-1/2 left-0 h-auto flex flex-col items-center justify-center bg-gray-800 text-white py-6 px-2 rounded-r-md">
      {socialMediaLinks.map(({ icon, href }) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-700 rounded-full"
        >
          <Icon icon={icon} width={24} height={24} />
        </Link>))}
    </nav>
  );
}

