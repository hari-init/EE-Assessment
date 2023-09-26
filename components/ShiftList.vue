<template >
    <div class="overview">
        <span>
            <h1>Filter</h1>
            <o-field>
                <o-slider :rounded="true" :min="0" :max="5" :tooltip="false" v-model="filterVal">
                    <o-slider-tick :value="0">$0</o-slider-tick>
                    <o-slider-tick :value="1">$100</o-slider-tick>
                    <o-slider-tick :value="2">$200</o-slider-tick>
                    <o-slider-tick :value="3">$300</o-slider-tick>
                    <o-slider-tick :value="4">$400</o-slider-tick>
                    <o-slider-tick :value="5">$500</o-slider-tick>
                </o-slider>
            </o-field>
        </span>
        <span class="create-cta">
            <h1>Shifts</h1>
            <o-button variant="primary" @click="store.toggleSideBar">ADD SHIFT</o-button>
        </span>
        <span v-if="shiftData.length">
            <span v-for="item, i in shiftData">
                <ShiftCard :shiftData="item" :key="i" :id="i" />
            </span>
        </span>
        <span v-else>
            <p>No shift has been added. Please add!</p>
        </span>

    </div>
</template>
<script setup  lang="ts">
import { useMainStore } from '../store/index';
const store = useMainStore();
const filterVal = ref(0);

/**
 * This computed function adds the filter functionality 
 * filter the value less than or equal to the selected value 
 * from the slider
 */
const shiftData = computed(() => {
    if (filterVal.value) {
        let temp = [];
        for (let i = 0; i < store.shiftList.length; i++) {
            if (store.shiftList[i].schedule) {
                for (const key in store.shiftList[i].schedule) {
                    if (Object.prototype.hasOwnProperty.call(store.shiftList[i].schedule, key)) {
                        if (store.shiftList[i].schedule[key].price <= (filterVal.value * 100) ) {
                            temp.push(store.shiftList[i]);
                            break;
                        }
                    }
                }
            }

        }
        return temp
    } else {
        return store.shiftList
    }
});
</script>