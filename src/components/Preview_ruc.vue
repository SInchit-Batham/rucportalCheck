<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-top-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn>
    </template>
    <transition name="fade">
      <v-card v-model="dialog" class="PreviewRUC" transition="scale-transition">
        <div class="Preview-component">
          <v-card>
            <div class="preview-data">
              <v-card-title class="text-h7 card-title">
                Preview Component
              </v-card-title>

              <v-card-title class="textField" outlined
                ><span>Title: {{ info.title }}</span></v-card-title
              >
              <br />
              <v-card-subtitle class="textField" outlined
                ><span>Description: {{ info.description }}</span>
                ></v-card-subtitle
              >
            </div>

            <div class="container-carousel">
              <v-carousel @change="currentData = images[$event].src">
                <!-- <v-zoomer
                  ref="zoom"
                  pivot="image-center"
                  maxScale="4"
                  style="
                    width: 600px;
                    height: 100%;
                    border: solid 1px silver;
                    cursor: zoom-in;
                  "
                > -->

                <vue-picture-swipe
                  :options="{ shareEl: false }"
                  @close="visibleOff()"
                  v-if="visible"
                  ref="autoClicked"
                  :items="imgData"
                ></vue-picture-swipe>
                <v-carousel-item
                  v-for="(item, i) in images"
                  :key="i"
                  :src="item.src"
                  @click="visibleOn()"
                >
                </v-carousel-item>
                <!-- </v-zoomer> -->
              </v-carousel>
            </div>
          </v-card>
        </div>
        <v-divider></v-divider>

        <v-card class="request-component">
          <header class="modal-header">
            <slot name="header">
              <p class="headline">Request Component</p>
            </slot>
          </header>
          <section class="modal-body">
            <slot name="body">
              <div class="submit-form mt-3 mx-auto">
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    v-model="RUC.purpose"
                    :rules="[(v) => !!v || 'Purpose is required']"
                    label="Purpose for use of component"
                    outlined
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="RUC.project"
                    :rules="[(v) => !!v || 'Project is required']"
                    label="Project where component is to be used"
                    outlined
                    required
                  ></v-text-field>
                </v-form>
              </div>
            </slot>
          </section>

          <footer class="modal-footer">
            <slot name="footer">
              <v-btn color="primary" class="mt-3" @click="requestRUC"
                >Request Component</v-btn
              ></slot
            >
            <slot name="footer">
              <v-btn color="primary" class="mt-3" @click="closeDialog"
                >Close</v-btn
              >
            </slot>
          </footer>
        </v-card>
      </v-card>
    </transition>
  </v-dialog>
</template>

<script>
import images from "../assets/config/images.json";
export default {
  name: "PreviewRuc",

  components: {},

  data() {
    return {
      imgData: [],
      currentData: "",
      visible: false,
      images: images.items,
      RUC: {
        id: null,
        title: "",
        description: "",
        published: false,
      },

      Title: "",
      Description: "",
    };
  },
  props: {
    info: {
      type: Array,
    },
    RUCId: {
      type: Text,
      default: "",
    },
  },
  /*  created() {
      console.log("**inside Images****");
      fetch("../assets/images.json")
        .then((response) => response.json())
        .then((data) => {
          this.images = data.images;
        });
    },
  */

  methods: {
    checkClick() {
      console.log("auto clicked occured");
    },
    visibleOff() {
      this.visible = false;
    },

    visibleOn() {
      var obj = {
        src: this.currentData,
        thumbnail: this.currentData,
      };
      console.log("the soruce add is :", this.currentData);
      this.imgData = [];
      this.imgData.push(obj);

      this.images.forEach((item) => {
        if (this.imgData.indexOf(item) === -1) {
          this.imgData.push(item);
        }
      });

      this.visible = true;
    },
    func1() {
      this.$refs.zoom.reset();
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>

<style scoped>
.PreviewRUC {
  position: absolute;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.Preview-component {
  height: 50%;
}

.preview-data {
  height: 400px;
}
.card-title {
  background-color: #085889;
  color: #ffff;
  height: 50px;
  justify-content: flex-start;
  padding: 0px 0px 10px 10px;
}
.container-carousel {
  position: absolute;
  bottom: 500px;
  left: 900px;
  width: 600px;
  height: 0px !important;
}
.request-component {
  padding: 15px;
}
.Carousel-img {
  margin: 10px;
  width: 380px;
  height: 400px;
}

.textField {
  height: 50px;
  width: 300px;
  padding: 5px 30px 20px 20px;
  margin: 0px;
}
.modal-footer {
  width: 250px;
  display: inline;
  padding-left: 75%;
}
.mt-3 {
  margin: 10px;
}
</style>
