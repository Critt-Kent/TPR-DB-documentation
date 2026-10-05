---
icon: lucide/binoculars
---

# Inputlog

[Inputlog](https://www.inputlog.net/) is a tool to observe writing processes unobtrusively. Writing researchers and teachers use keystroke logging to describe and analyze online writing or translation processes. Visit the [inputlog](https://www.inputlog.net/) website here for more information from the developers.

You can download the current [inputlog](https://www.inputlog.net/) version from their website or also an earlier version 7 from [here](https://www.dropbox.com/scl/fi/9fzs4eyt0ambduxwaimoy/InputlogInstaller_71018.exe?rlkey=ysyl5vggbv2k3fsaju1tpbcme&e=1&dl=0) (Password for installation: `IL7558`).

While [inputlog](https://www.inputlog.net/) is designed to work in conjunction with MS Word, it also logs keystrokes outside Word. However, in that case it only logs the keystrokes but cannot know the context in which these keystrokes/mouseclicks are produced. [Inputlog](https://www.inputlog.net/) can be used in conjunction with Translog-II. While Translog-II can only record keystrokes that are produced inside the Translog-II editor, [inputlog](https://www.inputlog.net/) captures all keystrokes that are produced inside and outside Translog-II. Both log files can be merged and synchronized based on the keystrokes that occur in both logging tools. The result is a more complete picture of keyboard activities inside and outside Translog-II. 

## Workflow Procedure

1. Start [inputlog](https://www.inputlog.net/)
2. Start Translog-II
3. Run the translation session
4. Stop Translog and save the Translog-II `*.xml` file
5. Stop [inputlog](https://www.inputlog.net/): an `*.idfx` file will be automatically produced in the Inputlog folder
6. Merge the Inputlog `*.idfx` file into the Translog-II `*.xml` file (see below)
7. Upload the merged output to the TPR-DB

---

## Important Considerations

In order to run [inputlog](https://www.inputlog.net/) with Translog-II, you have to change the recording settings (as Word is the default writing environment for [inputlog](https://www.inputlog.net/)). Be aware that changing this option will limit the use of certain analysis possibilities that [inputlog](https://www.inputlog.net/) provides (e.g., revision analysis, process graph, etc.).

### Changing ![Recording Settings](InputLogSettins.png)
1. Select **File** in the top menu.
2. Options: Change Plugin Selection by unchecking the **WordLog** option.

### Merging Log Files
To merge the inputlog`.idfx` file into the Translog-II `*.xml` file, run the following command:

```bash
perl ./InjectIDFX.pl -T <Translog-II>.xml -I <InputLog>.idfx -O <Target_fn>.xml
