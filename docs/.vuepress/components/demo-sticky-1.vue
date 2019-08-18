<template>
  <div class="demo-sticky-1 extra-margin">
    <div style="margin-bottom: 120px;">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>10</div>
      <div>11</div>
      <div>12</div>
      <div>13</div>
      <f-sticky :distance="distance">
        <div class="sticky-block">在距离窗口顶部 {{ distance }}px 处固定</div>
      </f-sticky>
      <div>14</div>
      <div>15</div>
      <div>16</div>
      <div>17</div>
      <div>18</div>
      <div>19</div>
      <div>20</div>
      <div>21</div>
      <div>22</div>
      <div>23</div>
      <div>24</div>
      <div>25</div>
      <div>26</div>
      <div>27</div>
      <div>28</div>
      <div>29</div>
      <div>30</div>
      <div>31</div>
      <div>32</div>
      <div>33</div>
      <div>34</div>
      <div>35</div>
    </div>

    <code-box :htmlCode="htmlCode" :javascriptCode="javascriptCode" :scssCode="scssCode" />
  </div>
</template>

<script>
import FSticky from '../../../src/components/FSticky.vue';

export default {
  name: 'demo-sticky-1',
  components: { FSticky },
  data() {
    return {
      distance: 100,

      htmlCode: `
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div>11</div>
        <div>12</div>
        <div>13</div>
        <f-sticky :distance="distance">
          <div class="sticky-block">在距离窗口顶部 {{ distance }}px 处固定</div>
        </f-sticky>
        <div>14</div>
        <div>15</div>
        <div>16</div>
        <div>17</div>
        <div>18</div>
        <div>19</div>
        <div>20</div>
        <div>21</div>
        <div>22</div>
        <div>23</div>
        <div>24</div>
        <div>25</div>
        <div>26</div>
        <div>27</div>
        <div>28</div>
        <div>29</div>
        <div>30</div>
        <div>31</div>
        <div>32</div>
        <div>33</div>
        <div>34</div>
        <div>35</div>
      `,
      javascriptCode: `
        data() {
          return {
            distance: 100,
          }
        },
      `,
      scssCode: `
        .sticky-block {
          @extend .flex-center;
          height: 100px;
          background-color: $blue;
          color: #fff;
          font-size: 20px;
        }
      `,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/_var.scss';

.sticky-block {
  @extend .flex-center;
  height: 100px;
  background-color: lighten($blue, 30%);
  color: #fff;
  font-size: 20px;
}
</style>
