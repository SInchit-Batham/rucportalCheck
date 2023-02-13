<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <p class="headline">Request Reusable Component</p>
        </slot>
        <button type="button" class="btn-close" @click="close">x</button>
      </header>
      <section class="modal-body">
        <slot name="body">
          <div class="submit-form mt-3 mx-auto">
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="RUC.purpose"
                :rules="[(v) => !!v || 'Purpose is required']"
                label="Purpose for use of component"
                required
              ></v-text-field>

              <v-text-field
                v-model="RUC.project"
                :rules="[(v) => !!v || 'Project is required']"
                label="Project where component is to be used"
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
          >
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
//import Service from "../scripts/RUCService";

export default {
  name: "add-RUC",
  props: {
    RUCId: {
      type: Text,
      default: "",
    },
  },
  data() {
    return {
      RUC: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    async requestRUC() {
      /* const data = {
        RUCId: this.RUCId,
        purpose: this.RUC.description,
        refProject: this.RUC.project,
      };

      /*try {
        const response = await Service.createReusableComponentRequest(data);
        this.RUC.id = response.data.id;
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }*/
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
