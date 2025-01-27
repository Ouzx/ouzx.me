Project Log #1: The Landing

I've been using Bun for the last two years for everything—frontend, backend, DevOps—and it's been great. It handles running TypeScript code, manages dependencies, runts tests, bundles codebase and essentially takes care of everything. The most important thing is that it's fast. However, in this project, I planned to use Cloudflare Edge for everything, so I couldn't use Bun here. At first, I felt a bit lost because I didn't want to configure dozens of packages just to run a simple web server.

But, as they say, if you're nothing without the suit, then you shouldn't have it. So, I decided not to use Bun anywhere in this project. :D

The path is simple: runtime is Node.js (checked), and we need a powerful package manager, a monorepo manager, extensive linting configuration for both frontend and backend projects, and a similar approach for TypeScript. I also need some development tools, such as auto-linting before creating commits, a standardized way to create commit messages, and validation of commit content. Additionally, I need a base level of testing structure.

At first, I thought PNPM would be the perfect solution for both package management and monorepo management. It's fast, robust, and, most importantly, has excellent lock file management. I love its package management approach—it's super readable, unlike Bun's binary lockfile (though they released a text-based lock file similar to PNPM's in version 1.2). PNPM is also incredibly useful for monorepo management. You can manage all package requirements within the same directory by simply passing filters to your command.

Then, I discovered an awesome tool specifically crafted for monorepo management: Turborepo. It's super fast, has a great task management API, allows you to create dependencies between tasks, and has built-in caching—even supporting cloud caching, which is very useful for CI/CD pipelines. These are the "tools" I wanted to mention in this log. Now, let's move on to the rest.

Okay, we've scaffolded the project. Now comes the nightmare part.

When it comes to linting, I could spend weeks chasing perfection. In the JavaScript world, everything is configurable—from quotes to how you handle errors or promises. I've already spent days, maybe weeks, on my previous projects. But now, I have a solution thanks to Anthony's ESLint configuration (https://github.com/antfu/eslint-config). It has everything for various types of projects, and you can tweak it as you want. It also handles code formatting, so you don't need to configure Prettier or anything else.

The TypeScript configuration isn't too complex for most projects, so I didn't invest too much time in it.

For testing, I already had a favorite before Bun: Vitest. It's Jest-compatible, but you don't need to configure or satisfy anything like you do with Jest. However, for the frontend part of this project, I want to implement end-to-end (e2e) tests alongside unit tests. Yes, I want to try full TDD (Test-Driven Development) in this project. We can use other tools like Codecov, but I just want the basics in this sprint.

We have the puzzle pieces; now it's time to play.

First, I created an empty project. Then, I installed Hono and Next.js apps. After that, I installed Turborepo and the Hono and Next.js template projects. I managed to run both of them with a single command, thanks to Turborepo. Creating, building, and running builds was easy after setting up the dev scripts.

Next, I needed to share configurations between projects, specifically ESLint and TypeScript. So, I created two separate packages and added them to the projects. It didn't work at first—both configurations failed—but according to the Turborepo docs and examples, it was supposed to work (https://turbo.build/repo/docs/guides/tools/eslint#about-the-configuration-package). I checked almost every line three times.

After two days of research, I realized one thing: almost all the examples were using Next.js in Turborepo, and Next.js has built-in ESLint. So, you don't need to install ESLint separately if you're going to use the next lint command. Because of that, the apps in the monorepo didn't have any packages for TypeScript or ESLint.

But in my case, I have a wrapper for ESLint (Antfu's config) and a pure backend that doesn't provide something like that. So, I just installed ESLint and TypeScript in the projects separately, and voilà, it worked! I managed to distribute all the configurations across different stacks, and that was the hardest part.

After that, I installed Husky for Git hooks like pre-commit, post-commit, and post-checkout. Then, I installed lint-staged, a powerful tool that runs predefined commands on your staged files and prevents you from committing incorrect code to your repo. I also installed commitlint (which forces you to write commit messages in a specific format) alongside commitizen (a CLI that asks you a bunch of questions and builds your commit message) and cz-emoji, an emoji extension for commitizen that makes your commits more colorful.

These were the very basics of the project. Now, let's add some salt to the salad.

I created two different packages: logger and config.

The config package is responsible for validating, managing, and sharing the state of environment variables. It uses Zod for validation.

The logger package is responsible for creating a single, consistent, but extensible logging tool. It uses Pino and Pino Pretty.

With these two side packages, I experimented with the repo's package management by using them in both the frontend and backend.

Now, the last piece: testing. I created unit tests for the logger and API. I also installed Playwright for the Next.js app. I didn't make any extra configurations—just installed it. Finally, I connected everything into Turborepo and managed to run all the flows.

+Bonus: I also created documentation stuff—how to create a package, a README, some issue templates, a code of conduct, and a dev logs folder. I used AI for most of the boilerplate stuff.