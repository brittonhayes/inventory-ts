<script lang="ts">
  export let message: string;
  export let vertical: 'top' | 'middle' | 'bottom' = 'bottom';
  export let horizontal: 'start' | 'center' | 'end' = 'end';
  export let type: 'info' | 'error' | 'success' = 'info';
</script>

<div class="toast-{vertical} toast-{horizontal} bottom-3 fixed">
  <div class="alert alert-{type}">
    <div>
      <span>{message}</span>
    </div>
  </div>
</div>