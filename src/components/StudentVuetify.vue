<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="students"
      sort-by="id"
      class="elevation-3"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>STUDENT LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Student
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">New Student</span>
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
                        v-model="editedItem.surname"
                        label="CODE"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.number"
                        label="NUMBER"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.age"
                        label="AGE"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.gpa"
                        label="GPA"
                      ></v-text-field>
                    </v-col>
                    <v-select
                      v-model="editedItem.school"
                      :items="schools"
                      item-text="name"
                      item-value="id"
                      label="Select"
                      return-object
                      single-line
                    ></v-select>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="clear">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveStudent">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteStudent(item.id)"> mdi-delete </v-icon>
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
      { text: "Surname", value: "surname" },
      { text: "Number", value: "number" },
      { text: "Age", value: "age" },
      { text: "Gpa", value: "gpa" },
      { text: "SchoolName", value: "school.name" },
      {
        text: "Actions",
        align: "start",
        sortable: false,
        value: "actions",
      },
    ],
    schools: [],
    students: [],
    student: {
      id: null,
      name: "",
      surname: "",
      number: "",
      age: null,
      gpa: null,
      active: false,
      school: "",
    },
    editedItem: {},
  }),

  methods: {
    async getStudentList() {
      const response = await this.axios.get("http://localhost:8080/student");
      this.students = response.data._embedded.students;
    },
    async getSchoolList() {
      const response = await this.axios.get("http://localhost:8080/school");
      this.schools = response.data._embedded.schools;
    },
    async addStudent() {
      await this.axios.post("http://localhost:8080/student/", this.editedItem);
      this.getStudentList();
    },
    async updateStudent() {
      console.log(this.editedItem);
      await this.axios.put(
        "http://localhost:8080/student/" + this.editedItem.id,
        this.editedItem
      );

      this.getStudentList();
    },

    saveStudent() {
      if (this.editedItem.id == null || this.editedItem.id == "") {
        this.addStudent();
        this.clear();
      } else {
        this.updateStudent();
        this.clear();
      }
    },

    editItem(item) {
      this.editedItem = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },

    async deleteStudent(id) {
      await this.axios.delete("http://localhost:8080/student/" + id);
      this.getStudentList();
    },

    clear() {
      this.editedItem = {};
      this.dialog = false;
    },
  },
  mounted() {
    this.getStudentList();
    this.getSchoolList();
  },
};
</script>
<style scoped>
</style>