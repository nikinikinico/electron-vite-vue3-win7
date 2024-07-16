<script setup lang="ts">
const router = useRouter()
function goBack() {
  router.back()
}
</script>

<template>
  <el-button type="success" @click="goBack">返回上一页</el-button>
</template>
