<template>
  <div class="app-container">

    <el-tag style="margin-bottom:20px;">
      <a href="https://github.com/PanJiaChen/vue-element-admin/tree/master/src/components/TreeTable" target="_blank">treeTable文档</a>
    </el-tag>

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
          <span style="color:sandybrown">{{ scope.row.index }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="message(scope.row)">新增</el-button>
          <el-button type="text" @click="message(scope.row)">修改</el-button>
          <el-button type="text" @click="message(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '@/components/TreeTable'
import treeToArray from '@/vendor/customEval'
import { menuList } from '@/api/permission'

export default {
  name: 'CustomTreeTableDemo',
  components: { treeTable },
  data() {
    return {
      func: treeToArray,
      expandAll: true,
      data: null,
      args: [null, null, 'timeLine']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    message(row) {
      this.$message.info(row.event)
    },
    getList() {
      menuList().then(response => {
        this.data = response.data.items
        console.log(this.data)
      })
    }
  }
}
</script>
