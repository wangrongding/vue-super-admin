<script setup lang="ts">
import { ref } from 'vue'
import { ElTable } from 'element-plus'

const tableDom = ref<InstanceType<typeof ElTable>>()

// 暴露给外部的对象
defineExpose({
  tableDom,
})

defineProps({
  tableParams: {
    type: Object,
    default: () => ({
      data: [],
      columnProps: [],
    }),
  },
})

// 定义emit事件
const emit = defineEmits(['selectionChange', 'rowClick'])

// 在未设置指定值的情况下，使用默认值
const getDefault = <T, K>(value: T, defaultValue: K) =>
  value === undefined ? defaultValue : value

// 表格行的点击事件
const handleRowClick = (row: object[], column: object, event: Event) => {
  emit('rowClick', row, column, event)
}

// 表格行的选中事件
const selectionChange = <T>(val: T[]) => {
  // 选中需要确认后赋值
  emit('selectionChange', val)
  // console.log("🚀🚀🚀 / val", val);
}
</script>
<template>
  <div>
    <el-table
      :ref="tableParams.ref || 'tableDom'"
      v-loading="tableParams.loading"
      :data="tableParams.data"
      :height="tableParams.height"
      :max-height="tableParams.maxHeight"
      :stripe="tableParams.stripe"
      :border="getDefault(tableParams.border, true)"
      :size="tableParams.size"
      :fit="tableParams.fit || true"
      :show-header="getDefault(tableParams.showHeader, true)"
      :highlight-current-row="getDefault(tableParams.highlightCurrentRow, true)"
      :empty-text="tableParams.emptyText"
      :default-expand-all="tableParams.defaultExpandAll"
      :expand-row-keys="tableParams.expandRowKeys"
      :default-sort="tableParams.defaultSort"
      :tooltip-effect="tableParams.tooltipEffect"
      :show-summary="tableParams.showSummary"
      :sum-text="tableParams.sumText"
      :summary-method="tableParams.summaryMethod"
      :span-method="tableParams.spanMethod"
      :select-on-indeterminate="tableParams.selectOnIndeterminate"
      :indent="tableParams.indent"
      :lazy="tableParams.lazy"
      :load="tableParams.load"
      :tree-props="tableParams.treeProps"
      :header-cell-style="{
        background: getDefault(tableParams?.headerCellStyle?.background, null),
        fontWeight: getDefault(
          tableParams?.headerCellStyle?.fontWeight,
          'none',
        ),
        color: getDefault(tableParams?.headerCellStyle?.color, '#333'),
        padding: '5px',
      }"
      :cell-style="{
        height: '40px',
        padding: '5px',
        fontSize: '14px',
        boxSizing: 'content-box',
        backgroundColor: 'transparent',
      }"
      :row-key="tableParams.rowKey"
      :row-style="tableParams.rowStyle"
      @row-click="handleRowClick"
      @selection-change="selectionChange"
    >
      <template v-if="typeof tableParams.emptyText === 'boolean'" #empty>
        <slot name="empty" />
      </template>
      <el-table-column
        v-if="tableParams.selectable"
        :reserve-selection="true"
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column
        v-for="(item, index) in tableParams.columnProps"
        :key="index"
        :type="item.type"
        :align="getDefault(item.align, 'center')"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :fixed="item.fixed"
        :formatter="item.formatter"
      >
        <template
          v-if="item.slots && item.slots.header"
          #header="{ column, $index }"
        >
          <slot :name="item.slots!.header" :column="column" :index="$index" />
        </template>
        <template
          v-if="item.slots && item.slots.default"
          #default="{ row, column, $index }"
        >
          <slot
            :name="item.slots!.default"
            :row="row"
            :column="column"
            :index="$index"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
.el-table {
  --el-table-bg-color: transparent;
  --el-table-tr-bg-color: transparent;
  --el-table-border-color: #ebeef5;
  --el-table-header-bg-color: #f2f3f5;
  --el-table-current-row-bg-color: #0675d3;
  --el-table-row-hover-bg-color: #57a4e8;

  color: #333;
}
/* stylelint-disable-next-line */
:deep(.el-table__header) {
  height: 48px;
}
</style>
