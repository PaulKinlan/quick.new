# Shortcut.cool

Let's you create an icon that has quick access to links (such as .new)

I built this so I could have a permanent '+' icon on my Android Homescreen
that would let me quickly create new docs and spreadsheets.

This is just a demo, it's not perfect - for example your '+' app will never
update if you make changes.

# How it works

* The app creates a manifest by base 64 encoding the name and URL of the site and turning that into a unique URL which is used by the server to create a manifest.