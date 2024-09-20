import Header from "@/components/Header/header";
import { Spacer } from "@nextui-org/react";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    const navLinks = [
        { name: 'About', href: '/' },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/contact' },
      
      ]
  return (
    <><Header links={navLinks} />
    <Spacer y={16}/>
    <h1 className="text-5xl font-bold mb-4 text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Projects I’m Proud Of.</h1>

    <div className="container mx-auto grid grid-cols-1 gap-16 md:gap-24 lg:gap-32 md:grid-cols-2 lg:grid-cols-3 p-8">
      {children}
    </div>
  </>
  );
}
