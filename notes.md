FUNNEL

1. Visits /cspv
2. clicks on request info link
3. Sends request info
4. (optional) opens & clicks email with info link
5. visits /preinscripcion
6. Se preinscribe (fills form & visits thank you page)
7. cursa la formación
8. Drops out

## TODO

- Check what happens when error is sent as reponse to webhook
- I cannot send nested json via gravity forms.... So i need to delete from the object all the fields I need outside of it, then use them & throw them at mailwizz
- Add country & IP to hubspot request & information sent!
- change body parser into this (other parser cannot be configured) -> https://www.npmjs.com/package/qs#readme & configure so that the parser does not remove + signs if sent on query params.
- add a log in the case of an invalid email

## What it needs to do!

1. sign up endpoint that can take an id or an array of ids
2. Search to see if subscriber is already in the lists
3. if it is, update it
4. if it isn't check if email is valid & create it
5.

## Notes on Mailwizz API

- Does not create new fields if I post something with random fucking fields

## Notes on how mailwizz works

- To create a sequence of autoresponders I need to tie the first action to subscribe moment.
  - Then the next actions need to be tied to the opening or sending of other campaigns (auto responders)
- No puedo hacer acción sobre cliente cuando toma una acción. Si que puedo! But i have to set it to send to existing & imported subscribers

## Endpoints behind

- /v1/hooks/
- /status
