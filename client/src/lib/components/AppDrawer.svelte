<script lang="ts">

</script>

<div class="drawer drawer-mobile">
    <input id="sidebar-toggle" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <slot/> 
    </div>
    <div class="drawer-side">
      <label for="sidebar-toggle" class="drawer-overlay"></label> 
      <ul class="menu p-4 w-24 bg-base-100 text-base-content">
        <slot name="sidebar"/>
      </ul>
    </div>
</div>