#!/usr/bin/env python3

from __future__ import annotations

import subprocess
from datetime import date
from pathlib import Path
from xml.etree import ElementTree as ET


REPO_ROOT = Path(__file__).resolve().parents[1]
SITEMAP_PATH = REPO_ROOT / "sitemap.xml"
SITE_URL = "https://mahfujarr.me"


PAGES = [
    ("/", "index.html"),
    ("/experience/", "experience/index.html"),
    ("/projects/", "projects/index.html"),
]


def get_last_modified(path: str) -> str:
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", path],
            cwd=REPO_ROOT,
            check=True,
            capture_output=True,
            text=True,
        )
        value = result.stdout.strip()
        if value:
            return value
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass

    return date.today().isoformat()


def build_sitemap() -> str:
    urlset = ET.Element("urlset", {"xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9"})

    for route, source_path in PAGES:
        url = ET.SubElement(urlset, "url")
        loc = ET.SubElement(url, "loc")
        loc.text = f"{SITE_URL}{route}"
        lastmod = ET.SubElement(url, "lastmod")
        lastmod.text = get_last_modified(source_path)

    ET.indent(urlset, space="  ")
    xml_body = ET.tostring(urlset, encoding="unicode")
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + xml_body + "\n"


def main() -> None:
    sitemap_xml = build_sitemap()
    current_xml = SITEMAP_PATH.read_text(encoding="utf-8") if SITEMAP_PATH.exists() else ""

    if sitemap_xml != current_xml:
        SITEMAP_PATH.write_text(sitemap_xml, encoding="utf-8")
        print("Updated sitemap.xml")
    else:
        print("sitemap.xml is already up to date")


if __name__ == "__main__":
    main()