<template>
  <div class="container">
    <div class="filter-container" style="margin-bottom:10px;">
      <el-input
        v-model="listQuery.phone"
        style="margin-bottom:10px;width: 130px;"
        size="small"
        placeholder="请输入手机号码"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        style="margin-left:10px;width: 150px;"
        v-model="listQuery.status"
        size="small"
        filterable
        placeholder="请选择状态"
        clearable
        class="filter-item"
      >
        <el-option v-for="item in statusList" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
      <el-select
        style="margin-left:10px;width: 150px;"
        v-model="listQuery.doctorId"
        size="small"
        filterable
        placeholder="请选择医生"
        clearable
        class="filter-item"
      >
        <el-option v-for="item in doctors" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-date-picker
        style="margin-left:10px;width: 150px;"
        v-model="listQuery.date"
        value-format="timestamp"
        size="small"
        type="date"
        range-separator="-"
        placeholder="选择日期"
      />
      <el-select
        v-model="listQuery.timeId"
        size="small"
        filterable
        placeholder="请选择时间"
        style="margin-left:10px;width: 150px;"
        clearable
        class="filter-item"
      >
        <el-option v-for="item in times" :key="item.id" :label="item.time" :value="item.id" />
      </el-select>
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
      <el-table-column align="center" prop="serialNo" label="编号" width="120"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="60"></el-table-column>
      <el-table-column align="center" prop="phone" label="手机" width="100"></el-table-column>
      <el-table-column align="center" prop="orderDate" label="日期" width="90"></el-table-column>
      <el-table-column align="center" prop="doctor" label="医生" width="60"></el-table-column>
      <el-table-column align="center" prop="time" label="时间" width="90"></el-table-column>
      <el-table-column align="center" prop="amount" label="金额" width="50"></el-table-column>
      <el-table-column align="center" prop="createTime" label="下单时间" width="140"></el-table-column>
      <el-table-column align="center" prop="des" label="病例简述"></el-table-column>
      <el-table-column align="center" prop="statusTitle" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="colors[scope.row.status]">{{scope.row.statusTitle}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" prop="referrer" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            v-if="scope.row.status==2"
            @click="showAddBox(scope.row.id, scope.row.customer_type_id)"
          >未报到</el-button>
          <el-button
            size="mini"
            v-if="scope.row.status==2"
            @click="showAddBox(scope.row.id, scope.row.customer_type_id)"
          >就诊</el-button>
        </template>
      </el-table-column>
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
import { getRecords } from '../../api/record'
import { getDoctors, getStatus, getTimes } from '../../api/common'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      colors: ['primary', 'success', 'danger', 'info', 'warning'],
      listQuery: {
        page: 1,
        limit: 8,
      },
      loading: true,
      statusList: [],
      times: [],
      tableData: [],
      doctors: [],
      total: 0,
    }
  },
  mounted() {
    getTimes().then((res) => {
      this.times = res
    })
    getStatus().then((res) => {
      this.statusList = res
    })
    getDoctors().then((res) => {
      this.doctors = res
    })
    this.init()
  },
  methods: {
    async init() {
      this.loading = true
      if (this.listQuery.date) {
        this.listQuery.orderDate = this.listQuery.date / 1000
      }
      const result = await getRecords(this.listQuery)
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
      }
      this.init()
    },
  },
}
</script>
<style lang="scss" scoped>
</style>