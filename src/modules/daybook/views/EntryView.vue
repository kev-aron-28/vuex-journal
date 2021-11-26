<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div class="">
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>

      <div class="">
        <input 
          type="file" 
          name="" 
          id="" 
          ref="imageSelector"
          @change="onSelected"
          v-show="false">
        <button 
          class="btn btn-danger mx-2"
          v-if="entry.id"
          @click="deleteCurrent"
          >
          borrar
          <i class="fa fa-trash-alt"></i>
        </button>

        <button class="btn btn-primary" @click="onSelectImage">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea
        name=""
        placeholder="Que sucedio hoy?"
        id=""
        cols="30"
        rows="10"
        v-model="entry.text"
      ></textarea>
    </div>

    <Fab 
      icon="fa-save" 
      @on:click="saveEntry"
      />

    <img
      v-if="entry.picture && !localImage"
      :src="entry.picture"
    />
    <img
      v-if="localImage"
      :src="localImage"
      class="img-thumbnail"
      alt=""
      srcset=""
    />
  </template>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from '../helpers/uploadImage'
import Swal from 'sweetalert2'
export default {
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null 
    };
  },
  methods: {
    onSelected(event){
      const file = event.target.files[0]
      if(!file) {
        this.localImage = null
        this.file = null
        return
      }
      this.file = file
      const fr = new FileReader()
      fr.onload = () => this.localImage = fr.result
      fr.readAsDataURL(file)

    },
    onSelectImage(){
     console.log(this.$refs) 
      this.$refs.imageSelector.click()
    },
    getEntry(){
      let entry
      if(this.id == 'new'){
        entry = {
          text: '',
          date: new Date().getTime()
        }
      } else {
       entry = this.getEntryById(this.id);
       if(!entry) return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },

  async saveEntry(){
      
      new Swal({
        title: 'Espere por favor',
        allowOutsideClick: false
      })
      Swal.showLoading()
      const url = await uploadImage(this.file)
      this.entry.picture = url
      
      if(this.entry.id){
        await this.updateEntry(this.entry)
      } else {
        const id = await this.createEntry(this.entry)
        this.$router.push({ name: "entry-view", params: { id } })
      }
    
    this.file = null
    Swal.fire('guardado', 'Entrada registrada con exito', 'success')
    

    },

  async deleteCurrent(){
    const result = await Swal.fire({
      title: 'Estas seguro?',
      text: 'no se puede recuperar',
      showDenyButton: true,
      confirmButtonText: 'si, estoy seguro'
    })
    if(result.isConfirmed){
      new Swal({
        title: 'espere por favor',
        allowOutsideClick: false
      })
     Swal.showLoading() 
     await this.deleteEntry(this.entry.id)
     this.$router.push({ name: "no-entry" });
     Swal.fire('eliminado', '' ,'success')
    }
  },
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"])
  },
  created() {
    this.getEntry();
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },

  watch: {
    id() {
      this.getEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font: {
    size: 20px;
  }
  border: none;
  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
