CHASKI · /apps/ — integration slot for live prototypes
=======================================================

WIRED IN (from Documents/Fable Experimentation, 2026-06-15):
  apps/chasky-tech.html       ← CHASKI WhatsApp 3D marketing page
  apps/chasky-mitologico.html ← El Poder Mitológico immersive page
  apps/app-prototype.html     ← transcription app UI prototype
The hub (../index.html) "Prototipos en vivo" section links all three.
chasky-tech.html links to app-prototype.html (same folder) — works as-is.

(app1.html / app2.html are leftover placeholders, no longer linked — ignore or delete.)

The hub (../index.html) already links to apps/app1.html and apps/app2.html
in the "Prototipos en vivo / Live prototypes" section. To change the visible
titles/descriptions, edit the demo1_*/demo2_* keys in index.html's window.I18N.

If a prototype is a multi-file app (its own css/js/assets), put it in a
subfolder instead, e.g. apps/prototipo-uno/index.html, and update the href
in index.html to apps/prototipo-uno/.

These are self-contained static files — they deploy with the rest of the site
and carry over unchanged when you port the site to a new domain.
