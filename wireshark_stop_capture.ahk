SetTitleMatchMode, 2

; Stop packet capture (using Ctrl+E hotkey)
Send, ^e

; Wait for packet capture to stop (adjust the delay as needed)
Sleep, 2000

; Close Wireshark
WinClose, Wireshark
