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
        border: 0.5px solid var(--white-blue);
        transition: background-color 1.4s, color 0.2s;
        background-color: var(--black-white);
    }

    :global(.rounded_button:hover) {
        color: var(--black-white);
        background-color: var(--white-blue);
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