---
icon: lucide/brain
---

# Study Design

While there is a fair amount of flexibility in how you set up a study for the TPR-DB, there are some important constraints:

- Studies must be organized in **sessions**
- Each **session** should have
    - a single **participant**
    - a single **modality**
    - a single **source** and **target language**

## Sessions

A **session** is a single occurrence where a participant (human or machine) produces/reads a text along the lines of a certain modality.

!!! example "Translation **Session**"

    A simple example is a professional translator reading and translating a text with Translog-II while their keystrokes are being logged and their gaze is being monitored with an eye tracker.

!!! example "Post-Editing **Session**"

    Another simple example is a bilingual post-editing a text with Trados Studio while their keystrokes are being logged with the Qualitivity plugin.

## Participants

A **participant** either needs to produce text, read text, or both. A **participant** can be a human (professional translator, researcher, student, bilignual, etc.) or a machine (neural machine translation model, large language model, agent, etc.).

## Modalities

While there are some common **modalities** that are often used in translation process research (translation, post-editing, monolingual editing, simultaneous interpreting, sight translation, etc.), any activity or task that involves reading and/or producing a text can be a **modality**. Researchers have the flexibility of defining their sessions according to pre-determined, common modalities (these are described in [File Naming](file-naming.md)) or describing custom modalities.