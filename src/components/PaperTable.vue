<template>
  <div v-if="!this.$store.state.isLoading">
    <table class="table" :class="tableClass">
      <thead>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{column}}</th>
      </slot>
      </thead>
      <tbody>
      <tr v-for="(item, index) in lists" :key="index">
        <slot :row="item">
          <td v-for="(column, index) in columns"
              :key="index"
          >
            {{itemValue(item, column)}}
          </td>
        </slot>
      </tr>
      </tbody>
    </table>
    <table class="table" :class="tableClass">
      <thead>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{column}}</th>
      </slot>
      </thead>
      <tbody>
      <tr v-for="(item, index) in lists1" :key="index">
        <slot :row="item">
          <td v-for="(column, index) in columns"
              :key="index"
          >
            {{itemValue(item, column)}}
          </td>
        </slot>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'paper-table',
  props: {
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      lists: [],
      lists1: []
    }
  },
  beforeCreate ( ) {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth()+1
    console.log(day, month)
    setTimeout(() => {
      this.lists = []
      console.log('11111',this.$store.state.userProjects )
        this.$store.state.userProjects.forEach((element, index) => {
          let data = element.start.split(" ")
          element.duration = JSON.stringify(element.duration).replace(/[{,}""]/g,' ')
          element.duration = element.duration.replace(/]/g, ' ').replace(/\[/g, ' ')
          element.id = index
          if (data[0].split("-")[1] === month.toString() && data[0].split("-")[2] === day.toString()) {
            this.lists.push(element)
            console.log('22222',this.lists)
          }
        });
    }, 2000)
    setTimeout(() => {
      this.lists = []
      console.log('11111',this.$store.state.userProjects )
        this.$store.state.userProjects.forEach((element, index) => {
          let data = element.start.split(" ")
          element.duration = JSON.stringify(element.duration).replace(/[{,}""]/g,' ')
          element.duration = element.duration.replace(/]/g, ' ').replace(/\[/g, ' ')
          element.id = index
            this.lists1.push(element)
            console.log('22222',this.lists)
        });
    }, 2000)
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    }
  },
};
</script>
<style>
</style>
