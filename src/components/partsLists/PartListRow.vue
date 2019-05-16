<template>
  <div class="part-list-row">
    <div class="table-cell">
      <input type="radio" :value="index" v-model="currentListIndex"/>
    </div>
    <template v-if="!editingName">
      <div class="table-cell">{{listName}}</div>
      <div class="table-cell">
        <button type="button" class="btn" @click="editName">Rename</button>
      </div>
      <div class="table-cell">
        <button type="button" class="btn delete-btn">Delete</button>
      </div>
    </template>
    <template v-else>
      <div class="table-cell">
        <input type="text" class="new-name" v-model="newName"/>
      </div>
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
    }
  }
}
</script>

<style scoped>
.part-list-row {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 40px 200px 80px 80px;
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
.delete-btn {
  background-color: lightcoral;
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
