"use client";

import Header from "@/components/Header/header";
import SideNav from "@/components/Sidenav/sideNav";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import Image from "next/image";
import { Suspense } from "react";

const navLinks = [
  { name: 'About', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },

]

const intro = "Driven by curiosity and powered by creativity, I bring ideas to life through thoughtful design and code. Let's build something remarkable together."

const educationTitle = "Education"
const educationAriaLabel = "Education"
const educationBsc = "Bachelor of Computer Science"
const educationUniversity = "El Shorouk City, Cairo, Egypt"
const educationGraduationDate = "June 2024"
const educationSubtitle = "Education"

const summaryTitle = "Summary"
const summaryAriaLabel = "Summary"
const summaryText = "A fresh computer science graduate with a strong track record of academic excellence. Proficient in software development methodologies, with hands-on experience across various stages of the software development life cycle. Skilled in programming languages such as Python, C#, and Java. Passionate about emerging technologies, particularly machine learning and computer vision. Eager to apply knowledge and skills to innovative projects. Possesses a collaborative mindset and a drive for continuous learning. Enthusiastic about contributing to open source projects and collaborating with other developers."
const summarySubtitle = "Summary"

export default function Home() {
  return (
    <>
      <header>
        <Header links={navLinks} />
        <Suspense fallback="">
          <SideNav />
        </Suspense>

      </header>

      <Spacer y={36} />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-8xl mb-4">Mohammed Kenawy</h1>
        <h2 className="font-bold text-4xl mb-4">AI Engineer, Computer Vision Engineer</h2>
        <p className="text-lg mb-4">{intro}</p>
        <Accordion selectionMode={"multiple"}>
          <AccordionItem key={educationTitle} aria-label={educationAriaLabel} title={educationTitle} subtitle={educationSubtitle} className="text-sm font-light">
            <p className="text-lg mt-2">{educationGraduationDate}</p>
            <p className="text-lg">{educationBsc}, {educationUniversity}</p>
          </AccordionItem>
          <AccordionItem key={summaryTitle} aria-label={summaryAriaLabel} title={summaryTitle} subtitle={summarySubtitle} className="text-sm font-light">
            <p className="text-lg mt-2">{summaryText}</p>
          </AccordionItem>
        </Accordion>
      </main>
    </>
  );
}
