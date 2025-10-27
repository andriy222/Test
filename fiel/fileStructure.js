const fs = require("fs");
const path = require("path");

const { mkdirSync, writeFileSync } = fs;
const { join } = path;

// Структура тільки для src/
const structure = {
  app: {
    register: { "page.tsx": "" },
    login: { "page.tsx": "" },
    posts: { "page.tsx": "" },
    "layout.tsx": "",
    "page.tsx": "",
  },
  components: {
    "Navbar.tsx": "",
    "PostCard.tsx": "",
  },
  services: {
    "api.ts": "",
  },
  types: {
    "index.ts": "",
  },
  utils: {
    "auth.ts": "",
  },
};

function createStructure(basePath, obj) {
  for (const name in obj) {
    const fullPath = join(basePath, name);
    const value = obj[name];

    if (typeof value === "object") {
      mkdirSync(fullPath, { recursive: true });
      createStructure(fullPath, value);
    } else {
      writeFileSync(fullPath, value);
    }
  }
}

// Базова папка src
const basePath = path.join("mini-blog-frontend", "src");
mkdirSync(basePath, { recursive: true });

createStructure(basePath, structure);

console.log("✅ src structure successfully created!");
