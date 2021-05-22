import axios from 'axios'

getPageData()

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function getPageData() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'upload') {
      const data: any = {
        question: document.querySelector('.css-v3d350')!.textContent,
        url: document.URL,
        tags: [...document.querySelectorAll('.tag__24Rd')]
          .map((tag) => {
            return tag.textContent
          })
          .join(', '),
        code: [...document.querySelectorAll('.CodeMirror-line')]
          .map((line) => {
            return line.textContent
          })
          .join('\n'),
      }

      if (document.querySelector('.css-14oi08n')) {
        data.difficulty = 'Easy'
      } else if (document.querySelector('.css-dcmtd5')) {
        data.difficulty = 'Medium'
      } else if (document.querySelector('.css-t42afm')) {
        data.difficulty = 'Hard'
      }

      axios
        .get('https://leetcode.com/api/problems/algorithms/')
        .then((res: any) => {
          if (res.data.user_name === 'aman0709') {
            data.name = 'Aman Gupta'
          } else if (res.data.user_name === 'SamarthJain') {
            data.name = 'Samarth Jain'
          }

          axios
            .post('https://leetbot.amangupta0709.repl.co/api/data', data)
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
}
