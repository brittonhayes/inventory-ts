<script lang="ts">
    let title = 'Maintenance';
    let subtitle = 'Vehicle maintenance tasks and guides.';
</script>

<div class="grid gap-24 grid-cols-2">
    <div class="col-span-1">
        <h1 class="text-3xl font-bold">{title}</h1>
        <p class="text-gray-500">{subtitle}</p>
    </div>
    <div class="col-span-1">
        <div class="flex justify-end">
            <div class="p-5">
                <a href="/maintenance/create-task" class="btn gap-2 btn-outline">
                    <i class="material-icons">add_box</i>
                    <span>Create task</span>
                </a>
                <a href="/maintenance/create-guide" class="btn gap-2 btn-outline">
                    <i class="material-icons">add_box</i>
                    <span>Create guide</span>
                </a>
            </div>           
        </div>
    </div>
</div>