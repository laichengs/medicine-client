<template>
  <div class="container">
    <el-form>
      <el-form-item label="出诊日期">
        <el-checkbox-group v-model="form.date">
          <el-checkbox :label="item.date" name="type" v-for="item in date" :key="item.date"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit">设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { setVisitedDate } from '../../api/record'
import { formatDateTime, getTodayStart } from '@/utils/util'
export default {
  data() {
    return {
      form: {
        date: [],
      },
      date: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async onSubmit() {
      const str = this.date
        .filter((v) => this.form.date.includes(v.date))
        .map((v) => v.timeStamp)
        .join(',')
      const result = await setVisitedDate({ date: str })
      if (result) {
        this.$message({
          message: '设置成功',
          type: 'success',
        })
        this.form.date = []
      }
    },
    init() {
      let date = []
      let today = getTodayStart()
      for (let i = 0; i < 7; i++) {
        let time = today + i * 24 * 3600
        date.push({
          timeStamp: time,
          date: formatDateTime(time * 1000).substring(5),
        })
      }
      this.date = date
    },
  },
}
</script>
<style lang="scss" scoped>
</style>