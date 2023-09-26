<template>
    <div class="date-card-large">
        <span class="date-card-title">
            <p>{{props.schData.dateRange[props.index].toLocaleDateString()}}</p>
            <span @click="removeDate">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z" />
                </svg>
            </span>
        </span>
        <div class="date-card-content">
            <span class="date-inputs">
                <o-field label="StartTime">
                    <o-input type="time" v-model="currentSch.startTime"></o-input>
                </o-field>
                <o-field label="EndTime">
                    <o-input type="time" v-model="currentSch.endTime"></o-input>
                </o-field>
                <o-field label="Price">
                    <o-input type="number" v-model="currentSch.price"></o-input>
                </o-field>
            </span>
            <span class="select-input">
                <o-field label="Simple">
                    <o-select placeholder="Select a name" v-model="currentSch.type">
                        <option value="Consultation">Consultation</option>
                        <option value="Telephone">Telephone</option>
                        <option value="Ambulance">Ambulance</option>
                    </o-select>
                </o-field>
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['schData','index']);
const currentSch = props.schData.schedule[props.schData.dateRange[props.index]];

/**
 * @function removeDate used to remove the card from the Overview List 
 * based on ID of the current card
 */
const removeDate = () => {
    delete props.schData.schedule[props.schData.dateRange[props.index]];
    props.schData.dateRange.splice(props.index, 1);
}
</script>