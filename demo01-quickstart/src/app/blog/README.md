# 关于layout.tsx和template.tsx
- 渲染的层级关闭: layout=>template=>page
- layout首次挂载之后就不会被卸载了，尽管我们切换page
- template每次切换page都会被重新挂载;但是重新切回之后,会发现之前的响应式变量的值和之前保持不变,这是因为我们开了cacheComponents,关闭之后就不会了.

# useEffect
- 可以通过加`[]`保证回调只在组件挂载和卸载时触发，默认是挂载和重新渲染都触发的