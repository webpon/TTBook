import { createSSRApp } from "vue"
import App from "./App.vue";
import { createPinia } from 'pinia'
import 'virtual:windi.css'
import './style/index.scss'
import customView from "@/components/customView.vue"


export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  app.component('c-view', customView)
  return {
    app,
  };
}
