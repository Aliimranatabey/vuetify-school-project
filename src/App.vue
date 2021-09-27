<template>
  <v-app>
    <SchoolVuetify />
    <StudentVuetify />
  </v-app>
</template>

<script>
import SchoolVuetify from "./components/SchoolVuetify";
import StudentVuetify from "./components/StudentVuetify";

export default {
  name: "App",

  components: {
    SchoolVuetify,
    StudentVuetify,
  },

  data: () => ({}),
};
</script>
