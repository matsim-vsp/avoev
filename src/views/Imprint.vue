<template lang="pug">
#home
  .page-area
    .banner
      h2 VSP / Technische Universität Berlin
      h3 AVÖV Projekt Portal

    .content
      .main
        .imprint
          .headline Impressum
          p(v-html="imprint")

  colophon.colophon

</template>

<script lang="ts">
const readme = require('@/assets/info-top.md')
const bottom = require('@/assets/info-bottom.md')

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import MarkdownIt from 'markdown-it'

import Colophon from '@/components/Colophon.vue'
import VizCard from '@/components/VizCard.vue'
import SvnProjects from '@/components/SVNProjects.vue'

import globalStore from '@/store'

@Component({ components: { Colophon, SvnProjects, VizCard } })
class MyComponent extends Vue {
  private mounted() {
    globalStore.commit('setBreadCrumbs', [])
    this.showImprint()
  }

  private markdownParser = new MarkdownIt()
  private state = globalStore.state
  private readme = readme
  private readmeBottom = bottom
  private imprint = ''

  private async showImprint() {
    try {
      const imprintURL =
        'https://svn.vsp.tu-berlin.de/repos/public-svn/ueber_uns/imprint/imprint.de.md'
      const imprintMd = await fetch(imprintURL).then(r => r.text())
      this.imprint = this.markdownParser.render(imprintMd)
    } catch (e) {}
  }
}
export default MyComponent
</script>

<style scoped lang="scss">
@import '@/styles.scss';

#home {
  display: flex;
  flex-direction: row;
  background-color: $paleBackground;
}

.gap {
  margin-top: 2rem;
}

.content {
  flex: 1;
  padding: 2rem 3rem 5rem 3rem;
  display: flex;
  width: 100%;
}

.main {
  margin: 0 auto;
  text-align: center;
}

.banner {
  display: flex;
  flex-direction: column;
  padding: 4rem 3rem 1rem 3rem;
  background-color: #ffffff;
  color: $tuRed;
  background: url(../assets/images/banner.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  // border-bottom: 1px solid $tuRed;
}

.banner h2 {
  margin-bottom: 0rem;
  font-size: 1.6rem;
  background-color: white;
  line-height: 1.7rem;
  margin-right: auto;
  padding: 0 0.5rem;
}

.banner h3 {
  font-size: 1.3rem;
  font-weight: normal;
  margin-bottom: 0;
  line-height: 1.4rem;
  padding: 0.25rem 0.5rem;
  background-color: white;
  width: max-content;
}

a {
  font-size: 1.1rem;
  color: #00499c;
}

.readme {
  margin-top: 1rem;
  margin-bottom: 3rem;
  flex: 1;
}

.main h2 {
  margin-top: 3rem;
  font-weight: normal;
  color: $bannerHighlight;
}

.viz-cards {
  padding-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 2rem;
}

.one-viz {
  margin-bottom: 1rem;
}

.preamble {
  display: flex;
}

.top {
  margin-top: 1rem;
}

.colophon {
  padding: 2rem 2rem 1rem 5rem;
  text-align: right;
  font-size: 0.85rem;
  background-color: white;
}

.main {
  max-width: 64rem;
}

.main .top a {
  font-size: 0.9rem;
}

.page-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.headline {
  font-size: 2rem;
  line-height: 2.7rem;
  padding: 1rem 0;
  color: $themeColor;
}

#app .footer {
  color: #222;
  background-color: white;
  padding: 1rem 0.5rem 1rem 0.5rem;
  display: flex;
}

.logos {
  display: flex;
  margin: 0 auto;
}

.logo {
  margin: auto 0;
  height: min-content;
}

a.footer {
  color: $matsimBlue;
}

.footer img {
  padding: 0 1rem;
}

.imprint {
  text-align: left;
}

@media only screen and (max-width: 640px) {
  .banner {
    padding: 2rem 1rem;
  }

  .content {
    padding: 2rem 1rem 8rem 1rem;
    flex-direction: column-reverse;
  }

  .colophon {
    display: none;
  }

  .headline {
    padding: 0rem 0rem 1rem 0rem;
    font-size: 1.5rem;
    line-height: 1.8rem;
  }
}
</style>
