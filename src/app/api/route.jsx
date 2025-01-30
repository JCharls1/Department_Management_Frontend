import formidable from "formidable";
import { promises as fs } from "fs";
import path from "path";

// Disable Next.js body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), "public/uploads");
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Error parsing file" });
      }

      const filePath = files.file[0].filepath;
      const csvData = await fs.readFile(filePath, "utf-8");

      // Convert CSV to JSON
      const rows = csvData.trim().split("\n").map((line) => line.split(","));
      const headers = rows.shift(); // First row as headers
      const jsonData = rows.map((row) =>
        Object.fromEntries(headers.map((header, i) => [header, row[i]]))
      );

      return res.status(200).json({ message: "File uploaded successfully!", data: jsonData });
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
