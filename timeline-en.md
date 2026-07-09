# Five Years: From "The Clean Code Guy" to a Systems Engineer

## 2022 — The Beginning: No, Not Good Enough

A student with glasses, passionate about programming, reading a lot, and needing nothing else... or so I thought. I was "the clean code guy" — clean code was my identity. With time, I realized that passion alone — even clean code alone — is not good enough.

## 2023 — Third Year: Respecting Time

First in my class, but the ranking mattered less than the shift in mindset: my reading turned from free reading into **targeted reading** — more technical books — and I adopted a new rule for time: *if you believe it's an unprofitable hour, don't invest it.*

That same year came my first real contact with AI — a contact that would later redirect my whole path.

## 2024 — Final Year: Falling in Love with Computer Vision

First in my class again, and a graduation project graded with distinction: **Drive-Wise** — a driver-safety and fleet-monitoring system in two parts. A *Driving Station* communicates with the vehicle over a REST API, reads speed and distance in real time, detects speeding, unsafe following distance, and **driver drowsiness** using computer vision (YOLO and OpenCV), and warns the driver with an immediate audible alarm. A *Manager's Dashboard*, built with Django, shows analytics, violation logs, and an automatic rating for each driver based on behavior, with data synced through Firebase. I still hope it becomes a real product someday.

Through this project I fell in love with computer vision — and discovered a parallel passion for academia and teaching. I tried writing repeatedly, and learned a simple lesson: *to write, I need to read more and more.*

Late that year I tried teaching for real — AI courses — and the students' feedback was great. Now I know it: I love teaching.

Around the same time I joined the first round of the **DEPI — AWS Machine Learning Engineer** program, and came out of it with **SympAI**: a healthcare chatbot that helps users describe their symptoms and get preliminary medical guidance. I built the backend with FastAPI on top of medical language models (BioMistral 7B and Meditron 7B) with multi-turn conversations via LangChain, a Next.js frontend, everything Dockerized and deployed on AWS — EC2 behind an API Gateway and Load Balancer, with the frontend on Amplify with CI/CD.

## 2025 — The Army: A Leader by Surprise

The logistics guy in the administrative archive and follow-up department. A lot of running around, and limited authority — it simply wasn't my specialty.

Then suddenly: the most senior person in the place. **A leader by surprise**, in charge of a small team of four. I learned more about management styles and personality types than any book had taught me — many faces, many different characters.

The pressure itself changed shape. I had always been used to thinking deeply — **vertically**. Here, the pressure was **horizontal**: many small topics at once, more than one brain can hold at the same moment. I needed pen and paper again, but differently: instead of writing deeply, I wrote shallowly — but I wrote *everything*. (Thank you, *Getting Things Done*.)

And instead of carrying the workload alone, I learned to **share the load and follow up**. When I found time to think again, I dug into the problems of the department itself: I documented and standardized the archive's workflow.

## Late 2025 – March 2026 — Back to Tech (From Inside the Army)

I moved to the information systems sector to help develop the existing system — returning to tech as a new person, facing a classic challenge: **a legacy system with zero documentation.**

I studied the system, uncovered its problems, and realized two truths:
First: *never blame the system before you know everything.*
Second: I wouldn't have time to fix everything — but at the very least, the next person shouldn't have to start from zero.

So the work became: analyzing and documenting the database design, data profiling and data cleaning, remodeling the schema, migrating part of the system from SQL Server to Oracle — all while maintaining the old system.

My military service ended with an **exemplary conduct** rating.

## March – April 2026 — Trying Freelancing

I decided to build something that solves the problems I had seen with my own eyes in the archive: a **Diagram Management System (DMS)** — an on-premises, fully **air-gapped** archival system for organizations that need to archive their engineering diagrams (PDF, DWG, SVG, images) under strict controls.

Two decisions sit at the heart of the design: separating a **diagram's identity from its files**, so the version history is **immutable** and never edited (an audit-grade legal record); and a **polymorphic RBAC model with a Deny-Override rule** — an entire department can have access *except* one person, expressed in a single table with one indexed query. It's TypeScript end to end (Node.js/Express + PostgreSQL/Prisma + React), with BullMQ handling thumbnails, backups, and replication, and a fully RTL Arabic interface. I wrote a complete SRS and design models for it, then broke the implementation into task prompts directed at AI coding agents — a hands-on application of what I'd been learning about agentic workflows. The first release is complete, and the second release plan is underway.

## 2026 — First Job in the Tech Industry

A backend engineer on a very small team, converting an HR & Personnel system from **MS Access to a modern web application** — and on a team this size, "small" means you touch everything: planning, analysis, design, implementation, testing, deployment.

The first lesson we paid for: **data migrations cost more than you think** — and it might have been better to start from the application layer, to see the full picture of the system first.

Then the building kept coming:
- **REST APIs** documented with architecture decision records (ADRs), and an **RBAC** authorization model.
- Diving into the **payroll** subsystem: my entry into fintech — a deterministic calculation engine supporting retroactive recalculation, and a working understanding of **double-entry ledgers**.
- A metadata-driven **reporting and export** subsystem: BullMQ queues, Redis, background workers, SSE notifications — and even **chaos testing**.
- A biometric attendance gateway (ZKTeco) with dual-path reconciliation and idempotent deduplication.
- **Beta testing** the full HR system — and with it, discovering the world of HCI and concepts like **negative transfer**.

And on the margins, deeper lessons:
- I felt I was **late to the AI race** — so I decided not to watch from the sidelines: I experimented with agentic AI workflows and several coding agents (Antigravity, Codex, Cursor, Claude).
- I felt — practically, this time — **the importance of testing**.
- And finally I had time to think about **design** itself, starting a deeper journey with data: reading *Designing Data-Intensive Applications* by Martin Kleppmann, and thinking about **scaling** the system.

---

*The thread running through these five years? Every time I thought I knew enough, a new context arrived — an academic year, military service, an undocumented legacy system, a first job — to remind me of that 2022 line: no, not good enough... yet.*
