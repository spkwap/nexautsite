import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import inject from 'vite-plugin-html-inject';

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
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'o-nas/index.html'),
        offer: path.resolve(__dirname, 'oferta/index.html'),
        projects: path.resolve(__dirname, 'projekty/index.html'),
        career: path.resolve(__dirname, 'kariera/index.html'),
        contact: path.resolve(__dirname, 'kontakt/index.html'),
        ofertaProjektowanie: path.resolve(__dirname, 'oferta/projektowanie/index.html'),
        ofertaPlc: path.resolve(__dirname, 'oferta/programowanie-plc/index.html'),
        ofertaRobotyka: path.resolve(__dirname, 'oferta/robotyka/index.html'),
        ofertaScada: path.resolve(__dirname, 'oferta/hmi-scada/index.html'),
        blog: path.resolve(__dirname, 'blog/index.html'),
        blogPrzykladowyWpis: path.resolve(__dirname, 'blog/przykladowy-wpis/index.html'),
        blogPrzykladowyWpis2: path.resolve(__dirname, 'blog/przykladowy-wpis-2/index.html'),
        blogVass6: path.resolve(__dirname, 'blog/standard-vass-6-w-automatyzacji/index.html'),
        blogVirtualCommissioning: path.resolve(__dirname, 'blog/wirtualne-uruchomienie-virtual-commissioning/index.html'),
        blogSiemensVsAllenBradley: path.resolve(__dirname, 'blog/siemens-tia-portal-vs-allen-bradley/index.html'),
        blogAutomatyzacjaStanowisk: path.resolve(__dirname, 'blog/dlaczego-warto-automatyzowac-stanowiska-produkcyjne/index.html'),
        blogCobotVsRobot: path.resolve(__dirname, 'blog/cobot-czy-robot-przemyslowy/index.html'),
        blogProgramowaniePlc: path.resolve(__dirname, 'blog/dobre-praktyki-programowania-plc-clean-code/index.html'),
        blogDiagnostykaProfinet: path.resolve(__dirname, 'blog/diagnostyka-i-optymalizacja-sieci-profinet/index.html'),
        blogPrzemysl40: path.resolve(__dirname, 'blog/przemysl-4-0-i-iot-w-praktyce/index.html'),
        blogCobotSafety: path.resolve(__dirname, 'blog/bezpieczenstwo-cobotow-i-stanowisk-zrobotyzowanych/index.html'),
        blogScadaVsHmi: path.resolve(__dirname, 'blog/systemy-scada-czy-panele-hmi/index.html'),
        blogNajZautKatSlask: path.resolve(__dirname, 'blog/najbardziej-zautomatyzowane-fabryki-katowice-slask/index.html'),
        blogNajnowoczesniejszeRanked: path.resolve(__dirname, 'blog/najnowoczesniejsze-fabryki-w-polsce-ranking-i-historia/index.html'),
        blogPokrowce: path.resolve(__dirname, 'blog/dlaczego-nalezy-stosowac-pokrowce-na-roboty-przemyslowe/index.html'),
        blogZagrozenia: path.resolve(__dirname, 'blog/najczestsze-zagrozenia-w-fabrykach-i-na-liniach-produkcyjnych/index.html'),
        blogChorobyZawodowe: path.resolve(__dirname, 'blog/choroby-zawodowe-w-fabrykach-i-jak-im-przeciwdzialac/index.html'),
        blogAutomAutomotiveMiasta: path.resolve(__dirname, 'blog/automatyzacja-automotive-gliwice-tychy-bielsko-krakow-katowice/index.html'),
        blogAutomPrzemysluTrojmiasto: path.resolve(__dirname, 'blog/automatyzacja-przemyslu-trojmiasto-gdansk-olsztyn-bydgoszcz/index.html'),
        blogRobotyzacjaMagazynow: path.resolve(__dirname, 'blog/robotyzacja-magazynow-intralogistyka-lodz-poznan-warszawa-wroclaw/index.html'),
        blogAutomProcesow: path.resolve(__dirname, 'blog/automatyzacja-procesow-okregi-przemyslowe-rzeszow-legnica-bydgoszcz-szczecin/index.html'),
        blogIntregatorAutom: path.resolve(__dirname, 'blog/integrator-automatyki-przemyslowej-polska-katowice-wroclaw-krakow-poznan/index.html'),
      }
    }
  },
  server: {
    port: 3000,
  }
})