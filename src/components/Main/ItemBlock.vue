<template>
    <div class="itemBlock">
        <p class="title">
            {{title}}
        </p>
        <p class="number">
            <dv-digital-flop :config="config" class="number_flop"/>
        </p>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default () {
        return '标题'
      }
    },
    number: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  computed: {
    config () {
      let number = this.number
      return {
        textAlign: 'left',
        number: [number],
        content: '{nt}',
        style: {
          TextBaseLine: 'middle',
          color: 'red'
        }
      }
    }
  }

}
</script>

<style scoped>
.itemBlock p{
    padding: 0;
    margin: 0;
}
.itemBlock{
    width: 100%;
    height: 100%;
    background: #0B1124;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    overflow: hidden;
    box-sizing: border-box;
    padding: 14px 10px 5px 10px; /*no*/
}
.itemBlock .title{
    color: #409EFF;
    text-align: left;
    font-size: 14px; /*no*/
    flex:0 0 15px; /*no*/
}
.itemBlock .number{
    overflow: hidden;
    flex: 1 1 auto;
    height: 100%;
}
.itemBlock .number .number_flop{
    width: 100%;
    height: 100%;
}
</style>
