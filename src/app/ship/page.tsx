import ProjectCard from "@/components/Project/projectCard";
import { ik, asset } from "@/lib/media";
import type { ProjectImage, ProjectVideo } from "@/lib/media";

// Screens are read, not glanced at: a dashboard's point is the numbers in it,
// and the modal shows them at roughly 576 CSS px, which a retina display draws
// at ~1150 real ones. Anything narrower than that is upscaled back up and the
// table text turns to mush — so cap well above it and keep quality high. The
// originals are 1919 px and only 0.1–0.5 MB, so there is little to save here
// anyway; f-auto still hands modern browsers webp.
const SCREEN_TR = "w-1600,f-auto,q-90";

// The DriveWise evidence, served from ImageKit. The screens first — the site,
// then the dashboard the manager actually works in — and the recordings after,
// ordered by how much they prove: the detector on my own face, the detector on
// road footage, the control run with detection off, then the promo.
const drivewiseImages: ProjectImage[] = [
  {
    src: ik("Home Page.png", SCREEN_TR),
    width: 1919,
    height: 909,
    alt: "The DriveWise landing page, headed “Safety Driving, Our Priority”, with a nav bar of Home, Features, Pricing, FAQs and About us, login and sign-up buttons, and the Drive Wise logo card beside the copy.",
    caption: "fig. 1 — drivewise, the product site. the landing page",
  },
  {
    src: ik("Features.png", SCREEN_TR),
    width: 1918,
    height: 908,
    alt: "A “Why Choose Drive Wise?” section with three cards: Real-time Monitoring, Drowsiness Detection, and Real-time Violation Detection and Logging.",
    caption: "fig. 2 — the three things the system claims to do",
  },
  {
    src: ik("Dashboard.png", SCREEN_TR),
    width: 1919,
    height: 913,
    alt: "The manager's dashboard: seven drivers with star ratings down the left; tiles giving an average rating of 3.775, a best driver (driver_id_5 at 4.825) and a worst (Simulation_1 at 2); and a leaderboard ranking every driver by rating.",
    caption: "fig. 3 — the manager's dashboard. every driver rated, ranked, averaged",
  },
  {
    src: ik("Driver details.png", SCREEN_TR),
    width: 1919,
    height: 912,
    alt: "A driver detail page for “osama”, rated 4.6, with a violations table of type, value, threshold and timestamp — one speed_violation at 140 against a threshold of 60, then three drowsiness_violations — beside a summary counting four violations in total.",
    caption:
      "fig. 4 — one driver opened up. the violation log, typed and timestamped",
  },
  {
    src: ik("Driver Details 2.png", SCREEN_TR),
    width: 1917,
    height: 910,
    alt: "The lower half of the same driver page: a bar chart of violations by category showing one speed violation, no distance violations, and three drowsiness violations.",
    caption: "fig. 5 — the same driver, counted: one for speed, three for drowsiness",
  },
];

// The recordings are ours, transcoded to 960px and carried in /public rather
// than off a CDN: about 7 MB for the four of them, which GitHub Pages serves
// without a quota, a plan, or a third party who can withdraw them. Each poster
// is a still cut from its own video, chosen for the moment that carries the
// proof — the label reading “drowsy”, the box on the driver's face.
const clip = (name: string, width: number, height: number) => ({
  src: asset(`/drivewise/${name}.mp4`),
  poster: asset(`/drivewise/${name}.jpg`),
  width,
  height,
});

const drivewiseVideos: ProjectVideo[] = [
  {
    ...clip("yolo-drowsy-webcam", 792, 640),
    title: "DriveWise — YOLOv8 drowsiness detection, live webcam",
    alt: "A YOLOv8 Detection window showing me at a webcam with my eyes closed and a box drawn round my face labelled “drowsy”, an FPS counter reading 5 in the corner.",
    caption:
      "fig. 6 — the detector on my own face. the label flips between “awake” and “drowsy” as my eyes close, glasses on or off, at five or six frames a second",
  },
  {
    ...clip("detection-on-no-accident", 960, 540),
    title: "DriveWise — detection running, no accident",
    alt: "The driver-facing camera: a man in a cap rubbing one eye at the wheel, a red box round his face labelled “awake” and an FPS counter reading 8. The clip cuts between this and the dashcam view of the road ahead.",
    caption:
      "fig. 7 — the whole loop on the road: the lane ahead, the driver's face, the alarm. detection on, and the drive ends intact (2.25× speed, with audio)",
  },
  {
    ...clip("detection-off-accident", 960, 540),
    title: "DriveWise — the control run, detection off",
    alt: "A close-up of the same driver in a cap at the wheel, his eyes fully closed, with no detection box and no counter anywhere on the frame.",
    caption:
      "fig. 8 — the control. the same drive with nothing watching: no box, no counter, no alarm, and the car leaves the road",
  },
  {
    ...clip("promo", 960, 540),
    title: "DriveWise — promotional video",
    alt: "An overhead drone shot of a dark car driving along a tree-lined road.",
    caption: "fig. 9 — the promo the team cut for the defence",
  },
];

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
        images={drivewiseImages}
        videos={drivewiseVideos}
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
    </>
  );
}

export default Projects;
