<template>
  <div class="setting">
    <h2>Appearance</h2>
    <div class="appearance">
      <li>Theme</li>
      <li>Font Family</li>
      <li></li>
    </div>
    <h2>ChangeUrl</h2>
    <div class="changeurl">
      <input type="text" v-model="rootUrl" placeholder="new url">
      <button :class="rootUrl===''?'btndisabledstyle':'loadMoreBtnStyle'" @click="ChangeUrl" :disabled="rootUrl===''">Change Url</button>
    </div>
    <h2>Download</h2>
    <div class="download">
      <p>
        download fold:
        <span class="lightfont">default fold to save download picture</span>
      </p>
      <span>
        <input V-model="dirPath" type="file" webkitdirectory directory/>
        <button :class="rootUrl===''?'btndisabledstyle':'loadMoreBtnStyle'" @click="changePath" disabled="true">change fold</button>
      </span>
    </div>
    <h2>About</h2>
    <div class="about">
      <div class="version">Version:1.00</div>
      <div class="version" id="chrome-version"></div>
      <div class="version" id="node-version"></div>
      <div class="version" id="electron-version"></div>
      <div class="version">Author:Golve</div>
    </div>
    <h2>Comment</h2>
    <div class="comment">
      <div>
        <input type="text" placeholder="nikname" />
        <input type="email" placeholder="xxx@xx.com" />
      </div>

      <textarea name="comment" id="comment"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { ipcRenderer } from 'electron'
export default defineComponent({
  setup () {
    const dirPath = ref('')
    const rootUrl = ref('')
    function changePath (): void {
      console.log(dirPath.value)
      ipcRenderer.send('changePathOrUrl', `path=${dirPath.value}`)
    }
    function ChangeUrl (): void{
      ipcRenderer.send('changePathOrUrl', `url='${rootUrl.value}'`)
    }

    onMounted(() => {
      const replaceText = (selector: string, text: string) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
      }

      for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, dependency + ':' + process.versions[dependency])
      }
    })
    return { changePath, dirPath, ChangeUrl, rootUrl }
  }
})
</script>
