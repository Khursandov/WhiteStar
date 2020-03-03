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
      lists: []
    }
  },
  beforeCreate ( ) {
    setInterval(() => {
      this.lists = []
        this.$store.state.userProjects.forEach((element, index) => {
          let data = element.start.split(" ")
          element.id = index
          console.log(element)
          this.lists.push(element)
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
