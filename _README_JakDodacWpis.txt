Najpierw w folderze nextautsite/blog/
robimy nowy katalog np nextautsite/blog/automatyzacja
tam dodajemy index.html i article-lang.js
wrzucamy tam rzeczy do srodka na zasadzie zaczerpniecia z poprzednich wpisow templatea
do vite.config.js dodajemy nowy wpis na zasadzie tak jak sa wczesniejsze. czyli np blogAutomatyzacja: path.resolve(__dirname, 'blog/automatyzacja/index.html'),
export default defineConfig({
  plugins: [
    tailwindcss(),
    inject(),
  ],
  appType: 'mpa',
  base: '/',
  // base: '/nexautsite/' albo base: './', zeby dzialalo na github pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        TUTAJ <--
      }
      }
      }
})
i to tyle