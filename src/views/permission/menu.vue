<style>
  .el-checkbox{
    margin-left:0% !important;
    width:15%;
  }
</style>

<template>
  <div class="app-container">

    <div>
      <el-button type="primary" @click="updateMenuSort">保存</el-button>
    </div>

    <el-form ref="dataForm" :model="sortList">
      <tree-table :data="data" :eval-func="func" :eval-args="args" :expand-all="expandAll" border>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template slot-scope="scope">
            <span>{{ scope.row.url }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-form-item prop="index">
              <el-input v-model="scope.row.index" class="edit-input" @change="changeMenuSort(scope.row)" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate()">{{ $t('table.add') }}</el-button>
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
            <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </tree-table>
    </el-form>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="80%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="8%" style="margin-left:50px;">
        <el-form-item label="上级菜单" prop="pid">
          <el-select v-model="temp.pid" filterable placeholder="请选择">
            <el-option-group
              v-for="group in menusSelect"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>

        <el-form-item label="url地址" prop="url">
          <el-input v-model="temp.url"/>
        </el-form-item>

        <el-form-item label="权限目录" prop="path">
          <el-input v-model="temp.path"/>
        </el-form-item>

        <el-form-item label="查看权限" prop="read">
          <el-checkbox-group v-model="temp.menuRole[1]">
            <el-checkbox v-for="check in rolesCheck" :label="check.id" :key="check.id">{{ check.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="编辑权限" prop="edir">
          <el-checkbox-group v-model="temp.menuRole[2]">
            <el-checkbox v-for="check in rolesCheck" :label="check.id" :key="check.id">{{ check.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="删除权限" prop="delete">
          <el-checkbox-group v-model="temp.menuRole[3]">
            <el-checkbox v-for="check in rolesCheck" :label="check.id" :key="check.id">{{ check.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/components/TreeTable'
import treeToArray from '@/vendor/customEval'
import { menuList, updateMenuSort, updateMenu, createMenu, deleteMenu } from '@/api/permission'
import waves from '@/directive/waves' // Waves directive

export default {
  name: 'CustomTreeTableDemo',
  components: { treeTable },
  directives: { waves },
  data() {
    return {
      func: treeToArray,
      expandAll: true,
      data: {},
      args: [null, null, 'timeLine'],
      sortList: {},
      menusSelect: null,
      rolesCheck: null,
      temp: {
        id: 0,
        pid: 0,
        name: 0,
        url: '',
        path: '',
        menuRole: {
          1: [], 2: [], 3: []
        }
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      rules: {
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    resetMenuSort() {
      this.tMenuSort = {}
    },
    handleUpdate(row) {
      if (row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
      } else {
        this.dialogStatus = 'create'
      }
      console.log(this.dialogStatus)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.temp.children = ''
      this.temp.parent = ''
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          console.log(tempData)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          createMenu(tempData).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          console.log(tempData)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateMenu(tempData).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      const tempData = Object.assign({}, row)
      tempData.timestamp = +new Date(tempData.timestamp)
      deleteMenu(tempData).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 20000
        })
        const index = this.data.indexOf(row)
        this.data.splice(index, 1)
      })
    },
    changeMenuSort(row) {
      this.$set(this.sortList, row.id, row.index)
    },
    getList() {
      menuList().then(response => {
        this.data = response.data.items
        this.menusSelect = response.data.menusSelect
        this.rolesCheck = response.data.rolesCheck
      })
    },
    updateMenuSort() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.tmp = {}
          this.$set(this.tmp, 'id', this.sortList)
          // console.log(this.tmp)
          updateMenuSort(this.tmp).then(() => {
            this.resetMenuSort()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
