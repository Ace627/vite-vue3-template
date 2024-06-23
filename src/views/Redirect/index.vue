<template>
  <div></div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Redirect' })

const route = useRoute()
const router = useRouter()
const { params, query } = route

/** created */
router.replace({ path: `/${params.path}`, query })
</script>

<style lang="scss" scoped></style>
