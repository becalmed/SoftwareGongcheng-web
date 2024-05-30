<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">日期</label>
        <el-input v-model="query.date" clearable placeholder="日期" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />

      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="activity8to9" label="日程8:00-9:00" />
        <el-table-column prop="activity9to10" label="日程9:00-10:00" />
        <el-table-column prop="activity10to11" label="日程10:00-11:00" />
        <el-table-column prop="activity11to12" label="日程11:00-12:00" />
        <el-table-column prop="activity12to13" label="日程12:00-13:00" />
        <el-table-column prop="activity13to14" label="日程13:00-14:00" />
        <el-table-column prop="activity14to15" label="日程14:00-15:00" />
        <el-table-column prop="activity15to16" label="日程5:00-16:00" />
        <el-table-column prop="activity16to17" label="日程16:00-17:00" />
        <el-table-column prop="activity17to18" label="日程17:00-18:00" />
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudSysActivityTable from '@/api/system/sysActivityTable'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { date: null, activity8to9: null, activity9to10: null, activity10to11: null, activity11to12: null, activity12to13: null, activity13to14: null, activity14to15: null, activity15to16: null, activity16to17: null, activity17to18: null }
export default {
  name: 'SysActivityTable',
  components: { pagination, crudOperation, rrOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  cruds() {
    return CRUD({ title: 'api.activityTable', url: 'api/sysActivityTable', idField: 'date', sort: 'date,desc', crudMethod: { ...crudSysActivityTable }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'sysActivityTable:add'],
        edit: ['admin', 'sysActivityTable:edit'],
        del: ['admin', 'sysActivityTable:del']
      },
      rules: {
        date: [
          { required: true, message: '日期不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'date', display_name: '日期' }
      ]
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
