<script lang="ts">
    import { browser } from '$app/environment';
    import { writable } from 'svelte/store';

    const defaultTheme = "light";
    const initialValue = browser ? window.localStorage.getItem('theme') ?? defaultTheme : defaultTheme;

    const theme = writable<string>(initialValue);
    theme.subscribe((value)=> {
        if (browser) {
            window.localStorage.setItem('theme', value);
            document.body.dataset.theme = value;
        }
    })

    const applyThemePreference = () => { 
        if (browser && !window.localStorage.getItem('theme')) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme.set('dark');
            }

            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                theme.set('light');
            }
        }
    }

    const toggleTheme = () => {
        if ($theme === 'dark') {
            theme.set('light');
        } else {
            theme.set('dark');
        }
    };

    applyThemePreference();
</script>

<button on:click={toggleTheme} class="btn btn-sm bg-transparent btn-ghost outline-none btn-square m-2">
    <i class="material-icons">dark_mode</i>
</button>
