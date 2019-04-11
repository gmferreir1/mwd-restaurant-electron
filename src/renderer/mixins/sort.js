export default {
  data() {
    return {
      data_sort: {
        sort_by: 'name',
        sort_order: 'asc'
      },
      data_list: {
        data: []
      }
    }
  },
  methods: {
    sort(sortBy = null, useSorted = true) {

      const collection = collect(this.points_and_routers)

      if (useSorted) {
        this.data_sort.sort_order = this.data_sort.sort_order === 'asc' ? 'desc' : 'asc'
        this.data_sort.sort_by = !sortBy ? this.data_sort.sort_by : sortBy
      }

      let sort


      if (this.data_sort.sort_order === 'asc') {
        sort = collection.sortBy(sortBy)
      } else {
        sort = collection.sortByDesc(sortBy)
      }

      this.data_list.data = sort.all()
    }
  }
}