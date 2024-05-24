import { defineConfig, DefaultTheme } from "vitepress";

// https://qiita.com/turmericN/items/28e8bc8fca07285ddffc
import * as fs from "fs";
import * as path from "path";

interface FileInfo {
  dir: string;
  name: string;
}

function searchFiles(dirPath: string) {
  const allDirents = fs.readdirSync(dirPath, { withFileTypes: true });

  const files: FileInfo[] = [];
  for (const dirent of allDirents) {
    if (dirent.isDirectory()) {
      const fp = path.join(dirPath, dirent.name);
      files.push(...searchFiles(fp));
    } else if (dirent.isFile() && [".md"].includes(path.extname(dirent.name))) {
      files.push({
        dir: path.join(dirPath, dirent.name),
        name: dirent.name,
      });
    }
  }
  return files.flat();
}

function convertFiles(files: FileInfo[]): DefaultTheme.SidebarItem[] {
  const sidebar: DefaultTheme.SidebarItem[] = [];
  for (let i = 0; i < files.length; ++i) {
    sidebar.push({
      text: path.basename(files[i].name, ".md"),
      link: "/docs/" + files[i].name,
    });
  }
  return sidebar;
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LitBot",
  description: "「利」をあなたへ。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "ホーム", link: "/" },
      { text: "始める", link: "/get-started" },
    ],

    sidebar: [
      {
        text: "はじめに",
        items: [
          { text: "Get Started", link: "/get-started" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "コマンド",
        items: convertFiles(searchFiles("pages/docs")),
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/e6nlaq/litbot" }],
  },
  markdown: {
    math: true,
  },
});
