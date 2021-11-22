<template>
    <div class="setting">
        <h2>Appearance</h2>
        <div class="appearance">
            <li>Theme</li>
            <li>Font Family</li>
            <li></li>
        </div>
        <h2>Download</h2>
        <div class="download">
            <p>
                download fold:
                <span class="lightfont">default fold to save download picture</span>
            </p>
            <span>
                /home/golove/picture
                <button>change fold</button>
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
 <input type="text" placeholder="nikname">
          <input type="email" placeholder="xxx@xx.com">
          </div>

          <textarea name="comment" id="comment" ></textarea>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup () {
    onMounted(() => {
      const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
      }

      for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, dependency + ':' + process.versions[dependency])
      }
    })
  }
})
</script>
