---
icon: lucide/clock-8
---

# Process Features
Process features capture the cognitive and behavioral dynamics of action (e.g., translation) as they unfold in real time. In the context of the TPR-DB 3.0, they comprise keystroke logging measures — such as production pauses and typing bursts, etc. — and gaze metrics derived from eye-tracking, including fixation durations, regressive eye movements, and re-reading behavior. 
Many features are described in the context of the [TPR-DB version 2.0](https://drive.google.com/file/d/1FgOSNcpbjlxdo6MM_jf3Pw5wDS6S9-BB/view). In this section we present new features or if the definition has changed.

## Translation Phases
According to Jakobsen (2011) translation sessions can be separated into an orientation phase (O), a drafting phase (D) and a revision phase (R). Drafting starts with the first keystroke and the time before is defined as the orientation phase. We adopt this definition, even though it may not always be entirely correct. Some translators actually start with testing the keyboard, by typing some characters, and then start the actual orientation phase. We will ignore these cases. According to Jakobsen, drafting ends when the last word has been typed. We operationalize this definitionas follows: 

1. We take the last word in the TT, rather than the translation of the last ST word.
2. Drafting produces at least 50% of the keystrokes in a translation sessions.
3. Drafting proceeds sequentially, i.e., successive keystrokes are no further than [-5 .. +2] word IDs and no more than [-20 .. +10] cursor positions apart. Drafting ends when five (or more) successive keystrokes not in a sequential.


## Keystroke Features

### Pause Measures

Lacruz and colleagues[^lacruz] introduce several measures to compute the relation between text production (i.e., sequences of fluent typing) and pausing, assuming that keystroke pauses are "good indicators of cognitive demand in monolingual language production and in translation." 
They suggest several measures, including *Pause Ratio* (PR), *Average Pause Ratio*,  *Pause to Word Ratio* (PWR), all of which
rely on a notion $\mathtt{pause}$, which has been a topic of discussion for many years. 

- pause ratio (PR) 

   $\mbox{PR} =\frac{\mbox{total pause time in segment}}{\mbox{total time in segment}}$
    

- event to word ratio (EWR) 

    $\mbox{EWR} =\frac{\mbox{number of complete editing events}}{\mbox{number of words}}$
    

- average pause ratio (APR)

    $ \mbox{APR} =\frac{\mbox{average time per pause}}{\mbox{average time per words}}$
    

- pause to word ratio (PWR) 

    $ \mbox{PWR} =\frac{\mbox{number of pauses in segment}}{\mbox{number of words in segment}}$

The TPR-DB provides the basic features for computing these measures on the segment level (SG). In line with the literature, the [TPR-DB version 2.0](https://drive.google.com/file/d/1FgOSNcpbjlxdo6MM_jf3Pw5wDS6S9-BB/view) presumed set $\mathtt{pause}$ of $500$ms $1000$ms, $2000ms$ and $5000ms$. 

Since pausing behavior in the TPR-DB 3.0 is assumed to be traslator-specific, $\mathtt{pause}$ are now based on the values of `KUI` and `PUB` $1000$ms


 



- `Dur` : production duration for a segment; duration between the first and the last keystroke.
- `Nedit`: number of times the segment was edited.
- `PreGap` : segment initial keystroke pause; lag between the last keystroke of the previous segment (or beginning of session) and the first keystoke of the current segment.
- `PostGap` : segment final keystroke pause; lag between the last keystroke of the current segment and the first keystoke of the next segment (or end of session).
- `TB`$\mathtt{pause}$: number of typing bursts given the $\mathtt{pause}$ threshold.
- `TG`$\mathtt{pause}$: total duration of pausing (gap) time given the $\mathtt{pause}$ threshold.
- `TD`<pause> : total duration of drafting time given the $\mathtt{pause}$ threshold.


`Dur` = `TB` + `TG`

It may be possible to edit a segment several times. The features provide the sum of sum if a segment is edited several times, the 

Note that the typing pause preceeding the typing events in a segment are not included in `Dur`. 
Note also that the `PostGap` value of a segment may be different from `PreGap` of the next segment, if one of the segments was edited more than once.

$$ PR = frac{\text{`PreGap` + `TG` } {\test{Dur} +1} $$

 $\mbox{PR} =\frac{\mbox{total pause time in segment}}{\mbox{total time in segment}}$
    

[^lacruz]:
    - Lacruz et al. (2012): https://aclanthology.org/2012.amta-wptp.3.pdf
    - Lacruz et al. (2014): https://aclanthology.org/2014.amta-wptp.6.pdf
    - Lacruz et al. (2015): https://research-api.cbs.dk/ws/portalfiles/portal/58771005/Michael_Cral_2016_01.pdf


### Typing Inefficiency (InEff)
We adopt the definition of InEff from [TPR-DB version 2.0, p.26](https://drive.google.com/file/d/1FgOSNcpbjlxdo6MM_jf3Pw5wDS6S9-BB/view), who define typing (in) efficiency for a word, chunk or segment as:

$$ \mbox{InEff} = \frac{\mbox{number of typed characters}}{\text{length of final translation}} $$

They approximate this in terms of number of insertions and deletions:
 
$$ \mbox{InEff} = \frac{\text{insertions} + \text{deletions}}{\text{insertions - deletions} - 1} $$

A number 1 is added to the denominator to prevent division by 0, for instance in case of postediting when a word or segment remains unchanged.  In the current version we also add 1 to the nominator, so that if no deletions are recorded, the metric will return 1 irrespectively of how many deletions occurred.

$$ InEff = \frac{insertions + deletions}{insertions - deletions - 1} $$

Note that this measure only applies if number of insertions >= number of deletions which ensures that the result >= 1. Otherwise, if there are more deletions than insertions, as might be the case in post-editing, InEff is computed as follows, which provides a number between 0 and 1:

$$ InEff = \frac{1}{deletions} $$


## Gaze Features

Fixations are the basic processing units of gaze data. Depending on the sample rate of the eyetracken, fixations aggregate several to many gaze sample points into one unit. Fixations can be quantified based on their position on the screen (X/Y coordinates), duration, and the character/word/image looked. But a fixation itself is a dynamic event that changes in time with respect to the gaze position (micro saccades) and the pupil size. 

### Pupillometry

Pupil measures are a new feature in the TPR-DB 3.0. Pupillometry is the measurement of pupil size and its dynamic changes over time. While the pupil's primary function is the regulation of light intake, it also responds to cognitive and emotional states, which modulates arousal and mental effort. This makes pupil dilation a sensitive, non-invasive proxy for cognitive load.

#### The Basic Principle

When a task becomes more mentally demanding, the pupil dilates (widens) slightly — typically by fractions of a millimeter — even under constant lighting conditions. This response is involuntary and continuous, making it useful for tracking moment-to-moment fluctuations in processing difficulty.
In reading research, pupillometry helps reveal where and when comprehension becomes effortful:

- Lexical difficulty: rare or low-frequency words trigger measurable dilation compared to common words
- Syntactic complexity: structurally ambiguous or embedded clauses cause increased load
- Discourse integration: resolving pronouns or bridging inferences produces detectable peaks

Pupil responses are often time-locked to specific words, allowing researchers to pinpoint which linguistic features drive difficulty. However, particular caution needs to be taken in pupillometry since blinks can produce extreme values (outliers) and there are large individual differences: readers with lower working memory capacity tend to show larger and more prolonged dilation responses.

Pupillometry has also become a tool in TPR to assess:

- Source text difficulty: complex syntax, ambiguous terms, or dense domain-specific content.
- Decision points: moments of terminological or stylistic uncertainty show elevated load
- Revision behavior: re-reading and self-correction phases correlate with pupil dilation spikes

Expertise differences — professional translators tend to show more efficient (lower or faster-recovering) pupil responses than novices on equivalent texts, suggesting automatization of sub-processes

#### Pupillometric Measures in the TPR-DB

Given the heterogeneous nature of the TPR-DB (different eyetrackers, lighting conditions, sampling rates, etc.) the pupillometric measures are based on change in pupil diameter relative to the median pupil size in each session. 
For each gaze sample (depending on the eyetracker sampling rate) the TPR-DB proceeds in several steps:

1. Average pupil diameter across both eyes for binocular gaze sample data   
2. Compute median pupil diameter across entire session as a baseline  
4. Interpolate over blink gaps, fill edges for sequences of gaze samples  
3. Compute deviation from baseline in various ways for each gaze sample  
5. Compute pupillometric measures for each fixation


Since the pupil size and their changes is specific to every participant, a normalization is required. To address this issue, the TPR-DB computes pupil size baseline as the median pupil diameter for every translation session.

For each gaze sample point $SP$, the TPR-DB 3.0 computes an effective pupil size $SP_p$ as the mean of the left and right pupil diameters when both are available (i.e., diameter $> 0$) for binocular tracking, and otherwise falls back to the available monocular diameter. Each $SP_p$ is then normalised by the session median. In addition, TPR-DB 3.0 computes two measures of dispersion per participant session: a robust median absolute deviation and a standard deviation

- $\mathtt{baseline}  = median(SP_{p})$
- $\mathtt{pupil\_mad} = median(abs(SP_{p} -  \mathtt{baseline}))$
- $\mathtt{pupil\_std} = std(SP_{p})$

An $SP$ can be said to be in a dilated or constricted state relative to the $\mathtt{baseline}$, i.e., a dilation if $SP_{p} > \mathtt{baseline}$ and a constriction if $SP_{p} <= \mathtt{baseline}$

The TPR-DB then computes three sample-level measures 1. percent of change `per` from the baseline, 2. a median-centred z-score `z` and  3. a mean robust z-score `mad`:

1. `per`: $SP_{\mathtt{per}} = 100 * \frac{SP_{AVG} - \mathtt{baseline}}{\mathtt{baseline}}$
2. `z`: $SP_{\mathtt{z}} = \frac{SP_{AVG} -  \mathtt{baseline}}{\mathtt{pupil\_std}}$
3. `mad`: $SP_{\mathtt{mad}} = \frac{SP_{AVG} -  \mathtt{baseline}}{\mathtt{pupil\_mad}}$

For each of the three measures `[per|z|mad]` the TPR-DB produces the following eight commonly used measures in pupillometry research, for each fixation in the FD tables:

| Description | Features in the FD table |
|------|---------| 
| max. pupil size, 95th percentile (peak)| `PUP_[per|mad|z]_max`|
| min. pupil size, 5th percentile (floor) | `PUP_[per|mad|z]_min`|
| mean pupil size | `PUP_[per|mad|z]_mean`|
| standard deviation (SD) | `PUP_[per|mad|z]_mean`|
| Area Under the Curve (AUC) |   `PUP_[per|mad|z]_AUC`|
| time-normalized AUC |   `PUP_[per|mad|z]_AUC_N`|
| time-normalized AUC for constriction |   `PUP_[per|mad|z]_AUC_C`|
| time-normalized AUC for dilation |   `PUP_[per|mad|z]_AUC_D`|


*[AUC]: Area Under the Curve: cumulative dilation over a time window
*[SD]: standard deviation: 
*[TPR-DB]: Translation Process Research Database
*[TPR]: Translation Process Research
*[TT]: target text (i.e., translation)
*[ST]: source text 


