import fs from 'node:fs'
import * as stylus from 'stylus'


export default function farmPlugin(options = {}) {
   const resolvedPaths = options.resolvedPaths || ['\\.styl$', '\\.stylus$']
   const defaultExtensions = ['.styl', '.stylus']

   const readFileAsync = (path) => fs.promises.readFile(path, 'utf-8')

   const transformContent = (content, filename) => new Promise((resolve, reject) => stylus.render(content, { filename }, (err, css) => err ? reject(err) : resolve(css)))

   const addExtensions = (config) => {
      const extensions = config?.compilation?.resolve?.extensions
      if (extensions) config.compilation.resolve.extensions = [...new Set(extensions.concat(defaultExtensions))]
      else {
         config.compilation = config.compilation || {}
         config.compilation.resolve = config.compilation.resolve || {}
         config.compilation.resolve.extensions = defaultExtensions.slice()
      }
   }

   return {
      name: 'farm-js-plugin-stylus',

      config: (config) => {
         addExtensions(config)
         return config
      },

      load: {
         filters: { resolvedPaths },
         executor: async (param) => {
            if (param.query.length === 0 && fs.existsSync(param.resolvedPath)) {
               const content = await readFileAsync(param.resolvedPath)
               return { content, moduleType: 'stylus' }
            }
            return null
         }
      },

      transform: {
         filters: {
            resolvedPaths: options.filters?.resolvedPaths || resolvedPaths,
            moduleTypes: options.filters?.moduleTypes || ['stylus']
         },
         executor: async (param) => {
            try {
               const content = await transformContent(param.content, param.resolvedPath)
               return { content, moduleType: 'css' }
            } catch (err) {
               console.error(`Error transforming ${param.resolvedPath}:`, err)
               throw err
            }
         }
      }
   }
}
