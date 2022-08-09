<script setup lang="ts">
import { reactive } from 'vue'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

interface SpanMethodProps {
  rowIndex: number
  columnIndex: number
}
const tableParams = reactive({
  data: [
    {
      id: '12987122',
      name: 'Tom',
    },
    {
      id: '12987122',
      name: 'Tom',
    },
    {
      id: '12987122',
      name: 'Tom',
    },
  ] as any[],
  loading: false,
  border: true,
  selectable: false,
  spanMethod: (item: SpanMethodProps) => {
    if (item.columnIndex === 0) {
      if (item.rowIndex === 0) {
        return {
          rowspan: tableParams.data.length,
          colspan: 1,
        }
      }
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
    return {
      rowspan: 1,
      colspan: 1,
    }
  },
  columnProps: [
    { label: '第1列', prop: 'name' },
    { label: '第2列', prop: 'value' },
    { label: '第3列', prop: 'module' },
    { label: '第4列', prop: 'module' },
    { label: '第5列', prop: 'module' },
    // { label: '第6列', prop: 'module' },
    // { label: '第7列', prop: 'module' },
    {
      label: '操作',
      slots: {
        default: 'operation',
      },
      align: 'center',
    },
  ],
})

const router = useRouter()
function toDetail(row) {
  router.push({
    path: '/list/detail',
    query: {
      id: row.id,
    },
  })
}
</script>
<template>
  <div class="list-container">
    <SuperTable :table-params="tableParams">
      <template #operation="{ row }">
        <el-button
          type="primary"
          size="default"
          :link="true"
          @click="toDetail(row)"
        >
          查看报告
        </el-button>
      </template>
    </SuperTable>
    <!-- <svg-icon icon-name="test-icon" color="#000" prefix="icon" /> -->
  </div>
</template>
<style lang="scss" scoped>
.list-container {
  text-align: center;
}
</style>
