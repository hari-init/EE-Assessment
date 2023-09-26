<template>
    <section class="sidebar">
        <o-sidebar :fullheight="true" :overlay="true" :right="true" :open="store.showSideBar">
            <span class="sidebar-title">
                <h2>Create/Edit</h2>
                <span @click="clearData">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor"
                            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z" />
                    </svg>
                </span>
            </span>
            <o-field label="Title*" class="mb-20" :variant="isError && !scheduleDetails.header.title ? 'danger' : ''"
                :message="isError && !scheduleDetails.header.title ? 'Please give Title' : ''">
                <o-input maxlength="100" placeholder="Enter Title" v-model="scheduleDetails.header.title"></o-input>
            </o-field>
            <o-field label="Description" class="mb-20">
                <o-input placeholder="Enter Description" maxlength="500" type="textarea"
                    v-model="scheduleDetails.header.description"></o-input>
            </o-field>
            <o-field label="Select a date*" class="mb-20"
                :variant="isError && !scheduleDetails.dateRange.length ? 'danger' : ''"
                :message="isError && !scheduleDetails.dateRange.length ? 'Please give at least one date' : ''">
                <o-datepicker multiple placeholder="Click to select..." v-model="scheduleDetails.dateRange"
                    @change="dateSelectionHandler">
                </o-datepicker>
            </o-field>
            <o-field v-if="scheduleDetails.dateRange.length">
                <span class="sc-style">
                    <ScheduleCard v-for="item, i in scheduleDetails.dateRange" :schData="scheduleDetails" :index="i" />
                </span>
            </o-field>
            <o-field>
                <span class="sidebar-cta">
                    <o-button v-if="store.isEditFlow" variant="primary" class="cancel-cta" outlined
                        @click="deleteCard">Delete</o-button>
                    <o-button v-else variant="primary" class="cancel-cta" outlined @click="clearData">Cancel</o-button>
                    <o-button variant="primary" class="save-cta" @click="saveToList">Save</o-button>
                </span>
            </o-field>
        </o-sidebar>
        <br />
    </section>
</template>
<script setup lang="ts">
import { useMainStore } from '../store/index';
const store = useMainStore();
const isError = ref(false);
const scheduleDetails: any = reactive({
    header: {
        title: "",
        description: "",
    },
    dateRange: [],
    schedule: {}
})

/**
 * @function watch, watches the reactivity of @isEditFlow (which tells the user flow.)
 * and clears the entered data, which are entered on ADD NEW flow or EDIT flow.
 */
watch(() => store.isEditFlow, () => {
    if (store.isEditFlow) {
        scheduleDetails.header = store.editData.header;
        scheduleDetails.dateRange = store.editData.dateRange;
        scheduleDetails.schedule = store.editData.schedule;
    }
})

/**
 * Reactive on the date range, which add the schedule card
 * when user selects the date from the calender(oruga UI)
 */
const dateSelectionHandler = computed(() => {
    if (scheduleDetails.dateRange.length) {
        for (let i = 0; i < scheduleDetails.dateRange.length; i++) {
            if (!scheduleDetails.schedule[scheduleDetails.dateRange[i]]) {
                scheduleDetails.schedule[scheduleDetails.dateRange[i]] = {
                    startTime: '',
                    endTime: '',
                    type: '',
                    price: ''
                }
            }
        }
    }
})

/**
 * @function saveToList, provides the basic validation and 
 * also add the validated data to the list view, once the data added
 * sideBar will close and the date entered will be cleared with the help of @function clearData
 */
const saveToList = () => {
    for (const key in scheduleDetails) {
        if (Object.prototype.hasOwnProperty.call(scheduleDetails, key)) {
            if (!scheduleDetails.header['title']) {
                isError.value = true;
                break;
            } else if (!scheduleDetails['dateRange'].length) {
                isError.value = true;
                break;
            }
            else {
                isError.value = false;
            }
        }
    }
    !isError.value && !store.isEditFlow && store.addToShiftList(scheduleDetails);
    clearData()
}

/**
 * @function clearData helps to clear the entered data from the store.
 */
const clearData = () => {
    store.toggleSideBar();
    scheduleDetails.header = {
        title: '',
        description: ''
    }
    scheduleDetails.dateRange = [];
    scheduleDetails.schedule = {};
}

/**
 * @function deleteCard helps to delete the schedule card from the sideBar.
 */
const deleteCard = () => {
    store.shiftList.splice([store.currCardID], 1);
    clearData()
}

</script>