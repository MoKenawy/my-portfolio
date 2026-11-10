import ProjectCard from "@/components/Project/projectCard";
import { ik, asset } from "@/lib/media";
import type { ProjectEmbed, ProjectImage, ProjectVideo } from "@/lib/media";

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

// Everything below is served from /public rather than ImageKit: these were
// transcoded here to webp at the same 1600px cap, they come to about 700 KB for
// the eleven of them, and keeping them in the repository means the evidence
// ships with the commit that claims it. The first entry in each array is the
// one the card shows as its plate, so it has to be the figure that argues best
// on its own.
const shot = (file: string, width: number, height: number) => ({
  src: asset(`/ship/${file}.webp`),
  width,
  height,
});

const prReviewerImages: ProjectImage[] = [
  {
    ...shot("agentic-pr-reviewer/report-head", 1230, 1152),
    alt: "The head of a generated code-review report, titled “Code review — uncommitted changes in the working tree (default) · 7 files”, under it a line reading “Started 2026-10-19T12:26:16Z · took 150422 ms · agentic-review 0.1.0 · report schema 1.0”. A boxed verdict reads “blocking. At least one finding is blocking.”, followed by “Findings: 3 blocking / 2 important / 1 nit” and a scope table.",
    caption:
      "fig. 1 — what a run emits. the verdict comes first, and it is the thing a pipeline can gate on",
  },
  {
    ...shot("agentic-pr-reviewer/report-full", 1600, 3440),
    alt: "The full review report: six findings, each with a file and line, a severity, a category and an evidence fingerprint — among them a blocking SQL-injection finding on src/search.ts:4 and an off-by-one on src/users.ts:15-16. Below them a change-summary table, a list of three files listed but not reviewed including PLANTED_DEFECTS.md, and a run-metadata table recording the model gemini-3.8-flash, temperature 0.0, 5341 tokens in, 652 out, and the duration of every stage.",
    caption:
      "fig. 2 — the whole document. the run is against a file of planted defects, which is how the findings get marked; the metadata at the foot is what makes a run arguable afterwards",
  },
];

const pdf2deckImages: ProjectImage[] = [
  {
    ...shot("pdf2deck/interface", 1600, 730),
    alt: "The “PDF → Styled PowerPoint Agent” interface: a chapter PDF loaded as ConceptsOfBiology-LR-Chapter-1.pdf, empty first- and last-page fields, a drop zone for an optional preferences file, and an output panel reading “Upload a PDF and press Generate.” with Approve and Reject buttons for the outline and the deck, all greyed out.",
    caption:
      "fig. 1 — before a run. a chapter, a page range, a style — and two approval gates that are not optional",
  },
  {
    ...shot("pdf2deck/run-complete", 1600, 1576),
    alt: "The same interface after a completed run: the right panel reads “Deck rendered (14 slides)” and shows the generated outline, slide 12 on the branches of biological study and slide 13 a summary, each with its bullets and placed images. The left panel's graph-execution log lists every stage completed in order — validate_input, extract_pdf, build_outline, approve_outline, map_style, render_pptx, validate_artifact — and ends waiting on deck_review.",
    caption:
      "fig. 2 — a finished run: fourteen slides, and the graph's own log of every stage it passed through to get there",
  },
];

const pdf2deckEmbed: ProjectEmbed = {
  videoId: "5vXJRONcfKI",
  poster: asset("/ship/pdf2deck/demo-poster.jpg"),
  title: "PDF2Deck — a full run on a biology chapter",
  alt: "A still from the screen recording of the agent running, the interface mid-run with the outline being generated.",
  caption:
    "fig. 3 — the whole thing end to end, unedited: a biology chapter in, a reviewed deck out",
};

const dmsImages: ProjectImage[] = [
  {
    ...shot("dms/login", 1600, 760),
    alt: "A bilingual login screen. The form is in Arabic, right to left, headed “تسجيل الدخول للنظام” with fields labelled in both Arabic and English — “اسم المستخدم / رقم التعريف” over USERNAME, “رمز المصادقة” over PASSWORD — and a submit button reading “بدء الجلسة”. A panel beside it reads “أرشيف المخططات” in Arabic and “Blueprint Curator — Engineering Archive Management System” in English, over a faint line drawing of a structure. A toggle at the top offers EN / عربي.",
    caption:
      "fig. 1 — the way in. bilingual by construction rather than by translation layer: arabic and english, rtl and ltr, the same screen",
  },
  {
    ...shot("dms/users", 1600, 826),
    alt: "An admin user table in Arabic, right to left, listing users by username, full name, role and department: engineers, managers and document controllers across the Construction, Technical Office, Delivery and Maintenance departments, each row with an active status chip and a row menu.",
    caption:
      "fig. 2 — the role model: every user is a department crossed with a role, and what a role may do is configured rather than deployed",
  },
  {
    ...shot("dms/audit", 1600, 826),
    alt: "An audit-log screen headed “سجل النظام”, with date-range and action filters above a table of entries — DIAGRAM_DOWNLOADED, DIAGRAM_CREATED, LOGIN, LOGOUT — each with a user, an Arabic-numeral timestamp and the originating IP address.",
    caption:
      "fig. 3 — the trail. who, what, when, and from which address — appended, never edited",
  },
  {
    ...shot("dms/archive-grid", 1600, 852),
    alt: "The diagram archive in grid view, headed “أرشيف المخططات”, with filters for department, format and date. A single card is present, titled “test”, tagged PNG, 68.6 kilobytes, with download and view buttons.",
    caption:
      "fig. 4 — the archive on a seeded instance: one diagram, titled test. the shelf is what is being shown here, not what is on it",
  },
];

const jobDiscoveryImages: ProjectImage[] = [
  {
    ...shot("job-discovery/triage", 1600, 760),
    alt: "A “Triage status per search profile” report: three pie charts, one per profile — AI Engineer, data engineer @ Cairo Egypt, and data engineer (remote) — each broken into new, shortlist, applied and rejected with counts and percentages beneath, over totals of 25, 32 and 0 postings. A paragraph above warns the figures describe only what the system collected and are not a measurement of the job market.",
    caption:
      "fig. 1 — triage per profile, on my own live search. the counts are real, including the rejections",
  },
  {
    ...shot("job-discovery/schedules", 1600, 810),
    alt: "A “Search schedules” page listing two saved profiles — data engineer in Cairo, Egypt and data engineer remote — each with its role, location, boards (indeed, linkedin), run time of 06:00 and controls to disable, run now or delete. Below is a blank form for adding a profile. The intro text ends by citing ADR-0005.",
    caption:
      "fig. 2 — a profile is a saved survey: a role, a place, the boards to ask and the hour to ask at. the page cites the record that fixed the behaviour",
  },
  {
    ...shot("job-discovery/reports", 964, 912),
    alt: "A “Reports” index listing three reports — employer hiring activity, source coverage and overlap, and triage status per search profile — each with a one-line description. The text above states that which reports exist, and which were considered and deferred, is recorded in ADR-0008.",
    caption:
      "fig. 3 — the reports index, which names the record saying which reports exist and which were deliberately not built",
  },
];

// Already sitting in /public, unreferenced, since the entry was written.
const currencyImages: ProjectImage[] = [
  {
    src: asset("/egyptian-banknote/Currency-Detection-Documetnation.jpg"),
    width: 1432,
    height: 758,
    alt: "The Roboflow Universe page for the EG-Currency-Detector model, running inference on a live webcam: a hand holds a banknote up to the camera and a box is drawn round it, labelled with its class. The prediction JSON beside the frame reads class “8” at 0.955 confidence with its bounding box, and the sidebar shows the project holds 200 images and one dataset.",
    caption:
      "fig. 1 — the model answering live: a note held to a webcam, classed and scored at 0.955",
  },
];

// The employment facts, which the index had nowhere to put: a reader landing
// on the primary destination should not have to infer from an essay where I
// work and what I own there. Set as a band at the head of the ledger, in the
// same register grid as a project entry — mono rail on the right, prose at the
// measure — so it reads as the first page of the section rather than a résumé
// header bolted on. The scope that has no entry of its own below lives here;
// the three systems that earned entries follow it.
function ThePost() {
  return (
    <section className="grid grid-cols-1 gap-x-10 gap-y-4 py-10 sm:grid-cols-[minmax(0,1fr)_auto]">
      <div className="prose-measure">
        <p className="mono">The post</p>
        <h2 className="mt-2 font-serif text-3xl leading-tight">
          Fullstack Engineer, Queen Service
        </h2>
        <p className="mt-3 font-serif text-lg text-paper">
          Primary engineer on the HR and payroll arm of a company-wide ERP
          digital transformation — the replacement of a legacy MS Access
          platform. The team was small enough that the title covered the whole
          path: the requirements research, the architecture, the implementation,
          the database underneath it, the deployment, and the specification the
          rest of the team built from.
        </p>

        <p className="mono mt-7">The rest of the post</p>
        <p className="mt-2 font-serif text-lg text-paper">
          Requirements elicitation run as actual research — four structured
          stakeholder interviews, observation of users in their own working
          environment, and a beta programme of task-based usability sessions
          with screen recording, behavioural pattern analysis and surveys, which
          changed the interface that shipped. A configurable RBAC model with JWT
          authentication, where a role&apos;s permissions are reconfigured
          without a deployment. A schema re-architecture that introduced the
          primary and foreign keys and constraints the inherited database never
          had, resolved its orphaned rows, and retired the legacy tables nothing
          used. And the SRS and decision records the team built from, teammates
          onboarded onto the architecture, and their pull requests reviewed on
          Gitea.
        </p>
      </div>

      <div className="text-left sm:text-right">
        {[
          "Queen Service",
          "Cairo, Egypt",
          "Nov 2025 — present",
          "First industry role",
        ].map((line) => (
          <p key={line} className="font-mono text-xs leading-relaxed text-mid">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <>
      <ThePost />

      {/* The three systems from the post that earned an entry of their own.
          Each closes on the published decision records where there are any —
          the platform itself is my employer's and cannot be linked, so the
          redacted ADRs are the only part a stranger can actually go and read. */}
      <ProjectCard
        title="Payroll engine"
        problem="Payroll has no acceptable error rate: every figure is a legal obligation to a named person. The legacy platform could run a payroll but could not reproduce one — once an employee's grade, department or tax band had moved on, the run that paid them last March was no longer regenerable, and a dispute had nothing to be settled against."
        insight="Recomputing from current data is the obvious answer and the wrong one, because the run has to reproduce the state as it was rather than as it is. That makes payroll a problem about modelling time, not about arithmetic — and the dated events that make it hard (a promotion effective mid-month, a transfer corrected after the fact) are produced by the employee subsystem underneath it. The two could not be designed separately."
        solution="A deterministic engine over the HR subsystem I built first: the same inputs always produce the same outputs, across overtime, deductions and taxes for roughly 15,000 employees. Every run is backed by transaction history and an auditable change log, so a prior payroll stays reproducible after the data beneath it has changed. A recalculation replaces only the rows it generated itself, so a payroll officer's manual correction survives a rerun instead of being silently overwritten. Underneath sits the employee record the whole platform reads from — the full lifecycle of hiring, promotion, demotion and transfer, with banking details, dependants, positions and roles."
        evidence="Two of the decision records behind it are published, redacted: ADR-P02 on safe recalculation by row origins, which is the mechanism that keeps a manual edit alive through a rerun, and ADR-P01 on resolving monthly identity through a manifest when the legacy period key is opaque. Table and column names are renamed; the decisions, the rejected options and the consequences are not, and the commit history behind each file is intact. The platform itself belongs to my employer and is not linkable."
        tags={["Payroll", "Auditability", "Node.js"]}
        overview="The flagship of the ERP work and the system I would want to be asked about. Payroll is unusual in that correctness is not a quality bar but the entire specification — 'mostly right' is a defect — and the requirement that shaped the design was reproducibility: a run from six months ago must be regenerable exactly, after the employees in it have been promoted, transferred, or had their tax band changed. Recomputing from today's data gives a different and wrong answer, so the engine reproduces the state as it stood. The second hard requirement is retroactive recalculation. The HR subsystem below it manages employee lifecycle events, and every one of them changes pay as of a date and can be corrected after the fact — which means a closed period sometimes has to be recomputed. A recalculation has to overwrite its own prior output while preserving a human override applied on top of it; get it wrong in one direction and you discard a payroll officer's correction, in the other and you refuse to recompute at all. The answer was to track the origin of every row and replace only the generated ones. The HR subsystem was built first, deliberately: nothing above it can be correct until the record of people is."
        tools={[
          "Node.js",
          "Express",
          "TypeScript",
          "Prisma",
          "Microsoft SQL Server",
          "React",
        ]}
        meta={[
          "Queen Service",
          "~15,000 employees",
          "In production",
          "2025 — present",
        ]}
        links={[
          {
            name: "ADR-P02 — recalculation safety",
            url: "https://github.com/MoKenawy/my-portfolio/blob/main/Docs/publish/adr-p02-recalculation-safety-row-origins.md",
          },
          {
            name: "ADR-P01 — legacy period key",
            url: "https://github.com/MoKenawy/my-portfolio/blob/main/Docs/publish/adr-p01-opaque-legacy-key-manifest.md",
          },
        ]}
      />

      <ProjectCard
        title="Reporting & export subsystem"
        problem="Every new report in the legacy platform needed a developer. Someone who wanted the same figures grouped a different way filed a request and waited, and what they eventually got was a report a developer had understood second-hand."
        insight="The queue of requests is the symptom; the cause is that reports were code. If a report definition is data, the person who needs the report is the person who can make it, and the developer leaves the loop entirely. That turned out to be the instinct running through the whole platform — the work a developer does most often and values least is exactly the work the business should be able to do without one."
        solution="A metadata-driven subsystem where users create, update and remove report definitions from the dashboard: twenty report types delivered, and changing one needs no deployment. Export to Excel, PDF and Word runs through Gotenberg on BullMQ worker queues backed by Redis, so a large export never holds the web tier, and Server-Sent Events push progress back to the user while it runs."
        evidence="Three of its decision records are published, redacted. ADR-006 argues enqueue reliability down to a reconciliation sweep rather than a transactional outbox, and states plainly what that costs. ADR-008 sets idempotency dedupe scope per operation — a global unique index for immutable output, a filtered one for anything freshness-windowed. ADR-007 scopes an async operation resource to its owner and re-checks module permission on read. One of the five published records exists only because it caught an earlier one claiming a durability guarantee the design did not actually deliver; the correction is in the history rather than folded quietly into the original."
        tags={["Background workers", "Reporting", "Node.js"]}
        overview="The subsystem that taught me most about failure modes. The design decision is the one in the first line — report definitions are rows, not code — and everything else follows from exports being slow, large, and therefore asynchronous. A long export cannot run inside a request, so it runs on a queue; once it runs on a queue the user has no idea whether anything is happening, so progress comes back over Server-Sent Events rather than polling, which is the right trade when the stream only travels one way. And once work is enqueued, the interesting questions are all about what happens when something dies mid-job: a queued operation that is never picked up, a worker that falls over after it has produced output but before it has recorded that it did, the same export requested twice. Those are the questions the published records argue out. The reporting requirements came from their own round of stakeholder interviews, separate from the core HR and payroll ones, because reporting users and operational users are not the same people and do not want the same thing."
        tools={[
          "Node.js",
          "Express",
          "TypeScript",
          "BullMQ",
          "Redis",
          "Gotenberg",
          "Server-Sent Events",
          "Microsoft SQL Server",
        ]}
        meta={[
          "Queen Service",
          "20 report types",
          "In production",
          "2025 — present",
        ]}
        links={[
          {
            name: "The published records",
            url: "https://github.com/MoKenawy/my-portfolio/blob/main/Docs/publish/README.md",
          },
        ]}
      />

      <ProjectCard
        title="SQL Server → Oracle migration"
        problem="A cross-vendor database migration is the operation where failure is both total and quiet. The types do not line up, an empty string stops being an empty string somewhere in the crossing, and the rows that failed to arrive look exactly like the rows that were never there — until a payroll run built on them is wrong in front of the people it pays."
        insight="The guarantee worth making is not that the data moved but that none of it was lost, and that is a claim about validation rather than about transfer. Which inverts where the work goes: the copy is the straightforward part, and the cleansing and the checking either side of it are the project."
        solution="Planned and executed the migration of the company's entire database from Microsoft SQL Server to Oracle Database, including a transactional table of more than two million records, with data cleansing and validation through the cutover to guarantee zero data loss. It rested on the schema re-architecture described in the post above — you cannot move a database cleanly while it still holds rows pointing at parents that no longer exist."
        evidence="This one I can describe but cannot hand you. It is my employer's production database: there is no repository to point at, and the validation artefacts stay inside the company. The decision records from the same platform are published and give a fair sample of how the work was reasoned about, but they are not this. Treat the zero-data-loss claim as something to interrogate in conversation rather than something this page proves — the honest answer to “how did you verify it?” is a better use of twenty minutes than a sentence here."
        tags={["Migration", "Data integrity", "Oracle"]}
        overview="The highest-risk thing I have done in production, and the one the rest of this page keeps alluding to. Moving between SQL Server and Oracle is not a copy: datetime types do not map one to one, identity columns become sequences, NVARCHAR becomes NVARCHAR2, and Oracle treats the empty string as NULL — which is a classic route to silent corruption, because nothing errors, the value simply stops being what it was. The transactional table alone exceeded two million rows. I owned both verbs on this: the planning and the execution, with data cleansing as part of the move and validation to prove nothing was lost. It is also why the schema work came first. Referential integrity is not a tidiness exercise when you are about to move everything — an orphaned row is a row you cannot classify as kept or dropped, and a migration full of them is unverifiable by construction."
        tools={[
          "Microsoft SQL Server",
          "Oracle Database",
          "SQL",
          "Node.js",
        ]}
        meta={[
          "Queen Service",
          "2M+ record table",
          "Production cutover",
          "Zero data loss",
        ]}
      />

      {/* The second register. Everything below was built outside the post —
          on my own time, for a course, or under its own arrangement — and the
          order follows the CV's, except that the two 2024 entries are ranked
          by what they can actually show rather than by date. */}
      <section className="py-10">
        <p className="mono">Projects — outside the post</p>
        <p className="prose-measure mt-3 font-serif text-lg text-paper">
          Built on my own time, for a course, or under its own arrangement.
          Newest first, and ranked honestly where two sit in the same year.
        </p>
      </section>

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
        images={prReviewerImages}
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
            url: "https://youtu.be/5vXJRONcfKI",
          },
        ]}
        images={pdf2deckImages}
        embed={pdf2deckEmbed}
      />

      {/* No link: the repository is not public, and the audit question about
          what may be published from it is not mine to answer unilaterally. The
          specification is the evidence, which is the claim this entry makes
          anyway. */}
      <ProjectCard
        title="DMS — Diagram Management System"
        problem="Engineering drawings move between departments as attachments and shared folders, so nobody can say with confidence which revision is current, who has seen it, or what the drawing looked like three revisions ago. And for the kind of organisation that holds drawings like these, none of it may leave the building."
        insight="A diagram's identity is not its file. Separate the two and the version history becomes immutable by construction — a revision is a new file against a stable identity, and nothing is ever overwritten. The access question has the same shape: the rule people actually state is “the whole department, except one person”, which is a single indexed query against a polymorphic permission model and a thicket of special cases against any other."
        solution="A React SPA over a Node.js REST API, TypeScript end to end, managing the lifecycle, distribution and archiving of engineering drawings across departments. JWT authentication with a configurable RBAC model governing per-role access to the archive. BullMQ and Redis workers take format-agnostic file processing (PDF, DWG) and automated backups off the request path. It deploys fully on-premises in Docker behind NGINX, with automated replication to secondary servers for disaster recovery, because for this buyer a cloud is not one of the options."
        evidence="For this one the documentation is the demo. I wrote the SRS and the design models first and then directed coding agents against them — which is the part most people leave out, and the specification is precisely what makes the authorship checkable. Redacted excerpts go to serious enquirers. The repository is not public, so this entry carries no link."
        tags={["On-premises", "Document management", "TypeScript"]}
        overview="A secure engineering archive, written TypeScript end to end with a fully right-to-left Arabic interface. Two decisions carry the system. The first is separating a diagram's identity from its files, which is what makes the version history immutable rather than merely recorded. The second is a polymorphic permission model, so that the real-world rule — a whole department has access except one person — resolves in one indexed query instead of a special case per exception. The on-premises constraint shapes the rest: no managed queue, no object store, no cloud backup, so BullMQ and Redis run in the same compose file as everything else and disaster recovery is automated replication to secondary servers that I had to configure rather than purchase. It is also the second independent implementation of configurable RBAC I have built, after the HR platform, which is the part I would point at if asked whether I actually understand the pattern or just used it once."
        tools={[
          "Node.js",
          "Express",
          "Prisma",
          "PostgreSQL",
          "Redis",
          "BullMQ",
          "React",
          "TypeScript",
          "Docker",
          "NGINX",
        ]}
        meta={[
          "Secure engineering archive",
          "On-premises",
          "SRS excerpts on request",
          "2026 — present",
        ]}
        images={dmsImages}
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
        images={jobDiscoveryImages}
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

      {/* Same year as DriveWise and placed below it on purpose: DriveWise can
          show two runs of the same drive, and this can show an architecture
          diagram. Date order would flatter this entry at the reader's expense. */}
      <ProjectCard
        title="SympAI — healthcare chatbot"
        problem="A chatbot is a long-lived conversation at the front and a set of independent services behind it, and the two have nothing in common. Put them in one deployable and their traffic patterns fight each other: the interface wants to be cheap, globally served and redeployed constantly, and the API wants containers, memory and a release it can be careful about."
        insight="The split is the whole design. Once you accept that the interface and the request handling want different runtimes, the boundary between them stops being an inconvenience and becomes the thing that lets each half scale and ship without the other."
        solution="A healthcare chatbot built as loosely coupled services: a Next.js interface for real-time interaction deployed on AWS Amplify, and the main API in FastAPI on AWS ECS, with DynamoDB for storage. Each half deploys on its own."
        evidence="The frontend repository is public. This is the oldest cloud work on the page and I would rather state its limits than let the stack line imply more: it is a 2024 project, deployed and working, not production at scale, and my recent deployment experience is on-premises Docker and NGINX instead — a real skill, but a different one."
        tags={["Cloud deployment", "Conversational AI", "AWS"]}
        overview="Built in 2024, and the only AWS work on this page. The interesting part was the deployment topology rather than the conversation: a Next.js front end on Amplify for a responsive, real-time interface, and the main API as a containerised FastAPI service on ECS, so that the two halves could be scaled, released and reasoned about separately. DynamoDB sat behind the API. I list it because it is the thing backing any claim I make about AWS, and because being specific about when cloud experience happened is more useful than listing the services and letting a reader assume it is current — it is not. The deployment work I have done since is on-premises, which is where the DMS and the ERP platform both live."
        tools={[
          "Next.js",
          "Python",
          "FastAPI",
          "AWS Amplify",
          "AWS ECS",
          "DynamoDB",
        ]}
        meta={["Healthcare", "AWS Amplify & ECS", "2024"]}
        links={[
          {
            name: "GitHub — frontend",
            url: "https://github.com/MoKenawy/sympai-front",
          },
        ]}
      />

      {/* Deliberately the shortest entry on the page. An entry is given the
          length it has earned, and ranking your own work honestly reads as more
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
        meta={["Computer Vision", "Roboflow Universe", "2023"]}
        images={currencyImages}
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
