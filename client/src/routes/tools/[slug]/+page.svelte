<script lang="ts">
    import Paper, {Title, Content, Subtitle} from '@smui/paper';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<main>
    <Paper variant="raised">
        <Title>Equipment</Title>
        <Subtitle>This is a sheet of paper.</Subtitle>
        <Content>Paper is used to build an elevated surface.</Content>
    </Paper>
</main>