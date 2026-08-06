<script>
  import { onMount } from 'svelte';

  const tracks = [
    { type: 'youtube', id: '9nVJ-oGFc1o' },
    { type: 'youtube', id: 'feHwYZOQtuY' },
    { type: 'bandcamp', album: '2333437796', track: '3113170437', duration: 351, after: { type: 'youtube', id: '1jlD25i2pyY' } },
    { type: 'soundcloud', url: 'https://soundcloud.com/jajajaneeneenee/gathering-in-a-polyphonic-mooooaaaaaaann-safeguards-solidarity-mmaudio' },
    { type: 'bandcamp', album: '1247373571', track: '161932149', duration: 204 },
    { type: 'youtube', id: 'ke9vvGm-IBc', after: { type: 'bandcamp', album: '4275002128', track: '2977088820', duration: 133 } },
    { type: 'youtube', id: 'vVMSS4Amt6M' }
  ];

  let activeIndex = -1;
  let progress = 0;
  let youtubePlayer;
  let youtubeReady = false;
  let pendingYoutube;
  let progressFrame;
  let bandcampTimer;
  let controlsTimer;
  let showControls = true;
  let playbackType = null;
  let youtubeVisible = false;
  let bandcampVisible = false;
  let bandcampSrc = '';
  let soundcloudSrc = '';

  function loadScript(src, id) {
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    document.head.appendChild(script);
  }

  function revealControls() {
    showControls = true;
    clearTimeout(controlsTimer);
    if (youtubeVisible) controlsTimer = setTimeout(() => (showControls = false), 1800);
  }

  function resetPlayback() {
    cancelAnimationFrame(progressFrame);
    clearInterval(bandcampTimer);
    progress = 0;
    bandcampVisible = false;
    bandcampSrc = '';
    soundcloudSrc = '';
    if (youtubePlayer?.stopVideo) youtubePlayer.stopVideo();
    youtubeVisible = false;
    playbackType = null;
  }

  function updateYoutubeProgress() {
    const duration = youtubePlayer?.getDuration?.() || 0;
    const current = youtubePlayer?.getCurrentTime?.() || 0;
    progress = duration ? Math.min((current / duration) * 100, 100) : 0;
    if (youtubePlayer?.getPlayerState?.() === window.YT?.PlayerState?.PLAYING) {
      progressFrame = requestAnimationFrame(updateYoutubeProgress);
    }
  }

  function finishTrack() {
    const track = tracks[activeIndex];
    if (playbackType === 'youtube' && track?.after?.type === 'bandcamp') {
      playBandcamp(track.after, activeIndex);
      return;
    }
    if (playbackType === 'bandcamp' && track?.after?.type === 'youtube') {
      playYoutube(track.after.id, activeIndex);
      return;
    }
    progress = 100;
    youtubeVisible = false;
    bandcampVisible = false;
    playbackType = null;
  }

  function playYoutube(id, index) {
    activeIndex = index;
    playbackType = 'youtube';
    youtubeVisible = true;
    bandcampVisible = false;
    revealControls();
    if (!youtubeReady || !youtubePlayer) {
      pendingYoutube = { id, index };
      return;
    }
    youtubePlayer.loadVideoById(id);
    youtubePlayer.unMute();
    youtubePlayer.setVolume(100);
  }

  function playBandcamp(track, index) {
    activeIndex = index;
    playbackType = 'bandcamp';
    youtubeVisible = false;
    bandcampVisible = true;
    progress = 0;
    bandcampSrc = `https://bandcamp.com/EmbeddedPlayer/album=${track.album}/size=large/bgcol=ffffff/linkcol=2ebd35/tracklist=false/artwork=small/track=${track.track}/transparent=true/autoplay=1/`;
    const started = performance.now();
    clearInterval(bandcampTimer);
    bandcampTimer = setInterval(() => {
      progress = Math.min(((performance.now() - started) / 1000 / track.duration) * 100, 100);
      if (progress >= 100) {
        clearInterval(bandcampTimer);
        finishTrack();
      }
    }, 120);
  }

  function playSoundcloud(track, index) {
    activeIndex = index;
    playbackType = 'soundcloud';
    youtubeVisible = false;
    bandcampVisible = false;
    progress = 0;
    soundcloudSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`;
  }

  function playTrack(index) {
    resetPlayback();
    activeIndex = index;
    const track = tracks[index];
    if (track.type === 'youtube') playYoutube(track.id, index);
    if (track.type === 'bandcamp') playBandcamp(track, index);
    if (track.type === 'soundcloud') playSoundcloud(track, index);
  }

  function playNext() {
    playTrack((activeIndex + 1 + tracks.length) % tracks.length);
  }

  onMount(() => {
    document.body.classList.add('radio-route');
    loadScript('https://www.youtube.com/iframe_api', 'youtube-api');
    window.onYouTubeIframeAPIReady = () => {
      youtubePlayer = new window.YT.Player('youtube-player', {
        width: '100%',
        height: '100%',
        videoId: tracks[0].id,
        playerVars: { autoplay: 1, controls: 1, disablekb: 1, modestbranding: 1, mute: 1, playsinline: 1, rel: 0 },
        events: {
          onReady: () => {
            youtubeReady = true;
            if (pendingYoutube) {
              const { id, index } = pendingYoutube;
              pendingYoutube = null;
              playYoutube(id, index);
            } else {
              activeIndex = 0;
              youtubeVisible = true;
              playbackType = 'youtube';
              youtubePlayer.mute();
              youtubePlayer.playVideo();
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) updateYoutubeProgress();
            if (event.data === window.YT.PlayerState.ENDED) finishTrack();
          }
        }
      });
    };

    const keydown = (event) => {
      if ((event.code === 'Space' || event.key === ' ') && !event.repeat) {
        event.preventDefault();
        playNext();
      }
    };
    window.addEventListener('keydown', keydown);
    window.addEventListener('mousemove', revealControls);
    window.addEventListener('touchstart', revealControls, { passive: true });

    return () => {
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('mousemove', revealControls);
      window.removeEventListener('touchstart', revealControls);
      resetPlayback();
      document.body.classList.remove('radio-route');
    };
  });
</script>

<svelte:head>
  <title>TBD Radio</title>
  <meta name="description" content="TBD Ultramagazine audiovisual radio" />
</svelte:head>

<main class:concealed={youtubeVisible && !showControls} class="controls" aria-label="Audio tracks">
  {#each tracks as _, index}
    <button
      class:active={activeIndex === index}
      class="track-button"
      type="button"
      on:click={() => playTrack(index)}
      aria-label={`Track ${index + 1}`}
    >
      <span class="track-button__progress" style:width={activeIndex === index ? `${progress}%` : '0%'}></span>
      <span class="track-button__label">{index + 1}</span>
    </button>
  {/each}
</main>

<div class:visible={youtubeVisible} class="youtube-host" aria-hidden={!youtubeVisible}>
  <div id="youtube-player"></div>
</div>
<div class="motion-layer" on:mousemove={revealControls} on:touchstart={revealControls}></div>
<div class:visible={bandcampVisible} class="bandcamp-host" aria-hidden={!bandcampVisible}>
  <iframe src={bandcampSrc} title="Bandcamp player" allow="autoplay" loading="lazy"></iframe>
</div>
<div class="soundcloud-host" aria-hidden="true">
  <iframe src={soundcloudSrc} title="SoundCloud player" allow="autoplay" loading="lazy"></iframe>
</div>

<style>
  :global(body.radio-route) {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    overflow: hidden;
    background: #101113;
    font-family: Arial, Helvetica, sans-serif;
  }
  .controls {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    width: min(92vw, 920px);
    opacity: 1;
    transition: opacity 260ms ease;
  }
  .controls.concealed { opacity: 0; pointer-events: none; }
  .track-button {
    position: relative;
    width: 72px;
    height: 72px;
    border: 0;
    border-radius: 999px;
    padding: 0;
    overflow: hidden;
    flex: 0 0 auto;
    background: #f4f1e8;
    color: #101113;
    cursor: pointer;
    box-shadow: 0 16px 42px rgba(0, 0, 0, 0.26);
    transition: width 260ms ease, transform 180ms ease, box-shadow 180ms ease;
  }
  .track-button:hover, .track-button:focus-visible { transform: translateY(-2px); outline: none; box-shadow: 0 20px 52px rgba(0, 0, 0, 0.26); }
  .track-button.active { width: 230px; background: #fff; }
  .track-button__progress { position: absolute; inset: 0 auto 0 0; background: #2f8f73; transition: width 120ms linear; }
  .track-button__label { position: relative; z-index: 1; display: grid; place-items: center; width: 100%; height: 100%; font-size: 18px; font-weight: 700; mix-blend-mode: multiply; user-select: none; }
  .youtube-host { position: fixed; inset: 0; z-index: 1; width: 100vw; height: 100vh; visibility: hidden; background: #000; }
  .youtube-host.visible { visibility: visible; }
  .youtube-host :global(iframe) { width: 100%; height: 100%; border: 0; }
  .motion-layer { position: fixed; inset: 0; z-index: 2; background: transparent; }
  .bandcamp-host { position: fixed; left: 50%; bottom: 28px; z-index: 4; width: 400px; height: 120px; max-width: calc(100vw - 32px); opacity: 0; visibility: hidden; pointer-events: none; transform: translateX(-50%) translateY(10px); transition: opacity 220ms ease, transform 220ms ease; }
  .bandcamp-host.visible { opacity: 1; visibility: visible; pointer-events: auto; transform: translateX(-50%); }
  .bandcamp-host iframe { width: 100%; height: 120px; border: 0; }
  .soundcloud-host { position: fixed; left: -420px; bottom: 140px; width: 400px; height: 166px; opacity: 0; pointer-events: none; }
  .soundcloud-host iframe { width: 400px; height: 166px; border: 0; }
  @media (max-width: 720px) {
    .controls { gap: 10px; }
    .track-button { width: 44px; height: 44px; }
    .track-button.active { width: 132px; }
    .track-button__label { font-size: 14px; }
  }
</style>