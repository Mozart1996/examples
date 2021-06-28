import {bytesToSize} from './bytes_converter'

const createElement = (tag, classes = [], content) => {
   const node = document.createElement(tag)

   if(classes.length) {
      node.classList.add(...classes)
   }
   
   if(content) {
      node.textContent = content
   }

   return node
}

export function upload(options = {}) {
   let files = []
   const noop = () => {}
   const input = document.querySelector('#file')

   const open = createElement('button', ['btn'], 'Открыть')
   const preview = createElement('div', ['preview'])
   const upload = createElement('button', ['btn', 'btn-upload'], 'Загрузить')
   preview.style.display = 'none'
   upload.style.display = 'none'

   input.insertAdjacentElement('afterend', open)
   open.insertAdjacentElement('afterend', preview)
   open.insertAdjacentElement('afterend', upload)

   const onUpload = options.onUpload ?? noop

   const triggerInput = () => input.click()

   if (options.multi) {
      input.setAttribute('multiple', true)
   }

   if (options.accept && Array.isArray(options.accept)) {
      input.setAttribute('accept', options.accept.join(','))
   }

   const changeHandler = event => {
      if (!event.target.files.length) {
         return
      }

      preview.style.display = 'flex'
      upload.style.display = 'inline-block'

      files = Array.from(event.target.files)

      preview.innerHTML = ''
      files.forEach(file => {
         if (!file.type.match('image')) {
            return
         }

         const reader = new FileReader()

         reader.onload = event => {
            preview.insertAdjacentHTML('beforeend', `
            <div class="preview-image">
               <div class="preview-remove" data-name="${file.name}">&times;</div>
               <img src="${event.target.result}" alt="${file.name}" />
               <div class="preview-info">
                  <span>${file.name}</span>
                  <span>${bytesToSize(file.size)}</span>
               </div>
            </div>
            `)
         }

         reader.readAsDataURL(file)
      })
   }

   const removeHandler = event => {
      if(!event.target.dataset.name) {
         return
      }

      const {name} = event.target.dataset
      files = files.filter(file => file.name !== name)
      
      const block = preview.querySelector(`[data-name="${name}"]`).closest('.preview-image')
      block.classList.add('removing')
      setTimeout(() => {
         block.remove()
         if(!files.length) {
            preview.style.display = 'none'
            upload.style.display = 'none'
         }
      }, 300)
   }

   const clearBlock = el => {
      el.style.bottom = 0;
      el.innerHTML = '<div class="preview-info-progress"></div>'
   }

   const uploadHandler = () => {
      preview.querySelectorAll('.preview-remove').forEach(e => e.remove())
      const previewInfo = preview.querySelectorAll('.preview-info')
      previewInfo.forEach(clearBlock)
      onUpload(files, previewInfo)
   }

   open.addEventListener('click', triggerInput)
   input.addEventListener('change', changeHandler)
   preview.addEventListener('click', removeHandler)
   upload.addEventListener('click', uploadHandler)
}