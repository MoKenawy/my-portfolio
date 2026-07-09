import ProjectCard from "@/components/Project/projectCard";

function Projects() {
  return (
    <>
      <ProjectCard
        title="DriveWise"
        description="A driver-safety and fleet-monitoring system: a driving station that reads speed and distance over a REST API and detects drowsiness with computer vision, and a manager's dashboard that rates each driver by behavior."
        tags={["Computer Vision", "Drowsiness Detection", "Fleet Monitoring"]}
        overview="Two parts. A driving station communicates with the vehicle over a REST API, reads speed and distance in real time, and detects speeding, unsafe following distance, and driver drowsiness using YOLO and OpenCV, warning the driver with an immediate audible alarm. A Django manager's dashboard shows analytics, violation logs, and an automatic per-driver rating, with data synced through Firebase. My graduation project, graded with distinction."
        tools={["Python", "YOLO", "OpenCV", "TensorFlow", "Django", "Firebase"]}
        meta={["Computer Vision", "Graduation project", "2024"]}
        links={[
          {
            name: "GitHub",
            url: "https://github.com/MoKenawy/DriveWise-Driving-Station",
          },
        ]}
        images={[
          "drivewise/Dashboard-2.png",
          "drivewise/Driver-details.png",
          "drivewise/Driver-Details-2.png",
        ]}
      />

      <ProjectCard
        title="Egyptian Currency Recognition"
        description="Detects and recognizes Egyptian banknote denominations from an image."
        tags={["Computer Vision", "Object Detection"]}
        overview="Uses OpenCV, DataGradients, YOLO, and Roboflow to detect and recognize Egyptian banknote denominations. The application takes an image as input and returns the detected denomination."
        tools={["OpenCV", "YOLO", "Roboflow", "DataGradients"]}
        meta={["Computer Vision", "Roboflow Universe", "2024"]}
        links={[
          {
            name: "Deployment",
            url: "https://universe.roboflow.com/gradproj/eg-currency-detector/",
          },
        ]}
      />

      <ProjectCard
        title="Rental Contracts Expert System"
        description="A CLIPS expert system that helps civilians draft rental contracts compliant with Egyptian legal requirements."
        tags={["Expert System", "CLIPS", "Legal"]}
        overview="A rule-based expert system built in CLIPS for reasoning and knowledge representation, assisting civilians in creating rental contracts that comply with Egyptian legal requirements."
        tools={["CLIPS"]}
        meta={["Expert System", "Rule-based", "2023"]}
        links={[
          {
            name: "GitHub",
            url: "https://github.com/MoKenawy/Rental-Contracts-Expert-System/",
          },
        ]}
      />

      <ProjectCard
        title="Face Detection with OpenCV.js"
        description="A web application that detects faces in images entirely in the browser."
        tags={["Computer Vision", "Web"]}
        overview="Uses OpenCV.js to detect faces in images. The application takes an image as input and returns the detected faces, running fully client-side."
        tools={["OpenCV.js", "JavaScript", "HTML", "CSS"]}
        meta={["Computer Vision", "Client-side", "2023"]}
      />
    </>
  );
}

export default Projects;
