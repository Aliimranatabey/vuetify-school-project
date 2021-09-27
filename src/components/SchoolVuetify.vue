<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="schools"
      sort-by="id"
      class="elevation-3"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>SCHOOL LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New School
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">New School</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="NAME"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.code"
                        label="CODE"
                      ></v-text-field>
                    </v-col>
                    <v-checkbox
                      v-model="editedItem.active"
                      type="checkbox"
                      label="ACTIVE"
                    >
                    </v-checkbox>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="clear">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveSchool">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteSchool(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Id", value: "id" },
      { text: "Name", value: "name" },
      { text: "CODE", value: "code" },
      { text: "ACTIVE", value: "active" },
      {
        text: "Actions",
        align: "start",
        sortable: false,
        value: "actions",
      },
    ],

    schools: [],
    school: {
      id: null,
      name: "",
      code: "",
      active: false,
    },
    editedItem: {},
  }),

  methods: {
    async getSchoolList() {
      const response = await this.axios.get("http://localhost:8080/school");
      this.schools = response.data._embedded.schools;
    },

    async addSchool() {
      await this.axios.post("http://localhost:8080/school/", this.editedItem);
      this.getSchoolList();
    },

    async updateSchool() {
      console.log(this.editedItem);
      await this.axios.put(
        "http://localhost:8080/school/" + this.editedItem.id,
        this.editedItem
      );

      this.getSchoolList();
    },

    saveSchool() {
      if (this.editedItem.id == null || this.editedItem.id == "") {
        this.addSchool();
        this.clear();
      } else {
        this.updateSchool();
        this.clear();
      }
    },

    editItem(item) {
      this.editedItem = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    async deleteSchool(id) {
      await this.axios.delete("http://localhost:8080/school/" + id);
      this.getSchoolList();
    },

    clear() {
      this.editedItem = {};
      this.dialog = false;
    },
  },
  mounted() {
    this.getSchoolList();
  },
};
</script>
<style scoped>
</style>