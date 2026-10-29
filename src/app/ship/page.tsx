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
      {/* Ongoing work at the head of the ledger — the index reads newest
          first, so a reader meets what I'm building now before what I built.
          The two DEPI projects lead: the capstone, then the track project. */}
      {/* The repository is private, so this entry carries no link — the proof
          is described, and says so, rather than pointed at. */}
      <ProjectCard
        title="Agentic PR Reviewer"
        problem="An AI code reviewer that reads its findings out of the model's prose can fail without anyone noticing. When the parse comes back empty, a broken run and a clean review look exactly the same."
        insight="The model needs agency in only one step. Collecting the change, budgeting the prompt, validating what comes back and writing the report can all be a fixed pipeline. The one step where the model does act can be narrowed to a tool call, which a schema either accepts or rejects."
        solution="A command-line reviewer for TypeScript and JavaScript changes. It reviews uncommitted work, a branch range, or a public GitHub pull request by URL, read-only. The review is one model pass through a LangGraph agent. A finding enters only as an emit_finding tool call, validated against a Pydantic schema that also generates the JSON Schema and the tool schema. The run allows at most one repair turn and one retry on a rate limit, and a prompt over its token budget is refused rather than cut. Every failure ends in a report, never in a silent “clean” result. Output is a terminal summary, a JSON report and a self-contained HTML report, with exit codes that tell a script what happened."
        evidence="The repository is private for now, so this is described rather than linked. A versioned requirements specification (v1.7, with a requirements audit) and eleven architecture decision records came before and alongside the code. CI runs on every push and pull request on Linux and Windows, Python 3.12 and 3.13. The latest run passed 427 offline tests and 6 import-linter contracts that keep the core package free of LangChain and LangGraph. The tests block the network and use a scripted stand-in model, and a planted canary credential checks that no output leaks it."
        tags={["AI Agents", "LLM Engineering", "Python"]}
        overview="My DEPI capstone for the AI for Software Engineers track, where I was the sole software engineer. It is a command-line code reviewer for TypeScript and JavaScript changes that accepts AI findings only as schema-validated tool calls, never by parsing the model's prose, and reports every failure instead of hiding it. If the model never calls the finding tool, the report says so. The decision records set the shape: a fixed pipeline where the model has agency in one step; findings as validated tool calls; a local CLI core, with a future GitHub Action as an adapter; a Python harness reviewing a TypeScript target; and a framework-free core package, with LangChain and LangGraph allowed only in the agents layer, enforced by import-linter in CI. Langfuse supplies the managed system prompt, with a built-in fallback, and a render command re-renders a saved report. The first working version is built and merged, and the later stages are not built yet. It reads a public pull request from the command line; it does not post to one."
        tools={[
          "Python",
          "LangGraph",
          "Langfuse",
          "Pydantic",
          "Typer",
          "Jinja2",
          "PyTest",
          "import-linter",
          "uv",
          "GitHub Actions",
        ]}
        meta={["AI agents", "DEPI Capstone", "Sole software engineer", "Active"]}
      />

      <ProjectCard
        title="PDF2Deck Agent"
        problem="Turning a PDF chapter into a slide deck is mostly transcription: headings into titles, paragraphs into bullets, figures carried across one at a time. Handing all of it to a model swaps the transcription for a different problem, an outline and a layout accepted unseen."
        insight="The model is only needed for the semantic step, deciding what the outline is. Extraction, validation, style and rendering are ordinary deterministic Python. The two points where judgement matters, the outline and the finished deck, are where a person should approve, not where the model should guess."
        solution="A LangGraph state machine: validate the input, extract the PDF, build the outline, wait for human approval, map the style, render the PPTX, validate it, wait for approval again. Both checkpoints use LangGraph's interrupt() with checkpointing, and a Gradio UI resumes the run with the reviewer's decision. Figures come out of the PDF with their page position, decoration is dropped, and the model picks at most one image per slide, which the renderer places beside the bullets."
        evidence="The repository is public, with five design decision records, an issue log of ten problems found while debugging the review flow, and an annotated UI guide. The demo video is a test run: chapter 1 of OpenStax's Concepts of Biology, through both approvals, to a styled deck."
        tags={["AI Agents", "LLM Engineering", "Python"]}
        overview="A track project inside the DEPI AI for Software Engineers track, built by me as the sole software engineer. It turns a PDF into a PowerPoint deck and pauses for a person to approve the outline and the finished deck. The LLM does only the semantic work, a structured-output outline; ordinary Python owns PDF extraction, validation, style mapping and rendering with python-pptx, and that split is recorded as a design decision. An optional first and last page narrow the input while keeping the original page numbers. Style comes from a JSON preferences file (colours, fonts, type scale, slide size, tone, density), which the UI can generate from an existing PowerPoint template. It works with any OpenAI-compatible endpoint."
        tools={[
          "Python",
          "LangGraph",
          "LangChain",
          "Pydantic",
          "Gradio",
          "pypdf",
          "python-pptx",
        ]}
        meta={[
          "AI agents",
          "DEPI Track Project",
          "Sole software engineer",
          "Oct 2026",
        ]}
        links={[
          {
            name: "GitHub",
            url: "https://github.com/MoKenawy/pdf2deck-agent",
          },
          {
            name: "Demo video",
            url: "https://drive.google.com/file/d/1uawnigtD5zGxpa5VG-PiQdWk6DqU9cnA/view",
          },
        ]}
      />

      <ProjectCard
        title="Automated Job Discovery & Intelligence Pipeline"
        problem="A job search is mostly reading. The same role is posted on four platforms under three titles, most of what you open doesn't match the CV you'd send it, and finding that out costs an evening of closing tabs rather than an evening of applying."
        insight="Judging a listing against a CV is a reading task, and a model running on your own machine can do it. The API fee and the third party are habit rather than requirement — and a CV is precisely the document you'd rather not hand to someone else's endpoint. The duplicates are the same problem in miniature: one job posted three times is still one job, and a fingerprint over the fields that don't change collapses it back to one."
        solution="A pipeline in stages, each callable on its own. Collectors pull listings from several platforms; a fingerprinting pass normalizes and merges duplicates into unified records in PostgreSQL; a local LLM served by Ollama ranks what survives against the candidate's CV. The result is triaged through a FastAPI and Jinja2 interface — company blacklisting, employer hiring metrics, application status tracking — with a Typer CLI over the same operations. Every stage is idempotent and can be invoked independently through Docker Compose, so a failed run is re-run rather than untangled."
        evidence="The repository is public and the contribution flow runs through pull requests, with GitHub Actions gating every one on the PyTest suite, type and lint checks, and a TruffleHog secret scan. The workflow file and the run history are there to read — none of it has to be taken on my word."
        tags={["Local LLM", "Data Pipeline", "Automation"]}
        overview="A fully self-hosted job aggregator: it collects postings from multiple platforms, deduplicates them, and ranks them against a candidate's CV using a local LLM instead of a hosted API — no per-call fee, no SaaS dependency, and the CV never leaves the machine. Ingestion carries custom fingerprinting logic that cleans, normalizes, and consolidates duplicate postings into single records. On top of the store sits the triage layer: a FastAPI and Jinja2 web interface and a Typer CLI, with company blacklisting, employer hiring metrics, and application status tracking, every stage idempotent and independently invocable through Docker Compose. Contribution runs as an open-source pull-request flow gated by GitHub Actions on tests, types, lint, and TruffleHog secret scanning. It is ongoing, and honest about its ceiling: the ranking is only as good as whichever local model you run, and it sorts a queue rather than deciding anything."
        tools={[
          "Python",
          "FastAPI",
          "Jinja2",
          "Typer",
          "PostgreSQL",
          "Docker",
          "Ollama",
          "PyTest",
          "GitHub Actions",
        ]}
        meta={["Data pipeline", "Open source", "2026 — present"]}
        links={[
          {
            name: "GitHub",
            url: "https://github.com/MoKenawy/Automatic-Job-search",
          },
        ]}
      />

      <ProjectCard
        title="DriveWise"
        problem="A driver falling asleep is invisible until the moment it isn't. The fleet manager finds out afterwards, from the report — by which point the only decision left is what to do about a crash that already happened."
        insight="Drowsiness is legible seconds before the crash. It is on the driver's face, and a camera can read it while there is still time for the answer to matter."
        solution="Two parts. A driving station reads speed and distance from the vehicle over a REST API and watches the driver with YOLO and OpenCV, sounding an audible alarm the moment it sees drowsiness. A Django dashboard gives the manager every violation, typed and timestamped, and an automatic rating per driver."
        evidence="Two runs of the same drive. With detection on, the alarm fires and the drive ends intact (fig. 7). With it off, nothing is watching — no box, no counter, no alarm — and the car leaves the road (fig. 8)."
        tags={["Computer Vision", "Drowsiness Detection", "Fleet Monitoring"]}
        overview="A driver-safety and fleet-monitoring system, and my graduation project, graded with distinction. The driving station communicates with the vehicle over a REST API, reads speed and distance in real time, and detects speeding, unsafe following distance, and driver drowsiness using YOLO and OpenCV. The manager's dashboard shows analytics, violation logs, and an automatic per-driver rating, with data synced through Firebase."
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

      {/* Deliberately shorter than the two above. An entry is given the length
          it has earned, and ranking your own work honestly reads as more
          confident than presenting unequal things as equals. */}
      <ProjectCard
        title="Egyptian Currency Recognition"
        problem="Someone with a visual impairment has to take it on trust that the note in their hand is the note they were told it is. Getting change becomes a question of who you are dealing with."
        insight="The denomination is legible from a photograph long before it is legible by feel. That makes it an object-detection problem rather than a hardware one — no special banknote, no reader device, just a camera most people already carry."
        solution="A YOLO detector trained on Egyptian banknotes with Roboflow and DataGradients: image in, denomination out. This is the detection layer an assistive tool needs, not the finished assistive tool — there is no audio output and no field testing with the people it is for."
        evidence="The trained model and the dataset behind it are public on Roboflow Universe — the classes, the training images, and the weights, open to inspection rather than described."
        tags={["Computer Vision", "Object Detection", "Accessibility"]}
        overview="Built to answer a problem of trust rather than one of convenience: recognising Egyptian banknote denominations from a photograph, for people who cannot read them by sight. Uses OpenCV, DataGradients, YOLO, and Roboflow; the application takes an image as input and returns the detected denomination. It stops at the detection layer — turning it into something usable would need audio output and testing with visually impaired users, neither of which it has."
        tools={["OpenCV", "YOLO", "Roboflow", "DataGradients"]}
        meta={["Computer Vision", "Roboflow Universe", "2024"]}
        links={[
          {
            name: "Model & dataset",
            url: "https://universe.roboflow.com/gradproj/eg-currency-detector/",
          },
        ]}
      />
    </>
  );
}

export default Projects;
