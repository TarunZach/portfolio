// Spotify API Configuration
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const client_id = "4f1dff85205e4e3dad50587179b8cd5d";
const client_secret = "87f5d7ae890043ae98a2ee62b349dc4e";
const refresh_token = 'AQAhJp_k7x1ZWi1ERw0-c3FFAGiWrEki0HHJDXiLwwwQ-j-DiKA-uq__cPLSsRXDtfPnDh5-jpHZ9_uFlTvcBTYJIN6cUuNxGUTvjIdAVDM8NIavCy88SHBCzumS-0qFAp0';

// Function to generate access token
async function getAccessToken(client_id, client_secret, refresh_token) {
  const basic = btoa(`${client_id}:${client_secret}`);

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'grant_type': 'refresh_token',
      'refresh_token': refresh_token
    })
  });

  return response.json();
}

async function getNowPlaying() {
  try {
    const { access_token } = await getAccessToken(client_id, client_secret, refresh_token);

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    if (response.status > 400) {
      return null;
    } else if (response.status === 204) {
      return { isOffline: true };
    }

    const song = await response.json();
    return {
      albumImageUrl: song.item.album.images[0].url,
      artist: song.item.artists.map((artist) => artist.name).join(', '),
      isPlaying: song.is_playing,
      songUrl: song.item.external_urls.spotify,
      title: song.item.name,
      timePlayed: song.progress_ms,
      timeTotal: song.item.duration_ms,
      artistUrl: song.item.album.artists[0].external_urls.spotify
    };
  } catch (error) {
    return null;
  }
}

function pad(n) {
  return (n < 10) ? ("0" + n) : n;
}

async function updateNowPlaying() {
  const nowPlayingContainer = document.getElementById('spotify-now-playing');

  try {
    const nowPlaying = await getNowPlaying();

    let playerState = '';
    let albumImageUrl = '';
    let title = '';
    let artist = '';
    let minutesPlayed = 0, secondsPlayed = 0;
    let minutesTotal = 0, secondsTotal = 0;
    let songUrl = '';

    if (!nowPlaying) {
      // Error occurred
      title = 'Error';
      artist = 'Fetching song';
      playerState = 'ERROR';
    } else if (nowPlaying.isOffline) {
      // Offline state
      playerState = 'OFFLINE';
      title = 'User';
      artist = 'is Offline';
    } else {
      // Song is playing or paused
      playerState = nowPlaying.isPlaying ? 'PLAY' : 'PAUSE';

      secondsPlayed = Math.floor(nowPlaying.timePlayed / 1000);
      minutesPlayed = Math.floor(secondsPlayed / 60);
      secondsPlayed = secondsPlayed % 60;

      secondsTotal = Math.floor(nowPlaying.timeTotal / 1000);
      minutesTotal = Math.floor(secondsTotal / 60);
      secondsTotal = secondsTotal % 60;

      albumImageUrl = nowPlaying.albumImageUrl;
      title = nowPlaying.title;
      artist = nowPlaying.artist;
      songUrl = nowPlaying.songUrl;
    }

    nowPlayingContainer.innerHTML = `
      <a href="${songUrl}" style="text-decoration: none; color: black;">
        <div class="nowPlayingCard">
          ${albumImageUrl ? `
            <div class="nowPlayingImage">
              <img src="${albumImageUrl}" alt="Album" />
            </div>
          ` : ''}
          <div id="nowPlayingDetails">
            <div class="nowPlayingTitle">${title}</div>
            <div class="nowPlayingArtist">${artist}</div>
            ${playerState === 'PLAY' || playerState === 'PAUSE' ? `
              <div class="nowPlayingTime">${pad(minutesPlayed)}:${pad(secondsPlayed)} / ${pad(minutesTotal)}:${pad(secondsTotal)}</div>
            ` : ''}
          </div>
          <div class="nowPlayingState">
            ${playerState === 'PLAY' ? '<img src="../img/soundbar.gif" alt="Now Listening" />' :
        playerState === 'PAUSE' ? '<span>⏸️</span>' :
          playerState === 'OFFLINE' ? '<span>📴</span>' :
            playerState === 'ERROR' ? '<span>❌</span>' : ''}
          </div>
        </div>
      </a>
    `;
  } catch (error) {
    nowPlayingContainer.innerHTML = `
      <div class="nowPlayingCard">
        <div class="nowPlayingArtist">Failed to fetch song</div>
      </div>
    `;
  }
}

// Update every second
setInterval(updateNowPlaying, 1000);

// Initial update
updateNowPlaying();