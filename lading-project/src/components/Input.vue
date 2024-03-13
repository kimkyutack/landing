<script lang="ts" setup>
import { axiosStore } from '@/stores/axios';
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const axios = axiosStore();
const $q = useQuasar();
const route = useRoute();

const id = computed(() => route.params?.id);

const inputValue = ref([
  {
    name: '이름',
    key: 'name',
    placeholder: '홍길동',
    value: '',
  },
  {
    name: '나이',
    key: 'age',
    placeholder: '20',
    value: '',
  },
  {
    name: '전화번호',
    key: 'tel',
    placeholder: '010-1234-5678',
    value: '',
  },
]);

const inputClass =
  'flex-2 border-none py-1 text-2xl border-round-lg text-center';

function autoHyphen(event: any) {
  inputValue.value[2].value = event
    .replace(/[^0-9]/g, '') // 숫자를 제외한 모든 문자 제거
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

async function returnValue() {
  if (inputValue.value.filter((item: any) => item.value === '')?.length !== 0) {
    $q.notify({
      message: '모든 정보를 입력해주세요.',
      type: 'negative',
    });
    return;
  }
  const result = await axios.request('post', '/landing/applicant_save.php', {
    landing_key: id.value,
    tel: inputValue.value[0].value,
    age: parseInt(inputValue.value[1].value, 10),
    name: inputValue.value[2].value,
  });
  if (result?.success) {
    $q.notify({
      message: 'success',
      type: 'positive',
    });
  } else {
    $q.notify({
      message: 'fail',
      type: 'negative',
    });
  }
}
</script>

<template>
  <q-card class="flex flex-col flex-1 flex-1 p-4 content-div">
    <article
      v-for="item in inputValue"
      :key="item.key"
      class="flex flex-1 flex-row px-2 justify-between items-center"
    >
      <span
        class="inline-block flex-1 text-left font-bold text-white text-2xl"
        >{{ item.name }}</span
      >
      <q-input
        :class="inputClass"
        :id="item.key"
        :placeholder="item.placeholder"
        v-model="item.value"
        @update:model-value="(event: any) => (item.key === 'tel' ? autoHyphen(event) : '')"
        :maxlength="item.key === 'tel' ? 13 : 20"
      />
    </article>
    <q-btn
      @click="returnValue"
      class="py-4 w-full text-white font-bold text-xl mt-4 bg-slate-900"
      >이벤트 신청하기</q-btn
    >
  </q-card>
</template>

<style lang="scss" scoped>
.content-div {
  margin-top: 2rem;
  background: #fd7b1e;
}
</style>
