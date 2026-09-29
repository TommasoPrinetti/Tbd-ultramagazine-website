<script>
  const TbdLogo = '/IDENTITY_IMAGES/tbd_LOGO.webp';
</script>

<div class="landing_hero">
    <img src={TbdLogo} alt="TBD Logo">
</div>

<style>

.landing_hero {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.landing_hero img {
  height: auto;
  width: 80%;
}

@media screen and (max-width: 480px) {
  .landing_hero {
    height: 90vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .landing_hero img {
    height: auto;
    width: 50%;
  }
}
</style>