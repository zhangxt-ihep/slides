---
theme: scholarly
title: Grid Data Transfer Infrastructure for CEPC
author: Xuantong Zhang
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1200
fonts:
  sans: Arimo
  serif: Arimo
  provider: none
themeConfig:
  colorTheme: classic-blue
  fontTheme: sans-default
  contentMode: light
  chromeMode: dark
drawings:
  enabled: false
transition: none
defaults:
  layout: none
  class: slidev-layout h-full
---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">CEPC2026 · OFFLINE COMPUTING & SOFTWARE</div>
<div class="cover">
<div class="cover-title">Grid Data Transfer Infrastructure for CEPC</div>
<div class="cover-sub">IHEP operations, FTS4 tests and a CEPC validation plan</div>
<div class="authors"><strong>Xuantong Zhang</strong><br>Xiaomei Zhang · Xiao Han</div>
<div class="institution">Institute of High Energy Physics<br>Chinese Academy of Sciences</div>
</div>
<footer><span>Shanghai · 24 October 2026</span><span>CEPC2026 · 01 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">REPORT OUTLINE</div>
<h1>Outline</h1>
<div class="chapter-nav chapter-nav-outline">
<div class="chapter-nav-row"><span class="chapter-nav-index">01</span><span class="chapter-nav-name">Introduction</span><span class="chapter-nav-detail">CEPC transfer needs and IHEP experience</span></div>
<div class="chapter-nav-row"><span class="chapter-nav-index">02</span><span class="chapter-nav-name">FTS4</span><span class="chapter-nav-detail">From FTS3 operations to FTS4 qualification</span></div>
<div class="chapter-nav-row"><span class="chapter-nav-index">03</span><span class="chapter-nav-name">TPC</span><span class="chapter-nav-detail">Direct data movement between storage sites</span></div>
<div class="chapter-nav-row"><span class="chapter-nav-index">04</span><span class="chapter-nav-name">IAM</span><span class="chapter-nav-detail">Identity, tokens and CEPC plans</span></div>
<div class="chapter-nav-row"><span class="chapter-nav-index">05</span><span class="chapter-nav-name">Summary</span><span class="chapter-nav-detail">From JUNO rehearsal to CEPC validation</span></div>
</div>
<footer><span>CEPC2026 · Offline Computing &amp; Software</span><span>CEPC2026 · 02 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="chapter-nav chapter-nav-divider">
<div class="chapter-nav-kicker">01 / 05</div>
<div class="chapter-nav-title" role="heading" aria-level="1">Introduction</div>
<div class="chapter-nav-subtitle">CEPC transfer needs and IHEP experience</div>
<div class="chapter-nav-track" aria-label="Report sections"><span class="chapter-nav-current" aria-current="step">Introduction</span><span>FTS4</span><span>TPC</span><span>IAM</span><span>Summary</span></div>
</div>
<footer><span>CEPC2026 · Offline Computing &amp; Software</span><span>CEPC2026 · 03 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">INTRODUCTION · SHARED COMPUTING AND STORAGE</div>
<h1>Why grid data transfer?</h1>
<div class="grid-motivation">
<p class="motivation-lead">LHC data processing and storage exceed a single centre’s capacity.</p>
<div class="motivation-example">Worldwide LHC Computing Grid (WLCG)</div>
<img class="motivation-tier-image" src="./assets/wlcg-tier-roles.svg" alt="Simplified WLCG tier roles: concentric layers with CERN at the centre. Label guides identify Tier-0 raw-data first copy and first reconstruction, Tier-1 archive and reprocessing, and Tier-2 simulation and analysis. The guides are not transfer routes.">
<div class="motivation-caption">Simplified core tier roles · original illustration based on CERN/WLCG</div>
<div class="motivation-roles">Workflows place jobs; transfers deliver data between sites.</div>
<div class="motivation-cepc"><div><strong>CEPC plans distributed computing.</strong><small>First-five-year estimates · CEPC TDR (2025)</small></div><div class="motivation-number">460 <span>PB disk</span></div><div class="motivation-number">460 <span>PB tape</span></div></div>
<div class="motivation-consequence">Transfers deliver input datasets, return outputs and maintain replicas.</div>
</div>
<footer><span>Sources: <a href="https://wlcg-public.web.cern.ch/tiers/" style="color:inherit">CERN/WLCG tiers</a> · <a href="https://arxiv.org/abs/2510.05260" style="color:inherit">CEPC Detector TDR</a> · Table 13.1; §§13.6–13.7</span><span>CEPC2026 · 04 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">CEPC · WORLDWIDE DATASET DISTRIBUTION</div>
<h1>CEPC grid data transfer model</h1>
<img class="infrastructure-model" src="./assets/cepc-transfer-model-refined.svg" alt="Applications outside the infrastructure submit requests to FTS and receive status. IAM issues scoped tokens to applications and provides issuer trust and keys to FTS and storage. FTS controls transfers; storage endpoints enforce access and move payload directly between example sites.">
<div class="infrastructure-scope">Planned token-based transfer model for CEPC, shown with example storage sites.</div>
<footer><span>Sources: <a href="https://arxiv.org/abs/2510.05260" style="color:inherit">CEPC Detector TDR §13.7</a> · <a href="https://fts3-docs.web.cern.ch/fts3-docs/docs/overview.html" style="color:inherit">FTS documentation</a> · <a href="https://indigo-iam.github.io/v/current/docs/overview/" style="color:inherit">INDIGO IAM</a></span><span>CEPC2026 · 05 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">JUNO · OPERATING EXPERIENCE</div>
<h1>JUNO: operating experience for CEPC</h1>
<div class="juno-bridge">
<p class="juno-bridge-lead">IHEP-CC deploys and operates the FTS service for JUNO.</p>
<div class="juno-bridge-history"><strong>Over 10 years</strong><span>Serving JUNO since its construction phase.</span></div>
<p class="juno-bridge-coverage">Raw, simulation and analysis data transfers across four major sites.</p>
<div class="juno-bridge-period">JUNO · 2026 year to date · reported 14 Sep 2026</div>
<div class="juno-bridge-metrics"><div><strong>11.65 <small>PB</small></strong><span>Data transferred</span></div><div><strong>6,333,642</strong><span>Files transferred</span></div></div>
<div class="juno-bridge-scope">Cumulative transfer volume and file count.</div>
<div class="juno-bridge-next">The same IHEP service also supports CEPC.</div>
</div>
<footer><span>Transfer totals: <a href="https://indico.cern.ch/event/1639200/contributions/7225206/attachments/3342094/5990032/FTS_IHEP_v2.pdf" style="color:inherit">FTS at IHEP</a> · 14 Sep 2026 · p.6</span><span>CEPC2026 · 06 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="chapter-nav chapter-nav-divider">
<div class="chapter-nav-kicker">02 / 05</div>
<div class="chapter-nav-title" role="heading" aria-level="1">FTS4</div>
<div class="chapter-nav-subtitle">From FTS3 operations to FTS4 qualification</div>
<div class="chapter-nav-track" aria-label="Report sections"><span>Introduction</span><span class="chapter-nav-current" aria-current="step">FTS4</span><span>TPC</span><span>IAM</span><span>Summary</span></div>
</div>
<footer><span>CEPC2026 · Offline Computing &amp; Software</span><span>CEPC2026 · 07 / 22</span></footer>



---


<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">FTS AT IHEP · SERVICE AND MONITORING</div>
<h1>FTS3 operation and monitoring at IHEP</h1>
<div class="fts-section fts-ops-service">
<p class="fts-ops-version">FTS3 server 3.14.5 · dedicated RPM deployment · VOMS proxies in production</p>
<div class="fts-note">September 2026 service snapshot; JWT workflows are under test.</div>
<div class="fts-ops-pipeline"><div><strong>FTS events</strong><span>fts-activemq</span></div><b>→</b><div><strong>ActiveMQ</strong></div><b>→</b><div><strong>MonPipe</strong><span>IHEP · STOMP consumer</span></div><b>→</b><div><strong>Elasticsearch</strong><span>Shared service</span></div><b>→</b><div><strong>Grafana</strong></div></div>
<div class="fts-ops-monitoring"><img class="fts-ops-dashboard" src="./assets/dashboard-admin-throughput-plot.png" alt="Cropped original FTS throughput plot, September 6–12, with MiB/s axis and date labels preserved; right-hand link legend omitted."><div class="fts-ops-monitor-copy"><h2>Operators can follow</h2><p>Transfer volume, file counts, rates, success and failures.</p><h2>Filter the full dashboard</h2><p>By site, endpoint and workload.</p><div class="fts-note">Workshop snapshot · 6–12 Sep 2026</div></div></div>
</div>
<footer><span>Source: <a href="https://indico.cern.ch/event/1639200/contributions/7225206/attachments/3342094/5990032/FTS_IHEP_v2.pdf" style="color:inherit">FTS Status and Future Plan at IHEP</a> · September 2026 · pp.4, 11–13</span><span>CEPC2026 · 08 / 22</span></footer>



---


<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">FTS AT IHEP · OPERATIONS AND COOPERATION</div>
<h1>JUNO operations contribute to FTS development</h1>
<div class="fts-section fts-ops-cooperation">
<p class="fts-ops-intro">JUNO operations exposed problems IHEP handled locally or with FTS developers. Joint work led to code fixes and features developed from accepted requests.</p>
<table class="fts-ops-issues"><thead><tr><th>Issue in JUNO operations</th><th>Local response</th></tr></thead><tbody><tr><td>Bursts strain storage endpoints.</td><td>Tune concurrency at host, storage and link levels.</td></tr><tr><td>Relay and normal replicas compete to write the same file.</td><td>Use a dedicated relay directory. Cleanup remains manual.</td></tr></tbody></table>
<div class="fts-note">Proposed to FTS: reuse the first hop, or delete the relay copy after hop 2 succeeds.</div>
<div class="fts-ops-citation">LHCb explicitly cited the IHEP relay case in its cleanup discussion.</div>
<div class="fts-ops-invite">Project support is available to invite FTS developers to IHEP over the next two years for deployment and upgrade discussions.</div>
</div>
<footer><span>Cases: <a href="https://indico.cern.ch/event/1639200/contributions/7225206/attachments/3342094/5990032/FTS_IHEP_v2.pdf" style="color:inherit">FTS at IHEP</a> · pp.8–9; citation: <a href="https://indico.cern.ch/event/1639200/contributions/7226160/attachments/3343074/5992121/FTS4LHCb.pdf" style="color:inherit">LHCb &lt;3 FTS[34]</a> · pp.8–9</span><span>CEPC2026 · 09 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">FTS4 · PREPARING FOR RUN 4</div>
<h1>Why the transfer service needs FTS4</h1>
<div class="fts4-rationale">
<p>HL-LHC / Run 4, around 2030, brings more data to record and distribute.</p>
<div class="fts4-rationale-target"><strong>50%</strong><div><p>of expected Run-4 transfer rates</p><span>DC27 planning target, subject to available hardware.</span></div></div>
<div class="fts4-rationale-pressure"><h2>Larger workloads expose FTS3's design limits</h2><p>Starved links and unpredictable priorities delay transfers. Scheduling and monitoring compete for database resources as queues grow.</p></div>
<div class="fts4-rationale-response"><h2>FTS4 redesigns scheduling and the transfer engine</h2><p>Designed to share capacity fairly and keep queued tasks progressing.</p></div>
</div>
<footer><span>Sources: <a href="https://home.cern/science/accelerators/hilumi-lhc/" style="color:inherit">CERN HiLumi</a> · <a href="https://indico.cern.ch/event/1639200/contributions/7225209/attachments/3343286/5992497/FTSandXRoot_workshop_DC27_planning.pdf" style="color:inherit">Data Challenge 2027</a> · <a href="https://indico.cern.ch/event/1639200/contributions/7264061/attachments/3343312/5992630/FTS4_DC27_Status_3.pptx" style="color:inherit">FTS4 for DC27</a></span><span>CEPC2026 · 10 / 22</span></footer>



---


<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">FTS4 · CORE CHANGES</div>
<h1>What changes in FTS4</h1>
<div class="fts4-features">
<p>FTS4 redesigns the File Transfer Service for larger workloads.</p>
<div class="fts4-feature-row"><h2>Fair, explainable scheduling</h2><div><p>Links, experiments and activities get defined turns and shares.</p><div class="fts4-feature-caption">A deterministic order helps operators explain waiting times.</div></div></div>
<div class="fts4-feature-row"><h2>An engine for larger queues</h2><div><p>PostgreSQL and reworked workers support larger queues.</p><div class="fts4-feature-caption">Batch updates speed writes; consistent locking fixes identified deadlocks.</div></div></div>
<div class="fts4-feature-row"><h2>Persistent tape workflows</h2><div><p>Per-endpoint requests and resilient polling support long recalls.</p><div class="fts4-feature-caption">Failed polls can be retried; tape REST calls support token authentication.</div></div></div>
<div class="fts4-feature-scope">Adaptive concurrency is in development; queue back-pressure is planned. Qualification continues.</div>
</div>
<footer><span>Sources: <a href="https://indico.cern.ch/event/1639200/contributions/7266807/attachments/3342937/5991830/FTS4_%20Scheduler%20and%20FlowController_%20Scalable%20Scheduling%20and%20Adaptive%20Transfer%20Concurrency.pdf" style="color:inherit">FTS4 scheduler</a> · <a href="https://indico.cern.ch/event/1639200/contributions/7271731/attachments/3342377/5990615/FTS_XRootD_Workshop_2026_FTS4_StateOfTestingAffairs.pdf" style="color:inherit">Testing</a> · <a href="https://indico.cern.ch/event/1639200/contributions/7263011/attachments/3342860/5991653/fts4-tape.pdf" style="color:inherit">Tape workflows</a> · <a href="https://indico.cern.ch/event/1639200/contributions/7264061/attachments/3343312/5992630/FTS4_DC27_Status_3.pptx" style="color:inherit">FTS4 roadmap</a></span><span>CEPC2026 · 11 / 22</span></footer>



---


<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">IHEP · FTS SERVICE DEVELOPMENT AND JUNO PREPARATIONS</div>
<h1>IHEP's next steps for the FTS service</h1>
<div class="fts-parallel">
<div class="fts-parallel-challenge"><h2>JUNO's 2027 Data Challenge</h2>
<div class="fts-parallel-row"><strong>Real data</strong><p>Real reproduction and RAW datasets via DIRAC → FTS.</p></div>
<div class="fts-parallel-row"><strong>Full workflows</strong><p>IAM/JWT, tape recall and cross-site disk buffers.</p></div>
<div class="fts-parallel-row"><strong>Progressive load</strong><p>Check routes, then aggregate load and short peaks; protect production.</p></div>
<div class="fts-parallel-caption">Set sustained and peak loads from data volumes and available capacity.</div>
</div>
<div class="fts-parallel-upgrade"><h2>In parallel: FTS4 service preparation</h2><p>An isolated test bed is running; IHEP's service goal is 2027.</p><div class="fts-parallel-caption">Two 50 MiB copies completed: VOMS and unmanaged JWT. Deployment awaits qualification.</div></div>
</div>
<footer><span>JUNO plan and functional tests: <a href="https://indico.cern.ch/event/1639200/contributions/7225206/attachments/3342094/5990032/FTS_IHEP_v2.pdf" style="color:inherit">FTS at IHEP</a> · pp.17–19, 21; release checks: <a href="https://indico.cern.ch/event/1639200/contributions/7263058/attachments/3342885/5991702/FTS_XRootD_Workshop_2026_FTS4_QA_Procedures.pdf" style="color:inherit">FTS4 QA</a></span><span>CEPC2026 · 12 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="chapter-nav chapter-nav-divider">
<div class="chapter-nav-kicker">03 / 05</div>
<div class="chapter-nav-title" role="heading" aria-level="1">TPC</div>
<div class="chapter-nav-subtitle">Direct data movement between storage sites</div>
<div class="chapter-nav-track" aria-label="Report sections"><span>Introduction</span><span>FTS4</span><span class="chapter-nav-current" aria-current="step">TPC</span><span>IAM</span><span>Summary</span></div>
</div>
<footer><span>CEPC2026 · Offline Computing &amp; Software</span><span>CEPC2026 · 13 / 22</span></footer>



---


<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">THIRD-PARTY COPY · DATA AND CONTROL</div>
<h1>Third-party copy keeps bulk data off the client</h1>
<div class="tpc-section">
<p>FTS coordinates the copy; storage endpoints move the files.</p>
<svg class="tpc-comparison tpc-matched" viewBox="0 0 1080 290" role="img" aria-label="Local copy downloads from source through the client and uploads to destination. Matching node positions show third-party copy moving payload directly from source to destination, with HTTP COPY control from client to destination. Source READ and destination WRITE permissions are checked.">
<defs><marker id="tpc-data-arrow" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="12" refX="14" refY="6" orient="auto"><path d="M0 0L14 6L0 12Z" fill="#1e3a5f"/></marker><marker id="tpc-control-arrow" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="10" refX="12" refY="5" orient="auto"><path d="M0 0L12 5L0 10Z" fill="#4b5563"/></marker></defs>
<path d="M530 12V278" stroke="#cbd5e1"/>
<g class="tpc-matched-panel" data-copy="local">
<text class="tpc-svg-label" x="0" y="28">Local copy</text>
<text class="tpc-svg-caption" x="0" y="57">Download, then upload</text>
<rect class="tpc-svg-box" data-node="source" x="0" y="170" width="145" height="62"/><rect class="tpc-svg-box" data-node="client" x="185" y="85" width="150" height="62"/><rect class="tpc-svg-box" data-node="destination" x="370" y="170" width="150" height="62"/>
<text class="tpc-svg-node" x="72.5" y="208">Source</text><text class="tpc-svg-node" x="260" y="123">Client</text><text class="tpc-svg-node" x="445" y="208">Destination</text>
<path class="tpc-svg-data" d="M145 201H165V116H185"/><path class="tpc-svg-data" d="M335 116H350V201H370"/>
<text class="tpc-svg-caption" x="8" y="264">READ allowed</text><text class="tpc-svg-caption" x="380" y="264">WRITE allowed</text>
</g>
<g class="tpc-matched-panel" data-copy="tpc" transform="translate(560 0)">
<text class="tpc-svg-label" x="0" y="28">Third-party copy (TPC)</text>
<text class="tpc-svg-caption" x="0" y="57">HTTP pull example</text>
<rect class="tpc-svg-box" data-node="source" x="0" y="170" width="145" height="62"/><rect class="tpc-svg-box" data-node="client" x="185" y="85" width="150" height="62"/><rect class="tpc-svg-box" data-node="destination" x="370" y="170" width="150" height="62"/>
<text class="tpc-svg-node" x="72.5" y="208">Source</text><text class="tpc-svg-node" x="260" y="123">Client</text><text class="tpc-svg-node" x="445" y="208">Destination</text>
<path class="tpc-svg-control" d="M335 116H445V170"/><text class="tpc-svg-caption" x="375" y="104">COPY</text>
<path class="tpc-svg-data" d="M145 201H370"/><text class="tpc-svg-caption" x="223" y="189">file data</text>
<text class="tpc-svg-caption" x="8" y="264">READ allowed</text><text class="tpc-svg-caption" x="380" y="264">WRITE allowed</text>
</g>
</svg>
<p class="tpc-benefit">Avoid the client relay and its bandwidth bottleneck.</p>
<div class="tpc-protocols"><strong>WLCG TPC families</strong><span>HTTP(S)-TPC (WebDAV COPY) · native XRootD-TPC</span></div>
<div class="tpc-caption">The “third party” is the controller, not a third storage site. Endpoints enforce access permissions.</div>
</div>
<footer><span>Sources: <a href="https://fts3-docs.web.cern.ch/fts3-docs/docs/developers/http_tpc_pragmatic.html" style="color:inherit">FTS HTTP-TPC</a> · <a href="https://twiki.cern.ch/twiki/bin/view/LCG/ThirdPartyCopy" style="color:inherit">WLCG DOMA</a> · <a href="https://eos-docs.web.cern.ch/diopside/manual/protocols.html#third-party-copy-tpc" style="color:inherit">EOS protocols</a></span><span>CEPC2026 · 14 / 22</span></footer>



---


<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">JUNO · COMMON INTERFACES AND IHEP EXPERIENCE</div>
<h1>JUNO connects different stores through HTTP-TPC</h1>
<div class="token-paths">
<p>Different storage backends, a shared HTTP(S)-TPC / WebDAV interface.</p>
<div class="token-paths-grid">
<div class="token-paths-card"><h2>2022 · Macaroon support</h2><div class="token-paths-caption">Full support across IHEP's TPC endpoints</div><ol><li>Client uses a VOMS proxy</li><li>Storage issues a restricted Macaroon</li><li>Bearer token authorizes TPC access</li></ol><div class="token-paths-caption">The holder can add caveats to narrow rights.</div></div>
<div class="token-paths-card"><h2>2023 · WLCG JWT support</h2><div class="token-paths-caption">IHEP begins supporting IAM-issued tokens</div><ol><li>Client authenticates via IAM</li><li>IAM issues a scoped WLCG JWT</li><li>Trusted storage verifies and enforces it</li></ol><div class="token-paths-caption">OAuth 2.0 / OIDC workflow; can avoid a user VOMS proxy for resource access.</div></div>
</div>
<div class="token-paths-caption token-paths-boundary">These are acquisition workflows, not login requirements of the token formats. File data move between storage endpoints.</div>
<div class="token-paths-caption">September 2026: FTS3 production uses VOMS; JWT workflows remain in testing.</div>
</div>
<footer><span>Sources: <a href="https://fts3-docs.web.cern.ch/fts3-docs/docs/developers/http_tpc_pragmatic.html" style="color:inherit">FTS HTTP-TPC</a> · <a href="https://www.dcache.org/manuals/UserGuide-11.2/macaroons.shtml" style="color:inherit">dCache Macaroons</a> · <a href="https://indigo-iam.github.io/v/current/docs/overview/" style="color:inherit">INDIGO IAM</a> · <a href="https://doi.org/10.5281/zenodo.20734267" style="color:inherit">WLCG JWT profile</a></span><span>CEPC2026 · 15 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="chapter-nav chapter-nav-divider">
<div class="chapter-nav-kicker">04 / 05</div>
<div class="chapter-nav-title" role="heading" aria-level="1">IAM</div>
<div class="chapter-nav-subtitle">Identity, tokens and CEPC plans</div>
<div class="chapter-nav-track" aria-label="Report sections"><span>Introduction</span><span>FTS4</span><span>TPC</span><span class="chapter-nav-current" aria-current="step">IAM</span><span>Summary</span></div>
</div>
<footer><span>CEPC2026 · Offline Computing &amp; Software</span><span>CEPC2026 · 16 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">IDENTITY AND ACCESS MANAGEMENT · TRUSTED ISSUERS</div>
<h1>IAM connects identity to scoped access</h1>
<div class="iam-scopes">
<p>IAM issues scoped tokens to applications; storage enforces file permissions.</p>
<div class="iam-scopes-grid"><div><h2>Synthetic decoded payload</h2><pre class="iam-scopes-json">{
  "iss": "https://iam.example.org",
  "sub": "example-subject-01",
  "aud": "https://storage.example.org",
  "iat": 1792828800,
  "exp": 1792832400,
  "jti": "example-token-01",
  "wlcg.ver": "1.0",
  "scope": "storage.read:/data/cepc"
}</pre><div class="iam-scopes-caption">Illustrative payload, not a real credential. No signature.</div></div>
<div class="iam-scopes-permissions"><h2>Operation + path</h2><div><strong>storage.read:/data/cepc</strong><p>Read online files and stat.</p></div><div><strong>storage.create:/data/cepc/out</strong><p>Create files and directories; cannot overwrite or delete existing data.</p></div><div><strong>storage.modify:/data/cepc/out</strong><p>Also allow overwrite and delete.</p></div><div class="iam-scopes-caption">Other scopes shown separately; payload grants read only.</div></div></div>
<div class="iam-scopes-caption iam-scopes-roles">FTS validates its own access and controls copies. Storage checks audience and scope; payload moves by TPC.</div>
</div>
<footer><span>Sources: <a href="https://indigo-iam.github.io/v/current/docs/overview/" style="color:inherit">INDIGO IAM</a> · <a href="https://fts3-docs.web.cern.ch/fts3-docs/docs/features.html" style="color:inherit">FTS authorization</a> · <a href="https://doi.org/10.5281/zenodo.20734267" style="color:inherit">WLCG JWT profile</a></span><span>CEPC2026 · 17 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">HERD · DEPLOYED IAM SERVICE</div>
<h1>IHEP operates IAM for HERD</h1>
<div class="iam-section iam-herd">
<p>IHEP deploys and operates INDIGO IAM for HERD.</p>
<div class="iam-issuer"><h2>HERD's public issuer</h2><p>https://herd-iam.ihep.ac.cn/</p></div>
<div class="iam-interfaces"><div><h2>Token-service interface</h2><p>OAuth 2.0 and OpenID Connect<br>for token-based applications.</p></div><div><h2>VOMS-AA compatibility</h2><p>Membership attributes for<br>existing grid credentials.</p></div></div>
<div class="iam-signin"><h2>Sign-in choices</h2><p>Institutional and federated sign-in, alongside local credentials.</p></div>
<div class="iam-caption iam-scope">Observed 23 Oct 2026: INDIGO IAM login service and VOMS-AA v1.14.2;<br>public discovery and login pages available.</div>
</div>
<footer><span>Service: <a href="https://herd-iam.ihep.ac.cn/.well-known/openid-configuration" style="color:inherit">HERD IAM public issuer</a> · Software: <a href="https://indigo-iam.github.io/v/current/docs/overview/" style="color:inherit">INDIGO IAM</a></span><span>CEPC2026 · 18 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">LOCAL PLANS · JWT MIGRATION AND NEW SERVICES</div>
<h1>IAM's future at IHEP</h1>
<div class="iam-future">
<div class="iam-future-card"><h2>JUNO</h2><p>Complete JWT migration before JUNO's DIRACx upgrade.</p><div class="iam-future-detail"><h3>Every participating site</h3><p>Trust the issuers and support file read/write access.</p></div><div class="iam-future-detail"><h3>Monitoring by site</h3><p>JWT authorization failures; FTS results.</p></div></div>
<div class="iam-future-card"><h2>CEPC</h2><p>Plan IHEP-deployed CEPC-IAM for TPC with JWT authorization.</p><div class="iam-future-detail"><h3>Identity and authorization</h3><p>Include both in the initial service design.</p></div><div class="iam-future-detail"><h3>Transfer roles</h3><p>FTS controls copies; storage moves files.</p></div></div>
</div>
<footer><span>CEPC2026 · Offline Computing &amp; Software</span><span>CEPC2026 · 19 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="chapter-nav chapter-nav-divider">
<div class="chapter-nav-kicker">05 / 05</div>
<div class="chapter-nav-title" role="heading" aria-level="1">Summary</div>
<div class="chapter-nav-subtitle">From JUNO rehearsal to CEPC validation</div>
<div class="chapter-nav-track" aria-label="Report sections"><span>Introduction</span><span>FTS4</span><span>TPC</span><span>IAM</span><span class="chapter-nav-current" aria-current="step">Summary</span></div>
</div>
<footer><span>CEPC2026 · Offline Computing &amp; Software</span><span>CEPC2026 · 20 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">IHEP · PLANNED LOCAL MILESTONES</div>
<h1>IHEP's transfer roadmap</h1>
<div class="ihep-roadmap">
<p>Local targets for the DIRAC and transfer workflow.</p>
<ol class="ihep-roadmap-track">
<li><div class="ihep-roadmap-date">End 2026</div><h2>DIRAC8 → DIRAC9</h2><p>Upgrade at IHEP.</p></li>
<li><div class="ihep-roadmap-date">February 2027</div><h2>DC27</h2><p>Data Challenge.</p></li>
<li><div class="ihep-roadmap-date">Mid-2027</div><h2>IAM/JWT-authorized TPC</h2><p>Fully replace legacy VOMS-proxy TPC.</p></li>
<li><div class="ihep-roadmap-date">End 2027</div><h2>DIRAC9 → DIRACx</h2><p>Upgrade at IHEP.</p></li>
</ol>
<div class="ihep-roadmap-caption">All milestones are planned. DC27 precedes full JWT migration and does not wait for FTS4.</div>
</div>
<footer><span>CEPC2026 · Offline Computing &amp; Software</span><span>CEPC2026 · 21 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">SUMMARY · EXPERIENCE AND CEPC PLANS</div>
<h1>Summary</h1>
<div class="iam-roadmap-closing">
<ul><li><strong>Introduction</strong><p>CEPC needs distributed transfers; IHEP brings JUNO operating experience.</p></li><li><strong>FTS4</strong><p>New scheduling, queue handling and tape workflows remain under qualification.</p></li><li><strong>TPC</strong><p>Storage endpoints enforce access and move files directly between sites.</p></li><li><strong>IAM</strong><p>IHEP operates HERD IAM and plans CEPC-IAM with JWT-authorized TPC.</p></li></ul>
<div class="iam-roadmap-thanks">Thank you!</div>
</div>
<footer><span>CEPC2026 · Offline Computing &amp; Software</span><span>CEPC2026 · 22 / 22</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="chapter-nav chapter-nav-divider">
<div class="chapter-nav-kicker">SUPPLEMENTARY MATERIAL</div>
<div class="chapter-nav-title" role="heading" aria-level="1">Backup</div>
<div class="chapter-nav-subtitle">Additional details and references</div>
</div>
<footer><span>CEPC2026 · Offline Computing &amp; Software</span><span>BACKUP</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">COMMUNITY · EXPLICIT CITATION</div>
<h1>LHCb explicitly cited the IHEP multihop case</h1>
<div class="evidence"><img src="./assets/lhcb-workshop-2026-p09.png" alt="Original LHCb workshop slide, page 9, including the quote From Xuantong talk ! and the relay cleanup proposals."><div><div class="quote">“From<br>Xuantong talk !”</div><p>IHEP's operational example was reused in LHCb's discussion of conditional relay-file cleanup.</p><p class="small boundary">Cleanup was already on LHCb's 2025 list. This is a citation of the 2026 case, not a claim of invention or implementation.</p></div></div>
<footer><span>Source: Christophe Haen, <a href="https://indico.cern.ch/event/1639200/contributions/7226160/attachments/3343074/5992121/FTS4LHCb.pdf" style="color:inherit">LHCb &lt;3 FTS[34]</a> · 15 Sep 2026 · pp.8–9</span><span>BACKUP B01 / 4</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">BACKUP · MEASUREMENT SCOPE</div>
<h1>What the numbers describe</h1>
<table class="scope-table"><thead><tr><th>System / date</th><th>Evidence</th><th>Scope and limits</th></tr></thead><tbody><tr><td>JUNO<br><small>2026 YTD; 14 Sep report</small></td><td>11.65 PB<br>6,333,642 files transferred</td><td>Cumulative transfers;<br>not unique datasets</td></tr><tr><td>JUNO<br><small>Same reporting period</small></td><td>81.56% per attempt<br>97.38% with ≤3 retries</td><td>Different denominators;<br>not service availability</td></tr><tr><td>IHEP FTS4<br><small>September 2026</small></td><td>2 × 50 MiB<br>VOMS / unmanaged JWT</td><td>Functional checks;<br>not a load benchmark</td></tr><tr><td>CERN / DC27<br><small>September 2026 findings</small></td><td>40k concurrent transfers<br>20M queued requests</td><td>40k test: expected failures;<br>20M queue: target</td></tr></tbody></table>
<footer><span>Sources: <a href="https://indico.cern.ch/event/1639200/contributions/7225206/attachments/3342094/5990032/FTS_IHEP_v2.pdf" style="color:inherit">FTS at IHEP</a> · pp.6, 21; <a href="https://indico.cern.ch/event/1639200/contributions/7271731/attachments/3342377/5990615/FTS_XRootD_Workshop_2026_FTS4_StateOfTestingAffairs.pdf" style="color:inherit">FTS4: State of Testing Affairs</a> · pp.2, 5–8</span><span>BACKUP B02 / 4</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">BACKUP · IHEP/JUNO PROPOSALS</div>
<h1>IHEP test scope and upstream dependencies</h1>
<table class="rate-table"><thead><tr><th>Candidate load</th><th>One-way</th><th>Aggregate</th><th>Duration</th></tr></thead><tbody><tr><td>Sustained</td><td>20 Gb/s</td><td>40 Gb/s</td><td>About two weeks</td></tr><tr><td>Extreme</td><td>≥40 Gb/s</td><td>≥80 Gb/s</td><td>Short peaks within 1–2 days</td></tr></tbody></table>
<div class="scope">JUNO/IHEP proposals, subject to capacity and production protection. These are not CEPC requirements.</div>
<div class="dependency"><h2>Checks and dependencies</h2><p>Managed-token exchange/renewal, tape, cancellation and multihop cleanup need explicit checks.</p><p><strong>FTS-2319:</strong> “Delete intermediary multi-hop files” is on the September Post-DC27 plan. No IHEP authorship or delivery claim.</p><p class="small">FlowController timing differs between reports; this plan does not depend on a promised date.</p></div>
<footer><span>Sources: <a href="https://indico.cern.ch/event/1639200/contributions/7225206/attachments/3342094/5990032/FTS_IHEP_v2.pdf" style="color:inherit">FTS at IHEP</a> · pp.17–19; <a href="https://indico.cern.ch/event/1639200/contributions/7264061/attachments/3343312/5992630/FTS4_DC27_Status_3.pptx" style="color:inherit">FTS status and plans</a> · slide 6</span><span>BACKUP B03 / 4</span></footer>



---

<img class="cepc-logo" src="./assets/cepc.png" alt="CEPC logo">
<div class="eyebrow">BACKUP · REFERENCES</div>
<h1>Sources</h1>
<div class="references">
<a href="https://arxiv.org/abs/2510.05260"><b>TDR</b><span>CEPC Reference Detector Technical Design Report<small>CEPC Study Group · October 2025 · Table 13.1; §§13.6–13.7</small></span></a>
<a href="https://indico.ihep.ac.cn/event/28911/"><b>Event</b><span>CEPC2026, Shanghai<small>24 October 2026 · Offline Computing & Software · 10:20–10:40</small></span></a>
<a href="https://indico.cern.ch/event/1639200/contributions/7225206/attachments/3342094/5990032/FTS_IHEP_v2.pdf"><b>IHEP</b><span>FTS Status and Future Plan at IHEP<small>Zhang et al. · 14 Sep 2026 · pp.4, 6, 8, 17–21</small></span></a>
<a href="https://indico.cern.ch/event/1639200/contributions/7271731/attachments/3342377/5990615/FTS_XRootD_Workshop_2026_FTS4_StateOfTestingAffairs.pdf"><b>Tests</b><span>FTS4: State of Testing Affairs<small>Patrascoiu · 15 Sep 2026 · pp.2, 5–8</small></span></a>
<a href="https://indico.cern.ch/event/1639200/contributions/7263058/attachments/3342885/5991702/FTS_XRootD_Workshop_2026_FTS4_QA_Procedures.pdf"><b>QA</b><span>FTS4: Establishing QA Procedures<small>Patrascoiu · 15 Sep 2026 · pp.7–15, 23–26</small></span></a>
<a href="https://indico.cern.ch/event/1639200/contributions/7226160/attachments/3343074/5992121/FTS4LHCb.pdf"><b>LHCb</b><span>LHCb &lt;3 FTS[34]<small>Haen · 15 Sep 2026 · pp.8–9</small></span></a>
<a href="https://indico.cern.ch/event/1639200/contributions/7225209/attachments/3343286/5992497/FTSandXRoot_workshop_DC27_planning.pdf"><b>DC27</b><span>Data Challenge 2027<small>Ellis · 15 Sep 2026 · pp.3, 8–9</small></span></a>
<a href="https://indico.cern.ch/event/1639200/contributions/7264061/attachments/3343312/5992630/FTS4_DC27_Status_3.pptx"><b>Plans</b><span>FTS4 for DC27: What We Deliver and What Comes Next<small>Arsuaga-Rios · September 2026 · slides 1–3, 6–7</small></span></a>
</div>
<footer><span>Titles are clickable · Original reports and page references</span><span>BACKUP B04 / 4</span></footer>


