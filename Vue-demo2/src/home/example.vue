<template>
  <div>
    <table>
      <thead>
      <tr>
        <th v-for="key in gridColumns" @click="sortBy(key)" :class="{ active: sortKey == key }">
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="entry in filteredData">
        <td v-for="key in gridColumns">
          {{entry[key]}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
      name: "example",
      props: ['searchQuery','gridColumns','gridData'],
      data: function () {
        var sortOrders = {}
        this.gridColumns.forEach(function (key){
          sortOrders[key] = 1
        })
        return {
          sortKey: '',
          sortOrders: sortOrders
        }
      },
      computed: {
        filteredData: function () {
          var sortKey = this.sortKey
          var filterKey = this.searchQuery && this.searchQuery.toLowerCase()
          var order = this.sortOrders[sortKey] || 1
          var data = this.gridData
          if (filterKey) {
            data = data.filter(function (row) {
              return Object.keys(row).some(function (key) {
                return String(row[key]).toLowerCase().indexOf(filterKey) > -1
              })
            })
          }
          if (sortKey) {
            data = data.slice().sort(function (a, b) {
              a = a[sortKey]
              b = b[sortKey]
              return (a === b ? 0 : a > b ? 1 : -1) * order
            })
          }
          return data
        }
      },
      filters: {
        capitalize: function (str) {
          return str.charAt(0).toUpperCase() + str.slice(1)
        }
      },
      methods: {
        sortBy: function (key) {
          this.sortKey = key
          this.sortOrders[key] = this.sortOrders[key] * -1
        }
      }
    }
</script>

<style scoped>

</style>
