---
icon: lucide/globe
title: CRITT TPR-DB 3.0 Documentation
description: The official documentation for the Center for Research and Innovation in Translation and Translation Technology's Translation Process Research Database (TPR-DB) version 3.0.
---

# The CRITT TPR-DB 3.0

!!! info inline end "version 3.0"

    This is the documentation site for the CRITT TPR-DB version 3.0.

The Center for Research and Innovation in Translation and Translation Technology ([CRITT](https://sites.google.com/site/centretranslationinnovation/home)) is the creator and maintainer of the Translation Process Research Database (TPR-DB), which is now in its 3rd major version (3.0).

## What is the TPR-DB?

The Translation Process Research Database (TPR-DB) is a tool for organizing and processing key-logging and gaze-fixation data so that it can be easily analyzed in powerful and flexible ways.

!!! question "Yeah, but what is it?"

    The TPR-DB has three concrete resources that help you analyze your translation process data:
    
    - The **TPR-DB web app** to upload and process your data &#129302;
    - **Utility libraries** (Python and R) to help you analyze the data &#129299;
    - **Documentation** (you’re looking at it &#128521;) to help you along the way

<figure markdown="span">
  ![TPR-DB 3.0 Diagram](assets/images/diagram_tprdb_v3_light.png#only-light){ width="800" }
  ![TPR-DB 3.0 Diagram](assets/images/diagram_tprdb_v3_dark.png#only-dark){ width="800" }
  <figcaption>CRITT TPR-DB Flowchart</figcaption>
</figure>

### TPR-DB Workflow

!!! tip inline start "The Goal"
    starting point = **gather** data

    end goal = **analyze** data

1. **Gather** key-logging data with Translog-II or Trados Qualitivity and/or gaze data with an eye tracker
2. **Upload** the raw data to the TPR-DB
    1. The TPR-DB will **automatically process** the raw data:
        1. **Segment** the texts
        2. **Tokenize** the texts
        3. **PoS** tag the tokens
        4. Parse **syntactic dependencies**
        5. **Align** source and target **segments**
        6. (*optional*) Automatically **align** source and target **words**
        7. **Map keystrokes** to words
        8. **Map fixations** to words
    2. The end result of this process are **SessionProps** XML files
3. Manually **align** words and **annotate** alignment groups
4. The TPR-DB will **automatically extract features** to create **TPR-DB data tables**
5. Use the features in the tables to **visualize** and **analyze** your data &#129299;

## History

The CRITT TPR-DB project started around 2010 with the data from a number of translation process studies that were recorded in Translog[^1] and integrated into a database under a common format. The TPR-DB was first a part of the Danish Dependency Treebanks Project at the Copenhagen Business School[^2] and then became a project on its own. Right from the beginning the idea was not only to provide a data repository for TPR, but also to provide a toolkit for analyzing and visualizing the data. The TPR-DB toolkit started out with a number of functions in R to access and analyse the TPR-DB data, and subsequently developed into a browser-based toolkit with a Jupyter interface and a Python library.

The first public documentation of the CRITT TPR-DB 1.0 appeared in 2012 ([Carl 2012](https://aclanthology.org/2012.amta-wptp.1.pdf)), when Translog-II was amended to record non-European languages (Chinese, Hindi, Japanese, among others). Adding a web-interface and further toolkit functionalities resulted in the TPR-DB 2.0 some of which is documented in a Springer volume, New Directions in Empirical Translation Process Research ([Carl et al. 2015](https://drive.google.com/file/d/1FgOSNcpbjlxdo6MM_jf3Pw5wDS6S9-BB/view)). Another Springer volume appeared in 2021, Explorations in Empirical Translation Process Research ([Carl 2021](https://drive.google.com/file/d/14arSD4l4vWtd1Gqkdiju_9UZiXmTo2n_/view)), when the TPR-DB was based at Kent State University. 

In 2026, TPR-DB processing chain was migrated from Perl to Python and was given a new user interface.

[^1]:  [CRITT website: Translog-II](https://sites.google.com/site/centretranslationinnovation/translog-ii)

[^2]:  [The Copenhagen Dependency Treebanks](https://mbkromann.github.io/copenhagen-dependency-treebank/)

*[PoS]: part of speech
*[TPR]: translation process research
*[TPR-DB]: Translation Process Research Database