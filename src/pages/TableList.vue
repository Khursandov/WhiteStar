<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title" :subTitle="table1.subTitle">
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="table1.data" :columns="table1.columns">

            </paper-table>
          </div>
        </card>
      </div>

      <!-- <div class="col-12">
        <card class="card-plain">
          <div class="table-full-width table-responsive">
            <paper-table type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data"
                         :columns="table2.columns">

            </paper-table>
          </div>
        </card>
      </div> -->

    </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = ["Id", "Project", "Salary", "Duration", "Start", "End"];
let tableData = [
  // {
  //   id: 1,
  //   project: "Logo design",
  //   salary: "100 000",
  //   duration: '2000',
  //   start: "2019 08 12",
  //   end: "2019 08 13"
  // },
];

export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table1: {
        title: "All projects",
        subTitle: "Here is a subtitle for this table",
        columns: [...tableColumns],
        data: [...tableData]
      },
      // table2: {
      //   title: "Table on Plain Background",
      //   subTitle: "Here is a subtitle for this table",
      //   columns: [...tableColumns],
      //   data: [...tableData]
      // }
    }
  },
  methods: {
    async aa ( ) {
      let promise = new Promise((resolve, reject) => {
        this.$store.dispatch('getCurrentDayProjects')
      })
      let result = await promise;
    }
  },
  created ( ) {
    this.aa()
  },
};
</script>
<style>
</style>
