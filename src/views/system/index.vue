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
import { setVisitedDate } from '../../api/record'
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
    init() {
      const date = []
      const today = getTodayStart()
      for (let i = 0; i < 7; i++) {
        const time = today + i * 24 * 3600
        date.push({
          timeStamp: time,
          date: formatDateTime(time * 1000).substring(5)
        })
      }
      this.date = date
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
