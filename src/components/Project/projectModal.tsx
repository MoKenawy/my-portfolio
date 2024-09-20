import { ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Image, Link } from "@nextui-org/react";
import React from "react";

interface ProjectModalProps {
    title: string;
    overview: string;
    tools?: string[];
    images?: string[];
    links?: { name: string; url: string }[];
}


export default function ProjectModal({ title, overview, tools = [], images = [], links = [], onClose }: ProjectModalProps & { onClose: () => void }) {
    return (
        <ModalContent className="max-w-3xl rounded-md shadow-md p-4">
            <ModalHeader className="flex flex-col gap-1">
                <h3 className="font-bold text-2xl ">{title}</h3>
            </ModalHeader>
            <ModalBody>
                <div className="flex flex-col gap-4 ">
                    <h4 className="font-bold">Overview</h4>
                    <p className="text-sm">{overview}</p>
                </div>
                <div className="flex flex-col gap-4 mt-4 ">
                    <h4 className="font-bold">Tools & Technologies used:</h4>
                    <ul className="list-disc ml-6">
                        {tools.map((tool) => (
                            <li key={tool} className="text-sm">{tool}</li>
                        ))}
                    </ul>

                </div>
                {images.length > 0 && (
                    <div className="flex flex-col gap-4 mt-4 ">
                        <h4 className="font-bold">Screenshots:</h4>

                        <div className="flex flex-wrap gap-4">
                            {images.map((image) => (
                                <Image key={image} src={image} alt={title} width="200px" height="150px" className="rounded-md shadow-md" />
                            ))}
                        </div>
                    </div>
                )}
                {links.length > 0 && (
                    <div className="flex flex-col gap-4 mt-4 ">
                        <h4 className="font-bold">Links:</h4>

                        <div className="flex flex-wrap gap-4">
                            {links.map((link) => (
                                <Button key={link.name} as={Link} href={link.url} target="_blank" rel="noopener noreferrer" color="primary" variant="solid">
                                    {link.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    Close
                </Button>
            </ModalFooter>
        </ModalContent>
    );
}