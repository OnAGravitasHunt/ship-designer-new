<template>
  <div class="part-list-row">
    <div class="table-cell">
      <input type="radio" :value="index" v-model="currentListIndex"/>
    </div>
    <template v-if="!editingName">
      <div class="table-cell">{{listName}}</div>
      <div class="table-cell">
        <button type="button" class="btn narrow-btn" @click="downloadList">&#8681;</button>
        <a ref="downloadPartsJSON" style="display:none"></a>
      </div>
      <div class="table-cell">
        <button type="button" class="btn" @click="editName">Rename</button>
      </div>
      <div class="table-cell">
        <button
          type="button"
          :title="deleteButtonTitle"
          :disabled="!canDeleteList"
          class="btn delete-btn"
          @click="deleteList"
        >Delete</button>
      </div>
    </template>
    <template v-else>
      <div class="table-cell">
        <input type="text" class="new-name" v-model="newName"/>
      </div>
      <div class="table-cell"></div>
      <div class="table-cell">
        <button type="button" class="btn" @click="cancelEdit">Cancel</button>
      </div>
      <div class="table-cell">
        <button type="button" class="btn confirm-btn" @click="confirmEdit">Confirm</button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'PartListTableRow',
  props: {
    index: Number
  },
  data () {
    return {
      editingName: false,
      newName: ''
    }
  },
  computed: {
    listName () {
      return this.$store.state.library.partListNames[this.index]
    },
    currentListIndex: {
      get () {
        return this.$store.state.library.currentPartListIndex
      },
      set (i) {
        this.$store.commit('setCurrentPartList', i)
      }
    },
    canDeleteList () {
      return this.$store.state.library.partListNames.length > 1
    },
    deleteButtonTitle () {
      return this.canDeleteList ? null : 'Cannot delete only list!'
    }
  },
  methods: {
    editName () {
      this.newName = this.listName
      this.editingName = true
    },
    cancelEdit () {
      this.newName = ''
      this.editingName = false
    },
    confirmEdit () {
      if (this.newName === this.listName) {
        this.cancelEdit()
      } else if (this.$store.state.library.partListNames.indexOf(this.newName) > 0) {
        alert('Name already taken')
      } else {
        this.$store.dispatch('renamePartList', {
          index: this.index,
          name: this.newName
        })
        this.editingName = false
      }
    },
    deleteList () {
      if (
        this.canDeleteList
        && confirm(`Are you sure you want to delete '${this.listName}'?`)
      ) {
        this.$store.dispatch('removePartList', this.index)
      }
    },
    downloadList () {
      let timestamp = new Date()
      timestamp.setMilliseconds(0)
      let data = JSON.stringify(this.$store.state.library.partLists[this.listName])
      let element = this.$refs.downloadPartsJSON
      let filename = `${this.listName || `parts-library-${timestamp.toISOString()}`}.json`
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + data)
      element.setAttribute('download', filename)
      element.click()
    }
  }
}
</script>

<style scoped>
.part-list-row {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 40px 200px 60px 80px 80px;
  grid-template-rows: 33px;
}
.table-cell {
  line-height: 30px;
  border-bottom: 1px solid black;
}
.table-cell:first-child {
  border-left: 1px solid black;
}
.table-cell:last-child {
  border-right: 1px solid black;
}
.btn {
  display: inline-block;
  border: none;
  border-radius: 15px;
  height: 30px;
  width: 70px;
  line-height: 22px;
  padding: 0;
  background-color: #aaa;
  margin: 1px 0;
  font: inherit;
  font-size: inherit;
  color: inherit;
  outline: none;
}
.narrow-btn {
  width: 50px;
}
.delete-btn {
  background-color: lightcoral;
}
.delete-btn:disabled {
  cursor: not-allowed;
}
.new-name {
  font: inherit;
  height: 24px;
  line-height: 27px;
  width: 150px;
  text-align: center;
  outline: none;
  color: inherit;
}
</style>
