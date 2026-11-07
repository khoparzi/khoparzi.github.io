import fs from "node:fs";
import path from "node:path";

export default function() {
  const filePath = path.resolve("_data/gigs.csv");
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const raw = fs.readFileSync(filePath, "utf-8").trim();
  const lines = raw.split("\n");
  if (lines.length <= 1) return [];

  const headers = lines[0].split(",").map(h => h.trim());
  const gigs = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle CSV fields with commas inside quotes if any, or standard split
    const parts = [];
    let current = "";
    let inQuotes = false;

    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        parts.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    parts.push(current.trim());

    if (parts.length >= 3) {
      gigs.push({
        date: parts[0] || "",
        name: parts[1] || "",
        location: parts[2] || "",
        link: parts[3] || ""
      });
    }
  }

  return gigs;
}
