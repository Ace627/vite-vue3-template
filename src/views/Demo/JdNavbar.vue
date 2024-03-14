<template>
  <div class="app-content flex justify-center items-center">
    <ul class="cate-menu">
      <li v-for="(item, index) in menuList" :key="index" class="cate-menu-item">
        <a class="cate-menu-link" v-for="(linkItem, linkIndex) in item" :key="linkIndex" :href="linkItem.href">
          <span>{{ linkItem.text }}</span>
          <span class="cate-menu-line" v-if="linkIndex !== item.length - 1">/</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'JdNavbar' })

const menuList = [
  [{ text: '家用电器', href: 'https://www.jd.com' }],
  [
    { text: '手机', href: 'https://www.jd.com' },
    { text: '运营商', href: 'https://www.jd.com' },
    { text: '数码', href: 'https://www.jd.com' },
  ],
  [
    { text: '电脑', href: 'https://www.jd.com' },
    { text: '办公', href: 'https://www.jd.com' },
  ],
  [
    { text: '家居', href: 'https://www.jd.com' },
    { text: '家具', href: 'https://www.jd.com' },
    { text: '家装', href: 'https://www.jd.com' },
    { text: '厨具', href: 'https://www.jd.com' },
  ],
  [
    { text: '男装', href: 'https://www.jd.com' },
    { text: '女装', href: 'https://www.jd.com' },
    { text: '童装', href: 'https://www.jd.com' },
    { text: '内衣', href: 'https://www.jd.com' },
  ],
  [
    { text: '美妆', href: 'https://www.jd.com' },
    { text: '个护清洁', href: 'https://www.jd.com' },
    { text: '宠物', href: 'https://www.jd.com' },
  ],
  [
    { text: '女鞋', href: 'https://www.jd.com' },
    { text: '箱包', href: 'https://www.jd.com' },
    { text: '钟表', href: 'https://www.jd.com' },
    { text: '珠宝', href: 'https://www.jd.com' },
  ],
  [
    { text: '男鞋', href: 'https://www.jd.com' },
    { text: '运动', href: 'https://www.jd.com' },
    { text: '户外', href: 'https://www.jd.com' },
  ],
  [
    { text: '房产', href: 'https://www.jd.com' },
    { text: '汽车', href: 'https://www.jd.com' },
    { text: '汽车用品', href: 'https://www.jd.com' },
  ],
  [
    { text: '母婴', href: 'https://www.jd.com' },
    { text: '玩具乐器', href: 'https://www.jd.com' },
  ],
  [
    { text: '食品', href: 'https://www.jd.com' },
    { text: '酒类', href: 'https://www.jd.com' },
    { text: '生鲜', href: 'https://www.jd.com' },
    { text: '特产', href: 'https://www.jd.com' },
  ],
  [
    { text: '艺术', href: 'https://www.jd.com' },
    { text: '礼品鲜花', href: 'https://www.jd.com' },
    { text: '农牧园艺', href: 'https://www.jd.com' },
  ],
  [
    { text: '医药保健', href: 'https://www.jd.com' },
    { text: '计生情趣', href: 'https://www.jd.com' },
  ],
  [
    { text: '图书', href: 'https://www.jd.com' },
    { text: '文娱', href: 'https://www.jd.com' },
    { text: '教育', href: 'https://www.jd.com' },
    { text: '电子书', href: 'https://www.jd.com' },
  ],
  [
    { text: '机票', href: 'https://www.jd.com' },
    { text: '酒店', href: 'https://www.jd.com' },
    { text: '旅游', href: 'https://www.jd.com' },
    { text: '生活', href: 'https://www.jd.com' },
  ],
  [
    { text: '支付', href: 'https://www.jd.com' },
    { text: '白条', href: 'https://www.jd.com' },
    { text: '保险', href: 'https://www.jd.com' },
    { text: '企业金融', href: 'https://www.jd.com' },
  ],
  [
    { text: '安装', href: 'https://www.jd.com' },
    { text: '维修', href: 'https://www.jd.com' },
    { text: '清洗', href: 'https://www.jd.com' },
    { text: '二手', href: 'https://www.jd.com' },
  ],
  [
    { text: '工业品', href: 'https://www.jd.com' },
    { text: '元器件', href: 'https://www.jd.com' },
  ],
]
</script>

<style lang="scss" scoped>
/* 菜单 ul 状态 */
.cate-menu {
  width: 208px;
  padding: 10px 0;
  color: #636363;
  background-color: #fefefe;
  border-radius: 4px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

/* 菜单 li 状态 */
.cate-menu-item {
  height: 25px;
  line-height: 25px;
  padding-left: 18px;
  /* 移除 span 边距 */
  font-size: 0;
  transition: background-color 0.2s ease;
}

/* 菜单 li 悬浮状态 */
.cate-menu-item:hover {
  cursor: pointer;
  background-color: #d9d9d9;
}

/* 超链接 */
.cate-menu-link {
  font-size: 14px;
  color: #333;
  transition: color 0.2s ease;
}

/* 超链接悬浮状态 */
.cate-menu-link:hover {
  color: #c81623;
}

/* 分割线 */
.cate-menu-line {
  padding: 0 2px;
  font-size: 12px;
}
</style>
