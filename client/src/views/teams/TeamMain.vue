<template>
  <div class="navigation-tags row g-1">
    <Tag v-for="(item, index) in team?.tags" class="col-auto me-2" :text="item" :key="index" />
  </div>
  <hr />
  <div class="block-title">О коллективе</div>
  <div class="middle-panel row g-3">
    <div class="column-left col-md-7 col-sm-12">
      <div class="description">
        {{ team?.description }}
      </div>
    </div>
    <div class="column-right col-md-5 col-sm-12">
      <div class="image-box">
        <div class="arrow-left" @click="previousPage">
          <FontAwesomeIcon icon="angle-left" />
        </div>
        <div class="image-container">
          <div v-for="(item, index) in team?.image" :key="index">
            <img :src="item" v-if="currentPage === index" />
          </div>
        </div>
        <div class="arrow-right" @click="nextPage">
          <FontAwesomeIcon icon="angle-right" />
        </div>
      </div>
    </div>
  </div>
  <div class="block-title">Галерея</div>
  <div class="middle-panel">
    <div class="gallery">
      <img src="https://sun9-80.userapi.com/impg/v16lLdu-5nAWk8CFWXfgBTKbry5ySAaxpg07pA/_VQyOnsIS2U.jpg?size=1600x1067&quality=95&sign=29b4aa0494f355212449ccb5b2d438d4&type=album" alt="" />
      <img src="https://sun9-80.userapi.com/impg/v16lLdu-5nAWk8CFWXfgBTKbry5ySAaxpg07pA/_VQyOnsIS2U.jpg?size=1600x1067&quality=95&sign=29b4aa0494f355212449ccb5b2d438d4&type=album" alt="" />
      <img src="https://sun9-80.userapi.com/impg/v16lLdu-5nAWk8CFWXfgBTKbry5ySAaxpg07pA/_VQyOnsIS2U.jpg?size=1600x1067&quality=95&sign=29b4aa0494f355212449ccb5b2d438d4&type=album" alt="" />
      <img src="https://sun9-80.userapi.com/impg/v16lLdu-5nAWk8CFWXfgBTKbry5ySAaxpg07pA/_VQyOnsIS2U.jpg?size=1600x1067&quality=95&sign=29b4aa0494f355212449ccb5b2d438d4&type=album" alt="" />
    </div>
  </div>
  <div class="map">
    <div class="info">
      <div class="title">Наши контакты</div>
      <div class="phone block">+7 (924) 601-90-94</div>
      <div class="adress block">г. Иркутск, ул. Лермонтова, 83,<br>главный корпус ИРНИТУ,<br>каб. А-203</div>
      <div class="schedule block">пн-пт 9:00 - 18:00,<br>сб 10:00 - 15:00<br>вс - выходной</div>
    </div>
    <img src="https://i.imgur.com/0e7rWdZ.png">
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";
import Tag from "@/components/TagElem.vue";
import type { ITeam } from "@/store/models/teams/team.model";

const props = defineProps<{
  team: ITeam; //коллектив
  onUpdateTeam: () => void;
}>();

const currentPage = ref(0);

// const image = ref<File>();

function nextPage() {
  if (props.team.image && currentPage.value + 1 < props.team.image.length) {
    currentPage.value++;
  } else {
    currentPage.value = 0;
  }
}

function previousPage() {
  if (currentPage.value - 1 >= 0) {
    currentPage.value--;
  } else if (props.team.image) {
    currentPage.value = props.team.image.length - 1;
  }
}

// TODO: сделать загрузку изображений в коллективе
// function uploadImage(e: { target: { files: (File | undefined)[] } }) {
//   image.value = e.target.files[0];
// }

// async function addImage() {
//   let formteam = new FormData();
//   formteam.append("file", image.value!);
//
//   image.value = undefined;
//
//   if (props.team.id) {
//     await teamStore.addImage(props.team.id, formteam);
//     props.onUpdateTeam();
//   }
// }
</script>

<style lang="scss" scoped>
.wrapper-team__navigation {
  padding-bottom: 2rem;

  .active {
    color: var(--main-color);
    border-bottom: var(--main-border-bottom);
  }
}

.navigation-tags {
  display: flex;
}

.block-title {
  font-weight: bold;
  margin-bottom: 15px;
}

.middle-panel {
  display: flex;
  margin-bottom: 20px;

  .title {
    color: rgb(8, 7, 7);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .column-left {
    h2 {
      color: #000;
      font-size: 20px;
      height: 2rem;
      font-family: var(--font-family-title);
    }
    .description {
      text-align: justify;
      font-size: 12px;
    }
  }

  .gallery {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

    img {
      height: 250px;
      width: 400px;
      border-radius: 10px;
      object-fit: cover;
      overflow: hidden;
      margin-right: 10px;
    }
  }

  .column-right {
    .image-box {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .add-container {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      button {
        margin-top: 10px;
      }
    }

    .image-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 300px;
      height: 200px;
      background-size: cover;
      overflow: hidden;
      border-radius: 25px;

      img {
        max-width: 100%;
        height: auto;
      }
    }

    .page-arrows {
      padding-top: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .arrow-left,
    .arrow-right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      margin: 0 10px;
      cursor: pointer;
    }

    .arrow-left > *,
    .arrow-right > *{
      color: #ababab;
      font-size: 18px;
    }
  }
}

.map {
  display: flex;
  margin: 2rem -2.5rem -1.5rem -2.5rem;

  @media screen and (max-width: 768px) {
    .info {
      font-size: 10px;
    }
  }

  .info {
    position: absolute;
    padding: 25px;
    margin: 1rem 0 0 1rem;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(61, 61, 61, 0.2);
    border-radius: 20px;
    background-color: white;

    .block {
      margin: 8px 0;
    }

    .phone {
      color: #d83c5b;
    }

    .title {
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
  }

  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 0 0 14px 14px;
  }
}
</style>
