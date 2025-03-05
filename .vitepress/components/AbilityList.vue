<script setup>

</script>

<template>
  <div class="centered-line">
    <slot></slot>
  </div>
</template>

<style scoped>
.centered-line {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18pt;
}

.centered-line > *:not(:last-child)::after {
  content: "๏";
  margin: 0 10px;
  display: inline-block;
}

@media (max-width: 1168px) {
  .centered-line {
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: calc(10%)
  }

  .centered-line > * {
    flex-basis: calc(50% - 10px);
    margin-bottom: 10px;
    text-align: left;
  }

  .centered-line > *:not(:last-child)::after {
    content: none;
  }

  .centered-line > *::before {
    content: "๏";
    margin: 0 10px 0 0;
    display: inline-block;
  }
}
</style>