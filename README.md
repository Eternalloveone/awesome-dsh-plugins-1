<!-- Rendered by scripts/render.mjs from data/plugins.json. Do not edit by hand: edit the data or the template, then run `npm run render`. -->

# awesome-dsh-plugins

[![powered by dsh](https://img.shields.io/badge/powered__by-dsh-4D6BFE?logo=deepseek)](https://github.com/deepseek-ai/deepseek-harness)
[![license: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A spam-filtered, open-data registry of [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (`dsh`) plugins, bundles, and skills.

Most awesome lists are prose. This one is data: [`data/plugins.json`](data/plugins.json) is the source of truth, this README is rendered from it, and every entry states an install path and the dsh version it was last verified against. Build on the JSON directly:

```sh
curl -s https://raw.githubusercontent.com/dshworks/awesome-dsh-plugins/main/data/plugins.json
```

## Why a filtered registry

DeepSeek delegates the ecosystem to the community: no first-party marketplace, discovery happens on the [`dsh-plugin`](https://github.com/topics/dsh-plugin) GitHub topic. On launch day that topic already held 431 repositories, template forks and topic-riders included. A raw topic feed is not a registry; the filter is the value this repo adds.

If you prefer a curated prose list, [AdamPlatin123/awesome-dsh-plugins](https://github.com/AdamPlatin123/awesome-dsh-plugins) does that well, with daily compatibility tracking. This repo is the machine-readable complement, not a replacement.

## Why "verified against" is a schema field

dsh is a developer preview and the team promises compatibility-breaking changes. Example: the `.dsh-plugin` manifest format was deleted on 2026-08-09 with no migration path, silently stranding every tutorial written against it. A compatibility claim without a version and a date rots, so the schema records both (`verifiedAgainst`, `lastVerified`) and stale entries get re-checked or flagged.

## Registry

8 entries. Data updated 2026-08-13.

### Bundles

npm packages with a `dsh.bundle` manifest: composition layers a profile boots from.

| Name | Repo | npm | Description | Verified against |
|---|---|---|---|---|
| dsh-base (official) | [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness/tree/HEAD/packages/bundle/base) | [`@deepseek-ai/dsh-base`](https://www.npmjs.com/package/@deepseek-ai/dsh-base) | The shared dsh core as a profile bundle: every profile's first patch layer, inserting the base plugin rows over the empty profile root | 0.1.0-rc.5 (2026-08-13) |
| dsh-headless (official) | [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness/tree/HEAD/packages/bundle/headless) | [`@deepseek-ai/dsh-headless`](https://www.npmjs.com/package/@deepseek-ai/dsh-headless) | The one-shot bundle: a direct core Agent/Session runner over dsh-base with no Host, HTTP, or browser layer | 0.1.0-rc.5 (2026-08-13) |
| dsh-web-app (official) | [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness/tree/HEAD/packages/bundle/web-app) | [`@deepseek-ai/dsh-web-app`](https://www.npmjs.com/package/@deepseek-ai/dsh-web-app) | The browser-surface bundle: the web patch layer over dsh-base plus the runtime glue plugin (frontend dist serving, web-surface prompt, URL line) | 0.1.0-rc.5 (2026-08-13) |

### Plugins

Cordis plugins activated through patch rows in a bundle or profile.

| Name | Repo | npm | Description | Verified against |
|---|---|---|---|---|
| dsh-hooks-claude-code (official) | [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness/tree/HEAD/packages/hooks/hooks-claude-code) | [`@deepseek-ai/dsh-hooks-claude-code`](https://www.npmjs.com/package/@deepseek-ai/dsh-hooks-claude-code) | Bridge plugin: runs an existing Claude Code hooks.json on the harness interception seams (command hooks only; http, mcp_tool, prompt, and agent hooks are skipped with a warning) | 0.1.0-rc.5 (2026-08-13) |
| dsh-hooks-codex (official) | [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness/tree/HEAD/packages/hooks/hooks-codex) | [`@deepseek-ai/dsh-hooks-codex`](https://www.npmjs.com/package/@deepseek-ai/dsh-hooks-codex) | Bridge plugin: runs a Codex hooks.json on the harness interception seams (regex-only matchers, snake_case payloads, only blocking decisions honored) | 0.1.0-rc.5 (2026-08-13) |
| dsh-web-ui | [zhu1090093659/dsh-web-ui](https://github.com/zhu1090093659/dsh-web-ui) | - | Plugin and skin collection for the dsh Web UI: task board, git graph, right-side panel, remote mobile UI, live token stats, and a skin center that routes around the theme-persistence gap | 0.1.0-rc.5 (2026-08-13) |
| modlens | [liustack/modlens](https://github.com/liustack/modlens) | [`@liustack/modlens`](https://www.npmjs.com/package/@liustack/modlens) | Vision plugin for text-only models: image understanding bridged into the harness via a dsh.bundle patch layer, shipping a modlens skill alongside | 0.1.0-rc.5 (2026-08-13) |

### Skills

Anthropic-format `SKILL.md` units; dsh discovers them from its skill roots (no nested discovery, kebab-case names only).

| Name | Repo | npm | Description | Verified against |
|---|---|---|---|---|
| colleague-skill | [titanwings/colleague-skill](https://github.com/titanwings/colleague-skill) | - | Digital-companion skill in the Anthropic SKILL.md format dsh reads; install by copying it into a dsh skill root such as .agents/skills | 0.1.0-rc.5 (2026-08-13) |

## Add your plugin

Open a PR against [`data/plugins.json`](data/plugins.json) only; the README is regenerated. See [CONTRIBUTING.md](CONTRIBUTING.md). The spam gate in short: a real install path (a `dsh.bundle` manifest, a published npm package, or a `SKILL.md` layout dsh discovers), not a renamed template fork, and it loads against the dsh version you claim.

A scheduled workflow also sweeps the `dsh-plugin` topic, npm, and GitHub code search; new finds queue in [`data/candidates.json`](data/candidates.json) on a single reused triage PR and never enter the registry without review.

## Field notes

Verified dsh traps, skill discovery rules, and hook-bridge limits live in [howto-dsh](https://github.com/dshworks/howto-dsh).

## License

MIT. Not affiliated with DeepSeek; the harness README calls itself "an idea, an official showcase, and a source of inspiration", and the ecosystem belongs to the community.
