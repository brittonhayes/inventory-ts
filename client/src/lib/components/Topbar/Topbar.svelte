<script lang="ts">
	import IconButton from '@smui/icon-button';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	export let title: string;
</script>

<div class="top-app-bar-container">
	<TopAppBar variant="standard" color="primary">
		<Row>
			<Section class="">
				<IconButton class="material-icons" href="/">spa</IconButton>
				<Title>{title}</Title>
			</Section>
		</Row>
	</TopAppBar>
</div>

<style>
	/* Hide everything above this component. */
	/* :global(#smui-app),
  	:global(body),
  	:global(html) {
		display: block !important;
		height: auto !important;
		width: auto !important;
		position: static !important;
  	} */
	.top-app-bar-container {
		width: 100%;
		height: 50px;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
