import fs from 'fs';
import path from 'path';
import { setFailed, setOutput, getInput, info, startGroup, endGroup } from '@actions/core';
import { Options, formatConfig, create } from 'markdown-to-html-cli';

;(async () => {
  try {
    const output = getInput('output') || 'index.html';
    const source = getInput('source') || 'README.md';
    const description = getInput('description');
    const favicon = getInput('favicon');
    const config = getInput('config');
    const markdown = getInput('markdown');
    const corners = getInput('github-corners');
    const darkMode = getInput('dark-mode');
    const markdownStyle = getInput('markdown-style');
    const style = getInput('style');
    const title = getInput('title');
    const markdownStyleTheme = getInput('markdown-style-theme');
    const options: Options = {
      document: { meta: [], link: [], style: [] }
    }
    info(`source: ${path.resolve(source)}`);
    if (source && !markdown) {
      options.markdown = (await fs.promises.readFile(path.resolve(source))).toString();
    } else {
      options.markdown = markdown;
    }
    options.favicon = favicon;
    options.config = config;
    options.description = description;
    options['github-corners'] = corners;
    options['markdown-style'] = markdownStyle;

    if (!corners) {
      const projectPkg = path.resolve(process.cwd(), config || 'package.json');
      if (fs.existsSync(projectPkg)) {
        const pkgStr = await fs.promises.readFile(projectPkg);
        let pkg = {} as any;
        try {
          pkg = JSON.parse(pkgStr.toString());
        } catch (error) {}
        if (pkg.repository && !corners) {
          options['github-corners'] = typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url;
        }
      }
    }

    const outputPath = path.resolve(output);
    setOutput('output', outputPath);

    if (style) {
      const stylePath = path.resolve(process.cwd(), style);
      if (fs.existsSync(stylePath)) {
        const cssString = fs.readFileSync(stylePath).toString();
        options.document.style.push(cssString);
      } else {
        options.document.style.push(style);
      }
    }

    if (title) {
      options['title'] = title;
    }

    startGroup(`Options: \x1b[34m(Action Inputs)\x1b[0m`);
    info(`${JSON.stringify(options, null, 2)}`);
    endGroup();

    const opts = formatConfig({
      ...options, 'dark-mode': darkMode, 'markdown-style-theme': markdownStyleTheme,
    });

    setOutput('markdown', opts.markdown);
    info(`Config Path: "${opts.config}"`);

    startGroup(`Options: \x1b[34m(Format Config)\x1b[0m`);
    info(`${JSON.stringify(opts, null, 2)}`);
    endGroup();

    const htmlStr = create({ ...opts });
    info(`Output Path: "${outputPath}"`);
    setOutput('html', htmlStr);
    fs.writeFileSync(outputPath, htmlStr);
  } catch (error) {
    console.log('error::', error)
    setFailed(error.message);
  }
})();
