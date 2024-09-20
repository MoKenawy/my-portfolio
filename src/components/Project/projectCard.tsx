"use client";

import { Modal, Button, useDisclosure, Card, CardBody, CardHeader, CardFooter, Divider, Spacer, Image, Skeleton } from "@nextui-org/react";
import React from "react";
import ProjectModal from "./projectModal";

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    tags?: string[];
    overview: string;
    tools?: string[];
    images?: string[];
    links?: { name: string; url: string }[];
}

export default function ProjectCard({ title, description, image, tags = [], overview, tools = [], images = [], links = [] }: ProjectCardProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const renderTags = () => (
        <div className="flex flex-wrap gap-x-2 gap-y-1 mt-4 text-[#6c5ce7]">
            {tags.map((tag) => (
                <React.Fragment key={tag}>
                    <span className="bg-zinc-100 px-2 py-1 rounded-md text-sm">{tag}</span>
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <Card className="flex flex-col bg-gradient-to-r from-[#45b3fa] to-[#6c5ce7] rounded-md shadow-md p-3">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start text-white">
                <h3 className="text-2xl font-bold">{title || <Skeleton className="w-3/5 rounded-lg"><div className="h-6 w-3/5 rounded-lg bg-default-300"></div></Skeleton>}</h3>
                <Spacer y={3}/>

                <p className="mt-2">{description || <Skeleton className="w-full rounded-lg"><div className="h-3 w-full rounded-lg bg-default-300"></div></Skeleton>}</p>
            </CardHeader>
            <Spacer y={6}/>
            <CardBody className="overflow-visible py-2">
                <div className="p-1.5 bg-white rounded-md shadow-md">
                    <Image
                        src={image}
                        alt={title}
                        className="w-full h-64 object-cover rounded-md"
                        width="100%"
                    />
                </div>
            </CardBody>
            <Spacer y={6}/>

            <Divider className="bg-white" />

            <CardFooter className="flex flex-col gap-2 text-white">
                {renderTags()}

                <Button onPress={onOpen} className="mt-4 bg-white text-[#6c5ce7]">
                    Learn More
                </Button>
            </CardFooter>
            <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true}
                size={"3xl"}
                scrollBehavior={"outside"}


            >
                <ProjectModal
                    title={title}
                    overview={overview}
                    tools={tools}
                    images={images}
                    links={links}
                    onClose={onClose}
                />
            </Modal>
        </Card>
    );
}



