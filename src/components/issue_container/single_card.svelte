<script>
let { issueData } = $props();

import { goto } from '$app/navigation';
</script>

<div class="card rounded_button" onclick={() => goto(`/issues/${issueData?.issueTitle}`)}>
    <button aria-label="Go to issue" ></button>
    <div class="card_image_container">
      <img src={issueData?.issueCover} alt="">
    </div>
    <div class="card_text_container">
      <p class="p1" style="font-weight: 600;">
        {issueData?.issueTitle}
      </p>
      <p class="p3">
        {issueData?.issueHeroText}
      </p>
    </div>
  </div>

<style>
  .card {
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;

  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
  opacity: 50%;

  grid-column: span 6;
  height: 240px;
  border: 1px solid var(--white-blue);
  border-radius: 15px;
  column-gap: 0px;
  overflow: hidden;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
  background-color: var(--black-white);
}

.card:hover {
  transform: translateY(-5%);
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: 100%;
  color: var(--white-blue);
  grid-column: span 8;
  transition: grid-column 0.3s ease-in-out;
}

.card_image_container {
  width: 35%;
  height: 100%;
  overflow: hidden;
  border-right: 1px solid white;
}

.card_image_container img {
  width: 100%;
  height: 100%;
}

.card_text_container {
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 100%;
  padding: var(--spacing-m) var(--spacing-s);
  row-gap: var(--spacing-s);
  margin: 0;
}

.card_text_container > .p3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: 480px) {
  .card {
    grid-column: span 2;
    height: fit-content;
    border-radius: 10px;

    margin: 0px;
    padding-bottom: 0px;
    column-gap: 0px;

    display: flex;
    position: relative;
    flex-direction: row;

    width: 100%;
    opacity: 100%;
    
  }

  .card_image_container {
    width: 30%;
    height: 160px;
    overflow: hidden;
    border: 0px;
    border-right: 1px solid var(--white-blue);
  }

  .card_image_container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 4/3;
    padding: 0px;
    margin: 0px;
  }

  .card_text_container {
    display: flex;
    flex-direction: column;
    width: 70%;
    height: fit-content;
    padding: var(--spacing-s);
    row-gap: var(--spacing-s);
    margin: 0;
  }
}
</style>