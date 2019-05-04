<template>
  <div class="create">
    <DesignPageHeader/>
    <DesignSummary/>
  </div>
</template>

<script>
import DesignPageHeader from '@/components/design/DesignPageHeader'
import DesignSummary from '@/components/design/DesignSummary'

export default {
  name: 'create',
  components: {
    DesignPageHeader,
    DesignSummary
  }
}
</script>

<style scoped>
.create {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  text-align: left;
}
</style>
