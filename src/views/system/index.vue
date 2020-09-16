<template>
  <div class="container">
    <vc-calendar :attributes="attrs" color="red" @dayclick="change" />
    <el-form>
      <!-- <el-form-item label="出诊日期">
        <el-checkbox-group v-model="form.date">
          <el-checkbox v-for="item in date" :key="item.date" :label="item.date" name="type" />
        </el-checkbox-group>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit">设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getMasterVisitedDate, setVisitedDate } from '../../api/record'
import { formatDateTime, getTodayStart } from '@/utils/util'
export default {
  data() {
    return {
      attrs: [
        {
          key: 'Any',
          // 括号内传递日期可点亮指定日期，如new Date(2019, 6, 1)，也可传递多个日期：如dates: [ new Date(2018, 0, 1), new Date(2018, 0, 15) ]
          dates: [],
          // highlight: true,
          highlight: true,
          // popover 点亮的日期上出现提示内容
          popover: {
            label: '出诊日期！'
          }
        }
      ],
      form: {
        date: []
      },
      dates: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async onSubmit() {
      const str = this.attrs[0].dates.map(v => {
        return v.getTime() / 1000
      }).join(',')
      const result = await setVisitedDate({ date: str })
      if (result) {
        this.$message({
          message: '设置成功',
          type: 'success'
        })
        this.form.date = []
      }
    },
    async init() {
      const result = await getMasterVisitedDate()
      const dates = result.split(',').map(v => {
        return new Date(v * 1000)
      })
      const tmp = this.attrs[0]
      tmp.dates = dates
      this.$set(this.attrs, 0, tmp)
    },
    change(e) {
      const arr = this.attrs[0]
      const date = new Date(e.year, e.month - 1, e.day)
      if (arr.dates.findIndex(v => v.getTime() === e.dateTime) >= 0) {
        arr.dates = arr.dates.filter(v => v.getTime() !== e.dateTime)
      } else {
        arr.dates.push(date)
      }
      this.$set(this.attrs, 0, arr)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
