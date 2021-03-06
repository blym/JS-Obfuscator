#!/usr/bin/env node
const core = require("@actions/core");
const github = require("@actions/github");
const JavaScriptObfuscator = require("javascript-obfuscator");
const glob = require("glob");
const fs = require("fs");

try {
  glob(`${process.cwd()}/**/*`, (er, files) => {
    files.forEach(filePath => {
      if (filePath.endsWith(".js") && filePath.includes("default") && !filePath.includes("-web.js") && !filePath.includes("node_modules")) {
        console.log("Obfuscating: " + filePath);
        fs.readFile(filePath, (err, content) => {
          content = content.toString();
          const obfuscatedContent = JavaScriptObfuscator.obfuscate(
            content
          ).getObfuscatedCode();
          var webFilePath = filePath.replace('.js', '-web.js');
          console.log("Writing To: " + webFilePath);
          fs.writeFileSync(webFilePath, obfuscatedContent);
        });
      }
    });
  });
} catch (error) {
  core.setFailed(error.message);
}
