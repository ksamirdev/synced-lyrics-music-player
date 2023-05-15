# Synced Lyrics Music Player

This project is a music player with live, synced lyrics. The frontend is built using [Vite React App](https://vitejs.dev/) and the backend is built using [Express](https://expressjs.com/). Live, synced lyrics are provided by the [sync-lyrics](https://github.com/samocodes/sync-lyrics) package.

## Installation

To install the project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/samocodes/synced-lyrics-music-player.git
   ```

2. Install the dependencies for both the frontend and backend:

   ```bash
   cd synced-lyrics-music-player
   yarn
   ```

3. Edit the `.env` file.

4. Start the server:

   ```bash
   yarn start
   ```

   This will start the app in development mode. Open [http://localhost:5173](http://localhost:3000) to view it in the browser.

## Usage

The synced lyrics music player allows you to play music with live, synced lyrics. To get started, simply:

1. Add music file to `backend/music` directory. And put the data in `backend/data.ts`
2. Start playing the music and the lyrics will be displayed in real-time, synced to the music.

You can also control the playback of the music using the player controls, such as play/pause, and adjust the volume.

## Contributing

If you would like to contribute to the project, feel free to submit a pull request. Before submitting a pull request, please ensure that your code follows the project's coding standards and that all tests pass.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the [LICENSE](LICENSE) file for details.

## TODO

Full support will all the screens.

## Author

SamoCodes

- Email: samirdiff@proton.me
- GitHub: [SamoCodes](https://github.com/samocodes)
- Discord: SamoCodes#8976
