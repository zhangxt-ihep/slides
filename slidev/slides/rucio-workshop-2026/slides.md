---
theme: scholarly
layout: cover
title: Rucio Status at IHEP
authors:
  - name: Xuantong Zhang
    institution: Institute of High Energy Physics, Chinese Academy of Sciences
footerMiddle: Rucio Community Workshop 2026 · Lyon · 27 October 2026
htmlAttrs:
  data-fts-deck: v2
lang: en
favicon: 'data:,'
transition: null
colorSchema: light
aspectRatio: 16/9
canvasWidth: 980
fontsize: 18px
fonts:
  sans: Arimo
  mono: ui-monospace
  local:
    - Arimo
    - Noto Sans CJK SC
    - DejaVu Sans
  provider: none
  fallbacks: true
themeConfig:
  colorTheme: classic-blue
  fontTheme: sans-default
  contentMode: light
  chromeMode: dark
  sectionMode: light
---

# Rucio Status at IHEP

<div class="cover-authors" aria-label="Author">
  <div class="cover-author-line"><span class="author-name">Xuantong Zhang</span></div>
  <div class="author-institution">Institute of High Energy Physics, Chinese Academy of Sciences</div>
  <p>Rucio Community Workshop 2026 · Lyon · 27 October 2026</p>
</div>



---
layout: default
class: deck-v2 rucio-outline-cepc
title: Outline
---

<ol class="chapter-nav-outline" aria-label="Outline">
  <li class="chapter-nav-row"><span class="chapter-nav-index" aria-hidden="true">01</span><span class="chapter-nav-name">HERD Rucio Status and Operation</span></li>
  <li class="chapter-nav-row"><span class="chapter-nav-index" aria-hidden="true">02</span><span class="chapter-nav-name">Upgrades and Site Integration</span></li>
  <li class="chapter-nav-row"><span class="chapter-nav-index" aria-hidden="true">03</span><span class="chapter-nav-name">News of Native Load Injection Tools</span></li>
  <li class="chapter-nav-row"><span class="chapter-nav-index" aria-hidden="true">04</span><span class="chapter-nav-name">Summary</span></li>
</ol>



---
layout: default
class: deck-v2 rucio-section-divider
title: HERD Rucio Status and Operation
---

<div class="chapter-nav-divider">
  <div class="chapter-nav-kicker">01 / 04</div>
  <div class="chapter-nav-title" role="heading" aria-level="1">HERD Rucio Status and Operation</div>
  <div class="chapter-nav-track" aria-label="Report sections">
    <span class="chapter-nav-current" aria-current="step">HERD Rucio Status and Operation</span>
    <span>Upgrades and Site Integration</span>
    <span>News of Native Load Injection Tools</span>
    <span>Summary</span>
  </div>
</div>

---
layout: two-cols
class: deck-v2
ratio: 3:2
gap: 24px
title: The HERD Experiment
---

::left::

<figure class="herd-v2-map">
  <a href="https://zhangxt-ihep.github.io/slides/rucio-workshop-2026/assets/herd-data-context.svg" target="_blank" rel="noopener" aria-label="Open full-size HERD data-context diagram">
    <img src="/assets/herd-data-context.svg" alt="CERN sends beam-test data to IHEP. HERD deployment on the Chinese Space Station is planned for 2029; a dashed line shows the future logical raw-data path to IHEP, not a space-to-ground FTS link." width="760" height="570">
  </a>
</figure>

::right::

<div class="herd-v2-text">
  <p>HERD: High Energy cosmic-Radiation Detection facility.</p>
  <ul class="points">
    <li>A particle-astrophysics payload planned for the Chinese Space Station in 2029.</li>
    <li>Science goals: indirect dark-matter searches, cosmic-ray measurements and gamma-ray surveys.</li>
  </ul>
  <p class="source-note">Source: <a href="https://herd.ihep.ac.cn/">HERD official site</a></p>
</div>

<style scoped>
.herd-v2-map { margin: 0; }
.herd-v2-map a { display: block; border: 0; }
.herd-v2-map img { display: block; width: 100%; height: auto; }
.herd-v2-text > p { margin: 0 0 16px; color: var(--c-ink-muted); }
.herd-v2-text .points li + li { margin-top: 12px; }
</style>



---
layout: two-cols
class: deck-v2
ratio: 3:2
gap: 24px
title: HERD Deployment and Snapshot
---

::left::

<table class="evidence-table">
  <caption>Latest deployment snapshot</caption>
  <thead><tr><th>Metric</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>Rucio server</td><td><a href="https://rucio.cern.ch/documentation/started/releasepolicy/">41 LTS (41.4.0)</a></td></tr>
    <tr><td>Registered files</td><td>131,497</td></tr>
    <tr><td>Logical data volume</td><td>146.74 TB</td></tr>
    <tr><td><a href="https://indico.cern.ch/event/1545309/contributions/6717960/attachments/3168625/5632121/Rucio%20at%20IHEP.pdf">Since 2025 (113.0 TB)</a></td><td>+33.7 TB (~30%)</td></tr>
    <tr><td>Configured RSEs</td><td>3 production + 1 test</td></tr>
  </tbody>
</table>

::right::

<ul class="points">
  <li>Rucio is in trial operation and will manage HERD production data.</li>
  <li>2026 activity: one beam-test data-taking campaign and one simulation production campaign.</li>
  <li>Docker Compose is in use; migration to the new Kubernetes cluster is planned.</li>
</ul>



---
layout: default
class: deck-v2 followup-layout
title: Follow-up from Last Workshop
---

<table class="evidence-table followup-table">
  <caption>Latest follow-up</caption>
  <thead><tr><th>Last workshop</th><th>Latest status</th></tr></thead>
  <tbody>
    <tr><td>Upgrade from 1.29.4 toward v38</td><td>Server upgraded to 41.4.0</td></tr>
    <tr><td>Schema upgrade had failed</td><td>Explicit migration used; revision and schema checked</td></tr>
  </tbody>
</table>

<div class="followup-lower">
  <figure class="dashboard-figure">
    <figcaption>HERD beam-test transfers, August 2026</figcaption>
    <a href="https://zhangxt-ihep.github.io/slides/rucio-workshop-2026/assets/herd-fts-monitoring.png" target="_blank" rel="noopener" aria-label="Open full-size HERD FTS monitoring screenshot">
      <img src="/assets/herd-fts-monitoring.png" alt="HERD VO transfers, 25–26 August 2026: 1,563 successful FTS records and 724.6 GiB transferred." width="1225" height="485">
    </a>
  </figure>

  <ul class="points dashboard-points">
    <li>HERD monitoring added to the existing FTS/Elasticsearch dashboard with VO selection.</li>
    <li>August beam-test example: 1,563 successful transfer records, 724.6 GiB.</li>
  </ul>
</div>



---
layout: default
class: deck-v2 dci-integration
title: DCI-Agent for IHEP Distributed Computing
---

<div class="dci-columns">
  <div class="dci-explanation">
    <p><strong>Challenge:</strong> a transfer error may originate in another service.</p>
    <p><strong>Idea:</strong> combine cross-service evidence and reuse reviewed cases to reduce manual investigation.</p>
    <p><strong>Solution:</strong> DCI-Agent, our in-house AI-assisted operations system across IHEP experiments, services and sites.</p>
  </div>
  <div class="dci-workflow" role="group" aria-label="Current diagnosis workflow; reviewed knowledge feeds subsequent multi-agent diagnoses">
    <div class="dci-step"><strong>1 · Detect incidents and collect evidence</strong><span>Deterministic checks detect incidents; agents collect logs and context across services.</span><svg class="dci-down" viewBox="0 0 12 14" aria-hidden="true"><path d="M6 0V14"/><polygon points="2,9 6,14 10,9"/></svg></div>
    <div class="dci-step dci-diagnose"><strong>2 · Multi-agent diagnosis</strong><span>Combine evidence with accumulated operational knowledge to propose likely causes.</span><svg class="dci-down" viewBox="0 0 12 14" aria-hidden="true"><path d="M6 0V14"/><polygon points="2,9 6,14 10,9"/></svg></div>
    <div class="dci-step"><strong>3 · Human review</strong><span>Operators validate the diagnosis and decide how to act.</span><svg class="dci-down" viewBox="0 0 12 14" aria-hidden="true"><path d="M6 0V14"/><polygon points="2,9 6,14 10,9"/></svg></div>
    <div class="dci-step dci-learn"><strong>4 · Knowledge and skills</strong><span>Reviewed cases become shared knowledge and reusable agent skills for later investigations.</span></div>
    <div class="dci-feedback" role="img" aria-label="Reviewed knowledge and skills feed back into later multi-agent diagnoses"></div>
  </div>
</div>



---
layout: default
class: deck-v2 dci-integration
title: 'HERD: Connecting Rucio and Related Services'
---

<p class="dci-case-intro"><strong>Read-only integration deployed</strong> this month.</p>
<div class="dci-columns dci-case">
  <div class="dci-evidence" role="group" aria-label="Read-only evidence from four related services, not a file-transfer sequence">
    <div class="dci-service"><strong>HERD-Rucio</strong><span>Account-scoped rule counts; requests for one RSE pair</span></div>
    <div class="dci-service"><strong>HERD-IAM</strong><span>OIDC discovery and access-log categories</span></div>
    <div class="dci-service"><strong>FTS3 (shared)</strong><span>HERD-filtered transfer-error logs</span></div>
    <div class="dci-service"><strong>IHEP-StoRM</strong><span>XRootD service state, log categories and filesystem capacity</span></div>
  </div>
  <div class="dci-investigation" role="group" aria-label="Deployed read-only evidence integration; real-task correlation remains unverified">
    <div class="dci-investigation-step"><strong>1 · Collect every 15 minutes</strong><span>Snapshots from four sources; coverage remains partial.</span></div>
    <div class="dci-investigation-step"><strong>2 · Support incident diagnosis</strong><span>Evidence is available to the existing root-cause analysis workflow.</span></div>
    <div class="dci-investigation-step"><strong>3 · Correlate by exact IDs</strong><span>No real Rucio-to-FTS task match observed yet.</span></div>
    <div class="dci-goal"><strong>Management goal:</strong> approved, audited actions with outcome verification.</div>
  </div>
</div>



---
layout: default
class: deck-v2 rucio-section-divider
title: Upgrades and Site Integration
---

<div class="chapter-nav-divider">
  <div class="chapter-nav-kicker">02 / 04</div>
  <div class="chapter-nav-title" role="heading" aria-level="1">Upgrades and Site Integration</div>
  <div class="chapter-nav-track" aria-label="Report sections">
    <span>HERD Rucio Status and Operation</span>
    <span class="chapter-nav-current" aria-current="step">Upgrades and Site Integration</span>
    <span>News of Native Load Injection Tools</span>
    <span>Summary</span>
  </div>
</div>

---
layout: default
class: deck-v2 upgrade-intro-timeline
title: Upgrading Adventure, Continued
---

<p>“At present we stuck at database schema upgrading.”</p>
<p class="source-note">Source: <a href="https://indico.cern.ch/event/1545309/contributions/6717960/attachments/3168625/5632121/Rucio%20at%20IHEP.pdf#page=16">Rucio at IHEP, 2025, p.16</a></p>
<p>At the last workshop, we were still on 1.29.4. The upgrade touched the policy package, HERD API, PostgreSQL and the catalogue schema.</p>
<figure class="upgrade-milestones">
  <figcaption>Since the last workshop</figcaption>
  <div class="upgrade-axis" role="list" aria-label="Upgrade chronology, April to October 2026; spacing is not proportional to elapsed time">
    <div class="upgrade-event" role="listitem"><strong class="upgrade-date">April 2026</strong><strong>Move to 38.5.1</strong><span>Including PostgreSQL 11 → 15</span></div>
    <div class="upgrade-event" role="listitem"><strong class="upgrade-date">August 2026</strong><strong>Find and repair schema gaps</strong><span>In the running instance</span></div>
    <div class="upgrade-event" role="listitem"><strong class="upgrade-date">October 2026</strong><strong>Move to 41.4.0</strong><span>Then update site integrations</span></div>
  </div>
</figure>



---
layout: default
class: deck-v2 upgrade-flow
title: 'First Upgrade: 1.29.4 to 38.5.1'
---

<div class="upgrade-context"><strong>April 2026 · Rucio 1.29.4 / PG11</strong><span>Verified logical and cold-volume restores</span></div>
<div class="upgrade-phase">Rehearsal checkpoints for risk isolation · one staging catalogue</div>
<div class="upgrade-checkpoints" role="group" aria-label="Cumulative rehearsal, follow arrows from 1 to 6">
  <div class="upgrade-step upgrade-one"><strong>1 · 1.29.19</strong><span>Same-line patch: low-risk check<br>Keep PG11</span></div>
  <div class="upgrade-step upgrade-two"><strong>2 · 1.31.7</strong><span>Pre-32 compatibility: X509,<br>throttler and distances</span></div>
  <div class="upgrade-step upgrade-three"><strong>3 · PostgreSQL 11 → 15</strong><span>Dump/restore at Rucio 1.31.7<br>Test the DB change separately</span></div>
  <div class="upgrade-step upgrade-four"><strong>4 · 32.8.6</strong><span>Runtime / DB requirements:<br>Python ≥3.9; temporary tables</span></div>
  <div class="upgrade-step upgrade-five"><strong>5 · 35.8.2</strong><span>Intermediate LTS checkpoint<br>Reduce the final jump</span></div>
  <div class="upgrade-step upgrade-six"><strong>6 · 38.5.1 · Target LTS</strong><span>Adapt drivers, API and policy<br>for the target release</span></div>
</div>
<div class="upgrade-followthrough">
  <div class="upgrade-live"><strong>Live cutover · fresh live data, not staging</strong><span>Fresh 1.29.4 dump → new PG15 directory → start 38.5.1 directly</span><span>Mount/config fixes; upload/download passed</span><span>Old PG11 directory kept for rollback</span></div>
  <div class="upgrade-august"><strong>August follow-up</strong><span>Head marker, but 8 missing migrations</span><span>Check the schema; repair missing DDL explicitly</span></div>
</div>
<div class="upgrade-credit">AI assistance: GPT-5.4 (Codex CLI)</div>



---
layout: two-cols
class: deck-v2 october-ai-credit
ratio: 3:2
gap: 24px
title: 'Second Upgrade: 38.5.1 to 41.4.0'
---

::left::

<table class="evidence-table">
  <caption>October maintenance window</caption>
  <thead><tr><th>Step</th><th>What changed</th></tr></thead>
  <tbody>
    <tr><td>Freeze and restore</td><td>Stop application writers and account sync; restore the backup and compare selected catalogue counts.</td></tr>
    <tr><td>Migrate</td><td>Use Alembic from the 41.4.0 image: inspect current/head, preview SQL, apply three revisions and verify head.</td></tr>
    <tr><td>Restart</td><td>Start the API, then the daemons; check 41.4.0.</td></tr>
  </tbody>
</table>
<div class="october-credit">AI assistance: DeepSeek V4.1 Flash (OpenCode)</div>

::right::

<ul class="points">
  <li>In-place upgrade of the existing PostgreSQL 15 database after the August repair.</li>
  <li>38.5.1 CLI checks passed: whoami, upload, replica listing and download.</li>
  <li>FTS accepted a test submission; an unreachable destination prevented cross-site completion.</li>
  <li>Full production-load validation is still pending.</li>
</ul>



---
layout: default
class: deck-v2 portal-integration
title: Upgrading the Site Integration
---

<table class="evidence-table">
  <thead><tr><th>Component</th><th>Change</th><th>Result or remaining work</th></tr></thead>
  <tbody>
    <tr><td>Site policy</td><td>Allow &lt;42; forward session in permission checks.</td><td>Policy loads; upload and registration pass.</td></tr>
    <tr><td>HTTP</td><td>Use the renamed encoded-slash setting.</td><td>DIDs with / resolve again.</td></tr>
    <tr><td>IAM sync</td><td>Separate client: 35.4.0 → 41.4.0; repair scheduled sync.</td><td>Empty dry-run diff; clean scheduled runs.</td></tr>
    <tr><td>General client</td><td>CVMFS remains at 38.5.1.</td><td>Basic CLI checks pass with server 41.4.0.</td></tr>
    <tr><td>HERD rucioAPI</td><td>38.5.1: six tests passed after adaptation; bulk metadata uses a per-key fallback.</td><td>Wrapper validation on 41.4.0 is not recorded.</td></tr>
  </tbody>
</table>
<p>HERD uses its own data-management portal through the custom rucioAPI layer; Rucio WebUI is not needed.</p>



---
layout: default
title: News of Native Load Injection Tools
class: deck-v2 rucio-section-divider
---

<div class="chapter-nav-divider">
  <div class="chapter-nav-kicker">03 / 04</div>
  <div class="chapter-nav-title" role="heading" aria-level="1">News of Native Load Injection Tools</div>
  <div class="chapter-nav-track" aria-label="Report sections">
    <span>HERD Rucio Status and Operation</span>
    <span>Upgrades and Site Integration</span>
    <span class="chapter-nav-current" aria-current="step">News of Native Load Injection Tools</span>
    <span>Summary</span>
  </div>
</div>

---
layout: default
class: deck-v2 injector-origin
title: From the DC24 Script to Native Rucio
---

<p>Goal: native daemons + CLI for scheduled load between selected RSEs.</p>
<div class="injector-timeline" role="list" aria-label="Development timeline, from DC24 to October 2026">
  <div class="injector-event" role="listitem"><strong class="injector-date">DC24 · 2024</strong><strong>Mario’s Python script</strong><span>dc_inject.py worked well;<br>motivation for native Rucio.</span></div>
  <div class="injector-event" role="listitem"><strong class="injector-date">Late 2024</strong><strong class="injector-milestone">3 months</strong><span>Most functionality<br>implemented.</span></div>
  <div class="injector-event" role="listitem"><strong class="injector-date">2025</strong><strong>Finishing slows</strong><span>Limited time and energy<br>for refinements and tests.</span></div>
  <div class="injector-event" role="listitem"><strong class="injector-date">April–October 2026</strong><strong>AI-assisted finishing</strong><span>Refinements completed;<br>functional tests run.</span></div>
</div>
<p>Local, unmerged; broader integration testing and upstream review still open.</p>



---
layout: default
class: deck-v2 injector-design injector-cadence
title: From a Script to Native Daemons
---

<div class="inj-cadence-grid" role="group" aria-label="User-created DB plans and scanner-discovered DB candidates separately feed the resident submitter; no direct daemon RPC">
  <div class="inj-node"><strong>User creates plans</strong><span>CLI / REST / Python client</span></div>
  <div class="inj-link" aria-label="Store user plans in DB">→</div>
  <div class="inj-node inj-database"><strong>DB · Plans</strong><span>Pair, rate, interval, schedule</span></div>
  <div class="inj-link" aria-label="Submitter polls DB plans">→</div>
  <div class="inj-node inj-plan-worker"><strong>Submitter · resident</strong><span><b>Poll plans; wait until due</b><br>Use eligible candidates<br>Budget + live checks<br>Read DB usage<br>Write DB usage + plan state</span></div>
  <div class="inj-node"><strong>Scanner · resident ↻</strong><span>Periodic background scan<br>Refresh candidates; no rules</span></div>
  <div class="inj-link" aria-label="Scanner writes discovered candidates to DB">→</div>
  <div class="inj-node inj-database"><strong>DB · Candidates</strong><span>Unique RSE-pair datasets</span></div>
  <div class="inj-link" aria-label="Submitter reads scanner-discovered DB candidates">→</div>
</div>
<div class="inj-rule-path">Submitter creates <strong>Rucio rules → conveyor → FTS / storage</strong></div>
<table class="evidence-table inj-comparison">
  <thead><tr><th>Mario’s script</th><th>Native design</th></tr></thead>
  <tbody>
    <tr><td>Link threads</td><td>Scanner + submitter daemons</td></tr>
    <tr><td>CSV + per-pair history files</td><td>DB tables</td></tr>
    <tr><td>Rucio rules</td><td>Rucio rules</td></tr>
  </tbody>
</table>
<div class="inj-ai-note"><strong>2026 AI-assisted refinements:</strong> CLI / REST / migration completion.</div>



---
layout: default
class: deck-v2 injector-design injector-submitter
title: How the Submitter Executes a Plan
---

<p class="submitter-window">Run cycles between start_time and end_time, every interval.</p>
<table class="evidence-table submitter-parameters">
  <thead><tr><th>User plan parameters</th><th>Effect on dataset selection</th></tr></thead>
  <tbody>
    <tr><td>inject_rate (Mbps), interval (s), fudge</td><td><strong>B ≈ 125000 × inject_rate × interval × (1 + fudge) bytes</strong><br>Rule-creation budget, not a transfer-rate limit.</td></tr>
    <tr><td>Source/destination, big_first</td><td>Ordered-pair DB pool; largest first if true, smallest if false.</td></tr>
    <tr><td>rule_lifetime + expiration_delay</td><td>Cooldown; separately skip datasets tried in this cycle.</td></tr>
    <tr><td>max_injection</td><td>Total dataset bytes ≤ B × (1 + max_injection).<br>Allow whole-dataset overshoot; stop once B is met.</td></tr>
  </tbody>
</table>
<div class="inj-pair-flow submitter-execution" role="group" aria-label="Select datasets, apply the fixed live gate and size cap, then create one new rule per selected dataset">
  <div class="inj-node"><strong>Datasets · fixed live gate</strong><span>Source availability &gt;80%<br>and destination absent</span></div>
  <div class="inj-link" aria-hidden="true">→</div>
  <div class="inj-node"><strong>Fit → one new rule / dataset</strong><span>Source/destination + issuer<br>Lifetime: rule_lifetime</span></div>
  <div class="inj-link" aria-hidden="true">→</div>
  <div class="inj-node"><strong>Success → consume budget</strong><span>Persist DB usage + budget<br>Failure: attempt only; no charge</span></div>
</div>
<div class="inj-ai-note"><strong>2026 AI-assisted refinements:</strong> per-cycle attempts and usage bookkeeping.</div>



---
layout: default
class: deck-v2 injector-design
title: Multi-VO Plans and Controlled Execution
---

<div class="inj-vo-flow" role="group" aria-label="Different request VOs share daemons while keeping plan VO context">
  <div class="inj-node"><strong>Request VO A / B</strong><span>Resolve issuer<br>and RSEs in VO</span></div>
  <div class="inj-node"><strong>Validate same VO</strong><span>Issuer account +<br>both RSEs</span></div>
  <div class="inj-node"><strong>Current plans</strong><span>Save VO; history<br>archives VO too</span></div>
  <div class="inj-node"><strong>Shared daemons</strong><span>Current plans only;<br>retain each VO</span></div>
</div>
<div class="inj-explainer">API reads: both RSEs match VO. Candidates/Usage: RSE IDs + DID, no VO column.</div>
<table class="evidence-table inj-controls">
  <tbody>
    <tr><th scope="row">Plan cycles</th><td>Persist byte budget and remaining work per interval.<br>The budget is for rule creation, not measured throughput.</td></tr>
    <tr><th scope="row">Daemon stop</th><td>Stop processing; existing rules expire naturally.</td></tr>
    <tr><th scope="row">Explicit plan kill</th><td>Expire only generation-owned rules; stay KILLING until cleanup.<br>Not immediate cancellation of in-flight transfers.</td></tr>
    <tr><th scope="row">Generation checks</th><td>Check plan_id/state to avoid acting on stale plans.</td></tr>
  </tbody>
</table>
<div class="inj-explainer">VO-aware implementation; full multi-VO isolation validation remains open.</div>
<div class="inj-ai-note"><strong>2026 AI-assisted refinements:</strong> VO validation/filtering and plan lifecycle.</div>



---
layout: default
class: deck-v2 injector-review
title: Contribution Links and Remaining Work
---

<table class="evidence-table inj-contributions">
  <tbody>
    <tr><th scope="row"><a href="https://github.com/rucio/rucio/pull/8730">PR #8730 ↗</a></th><td><strong>Submitted, unmerged.</strong> The large PR waited for reviewers. As main advanced, merge conflicts developed and remained unresolved; the bot then closed it.</td></tr>
    <tr><th scope="row"><a href="https://github.com/rucio/rucio/issues/8593">Issue #8593 ↗</a></th><td><strong>Open.</strong> Design discussion and author progress update.</td></tr>
  </tbody>
</table>
<div class="inj-review-note">October local repairs have not been pushed to the PR.</div>
<table class="evidence-table inj-remaining">
  <thead><tr><th>Remaining work</th><th>Next steps</th></tr></thead>
  <tbody>
    <tr><th scope="row">Upstream path</th><td>Agree architecture, review units and acceptance criteria;<br>prepare an updated contribution and find reviewers.</td></tr>
    <tr><th scope="row">Validation</th><td>Complete integration/CI and multi-VO isolation checks;<br>TLS/security and sustained-load qualification remain open.</td></tr>
    <tr><th scope="row">Docs / deployment</th><td>Repository/API docs and deployment instructions;<br>daemon enablement still needs checking.</td></tr>
  </tbody>
</table>
<div class="inj-ai-note"><strong>2026 AI-assisted refinements:</strong> implementation refinements and focused testing.</div>



---
layout: default
class: deck-v2 rucio-section-divider
title: Summary
---

<div class="chapter-nav-divider">
  <div class="chapter-nav-kicker">04 / 04</div>
  <div class="chapter-nav-title" role="heading" aria-level="1">Summary</div>
  <div class="chapter-nav-track" aria-label="Report sections">
    <span>HERD Rucio Status and Operation</span>
    <span>Upgrades and Site Integration</span>
    <span>News of Native Load Injection Tools</span>
    <span class="chapter-nav-current" aria-current="step">Summary</span>
  </div>
</div>

---
layout: default
class: deck-v2
title: Summary
---

<ul class="points">
  <li>HERD is in trial operation on Rucio 41.4.0 (41 LTS).</li>
  <li>The upgrades required site-specific fixes and explicit schema checks.</li>
  <li>DCI-Agent now collects read-only evidence from four HERD-related services. Validating real-task links and adding controlled actions are next.</li>
  <li>Native load injection is implemented locally, with limited testing; broader integration and upstream review remain open.</li>
  <li>We welcome feedback on review scope and acceptance criteria.</li>
</ul>

<div class="summary-thanks">Thank you!</div>



---
layout: default
class: deck-v2 rucio-section-divider
title: Backup
appendixStart: true
---

<div class="chapter-nav-divider">
  <div class="chapter-nav-kicker">Appendix</div>
  <div class="chapter-nav-title" role="heading" aria-level="1">Backup</div>
</div>

---
layout: default
class: deck-v2
title: Backup — Daemon Timezone Case
---

<ul class="points">
  <li>An archived record from the <strong>38.5.1 deployment</strong> described an eight-hour mismatch between local-time writes and UTC selection.</li>
  <li>The recorded fix was to align the daemon timezone.</li>
  <li>This is a version- and deployment-specific historical case, not a general claim about current Rucio.</li>
</ul>



---
layout: default
class: deck-v2
title: Backup — Load Injector Evidence Scope
---

<table class="evidence-table">
  <caption>Selected test-suite evidence, not feature-test totals</caption>
  <thead><tr><th>Recorded scope</th><th>Result</th></tr></thead>
  <tbody>
    <tr><td>Selected tests/rucio suite, Python 3.10 / 3.11 / 3.12</td><td>439 passed per recorded run; 171 directly related boundary/daemon cases.</td></tr>
    <tr><td>Project validation matrix</td><td>8 of 19 items accepted or reused; 11 remained open—not a success rate.</td></tr>
  </tbody>
</table>
<p>Not evidence of end-to-end capacity or full production qualification.</p>



---
layout: default
class: deck-v2
title: Backup — Single FTS Transfer Record
---

<ul class="points">
  <li>A public project update recorded one 128 MiB FTS transfer and download check.</li>
  <li>The original logs are unavailable for this report, and the test did not verify TLS.</li>
  <li>This single functional record is not evidence of sustained throughput, capacity or security qualification.</li>
</ul>
<p class="source-note">Source: <a href="https://github.com/rucio/rucio/issues/8593#issuecomment-6273507666">Load Injector status update, 19 Oct 2026</a></p>

