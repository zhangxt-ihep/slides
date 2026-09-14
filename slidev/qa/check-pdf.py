# /// script
# dependencies = ["PyMuPDF"]
# ///
from __future__ import annotations

import json
import os
import re
import unicodedata
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parent.parent
output = ROOT / "qa/output"
output.mkdir(parents=True, exist_ok=True)
pdf_path = Path(os.environ.get("PDF_PATH", output / "FTS_IHEP_v2.pdf"))
browser_results_path = Path(
    os.environ.get("BROWSER_RESULTS_PATH", output / "final-browser-results.json")
)


def normalized(text: str) -> str:
    return re.sub(r"\s+", "", unicodedata.normalize("NFKC", text)).replace("\u00ad", "")


records = json.loads(browser_results_path.read_text())["results"]
expected = [record for record in records if record["width"] == 1280]
issues: list[dict[str, str | int]] = []
with fitz.open(pdf_path) as document:
    assert len(document) == len(expected) == 22
    for page, record in zip(document, expected):
        actual = normalized(page.get_text())
        footer_texts = [entry["text"] for entry in record["texts"] if entry["role"] == "footer"]
        for entry in record["texts"]:
            text = entry["text"]
            if normalized(text) not in actual:
                issues.append({"page": record["slide"], "problem": "missing from intended PDF page", "text": text})
            elif entry["role"] == "body" and len(text) >= 24 and not any(text in footer for footer in footer_texts):
                boxes = page.search_for(text)
                if boxes and max(box.y1 for box in boxes) > page.rect.height * (516 / 552) + 1:
                    issues.append({"page": record["slide"], "problem": "body text overlaps PDF footer", "text": text})
        spans = [span for block in page.get_text("dict")["blocks"] if "lines" in block for line in block["lines"] for span in line["spans"]]
        if not any(span["color"] == 16777215 and span["bbox"][1] > page.rect.height * 0.85 and span["text"].strip() for span in spans):
            issues.append({"page": record["slide"], "problem": "missing bottom footer", "text": ""})

result = {"pages": 22, "issues": issues}
(output / "pdf-content-check.json").write_text(json.dumps(result, ensure_ascii=False, indent=2))
print(json.dumps(result, ensure_ascii=False, indent=2))
assert not issues, "PDF must preserve page-local browser text above the footer"
