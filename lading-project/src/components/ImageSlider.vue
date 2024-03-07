<script lang="ts" setup>
import { ref } from 'vue';

const slide = ref(1);
</script>

<template>
  <q-carousel
    animated
    v-model="slide"
    arrows
    infinite
    swipeable
    transition-prev="slide-right"
    transition-next="slide-left"
    transitionDuration="500"
  >
    <q-carousel-slide
      :name="1"
      img-src="https://momops-image.s3.ap-northeast-2.amazonaws.com/theme/basic/img_web/20240226/slide1_img.png"
    />
    <q-carousel-slide
      :name="2"
      img-src="https://momops-image.s3.ap-northeast-2.amazonaws.com/theme/basic/img_web/20240226/slide2_img.png"
    />
  </q-carousel>
</template>

<style lang="scss" scoped></style>
