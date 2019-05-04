<template>
  <div class="create">
    <DesignPageHeader/>
    <DesignSummary/>
    <DesignTable/>
  </div>
</template>

<script>
import DesignPageHeader from '@/components/design/DesignPageHeader'
import DesignSummary from '@/components/design/DesignSummary'
import DesignTable from '@/components/design/DesignTable'

export default {
  name: 'create',
  components: {
    DesignPageHeader,
    DesignSummary,
    DesignTable
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
