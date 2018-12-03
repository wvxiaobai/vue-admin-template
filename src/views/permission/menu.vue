<template>
  <div class="app-container">

    <div>
      <el-button type="primary" @click="updateMenuSort">保存</el-button>
    </div>

    <el-form ref="dataForm" :model="sortList">
      <tree-table :data="data" :eval-func="func" :eval-args="args" :expand-all="expandAll" border>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span style="color:sandybrown">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template slot-scope="scope">
            <span style="color:sandybrown">{{ scope.row.url }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-form-item prop="index">
              <el-input v-model="scope.row.index" class="edit-input" @change="changeMenuSort(scope.row)" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
            <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </tree-table>
    </el-form>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('permissionUserTable.rid')" prop="rid">
          <el-select v-model="temp.rid" class="filter-item" placeholder="Please select">
            <el-option v-for="item in menus" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('permissionUserTable.disabled')" prop="disabled">
          <el-select v-model="temp.disabled" class="filter-item" placeholder="Please select">
            <el-option v-for="(value, index) in switchs" :key="index" :label="value" :value="index"/>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('permissionUserTable.account')" prop="account">
          <el-input v-model="temp.account"/>
        </el-form-item>

        <el-form-item :label="$t('permissionUserTable.password')" prop="password">
          <el-input v-model="temp.password"/>
        </el-form-item>

        <el-form-item :label="$t('permissionUserTable.email')" prop="email">
          <el-input v-model="temp.email"/>
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
import { menuList, updateMenuSort } from '@/api/permission'

export default {
  name: 'CustomTreeTableDemo',
  components: { treeTable },
  data() {
    return {
      func: treeToArray,
      expandAll: true,
      data: {},
      args: [null, null, 'timeLine'],
      sortList: {},
      menus: null,
      temp: {
        id: 0,
        rid: 0,
        disable: 0,
        account: '',
        paassword: '',
        email: ''
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
    changeMenuSort(row) {
      this.$set(this.sortList, row.id, row.index)
    },
    getList() {
      menuList().then(response => {
        this.data = response.data.items
        // this.sortList = response.data.indexs
        // console.log(this.data, this.sortList)
      })
    },
    updateMenuSort() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.tmp = {}
          this.$set(this.tmp, 'id', this.sortList)
          console.log(this.tmp)
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
