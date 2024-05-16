<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">活动名称</label>
        <el-input v-model="query.activityName" clearable placeholder="活动名称" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">活动类型</label>
        <el-input v-model="query.activityProgress" clearable placeholder="活动类型" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">创建者</label>
        <el-input v-model="query.createBy" clearable placeholder="创建者" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">更新者</label>
        <el-input v-model="query.updateBy" clearable placeholder="更新者" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="活动名称" prop="activityName">
            <el-input v-model="form.activityName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="活动类型" prop="activityProgress">
            <el-select v-model="form.activityProgress" filterable placeholder="请选择">
              <el-option
                v-for="item in dict.activity_status"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创建者" prop="createBy">
            <el-input v-model="form.createBy" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="activityName" label="活动名称" />
        <el-table-column prop="activityProgress" label="活动类型">
          <template slot-scope="scope">
            {{ dict.label.activity_status[scope.row.activityProgress] }}
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建者" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column v-if="checkPer(['admin','sysActivity:edit','sysActivity:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudSysActivity from '@/api/system/sysActivity'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { activityId: null, activityName: null, activityProgress: null, createBy: null, updateBy: null, createTime: null, updateTime: null }
export default {
  name: 'SysActivity',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['activity_status'],
  cruds() {
    return CRUD({ title: 'api.activity', url: 'api/sysActivity', idField: 'activityId', sort: 'activityId,desc', crudMethod: { ...crudSysActivity }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'sysActivity:add'],
        edit: ['admin', 'sysActivity:edit'],
        del: ['admin', 'sysActivity:del']
      },
      rules: {
        activityName: [
          { required: true, message: '活动名称不能为空', trigger: 'blur' }
        ],
        activityProgress: [
          { required: true, message: '活动类型不能为空', trigger: 'blur' }
        ],
        createBy: [
          { required: true, message: '创建者不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'activityName', display_name: '活动名称' },
        { key: 'activityProgress', display_name: '活动类型' },
        { key: 'createBy', display_name: '创建者' },
        { key: 'updateBy', display_name: '更新者' }
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
