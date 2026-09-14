---
theme: scholarly
layout: cover
title: FTS Status and Future Plan at IHEP
authors:
  - name: Xuantong Zhang
    email: zhangxuantong@ihep.ac.cn
    institution: Institute of High Energy Physics, Chinese Academy of Sciences
  - name: Xiaomei Zhang, Xiao Han
    institution: Institute of High Energy Physics, Chinese Academy of Sciences
footerMiddle: FTS-XRootD Workshop · 14–18 September 2026 · Lyon, France
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

# FTS Status and Future Plan at IHEP

<div class="cover-authors" aria-label="Authors">
  <div class="cover-author-line">
    <span class="author-name">Xuantong Zhang</span>
    <a class="cover-email-link" href="mailto:zhangxuantong@ihep.ac.cn" aria-label="Email Xuantong Zhang" title="Email Xuantong Zhang">
      <svg class="cover-email-icon" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="1.5" y="3.5" width="13" height="9" rx="1" />
        <path d="M2 4.5 8 9l6-4.5" />
      </svg>
    </a>
  </div>
  <div class="cover-author-line"><span class="author-name">Xiaomei Zhang, Xiao Han</span></div>
  <div class="author-institution">Institute of High Energy Physics, Chinese Academy of Sciences</div>
</div>


---
layout: default
class: deck-v2
title: Outline
---

<div class="outline-v2">
  <section>
    <h2>1. FTS Use Cases at IHEP</h2>
    <ul>
      <li>FTS Deployment and Instance</li>
      <li>FTS for JUNO Experiment</li>
      <li>FTS for HERD Experiment</li>
      <li>FTS Operation and Issues</li>
    </ul>
  </section>
  <section>
    <h2>2. FTS Monitoring Developed at IHEP</h2>
    <ul>
      <li>Monitoring System for FTS</li>
      <li>AI-Assisted Diagnostics for FTS</li>
    </ul>
  </section>
  <section>
    <h2>3. Data Challenge 27 Plans</h2>
    <ul>
      <li>Experience from DC24</li>
      <li>Plans for DC27</li>
    </ul>
  </section>
  <section>
    <h2>4. FTS4 Status</h2>
    <ul>
      <li>FTS4 Test Bed</li>
    </ul>
  </section>
  <section>
    <h2>5. Summary</h2>
  </section>
</div>

<style scoped>
.outline-v2 section + section { margin-top: 8px; }
.outline-v2 h2 { margin: 0 0 6px; font-size: 24px; font-weight: 700; line-height: 1.2; }
.outline-v2 ul { margin: 0; padding-left: 28px; list-style: disc; }
.outline-v2 li { margin: 0; line-height: 1.28; }
</style>


---
layout: section
class: deck-v2-section
title: FTS Use Cases at IHEP
---

# 1. FTS Use Cases at IHEP

---
layout: default
class: deck-v2
title: FTS Instance at IHEP
---

<div class="instance-v2-content">
<div class="instance-v2-top">
<table class="instance-v2-table">
  <caption>FTS Software Versions</caption>
  <thead><tr><th>Component</th><th>Version</th></tr></thead>
  <tbody>
    <tr><td>fts-server</td><td>3.14.5</td></tr>
    <tr><td>fts-optimizer</td><td>3.14.5</td></tr>
    <tr><td>fts-qos</td><td>3.14.5</td></tr>
    <tr><td>fts-token</td><td>3.14.5</td></tr>
    <tr><td>ftstokenhousekeeperd</td><td>3.14.5</td></tr>
    <tr><td>fts-activemq</td><td>3.14.5</td></tr>
    <tr><td>FTS REST / Web monitoring</td><td>3.14.3</td></tr>
    <tr><td>GFAL2</td><td>2.23.5</td></tr>
  </tbody>
</table>

<div class="instance-v2-description">
  <ul class="points">
    <li>A dedicated FTS3 instance; RPM deployment.<br><a href="https://fts3.ihep.ac.cn:8449">https://fts3.ihep.ac.cn:8449</a></li>
    <li>Supports JUNO (primary user), HERD and CEPC.</li>
    <li>Production uses VOMS proxies; JWT-based transfers are supported but used only for testing.</li>
  </ul>
</div>
</div>

<figure class="instance-v2-serves" aria-label="FTS serves JUNO, HERD and CEPC">
  <img class="fts-mark" src="/logos/fts.png" alt="FTS" width="180" height="80">
  <svg viewBox="0 0 110 80" width="110" height="80" aria-label="serves">
    <text x="55" y="24" text-anchor="middle">serves</text>
    <path d="M4 48 H102 M91 39 L102 48 L91 57" fill="none" stroke="currentColor" stroke-width="2.5" />
  </svg>
  <div class="instance-v2-experiments">
    <img class="juno-mark" src="/logos/juno.jpg" alt="JUNO" width="100" height="84">
    <img class="herd-mark" src="/logos/herd-iam.png" alt="HERD" width="120" height="82">
    <img class="cepc-mark" src="/logos/cepc.png" alt="CEPC" width="140" height="82">
  </div>
</figure>
</div>

<style scoped>
.instance-v2-top { display: grid; grid-template-columns: 3fr 2fr; gap: 24px; align-items: start; }
.instance-v2-table { width: 100%; margin: 0; table-layout: fixed; border-collapse: collapse; }
.instance-v2-table th:first-child { width: 64%; }
.instance-v2-table th, .instance-v2-table td { padding: 2px 8px; text-align: left; vertical-align: middle; border-bottom: 1px solid #cbd5e1; }
.instance-v2-table th { padding-top: 3px; padding-bottom: 3px; font-weight: 700; border-top: 2px solid #1e3a5f; border-bottom: 2px solid #1e3a5f; }
.instance-v2-description .points li + li { margin-top: 12px; }
.instance-v2-description a { color: #1e3a5f; }
.instance-v2-serves { display: grid; grid-template-columns: 180px 110px auto; gap: 20px; align-items: center; width: max-content; max-width: 100%; height: 84px; margin: 36px auto 0; }
.instance-v2-serves img { display: block; object-fit: contain; max-width: 100%; }
.instance-v2-serves .herd-mark { width: 120px; height: 82px; }
.instance-v2-serves svg { color: #1e3a5f; }
.instance-v2-serves text { fill: currentColor; font-family: Arimo, Arial, sans-serif; font-size: 20px; }
.instance-v2-experiments { display: flex; align-items: center; justify-content: center; gap: 20px; min-width: 0; }
</style>


---
layout: two-cols
class: deck-v2
ratio: 3:2
gap: 24px
title: JUNO Experiment with FTS
---

::left::

<figure class="juno-v2-map">
   <a href="./maps/juno-fts-network.svg" target="_blank" rel="noopener" aria-label="Open the full-size JUNO transfer map" title="Open full-size map; zoom to inspect labels">
   <img src="/maps/juno-fts-network.svg" alt="The JUNO Experiment Site in Jiangmen sends raw data to IHEP in Beijing; IHEP, JINR in Dubna, CC-IN2P3 in Lyon and CNAF in Bologna are connected by bidirectional FTS transfers." width="760" height="510">
  </a>
  <div class="juno-storage">
    <strong>Stored Data: ~37.9 PB (Including Replicas)</strong>
    <span>Disk 20.2 PB · Tape 17.7 PB · 14 Sep 2026</span>
  </div>
</figure>

::right::

<div class="juno-v2-text">
  <p>The Jiangmen Underground Neutrino Observatory (JUNO) is a multipurpose neutrino observatory with a broad physics program.</p>
  <ul class="points">
    <li><strong>Raw data</strong> go from Jiangmen to IHEP, then through FTS to JINR, <span class="juno-v2-name">CC-IN2P3</span> and CNAF.</li>
    <li>FTS distributes experiment data, such as <strong>reconstruction and analysis products</strong>, across all four computing sites.</li>
    <li>JUNO's FTS jobs are submitted and managed by <strong>DIRAC</strong>.</li>
  </ul>
</div>

<style scoped>
.juno-v2-map { width: 100%; margin: 0; }
.juno-v2-map a { display: block; border: 0; }
.juno-v2-map img { width: 100%; height: auto; display: block; object-fit: contain; }
.juno-v2-text > p { margin: 0 0 16px; color: #4b5563; }
.juno-v2-text .points li + li { margin-top: 12px; }
.juno-v2-name { white-space: nowrap; }
.juno-storage { display: flex; flex-direction: column; align-items: center; margin-top: 12px; padding-top: 8px; border-top: 1px solid var(--c-rule); text-align: center; }
.juno-storage strong { font-size: 18px; line-height: 1.3; }
.juno-storage span { margin-top: 4px; font-size: 14px; line-height: 1.25; color: var(--c-ink-muted); }
</style>


---
layout: default
class: deck-v2
title: JUNO FTS Operations in 2026
---

<div class="juno-ops">
  <div class="juno-ops-plots">
    <p class="juno-ops-period">FTS Transfer Status At IHEP This Year</p>
    <figure>
      <a href="./juno-2026-throughput.png" target="_blank" rel="noopener" aria-label="Open full-size FTS throughput panel">
        <img src="/juno-2026-throughput.png" alt="Grafana daily JUNO throughput: a sustained baseline with production peaks, reaching about 3.6 GB/s in May; gaps denote days without recorded transfers." width="1280" height="440">
      </a>
    </figure>
    <figure>
      <a href="./juno-2026-retry-success.png" target="_blank" rel="noopener" aria-label="Open full-size FTS retry success panel">
        <img src="/juno-2026-retry-success.png" alt="Grafana daily JUNO success rate with up to three retries: generally high, with temporary drops and subsequent recoveries. Gaps denote days without recorded outcomes." width="1280" height="440">
      </a>
    </figure>
  </div>
  <div class="juno-ops-summary">
    <table class="evidence-table">
      <caption>JUNO Transfers This Year</caption>
      <thead><tr><th>Metric</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>Per-Attempt Success</td><td>81.56%</td></tr>
        <tr><td>Success (≤3 Retries)</td><td>97.38%</td></tr>
        <tr><td>Data Transferred</td><td>11.65 PB</td></tr>
        <tr><td>Files Transferred</td><td>6,333,642</td></tr>
      </tbody>
    </table>
    <ul class="points">
      <li>Steady <strong>raw-data traffic</strong>, with peaks from periodic bulk production.</li>
      <li>FTS is generally reliable: stable raw-data transfers and high success rates after tuning during bursts.</li>
    </ul>
  </div>
</div>

<style scoped>
.juno-ops-period { margin: 0; font-size: 14px; line-height: 1.25; color: var(--c-ink-muted); }
.juno-ops { display: grid; grid-template-columns: 3fr 2fr; gap: 24px; align-items: start; }
.juno-ops-plots { display: grid; gap: 12px; min-width: 0; }
.juno-ops-plots figure { margin: 0; }
.juno-ops-plots a { display: block; border: 0; }
.juno-ops-plots img { display: block; width: 100%; height: auto; }
.juno-ops-summary { min-width: 0; }
.juno-ops-summary table { margin: 0; }
.juno-ops-summary th, .juno-ops-summary td { padding: 4px 8px; }
.juno-ops-summary td:first-child { font-weight: 400; }
.juno-ops-summary td:last-child { white-space: nowrap; font-variant-numeric: tabular-nums; }
.juno-ops-summary .points { margin-top: 16px; }
.juno-ops-summary .points li + li { margin-top: 12px; }
</style>


---
layout: two-cols
class: deck-v2
ratio: 3:2
gap: 24px
title: HERD Experiment with FTS
---

::left::

<figure class="herd-v2-map">
   <a href="./maps/herd-fts-network.svg" target="_blank" rel="noopener" aria-label="Open full-size HERD data-flow diagram">
    <img src="/maps/herd-fts-network.svg" alt="CERN sends Beam Test Data to IHEP. A dashed planned raw-data path leads from the Chinese Space Station to IHEP; HERD deployment is planned for 2029." width="760" height="570">
  </a>
</figure>

::right::

<div class="herd-v2-text">
  <p>HERD is a space-based high-energy cosmic-ray observatory for dark matter searches, precision cosmic-ray measurements, and all-sky gamma-ray surveys.</p>
  <ul class="points">
    <li>Planned for <strong>2029</strong>; FTS currently handles <strong>CERN → IHEP beam-test data</strong>.</li>
    <li>Future FTS use: raw-data distribution from IHEP to <strong>Chinese and European partners</strong>, plus production transfers.</li>
    <li><strong>Rucio</strong> submits and manages HERD's FTS jobs.</li>
    <li>FTS total to date: <strong>778 GB</strong> in <strong>1,563 files</strong>.</li>
  </ul>
</div>

<style scoped>
.herd-v2-map { margin: 0; }
.herd-v2-map a { display: block; border: 0; }
.herd-v2-map img { display: block; width: 100%; height: auto; }
.herd-v2-text > p { margin: 0 0 16px; color: var(--c-ink-muted); }
.herd-v2-text .points li + li { margin-top: 12px; }
</style>


---
layout: default
class: deck-v2
title: FTS Operation Issues
---

<section class="operation-issue">
  <p class="operation-intro">Here we share issues encountered at IHEP and the workarounds we used.</p>
  <h2>Issue 1: Multihop Transfers With DIRAC</h2>
  <ul class="points">
    <li><strong>Background:</strong> poor IHEP–JINR connectivity (Sep 2025–Mar 2026) led us to relay transfers via CNAF.</li>
    <li><strong>DIRAC Multihop:</strong> <strong>IHEP → CNAF → JINR</strong> in one FTS job; hop 2 starts only after hop 1 succeeds.</li>
    <li><strong>Collision:</strong> concurrent CNAF and JINR replicas competed to write the <strong>same CNAF file</strong>, causing failures.</li>
    <li><strong>Workaround:</strong> use a <strong>dedicated relay directory</strong>; the leftover temporary files still need <strong>manual cleanup</strong>.</li>
    <li><strong>Request To FTS Dev Team (Alternatives):</strong>
      <ul class="multihop-options">
        <li><strong>A:</strong> If a multihop intermediate is also a normal transfer's destination, could the jobs share that transfer?</li>
        <li><strong>OR B:</strong> With a dedicated relay directory, could a switch delete the intermediate file after hop 2 succeeds?</li>
      </ul>
    </li>
  </ul>
  <p class="operation-followup"><strong>DIRAC Follow-Up:</strong> after hop 1 failed, downstream files stayed <strong>NOT_USED</strong> and were missed by DIRAC retries. Reported to DIRAC for a fix; not an FTS issue.</p>
</section>

<style scoped>
.operation-intro { margin: 0 0 12px; color: var(--c-ink-muted); }
.operation-issue h2 { margin: 0 0 12px; font-size: 24px; font-weight: 700; line-height: 1.2; }
.operation-issue .points li + li { margin-top: 8px; }
.operation-followup { margin: 12px 0 0; padding-top: 8px; border-top: 1px solid var(--c-rule); }
.operation-issue .multihop-options { margin: 4px 0 0; padding-left: 20px; list-style: none; }
.operation-issue .multihop-options li + li { margin-top: 4px; }
</style>


---
layout: default
class: deck-v2
title: FTS Operation Issues
---

<section class="concurrency-issue">
  <h2>Issue 2: Concurrency Control During Transfer Bursts</h2>
  <p>JUNO production is batch-based: <strong>tens of thousands of transfers</strong>, typically <strong>~200 MB per file</strong>. We cap concurrency to protect storage.</p>
  <table class="evidence-table concurrency-controls">
    <caption>Concurrency Controls</caption>
    <thead><tr><th>Level</th><th>Configuration</th><th>Concurrency Limit</th></tr></thead>
    <tbody>
      <tr><td>FTS Host</td><td>fts3config<br><strong>MaxUrlCopyProcesses</strong></td><td>Total url-copy processes per host</td></tr>
      <tr><td>Storage (SE)</td><td>Config UI: Storage Configuration</td><td>Separate inbound / outbound limits</td></tr>
      <tr><td>Link (SE Pair)</td><td>Config UI: Link Configuration</td><td>Active transfers for one SE pair</td></tr>
    </tbody>
  </table>
  <ul class="points">
    <li><strong>Operational Cost:</strong> the limits work well. To favour <strong>IHEP → CNAF</strong>, we raise its cap and lower the IHEP → IN2P3/JINR caps.</li>
    <li><strong>Question To FTS Dev Team:</strong> could each destination get a <strong>configurable percentage of a source SE's outbound transfer slots</strong>?</li>
  </ul>
</section>

<style scoped>
.concurrency-issue h2 { margin: 0 0 12px; font-size: 24px; font-weight: 700; line-height: 1.2; }
.concurrency-issue > p { margin: 0 0 12px; color: var(--c-ink-muted); }
.concurrency-controls { margin: 0; table-layout: fixed; }
.concurrency-controls th:first-child { width: 18%; }
.concurrency-controls th:nth-child(2) { width: 40%; }
.concurrency-controls th, .concurrency-controls td { padding: 4px 8px; vertical-align: middle; }
.concurrency-issue .points { margin-top: 16px; }
.concurrency-issue .points li + li { margin-top: 12px; }
</style>


---
layout: section
class: deck-v2-section
title: FTS Monitoring Developed at IHEP
---

# 2. FTS Monitoring Developed at IHEP

---
layout: two-cols
class: deck-v2
ratio: 1:1
gap: 24px
title: FTS Transfer Monitoring System at IHEP
---

::left::

<figure class="monitor-figure" aria-label="FTS monitoring event flow from FTS3 through ActiveMQ and MonPipe to Elasticsearch and Grafana">
  <figcaption>FTS Monitoring Flow</figcaption>
  <div class="monitor-chain">
    <div class="monitor-stage" data-stage="FTS3"><img src="/logos/fts-monitoring.png" alt="FTS" width="36" height="36"><strong>FTS3</strong><span>fts-activemq Publisher</span></div>
    <span class="monitor-arrow" aria-hidden="true">↓</span>
    <div class="monitor-stage" data-stage="ActiveMQ"><img src="/logos/activemq-mark.png" alt="ActiveMQ" width="36" height="36"><strong>ActiveMQ</strong><span>DCI Container · Topics</span></div>
    <span class="monitor-arrow" aria-hidden="true">↓</span>
    <div class="monitor-stage" data-stage="MonPipe"><img src="/logos/monpipe-code.svg" alt="In-house development" width="36" height="36"><strong>MonPipe</strong><span>IHEP-Developed STOMP Consumer</span></div>
    <span class="monitor-arrow" aria-hidden="true">↓</span>
    <div class="monitor-stage" data-stage="Elasticsearch"><img src="/logos/elasticsearch.svg" alt="Elasticsearch" width="36" height="36"><strong>Elasticsearch</strong><span>Computing Center Shared Service</span></div>
    <span class="monitor-arrow" aria-hidden="true">↓</span>
    <div class="monitor-stage" data-stage="Grafana"><img src="/logos/grafana.svg" alt="Grafana" width="36" height="36"><strong>Grafana</strong><span>IHEP-Designed Dashboards</span></div>
  </div>
</figure>

::right::

<ul class="points monitoring-points">
  <li>FTS publishes to ActiveMQ <strong>topics</strong> so multiple consumers can receive the events. We would like <strong>CERN FTS monitoring</strong> to retain a copy too.</li>
  <li>ActiveMQ, MonPipe and Grafana are <strong>DCI-managed containers</strong>. Elasticsearch is a <strong>shared IHEP Computing Center service</strong>.</li>
  <li>Ruby dependency compatibility issues with Logstash prompted us to develop <strong>MonPipe</strong>, a Python STOMP consumer with flexible processing and simpler configuration.</li>
  <li>MonPipe adds <strong>directory-based workload tags</strong> to completion records.</li>
  <li>We build our own <strong>Grafana dashboards</strong>, rather than use CERN's, to show the metrics most relevant to our operations.</li>
</ul>

<style scoped>
.monitor-figure { margin: 0; }
.monitor-figure figcaption { margin-bottom: 12px; text-align: center; font-size: 14px; line-height: 1.25; color: var(--c-ink-muted); }
.monitor-chain { display: flex; flex-direction: column; align-items: center; border: 1px solid #d5dee7; padding: 12px 16px; }
.monitor-stage { display: grid; grid-template-columns: 36px minmax(0, 1fr); column-gap: 12px; align-items: center; width: 340px; max-width: 100%; padding: 4px 12px; border: 1px solid var(--c-rule); text-align: left; }
.monitor-stage img { grid-row: 1 / 3; width: 36px; height: 36px; object-fit: contain; }
.monitor-stage strong { font-size: 18px; line-height: 1.3; color: var(--c-blue); }
.monitor-stage span { font-size: 14px; line-height: 1.25; color: var(--c-ink-muted); }
.monitor-arrow { font-size: 20px; line-height: 18px; color: var(--c-blue); }
.monitoring-points li + li { margin-top: 12px; }
</style>


---
layout: two-cols
class: deck-v2
ratio: 2:1
gap: 24px
title: FTS Transfer Monitoring
---

::left::

<figure class="dashboard-figure">
  <figcaption>Dashboard For Admins</figcaption>
    <a href="./dashboard-admin.png" target="_blank" rel="noopener" aria-label="Open full-size Admin FTS3 Transfer Monitoring screenshot">
    <img src="/dashboard-admin.png" alt="Admin FTS3 Transfer Monitoring: standard filters and vo_sub_type equals juno-raw, success-rate gauges, transferred volume and file counts, and a throughput time series." width="2512" height="1550">
  </a>
</figure>

::right::

<ul class="points dashboard-points">
  <li>An overview of FTS transfers for a <strong>selected VO</strong>, with filters for sites, endpoints and protocols.</li>
  <li>Shows <strong>success rates, transferred volume and file counts</strong>, with time-dependent views of transfer performance.</li>
  <li>Directory-derived tags from MonPipe let us filter by <strong>data type or workload</strong>, such as raw data and re-production.</li>
</ul>


---
layout: two-cols
class: deck-v2
ratio: 2:1
gap: 24px
title: Raw Data Transfer Monitoring
---

::left::

<figure class="dashboard-figure">
  <figcaption>Dashboard For Shifters</figcaption>
    <a href="./dashboard-shift.png" target="_blank" rel="noopener" aria-label="Open full-size Shift Dashboard Raw Data Transfer screenshot">
    <img src="/dashboard-shift.png" alt="Shift Dashboard Raw Data Transfer section: FTS throughput, efficiency, active transfers, connections by link and transferred volume." width="2324" height="1356">
  </a>
</figure>

::right::

<ul class="points dashboard-points">
  <li>Designed for <strong>experiment shifters</strong>, with a focus on raw-data transfer performance.</li>
  <li>Alongside volume and performance trends, it shows the latest <strong>active transfers and FTS connections by link</strong>.</li>
  <li>The same dashboard's <strong>Server Resource Summary</strong> adds host load, filesystem usage and disk I/O for source-side checks.</li>
</ul>


---
layout: two-cols
class: deck-v2
ratio: 1:1
gap: 24px
title: AI-Assisted Diagnostics System
---

::left::

<figure class="ai-figure" aria-label="DCI-Agent cross-system diagnosis: collect evidence, diagnose with agents, obtain human decisions, and reuse approved knowledge">
  <figcaption>DCI-Agent Diagnosis Flow</figcaption>
  <div class="ai-diagram">
    <div class="ai-systems" aria-label="Systems in diagnostic context">
      dciTransfer / Workflows · DIRAC<br>
      <strong>FTS3</strong> · VOMS / IAM<br>
      MySQL · Elasticsearch · EOS / SEs · CEs
    </div>
    <div class="ai-workflow">
      <svg class="ai-feedback" viewBox="0 0 40 262" role="img" aria-label="Approved knowledge informs subsequent diagnoses">
        <defs><marker id="ai-knowledge-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#245b91"/></marker></defs>
        <path data-from="learn" data-to="diagnose" d="M40 236H10V96H36" fill="none" stroke="#245b91" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ai-knowledge-arrow)"/>
      </svg>
      <div class="ai-step" data-step="collect"><strong>Information Collection</strong><span>Cross-System Logs And Context</span></div>
      <span class="ai-down" aria-hidden="true">↓</span>
      <div class="ai-step" data-step="diagnose"><strong>Multi-Agent Diagnosis</strong><span>LLMs + Accumulated Knowledge</span></div>
      <span class="ai-down" aria-hidden="true">↓</span>
      <div class="ai-step" data-step="review"><strong>Human Review</strong><span>Validate RCA · Decide Repairs</span></div>
      <span class="ai-down" aria-hidden="true">↓</span>
      <div class="ai-step" data-step="learn"><strong>Knowledge Accumulation</strong><span>Approved Cases → Agent Skills</span></div>
    </div>
  </div>
</figure>

::right::

<p class="ai-intro"><strong>DCI-Agent</strong> is our in-house AI system for diagnosing distributed computing problems across systems and sites.</p>
<ul class="points ai-points">
  <li>For an <strong>FTS incident</strong>, collect relevant logs across upstream and downstream services for a joint LLM diagnosis.</li>
  <li><strong>Multiple agents</strong> combine cross-system evidence with accumulated service knowledge to identify likely root causes.</li>
  <li><strong>Humans decide:</strong> validate the diagnosis and choose whether to execute the proposed repairs.</li>
  <li>Accepted cases become <strong>shared knowledge and agent skills</strong>, helping diagnose similar transfer issues next time.</li>
</ul>

<style scoped>
.ai-figure { margin: 0; }
.ai-figure figcaption { margin-bottom: 12px; text-align: center; font-size: 14px; line-height: 1.25; color: var(--c-ink-muted); }
.ai-diagram { border: 1px solid #d5dee7; padding: 12px; }
.ai-systems { margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--c-rule); font-size: 18px; line-height: 1.3; text-align: center; }
.ai-systems strong { color: var(--c-blue); font-weight: 700; }
.ai-workflow { position: relative; padding-left: 40px; }
.ai-feedback { position: absolute; top: 0; left: 0; width: 40px; height: 262px; }
.ai-step { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 52px; padding: 4px 8px; border: 1px solid var(--c-rule); text-align: center; }
.ai-step strong { font-size: 18px; line-height: 1.3; color: var(--c-blue); }
.ai-step span { font-size: 14px; line-height: 1.25; color: var(--c-ink-muted); }
.ai-down { display: block; height: 18px; font-size: 20px; line-height: 18px; text-align: center; color: var(--c-blue); }
.ai-intro { margin: 0 0 16px; color: var(--c-ink-muted); }
.ai-points li + li { margin-top: 12px; }
</style>


---
layout: two-cols
class: deck-v2
ratio: 3:2
gap: 24px
title: 'A Real Case: AI-Assisted Diagnostics For FTS'
---

::left::

<table class="evidence-table fts-case-table">
  <caption>JUNO Production Transfer Case</caption>
  <thead><tr><th>Step</th><th>Finding</th></tr></thead>
  <tbody>
    <tr><td>Symptom</td><td>Widespread FTS failures during a JUNO production campaign.</td></tr>
    <tr><td>AI Analysis</td><td>Connection/authentication dominated the stage timings; <strong>IHEP EOS</strong> was suspected.</td></tr>
    <tr><td>Human Check</td><td>An <strong>OpenSSL library version issue</strong> was identified on the EOS side.</td></tr>
    <tr><td>Fix / Outcome</td><td>Upgrading the OpenSSL library used by EOS restored transfers.</td></tr>
  </tbody>
</table>

::right::

<p class="fts-case-intro">Earlier in 2026, a JUNO production campaign saw widespread FTS failures. This case shows how <strong>DCI-Agent</strong> helped narrow the cause.</p>
<ul class="points fts-case-points">
  <li>AI pointed to <strong>EOS connection/authentication</strong>, but did not identify the exact OpenSSL issue.</li>
  <li>Even with <strong>incomplete evidence</strong>, FTS stage timings narrowed the search for operators.</li>
  <li>Richer logs and this reviewed case <strong>could shorten future investigations</strong>.</li>
</ul>

<style scoped>
.fts-case-table { margin: 0; table-layout: fixed; }
.fts-case-table th:first-child { width: 28%; }
.fts-case-table th, .fts-case-table td { padding: 8px 10px; vertical-align: top; }
.fts-case-intro { margin: 0 0 12px; color: var(--c-ink-muted); }
.fts-case-points li + li { margin-top: 12px; }
</style>


---
layout: section
class: deck-v2-section
title: Data Challenge 27 Plans
---

# 3. Data Challenge 27 Plans

---
layout: two-cols
class: deck-v2
ratio: 3:2
gap: 24px
title: Lessons From DC24
---

::left::

<table class="evidence-table dc24-setup">
  <caption>DC24 Test Setup</caption>
  <thead><tr><th>Item</th><th>Approach</th></tr></thead>
  <tbody>
    <tr><td>Load Injector</td><td>In-house tool using the FTS REST API</td></tr>
    <tr><td>Test Data</td><td>Synthetic files, <strong>500 MB–5 GB</strong></td></tr>
    <tr><td>Transfer Setup</td><td><strong>VOMS proxies</strong>; transfers between disk SEs</td></tr>
    <tr><td>Hourly Injection</td><td>Example budgets: <strong>~0.45 / 0.9 / 1.8 TB/h</strong></td></tr>
  </tbody>
</table>

::right::

<ul class="points dc24-points">
  <li>Our <strong>in-house load injector</strong> drove the JUNO challenge alongside DC24, with configurable volume and injection intervals.</li>
  <li>Tests on the upgraded <strong>IHEP–CNAF/IN2P3</strong> paths met the transfer rates JUNO expected at the time.</li>
  <li><strong>Not Tested In DC24:</strong>
    <ul class="dc24-missing-tests">
      <li>IAM/JWT authentication</li>
      <li>Real experimental data</li>
      <li>DIRAC-driven FTS workflows</li>
    </ul>
  </li>
</ul>

<style scoped>
.dc24-setup { margin: 0; table-layout: fixed; }
.dc24-setup th:first-child { width: 28%; }
.dc24-setup th, .dc24-setup td { padding: 8px 10px; vertical-align: top; }
.dc24-points li + li { margin-top: 16px; }
.dc24-points .dc24-missing-tests { margin: 4px 0 0; padding-left: 20px; list-style: circle; }
.dc24-points .dc24-missing-tests li + li { margin-top: 4px; }
</style>


---
layout: two-cols
class: deck-v2
ratio: 3:2
gap: 24px
title: DC27 Network Targets
---

::left::

<table class="evidence-table dc27-network-table">
  <caption>Candidate Routes And Targets</caption>
  <thead><tr><th>Item</th><th>Starting Point</th></tr></thead>
  <tbody>
    <tr><td>CNAF / IN2P3</td><td>LHCONE</td></tr>
    <tr><td>JINR</td><td>LHCOPN / Separate VLAN</td></tr>
    <tr><td>One-Way Load</td><td><strong>~20 Gbps</strong><br>Extreme: <strong>≥40 Gbps</strong> (2×+)</td></tr>
    <tr><td>Aggregate Load</td><td><strong>~40 Gbps</strong><br>Extreme: <strong>≥80 Gbps</strong> (2×+)</td></tr>
    <tr><td>Test Window</td><td>Baseline: <strong>~2 Weeks</strong><br>Extreme: <strong>1–2 Days</strong><br>Short Sessions Only</td></tr>
  </tbody>
</table>

::right::

<ul class="points dc27-network-points">
  <li>Refine sustained targets from <strong>real transfer volumes</strong>, using <strong>3–4× normal bandwidth</strong>. Extreme tests aim for ≥2× those targets, subject to capacity.</li>
  <li>Use an early <strong>pre-challenge</strong> to validate route choices. Test individual channels first, then aggregate traffic.</li>
  <li>Reserve <strong>short peak sessions within a 1–2-day window</strong>, while production continues.</li>
</ul>

<style scoped>
.dc27-network-table { margin: 0; table-layout: fixed; }
.dc27-network-table th:first-child { width: 34%; }
.dc27-network-table th, .dc27-network-table td { padding: 8px 10px; vertical-align: top; }
.dc27-network-points li + li { margin-top: 16px; }
</style>


---
layout: two-cols
class: deck-v2
ratio: 3:2
gap: 24px
title: DC27 Storage And Dataset Targets
---

::left::

<figure class="dc27-tape-figure" aria-label="Planned tape recall to a local disk buffer followed by an FTS transfer to a remote tape-site disk buffer">
  <figcaption>Tape Recall And Cross-Site Transfer</figcaption>
  <div class="dc27-tape-flow">
    <div class="dc27-tape-stage" data-tape-step="source-tape"><strong>Source Tape</strong><span>Source Tape Site</span></div>
    <div class="dc27-tape-arrow"><span>Recall</span><span aria-hidden="true">↓</span></div>
    <div class="dc27-tape-stage" data-tape-step="local-buffer"><strong>Local Disk Buffer</strong><span>Source Tape Site</span></div>
    <div class="dc27-tape-arrow"><span>FTS Transfer · JWT</span><span aria-hidden="true">↓</span></div>
    <div class="dc27-tape-stage" data-tape-step="remote-buffer"><strong>Remote Disk Buffer</strong><span>Destination Tape Site</span></div>
  </div>
</figure>

::right::

<ul class="points dc27-storage-points">
  <li>Use <strong>recent real reproduction datasets</strong> with <strong>DIRAC → FTS</strong> submission; include RAW-data tests.</li>
  <li>Test <strong>IAM/JWT authentication</strong> as part of the end-to-end workflow, not only VOMS proxies.</li>
  <li>Cover <strong>every storage instance</strong> via separate URLs, prioritising production storage and checking buffer space.</li>
  <li>Test <strong>tape recall and cross-site buffer transfers</strong>, with short peak sessions in the selected 1–2-day window while production continues.</li>
</ul>

<style scoped>
.dc27-tape-figure { margin: 0; }
.dc27-tape-figure figcaption { margin-bottom: 12px; text-align: center; font-size: 14px; line-height: 1.25; color: var(--c-ink-muted); }
.dc27-tape-flow { display: flex; flex-direction: column; align-items: center; padding: 16px; border: 1px solid #d5dee7; }
.dc27-tape-stage { display: flex; flex-direction: column; align-items: center; width: 320px; max-width: 100%; padding: 12px; border: 1px solid var(--c-rule); text-align: center; }
.dc27-tape-stage strong { font-size: 18px; line-height: 1.3; color: var(--c-blue); }
.dc27-tape-stage span { font-size: 14px; line-height: 1.25; color: var(--c-ink-muted); }
.dc27-tape-arrow { display: flex; flex-direction: column; align-items: center; padding: 4px 0; color: var(--c-blue); }
.dc27-tape-arrow span:first-child { font-size: 14px; line-height: 18px; }
.dc27-tape-arrow span:last-child { font-size: 20px; line-height: 20px; }
.dc27-storage-points li + li { margin-top: 12px; }
</style>


---
layout: section
class: deck-v2-section
title: FTS4 Status
---

# 4. FTS4 Status

---
layout: two-cols
class: deck-v2
ratio: 3:2
gap: 24px
title: FTS4 Test Bed
---

::left::

<table class="evidence-table fts4-validation">
  <caption>Initial Validation</caption>
  <thead><tr><th>Check</th><th>Result</th></tr></thead>
  <tbody>
    <tr><td>REST / Web UI</td><td>Available; HTTP 200 verified</td></tr>
    <tr><td>VOMS Proxy</td><td><strong>FINISHED · 50 MiB</strong><br>IHEP EOS → IHEP EOS</td></tr>
    <tr><td>JUNO IAM JWT</td><td><strong>FINISHED · 50 MiB</strong><br>CNAF → IN2P3<br>Unmanaged tokens</td></tr>
  </tbody>
</table>

::right::

<ul class="points fts4-points">
  <li>A dedicated test bed runs <strong>FTS4 4.0.0 development RPMs</strong> on AlmaLinux 9 with <strong>PostgreSQL 16</strong>.</li>
  <li><strong>Functional validation only:</strong> these small transfers do not establish throughput, scale or production readiness.</li>
  <li><strong>Remaining work:</strong> endpoint-specific token compatibility, managed-token renewal/exchange, scale/tape tests and production security hardening.</li>
</ul>

<style scoped>
.fts4-validation { margin: 0; table-layout: fixed; }
.fts4-validation th:first-child { width: 30%; }
.fts4-validation th, .fts4-validation td { padding: 8px 10px; vertical-align: top; }
.fts4-points li + li { margin-top: 16px; }
</style>


---
layout: default
class: deck-v2
title: Summary
---

<ul class="points report-summary">
  <li><strong>FTS3 operations:</strong> support JUNO production and HERD beam tests; safer multihop handling and simpler destination prioritisation are operational priorities.</li>
  <li><strong>FTS monitoring:</strong> track transfer performance, support cross-system diagnosis and reuse human-reviewed knowledge.</li>
  <li><strong>DC27:</strong> test what DC24 did not cover: real data, DIRAC and JWT. Add tape workflows and short peak sessions while production continues.</li>
  <li><strong>FTS4:</strong> initial VOMS and JWT transfer checks have succeeded; broader interoperability and readiness validation comes next.</li>
</ul>
<h2 class="summary-thanks">Thank You!</h2>

<style scoped>
.report-summary { padding-top: 16px; }
.report-summary li + li { margin-top: 24px; }
</style>
