---
colorSchema: light
color: orange-light
theme: neversink
title: DCI Operations with AI — Plenary Summary
mdc: true
---

<div style="padding: 0.1rem 0.5rem;">

<div style="border-bottom: 3px solid #ea580c; padding-bottom: 0.3rem;">
<div style="font-size: 1.45rem; font-weight: 800; line-height: 1.1;">DCI Deployment & Operations with AI</div>
<div class="muted" style="font-size: 0.8rem; margin-top: 0.1rem;">Computing & Software Session · plenary summary · Xuantong Zhang (IHEP)</div>
</div>

<div style="font-size: 1.05rem; font-weight: 700; margin: 0.45rem 0 0.35rem; color: #ea580c;">
An AI agent assists DCI operations — it advises, humans decide.
</div>

<div style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 0.6rem; margin: 0.15rem 0 0.4rem;">
<div style="border-top: 3px solid #3b82f6; padding: 0.22rem 0.6rem;"><strong>L1</strong> <span class="muted">observe</span></div>
<div style="border-top: 3px solid #22c55e; padding: 0.22rem 0.6rem;"><strong>L2</strong> <span class="muted">advise</span></div>
<div style="border-top: 3px solid #eab308; padding: 0.22rem 0.6rem;"><strong>L3</strong> <span class="muted">approve</span></div>
<div style="border-top: 3px solid #ef4444; padding: 0.22rem 0.6rem;"><strong>L4</strong> <span class="muted">bounded autonomy</span></div>
</div>

<div class="muted" style="font-size: 0.8rem; margin-bottom: 0.45rem;">
Layered autonomy: detection stays <strong>deterministic</strong> (no missed alarms); the AI interprets & advises; <strong>humans always in control</strong>. L5 does not exist.
</div>

<div style="display:grid; grid-template-columns: 1.5fr 1fr; gap: 0.8rem;">
<div class="story-card" style="min-height: 0; padding: 0.5rem 0.9rem; border-left: 4px solid #22c55e;">
<strong style="font-size: 0.95rem;">In production today (L1 + L2)</strong>
<ul style="font-size: 0.78rem; margin: 0.3rem 0 0; line-height: 1.32;">
<li><strong>Cross-system RCA</strong> — one click → AI hypothesis → human verifies → system learns</li>
<li><strong>Noise reduction</strong> — repeated/similar alerts merged; operators teach it what is noise</li>
<li><strong>Knowledge loop</strong> — operator fixes → AI-drafted runbook → human-approved skill</li>
<li><strong>Reports & assistant</strong> — daily/weekly to web + WeCom; interactive AI Q&A</li>
</ul>
</div>
<div>
<div class="story-card" style="min-height: 0; padding: 0.45rem 1rem; text-align: center; border-left: 4px solid #ea580c;">
<div class="muted" style="font-size: 0.72rem;">open events after one week of EOS alerts</div>
<div style="font-size: 1.6rem; font-weight: 800; line-height: 1.1; margin: 0.1rem 0;">
<span style="color:#ef4444;">121</span> <span class="muted" style="font-size:1rem;">→</span> <span style="color:#22c55e;">18</span>
</div>
<div class="muted" style="font-size: 0.72rem;">all actionable — surfaced a real failing disk</div>
</div>
<div class="story-card mt-2" style="min-height: 0; padding: 0.45rem 0.9rem; border-left: 4px solid #3b82f6;">
<strong style="font-size: 0.9rem;">Next</strong>
<ul style="font-size: 0.75rem; margin: 0.25rem 0 0; line-height: 1.32;">
<li><strong>Wider</strong>: RAG over runbooks · more log sources (HTCondor, overseas sites)</li>
<li><strong>Deeper</strong>: L3 human-approved actions · L4 bounded autonomy — <em>gated by evidence</em></li>
</ul>
</div>
</div>
</div>

<div class="takeaway" style="margin-top: 0.45rem; font-size: 0.9rem; padding: 0.45rem 1rem;">
<strong>Bottom line:</strong> not claiming day-one accuracy — a system that <strong>learns from every human correction</strong>, with operators firmly in control.
</div>

</div>
