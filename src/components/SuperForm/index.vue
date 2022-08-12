<script setup lang="ts">
const props = defineProps({
  formParams: {
    type: Object,
    default: () => {
      return {
        data: {}, // 表单数据对象
        formList: [],
        rules: {}, // 表单验证规则
        inline: false, // 行内表单模式
        labelPosition: 'left', // 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width 可选值：right/left/top
        labelWidth: '120px', // 表单域标签的宽度 支持 auto
        labelSuffix: '', // 表单域标签的后缀
        hideRequiredAsterisk: false, // 是否显示必填字段的标签旁边的红色星号
        showMessage: false, // 是否显示校验错误信息
        inlineMessage: false, // 是否以行内形式展示校验信息
        statusIcon: false, // 是否在输入框中显示校验结果反馈图标
        validateOnRuleChange: true, // 是否在 rules 属性改变后立即触发一次验证
        size: '', // 用于控制该表单内组件的尺寸 可选值：medium / small / mini
        disabled: false, // 是否禁用该表单内的所有组件
        scrollToError: false, // 当校验失败时，滚动到第一个错误表单项
      }
    },
    required: true,
  },
})

const formParams = computed(() => props.formParams)

const ruleFormRef = ref<any>()

// 重置
const resetForm = () => {
  ruleFormRef.value.resetFields() // 重置
}
// 主动暴露childMethod方法
defineExpose({ resetForm, submitForm })

// 提交表单
function submitForm(submit: any) {
  ruleFormRef.value.validate((valid: any) => {
    if (valid) {
      // eslint-disable-next-line no-unused-expressions
      submit && submit()
    }
  })
}
</script>
<template>
  <div class="form">
    <el-form
      ref="ruleFormRef"
      v-loading="formParams.loading"
      :model="formParams.data"
      :rules="formParams.rules"
      :inline="formParams.inline"
      :label-position="formParams.labelPosition"
      :label-width="formParams.labelWidth"
      :label-suffix="formParams.labelSuffix"
      :hide-required-asterisk="formParams.hideRequiredAsterisk"
      :show-message="formParams.showMessage"
      :inline-message="formParams.inlineMessage"
      :status-icon="formParams.statusIcon"
      :validate-on-rule-change="formParams.validateOnRuleChange"
      :size="formParams.size"
      :disabled="formParams.disabled"
      :scroll-to-error="formParams.scrollToError"
    >
      <el-form-item
        v-for="(itemForm, key) in formParams.formList"
        :key="key"
        :prop="key.toString()"
        :label="itemForm.label"
        :style="itemForm.style"
      >
        <!-- 文本框输入 -->
        <el-input
          v-if="['text', 'textarea'].includes(itemForm.type)"
          v-model="formParams.data[key]"
          :type="itemForm.mode"
          :maxlength="itemForm.maxlength"
          :show-word-limit="!!itemForm.maxlength"
          :placeholder="itemForm.placeholder"
          :disabled="itemForm.disabled"
          :style="`${itemForm.width ? 'width:' + itemForm.width : ''}`"
          :rows="itemForm.rows"
          :show-password="itemForm.isPassword"
          :clearable="itemForm.clearable"
          :validate-event="itemForm.validateEvent"
        />
        <!-- 密码、纯数字输入 -->
        <el-input
          v-if="itemForm.type === 'number'"
          v-model.number="formParams.data[key]"
          :type="itemForm.mode"
          :maxlength="itemForm.maxlength"
          :show-word-limit="!!itemForm.maxlength"
          :placeholder="itemForm.placeholder"
          :disabled="itemForm.disabled"
          :clearable="itemForm.clearable"
          :show-password="itemForm.isPassword"
        />
        <!-- 日期 -->
        <el-date-picker
          v-if="itemForm.type === 'date-picker'"
          v-model="formParams.data[key]"
          :placeholder="itemForm.placeholder"
          :disabled-date="itemForm.disabledDate"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :style="'width:100%'"
          :type="itemForm.mode"
          :value-format="itemForm.valueFormat || 'YYYY-MM-DD'"
          :default-time="itemForm.defaultTime"
          @change="itemForm.onChange"
        />
        <!-- 下拉框 -->
        <el-select
          v-if="itemForm.type === 'select'"
          v-model="formParams.data[key]"
          :multiple="itemForm.multiple"
          :multiple-limit="itemForm.multipleLimit"
          :style="`${itemForm.width ? 'width:' + itemForm.width : ''}`"
          :clearable="itemForm.clearable"
          :placeholder="itemForm.placeholder"
          :disabled="itemForm.disabled"
          :collapse-tags="itemForm.collapseTags"
          :filterable="itemForm.filterable"
          :loading="itemForm.loading"
          :loading-text="itemForm.loadingText"
          :no-data-text="itemForm.noDataText"
          @change="itemForm.onChange"
        >
          <!-- 空状态自定义 -->
          <template #empty></template>
          <el-option
            v-for="(selectOption, index) in itemForm.selectOptions"
            :key="index"
            :label="
              itemForm.customLabelValue
                ? selectOption[itemForm.customLabelValue.label]
                : selectOption.name
            "
            :value="
              itemForm.customLabelValue
                ? selectOption[itemForm.customLabelValue.value]
                : selectOption.id
            "
            :disabled="
              itemForm.customLabelValue
                ? selectOption[itemForm.customLabelValue.disabled]
                : selectOption.disabled
            "
          />
        </el-select>
        <!-- 开关 -->
        <el-switch
          v-if="itemForm.type === 'switch'"
          v-model="formParams.data[key]"
          :active-text="itemForm.activeText"
          :inactive-text="itemForm.inactiveText"
          :disabled="itemForm.disabled"
          :loading="itemForm.loading"
          @change="itemForm.onChange"
        />
        <!-- 表单其他组件 -->
        <template
          v-if="itemForm.slots && itemForm.slots.default"
          #default="{ column, $index }"
        >
          <slot
            :name="itemForm.slots!.default"
            :column="column"
            :index="$index"
          />
        </template>
      </el-form-item>

      <div class="form-submit">
        <template v-if="formParams.submit">
          <el-button
            :type="formParams.submit.submitType || 'primary'"
            :plain="formParams.submit.submitPlain || false"
            :icon="formParams.submit.submitIcon"
            class="submit-btn submit"
            @click="submitForm(formParams.submit.submitFunction)"
          >
            {{ formParams.submit.submitText || '查询' }}
          </el-button>
        </template>
        <!-- 表单其他按钮 -->
        <template v-if="formParams.otherBtn">
          <slot :name="formParams.otherBtn.slots!.default" />
        </template>
      </div>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-input__wrapper) {
  height: 40px;
  position: relative;
  width: 100%;
}

.el-form-item {
  display: inline-block;
  padding-right: 30px;
}

:deep(.el-form) {
  display: grid;
  grid-template-columns: auto auto auto;
  width: 100%;
}

/* stylelint-disable-next-line  */
:deep(.el-form-item__content) {
  display: inline-block;
}
/* stylelint-disable-next-line  */
:deep(.el-form-item__content) {
  width: 70%;
}

.form-submit {
  display: inline-block;
  line-height: 37px;
}

:deep(.el-select) {
  width: 100%;
}

// 表单时间插件
/* stylelint-disable-next-line selector-class-pattern */
:deep(.el-input__prefix) {
  position: absolute;
  right: 5px;
}
</style>
