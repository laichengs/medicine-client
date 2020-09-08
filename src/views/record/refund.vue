<template>
  <div class="container">
    <div class="filter-container" style="margin-bottom:10px;">
      <el-date-picker
        v-model="date"
        value-format="timestamp"
        size="small"
        style="width:250px"
        type="daterange"
        range-separator="-"
        start-placeholder="退款时间"
        end-placeholder="结束日期"
      />
      <el-button
        style="margin-left:10px;"
        size="small"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >查询</el-button>
      <el-button size="small" class="filter-item" icon="el-icon-refresh" @click="resetFilter">重置</el-button>
    </div>
    <el-table :data="tableData" size="small" border v-loading="loading" style="width: 100%">
      <el-table-column
        header-cell-class-name="head"
        highlight-current-row
        label="序号"
        align="center"
        prop="type"
        width="60"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + (listQuery.page-1)*listQuery.limit + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="serialNo" label="退款编号"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名"></el-table-column>
      <el-table-column align="center" prop="phone" label="手机"></el-table-column>
      <el-table-column align="center" prop="orderTime" label="下单日期"></el-table-column>
      <el-table-column align="center" prop="createTime" label="退款时间"></el-table-column>
      <el-table-column align="center" prop="amount" label="金额"></el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="init"
    />
  </div>
</template>
<script>
import { getRecords, getRefundRecords } from '../../api/record'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      colors: ['primary', 'success', 'danger', 'info', 'warning'],
      listQuery: {
        page: 1,
        limit: 8,
        startDate: 0,
        endDate: 2000000000,
      },
      date: [],
      loading: true,
      statusList: [],
      times: [],
      tableData: [],
      doctors: [],
      total: 0,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.loading = true
      if (this.date.length > 0) {
        this.listQuery.startDate = this.date[0] / 1000
        this.listQuery.endDate = this.date[1] / 1000 + 24 * 3600
      }
      const result = await getRefundRecords(this.listQuery)
      this.loading = false
      this.tableData = result.content
      this.total = result.total
    },
    handleFilter() {
      this.init()
    },
    resetFilter() {
      this.listQuery = {
        page: 1,
        limit: 8,
        startDate: 0,
        endDate: 2000000000,
      }
      this.init()
    },
  },
}
</script>
<style lang="scss" scoped>
</style>