<template>
    <div class="date-card">
        <p>{{ new Date(props.id).toLocaleDateString()}}</p>
        <p>{{ props.schData.startTime }}</p>
        <p>{{ props.schData.endTime }}</p>
        <p>{{ props.schData.type }}</p>
        <p>${{ props.schData.price }}</p>
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['schData', 'id'])
</script>