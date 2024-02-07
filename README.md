## Description

This project was created for a portfolio. It uses the spotify api to allow a simple interface to create playlists, add tracks, and remove tracks. The user can search for tracks or generate recommendations based on preferred genre, artists, or tracks.

## How to run it locally

First, click on create a new application on the Spotify developer dashboard. Enter "http://localhost:3000" in the redirect URIs option and check the "Web API" option. Save your new app then follow the following steps.

1. Create a .env file and add `REACT_APP_CLIENT_ID` and `REACT_APP_REDIRECT_URI`. The value for the client id can be found on the spotify developer dashboard on your newly created application under settings. The redirect uri is "http://localhost:3000".
2. run `npm i` and `npm start`.
