import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  /**
   * Store's initial state
   * @ShiftList holds the List of shift data that appear in the overview.
   * @showSideBar its a flag, used to toggle the side bar based on the user click.
   * @isEditFlow its a flag, determine wether the user is going with ADD NEW or EDIT shift.
   * @currCardID holds the id of card which we are currently editing.
   * @editData contains the copy of whole existing data of card which we are currently editing.
   * to fill up the input fields
   */
  const shiftList: any = ref([]);
  const showSideBar: any = ref(false);
  const isEditFlow: any = ref(false);
  const currCardID: any = ref("");
  const editData: any = ref({
    header: {
      title: "",
      description: "",
    },
    dateRange: [],
    schedule: {},
  });

  /**
   * @function toggleSideBar is used to switch the side bar with user action
   * @param data holds the data of card that we are editing
   * @param id helps to find the card and remove it in @shiftList - the overview.
   */
  function toggleSideBar(data?: any, id?: any) {
    isEditFlow.value = false;
    currCardID.value = "";
    showSideBar.value = !showSideBar.value;
    if (data && data?.header?.title && showSideBar) {
      isEditFlow.value = true;
      currCardID.value = id;
      editData.value = { ...data };
    } else {
      isEditFlow.value = false;
      currCardID.value = "";
    }
  }

  /**
   * @function addToShiftList is used to add the data in overview list
   * from the data which are entered in sideBar input fields.
   * @param data  carries the data from input fields in sidebar.
   */
  function addToShiftList(data: any) {
    shiftList.value.push({ ...data });
  }

  return {
    shiftList,
    showSideBar,
    isEditFlow,
    editData,
    currCardID,
    toggleSideBar,
    addToShiftList,
  };
});
