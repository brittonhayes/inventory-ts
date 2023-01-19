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

<label class={$$props.class + " swap swap-rotate btn btn-ghost opacity-50 hover:opacity-100 btn-square"}>
    <!-- this hidden checkbox controls the state -->
    <input type="checkbox" on:click={toggleTheme} checked={$theme === 'dark'} />
    <!-- moon icon -->
    <i class="swap-on material-icons">light_mode</i>
    <!-- sun icon -->
    <i class="swap-off material-icons">dark_mode</i>
</label>
