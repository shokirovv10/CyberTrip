# CYBERTRIP — Practical Cybersecurity Learning Platform

## What changed in this build

- Robust local SQLite migrations for older databases.
- Login/register database failures are rolled back instead of leaving a broken session.
- Team creation handles duplicate names and existing teams without 500 errors.
- CTF challenge cards open a **dedicated Virtual Lab in a new browser tab**.
- CTF flags are not displayed on the challenge list/detail before the lab evidence chain is completed.
- Terminal-inspired UI using `cybertrip@uz:~$`, blue prompts and Linux-like training windows.
- Expanded practical lesson curriculum with safe, local/sandbox commands and detection/remediation sections.
- RU/EN/UZ interface selector is wired through the shared translation dictionary.
- Registration rules link opens the professional Rules page in a new tab.

## Safe training model

Labs are educational/synthetic environments. Only use techniques taught here against systems you own or have explicit authorization to test. Do not use the platform to access, disrupt or collect data from real systems without permission.

## Local start

1. Create/activate a Python virtual environment.
2. Install `requirements.txt`.
3. Run `START_LOCAL.bat` on Windows.
4. Open the local address shown by Flask.

The app uses a local SQLite database under the Flask instance directory.


## AI Tutor
AI Tutor supports a real OpenAI Responses API integration via `OPENAI_API_KEY` and a local offline training fallback when no key is configured.


### Lesson Quick Checks
Har bir darsda 3 ta qisqa mustahkamlash savoli mavjud. 70% dan yuqori natija dars mazmunini qayta tekshirish uchun signal sifatida ishlatiladi.
