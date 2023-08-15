SetTitleMatchMode, 2

; Open Wireshark
Run, wireshark.exe

; Wait for Wireshark to open
WinWaitActive, Wireshark

Sleep, 15000

; Start packet capture (using Ctrl+E hotkey)
Send, ^e







