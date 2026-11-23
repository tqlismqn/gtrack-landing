import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/* Раньше vitest шёл без конфига, и алиас `@/` тесты не знали — поэтому модули, которые они
   тянут, импортируют друг друга относительно. Тест страницы /start рендерит компоненты, а те
   импортируют через `@/` (как весь src/components): алиас зеркалит tsconfig `paths`. Остальные
   тесты конфиг не меняет — окружение по-прежнему node, глобалов нет. */
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
