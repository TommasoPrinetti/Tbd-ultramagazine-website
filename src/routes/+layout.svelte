<script>
    import '$lib/styles/style.css';
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    inject({ mode: dev ? 'development' : 'production' });
</script>

<slot />

<style>

    :global(*) {
        margin: 0px;
        padding: 0px;
        text-wrap: pretty;
    }

    :global(.base_grid) {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(16, 1fr);
        row-gap: var(--spacing-m);
        column-gap: var(--spacing-m);
        grid-auto-flow: column;
    }

    :global(img, picture) {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    :global(.vertical_flex) {
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-s);
    }

    :global(a, button) {
        text-decoration: none;
        color: var(--white-blue);
        cursor: pointer;
        background-color: transparent;
        border: none;
    }

    :global(.rounded_button) {
        display: flex;
        padding: 6px 10px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        width: fit-content;
        border-radius: 20px;
        border: 0.5px solid var(--white-white);
        transition: background-color 0.3s, color 0.2s;
        background-color: var(--black-blue);
    }

    :global(.rounded_button > p) {
        color: var(--white-white);
    }

    :global(.rounded_button:hover) {
        background-color: var(--white-white);
    }

    :global(.rounded_button:hover > p) {
        color: var(--black-blue);
    }


    :global(.buybuttons) {
    display: flex;
    flex-direction: column;
    }

    :global(.buybuttons > button:nth-child(1)) {
    transform: rotate(-2.78deg);
    margin-top: -2%;
    }

    :global(.buybuttons > button:nth-child(2)) {
    transform: rotate(6.43deg);
    margin-top: -1%;
    }

    :global(.buybuttons > button:nth-child(3)) {
    transform: rotate(-4deg);
    margin-top: -3%;
    }

    :global(.buybuttons > button:nth-child(4)) {
    transform: rotate(2.3deg);
    margin-top: -2%;
    }

    :global(.buybuttons > button:nth-child(5)) {
    transform: rotate(-3deg);
    margin-top: -1%;
    }

    :global(.buybuttons > :nth-child(6)) {
    transform: rotate(-3deg);
    margin-top: 3%;
    }

    :global(::selection) {
        background-color: var(--white-blue);
        color: var(--black-white);
    }

    :global(a:-webkit-any-link) {
        color: inherit;
        text-decoration: none;
    }
    :global(a:any-link) {
        color: inherit;
        text-decoration: none;
    }
    :global(a:hover) {
        color: inherit;
        text-decoration: none;
    }
    :global(a:active) {
        color: inherit;
        text-decoration: none;
    }
    :global(a:visited) {
        color: inherit;
        text-decoration: none;
    }

    :global(p) {
        white-space: pre-wrap;
        hyphens: auto;
        -ms-hyphens: auto;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        word-break: break-word;
    }


    @media screen and (max-width: 480px) {
        :global(.buybuttons) {
            flex-direction: row;
            margin-top: var(--spacing-xs);
        }

        :global(.index_container .buybuttons) {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
        }
    }

    @media screen and (max-width: 480px) {
        :global(.base_grid) {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-flow: row;
        }
    }

</style>