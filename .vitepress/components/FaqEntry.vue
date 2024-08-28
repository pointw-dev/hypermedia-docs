<script setup>

</script>

<template>
  <div>
    <p class="question"><slot name="question"></slot></p>
    <p class="answer"><slot name="answer"></slot></p>
  </div>
</template>

<style scoped>
.question::before {
  content: "Q: ";
  font-weight: bold;
}

.answer::before {
  content: "A: ";
}

.question {
  font-weight: bold;
}

.question,
.answer {
  display: block;
  text-indent: -1.3em; /* Negative indent to create the hanging effect */
  margin-left: 1.5em; /* Left margin to align the text properly */
}

</style>