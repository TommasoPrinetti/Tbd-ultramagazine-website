<script>
    let { category } = $props();
</script>

<div id={category} class="divider vertical_flex">
   <hr>
    <h3>
      {category}
    </h3>
</div>


<style>
.divider {
  width: 100%;
  height: fit-content;
  padding: var(--spacing-m) 0px;
}

hr {
  width: 100%;
  height: 2px;
  background-color: var(--white-blue);
  border: none;
  opacity: 0.5;
}

.divider h3 {
  text-transform: uppercase;
  opacity: 0.5;
  padding: 0px var(--spacing-m);
}

@media screen and (max-width: 480px) {
  .divider {
    height: fit-content;
    border-style: solid;
    row-gap: var(--spacing-m);
    border-width: 1px 0px 0px 0px;
    padding: var(--spacing-s);
  }

  .divider h3 {
    padding: 0px;
  }

  hr {
    display: none;
  }
}

</style>