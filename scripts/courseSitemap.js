const fs = require("fs");
const globby = require("globby");

(async () => {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby(["pages/learn/**/*{.js,.mdx}"]);
  const sitemap = `<?xml version="1.0"?><?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace("pages", "")
                  .replace(".js", "")
                  .replace("/index", "")
                  .replace(".mdx", "");
                const route = path === "/index" ? "" : path;

                return `
                        <url>
                            <loc>${`https://holycoders.com${route}/`}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
    `;

  fs.writeFileSync("public/course-sitemap.xml", sitemap);
})();
