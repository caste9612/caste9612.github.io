import type { ImageMetadata } from 'astro';
import type { Text } from '../i18n/ui';
import type { GlyphName } from '../lib/glyphs';

import orbitIcon from '../assets/projects/orbit/icon.svg';
import orbitEditor from '../assets/projects/orbit/editor.webp';
import orbitActivity from '../assets/projects/orbit/activity.webp';
import orbitGit from '../assets/projects/orbit/git.webp';
import orbitDocs from '../assets/projects/orbit/docs.webp';
import orbitSettings from '../assets/projects/orbit/settings.webp';
import pulseIcon from '../assets/projects/pulse/icon.png';
import pulseDark from '../assets/projects/pulse/dark.webp';
import pulseLight from '../assets/projects/pulse/light.webp';
import prismIcon from '../assets/projects/prism/icon.png';
import prismDashboard from '../assets/projects/prism/dashboard.webp';
import prismSearch from '../assets/projects/prism/search.webp';
import prismBackup from '../assets/projects/prism/backup.webp';
import argusIcon from '../assets/projects/argus/icon.svg';
import argusMetrics from '../assets/projects/argus/metrics.webp';
import argusFlame from '../assets/projects/argus/flame.webp';
import argusGuide from '../assets/projects/argus/guide.webp';
import coveIcon from '../assets/projects/cove/icon.png';
import covePanel from '../assets/projects/cove/panel.webp';
import inlayIcon from '../assets/projects/inlay/icon.png';
import inlayBoard from '../assets/projects/inlay/board.webp';
import inlayMosaic from '../assets/projects/inlay/mosaic.webp';
import inlaySearch from '../assets/projects/inlay/search.webp';
import inlayMove from '../assets/projects/inlay/move.webp';

export interface Feature {
  glyph: GlyphName;
  title: Text;
  text: Text;
}

export interface Shot {
  src: ImageMetadata;
  caption: Text;
  alt: Text;
}

/** One of the four boxes in the "Details" section of a project page. */
export type Tile =
  | { k: 'platform' }
  | { k: 'installer' | 'downloadSize'; asset: RegExp }
  | { k: 'program' | 'requires'; v: string }
  | { k: 'installation'; v: 'notNeeded' }
  | { k: 'runtime'; v: 'included' }
  | { k: 'license' }
  | { k: 'releases' };

export interface Project {
  slug: string;
  name: string;
  /** accent colour of the project */
  color: string;
  icon: ImageMetadata;
  /** the icon is an opaque square and needs rounded corners */
  squareIcon?: boolean;
  /** shown large on the home page */
  main?: boolean;
  platform: Text;
  /** platform in the download button */
  downloadFor: string;
  tagline: Text;
  /** short label in the "other projects" row */
  short: Text;
  /** text on the home page card, main projects only */
  summary?: Text;
  intro: Text;
  features: Feature[];
  requirements: Text[];
  stack: string[];
  /** licence stated in the README, used when GitHub does not detect a licence file */
  statedLicense?: string;
  /** screenshots of the project page; the home page card shows the first three */
  shots: Shot[];
  /** how screenshots fill their frame: cover (wide app windows) or contain */
  shotFit: 'cover' | 'contain';
  tiles: Tile[];
}

export const projects: Project[] = [
  {
    slug: 'orbit',
    name: 'Orbit',
    color: '#7c5cff',
    icon: orbitIcon,
    main: true,
    platform: { en: 'Windows', it: 'Windows' },
    downloadFor: 'Windows',
    tagline: {
      en: 'Lightweight IDE designed to work alongside Claude Code.',
      it: 'IDE leggero pensato per lavorare insieme a Claude Code.',
    },
    short: { en: 'IDE for Claude Code', it: 'IDE per Claude Code' },
    summary: {
      en: 'File explorer, code editor, git and an integrated terminal running Claude Code, in a small desktop app. Files changed by Claude reload on their own and are highlighted in the tree.',
      it: "Esplora file, editor, git e un terminale integrato con Claude Code, in una piccola app desktop. I file modificati da Claude si ricaricano da soli e sono evidenziati nell'albero.",
    },
    intro: {
      en: 'Orbit is a small desktop editor to keep next to Claude Code: it shows the whole project, edits files, handles git and runs Claude Code in an integrated terminal. Several repositories stay open as tabs in one window. It is not a full IDE: there is no language server, debugger or refactoring.',
      it: 'Orbit è un piccolo editor desktop da tenere accanto a Claude Code: mostra tutto il progetto, modifica i file, gestisce git ed esegue Claude Code in un terminale integrato. Più repository restano aperti come schede nella stessa finestra. Non è un IDE completo: non ci sono language server, debugger o refactoring.',
    },
    features: [
      {
        glyph: 'folder',
        title: { en: 'Repositories and files', it: 'Repository e file' },
        text: {
          en: 'Each repository is a tab with its own color; a repository can also move to a window of its own. The tree shows the real file system, with git changes highlighted as they happen. Quick Open and full-text search.',
          it: "Ogni repository è una scheda con il suo colore e può anche passare in una finestra sua. L'albero mostra il file system reale, con le modifiche git evidenziate mentre avvengono. Apertura rapida e ricerca nel testo.",
        },
      },
      {
        glyph: 'editor',
        title: { en: 'Editor', it: 'Editor' },
        text: {
          en: 'CodeMirror 6 with about 140 languages loaded on demand, split view, Markdown and HTML preview, images and PDFs. Files changed on disk reload by themselves, and reopen where you left them.',
          it: 'CodeMirror 6 con circa 140 linguaggi caricati quando servono, vista divisa, anteprima di Markdown e HTML, immagini e PDF. I file modificati su disco si ricaricano da soli e si riaprono dove li avevi lasciati.',
        },
      },
      {
        glyph: 'compass',
        title: { en: 'Code navigation', it: 'Navigazione nel codice' },
        text: {
          en: 'A project symbol index built without a language server: go to definition, base types and implementers, and a line above each class and function with its references and implementations.',
          it: 'Un indice dei simboli del progetto costruito senza language server: vai alla definizione, tipi base e implementazioni, e una riga sopra ogni classe e funzione con i suoi riferimenti e le implementazioni.',
        },
      },
      {
        glyph: 'terminal',
        title: { en: 'Terminal', it: 'Terminale' },
        text: {
          en: 'Real terminals in tabs, up to four Claude chats or shells side by side, clickable file paths and links. Terminals and Claude chats come back, with their conversations, when Orbit reopens.',
          it: 'Terminali veri in schede, fino a quattro chat di Claude o shell affiancate, percorsi e link cliccabili. Terminali e chat di Claude tornano, con le loro conversazioni, quando Orbit si riapre.',
        },
      },
      {
        glyph: 'git',
        title: { en: 'Git', it: 'Git' },
        text: {
          en: 'Status, diff, staging, commits, branches and a commit graph, through libgit2. Fetch, pull and push run the real git command in a terminal.',
          it: 'Stato, diff, staging, commit, branch e grafo dei commit, tramite libgit2. Fetch, pull e push eseguono il vero comando git in un terminale.',
        },
      },
      {
        glyph: 'spark',
        title: { en: 'Claude Code', it: 'Claude Code' },
        text: {
          en: 'A timeline of the work Claude did in every repository, titled with its commits, a Claude menu with prompt shortcuts, and a notice when a chat is waiting for you.',
          it: 'Una cronologia del lavoro fatto da Claude in ogni repository, con i titoli dei commit, un menu Claude con prompt pronti e un avviso quando una chat ti aspetta.',
        },
      },
    ],
    requirements: [
      {
        en: 'Windows with WebView2, which comes with Windows 11. The installer is available as .exe or .msi; new versions are then offered from GitHub and install in place with one click.',
        it: "Windows con WebView2, già presente in Windows 11. L'installer è disponibile come .exe o .msi; poi le versioni nuove arrivano da GitHub e si installano con un clic.",
      },
      {
        en: 'The code is written to be cross-platform; builds for Linux and macOS are not published yet.',
        it: 'Il codice è scritto per essere multipiattaforma; le versioni per Linux e macOS non sono ancora pubblicate.',
      },
    ],
    stack: ['Rust', 'Tauri 2', 'Svelte 5', 'TypeScript', 'Tailwind CSS 4', 'CodeMirror 6', 'xterm.js', 'libgit2'],
    statedLicense: 'MIT',
    shots: [
      {
        src: orbitEditor,
        caption: { en: 'Editor and Claude Code', it: 'Editor e Claude Code' },
        alt: {
          en: 'Orbit with five repositories open: a Rust file in the editor and two Claude Code chats side by side, one showing the change it just made',
          it: "Orbit con cinque repository aperti: un file Rust nell'editor e due chat di Claude Code affiancate, una con la modifica appena fatta",
        },
      },
      {
        src: orbitActivity,
        caption: { en: 'Activity', it: 'Activity' },
        alt: {
          en: "Orbit's Activity view: the work done by Claude in five repositories, one column each, titled with the commits",
          it: 'La vista Activity di Orbit: il lavoro fatto da Claude in cinque repository, una colonna ciascuno, con i titoli dei commit',
        },
      },
      {
        src: orbitGit,
        caption: { en: 'Commit diff', it: 'Diff di un commit' },
        alt: {
          en: 'A commit opened from the Git graph, with its diff in red and green',
          it: 'Un commit aperto dal grafo Git, con il suo diff in rosso e verde',
        },
      },
      {
        src: orbitDocs,
        caption: { en: 'Docs view', it: 'Vista Docs' },
        alt: {
          en: "Orbit's Docs view with a Markdown file in reading mode and its outline, next to the Claude chats",
          it: 'La vista Docs di Orbit con un file Markdown in modalità lettura e il suo indice, accanto alle chat di Claude',
        },
      },
      {
        src: orbitSettings,
        caption: { en: 'Settings', it: 'Impostazioni' },
        alt: {
          en: "Orbit's Settings: themes shown as thumbnails, accent colors and the installed version",
          it: 'Le impostazioni di Orbit: i temi come miniature, i colori di accento e la versione installata',
        },
      },
    ],
    shotFit: 'cover',
    tiles: [{ k: 'platform' }, { k: 'installer', asset: /-setup\.exe$/i }, { k: 'program', v: '~7 MB' }, { k: 'license' }],
  },
  {
    slug: 'pulse',
    name: 'Pulse',
    color: '#69f0ae',
    icon: pulseIcon,
    main: true,
    platform: { en: 'Windows 10/11', it: 'Windows 10/11' },
    downloadFor: 'Windows',
    tagline: { en: 'System monitor widget for Windows.', it: 'Widget di monitoraggio del sistema per Windows.' },
    short: { en: 'System monitor', it: 'Monitor di sistema' },
    summary: {
      en: 'CPU with one bar per core, RAM, GPU, network, disk and top processes, in a small window that starts with Windows and remembers its position and size.',
      it: 'CPU con una barra per core, RAM, GPU, rete, disco e processi principali, in una piccola finestra che parte con Windows e ricorda posizione e dimensioni.',
    },
    intro: {
      en: 'Pulse is a small window that stays on the desktop and shows live system metrics, each with a graph of the last 60 seconds. It can start with Windows, lives in the system tray and is designed to use as little CPU and memory as possible.',
      it: "Pulse è una piccola finestra che resta sul desktop e mostra le metriche del sistema in tempo reale, ognuna con il grafico degli ultimi 60 secondi. Può partire con Windows, vive nell'area di notifica ed è pensato per usare meno CPU e memoria possibile.",
    },
    features: [
      {
        glyph: 'cpu',
        title: { en: 'CPU and memory', it: 'CPU e memoria' },
        text: {
          en: 'CPU usage, clock, temperature and power, with one bar per core that shows which processes run on it; RAM split into in use, cached and free in one bar.',
          it: "Uso della CPU, frequenza, temperatura e consumo, con una barra per core che mostra quali processi ci girano; la RAM divisa in usata, cache e libera in un'unica barra.",
        },
      },
      {
        glyph: 'gpu',
        title: { en: 'GPU', it: 'GPU' },
        text: {
          en: 'GPU usage, video memory, temperature, clocks and power, also for integrated GPUs; NVIDIA cards are read directly from the driver.',
          it: 'Uso della GPU, memoria video, temperatura, frequenze e consumo, anche per le GPU integrate; le schede NVIDIA si leggono direttamente dal driver.',
        },
      },
      {
        glyph: 'network',
        title: { en: 'Network and disk', it: 'Rete e disco' },
        text: {
          en: 'Download and upload speed, Wi-Fi signal, IP addresses and ping; disk throughput and free space on each drive.',
          it: 'Velocità di download e upload, segnale Wi-Fi, indirizzi IP e ping; traffico dei dischi e spazio libero su ogni unità.',
        },
      },
      {
        glyph: 'list',
        title: { en: 'Top processes', it: 'Processi principali' },
        text: {
          en: 'The six processes using the most CPU and the most memory, updated every five seconds, with a menu to open their folder or end them.',
          it: 'I sei processi che usano più CPU e più memoria, aggiornati ogni cinque secondi, con un menu per aprirne la cartella o terminarli.',
        },
      },
      {
        glyph: 'pin',
        title: { en: 'Always at hand', it: 'Sempre a portata di mano' },
        text: {
          en: 'Starts with Windows, remembers its position and size, moves to a corner of the screen or fits its content with one click, and hides in the system tray.',
          it: "Parte con Windows, ricorda posizione e dimensioni, con un clic va in un angolo dello schermo o si adatta al contenuto, e si nasconde nell'area di notifica.",
        },
      },
      {
        glyph: 'chart',
        title: { en: 'Live graphs', it: 'Grafici in tempo reale' },
        text: {
          en: 'Every metric has a graph of the last 60 seconds; fast values refresh every second, sensors every two. Dark and light theme.',
          it: 'Ogni metrica ha il grafico degli ultimi 60 secondi; i valori veloci si aggiornano ogni secondo, i sensori ogni due. Tema scuro e chiaro.',
        },
      },
    ],
    requirements: [
      {
        en: 'Windows 10 or 11, 64-bit, with the .NET 9 Desktop Runtime. A portable zip is also available.',
        it: 'Windows 10 o 11 a 64 bit, con il .NET 9 Desktop Runtime. È disponibile anche uno zip portatile.',
      },
      {
        en: 'CPU temperature and power need administrator rights and the PawnIO driver, the processes on each core administrator rights. The installer can set Pulse to start that way at login and install PawnIO.',
        it: "Temperatura e consumo della CPU richiedono i permessi di amministratore e il driver PawnIO, i processi su ogni core i permessi di amministratore. L'installer può far partire Pulse così all'accesso e installare PawnIO.",
      },
    ],
    stack: ['C#', '.NET 9', 'WPF', 'Win32', 'ETW', 'LibreHardwareMonitor', 'NVML'],
    statedLicense: 'MIT',
    shots: [
      {
        src: pulseDark,
        caption: { en: 'Dark theme', it: 'Tema scuro' },
        alt: {
          en: 'Pulse running as administrator: CPU with temperature, power and per-core bars colored by process, RAM, GPU, network, disk and top processes',
          it: 'Pulse da amministratore: CPU con temperatura, consumo e barre per core colorate per processo, RAM, GPU, rete, disco e processi principali',
        },
      },
      {
        src: pulseLight,
        caption: { en: 'Light theme', it: 'Tema chiaro' },
        alt: {
          en: 'Pulse with the light theme, with its live graphs and the processes using the most CPU and memory',
          it: 'Pulse con il tema chiaro, con i grafici in tempo reale e i processi che usano più CPU e memoria',
        },
      },
    ],
    shotFit: 'contain',
    tiles: [{ k: 'platform' }, { k: 'installer', asset: /^setup-pulse.*\.exe$/i }, { k: 'requires', v: '.NET 9' }, { k: 'license' }],
  },
  {
    slug: 'prism',
    name: 'Prism',
    color: '#4fc3f7',
    icon: prismIcon,
    squareIcon: true,
    platform: { en: 'Windows', it: 'Windows' },
    downloadFor: 'Windows',
    tagline: { en: 'Disk analyzer and duplicate finder.', it: 'Analisi dei dischi e ricerca dei duplicati.' },
    short: { en: 'Disk analyzer', it: 'Analisi dei dischi' },
    intro: {
      en: 'Prism indexes local and network drives, finds duplicate files, shows space usage as a treemap and checks whether a backup drive contains everything.',
      it: 'Prism indicizza dischi locali e di rete, trova i file duplicati, mostra lo spazio occupato come treemap e verifica se un disco di backup contiene tutto.',
    },
    features: [
      {
        glyph: 'scan',
        title: { en: 'Scanning', it: 'Scansione' },
        text: {
          en: 'Parallel scanning of local and network drives; after the first pass only changed files are read again.',
          it: 'Scansione in parallelo di dischi locali e di rete; dopo la prima passata vengono riletti solo i file cambiati.',
        },
      },
      {
        glyph: 'search',
        title: { en: 'Search', it: 'Ricerca' },
        text: {
          en: 'Full-text search over the index with filters for size, extension, type and path, also from a global shortcut (Ctrl+Space).',
          it: "Ricerca nell'indice con filtri per dimensione, estensione, tipo e percorso, anche da una scorciatoia globale (Ctrl+Spazio).",
        },
      },
      {
        glyph: 'copy',
        title: { en: 'Duplicates', it: 'Duplicati' },
        text: {
          en: 'Duplicate files found by content hash (BLAKE3) and similar images by perceptual hash, with the space wasted by each group.',
          it: 'File duplicati trovati per hash del contenuto (BLAKE3) e immagini simili per hash percettivo, con lo spazio sprecato da ogni gruppo.',
        },
      },
      {
        glyph: 'treemap',
        title: { en: 'Space usage', it: 'Spazio occupato' },
        text: {
          en: 'Folder tree and interactive treemap of the space in use, with the distribution by file type.',
          it: 'Albero delle cartelle e treemap interattiva dello spazio occupato, con la distribuzione per tipo di file.',
        },
      },
      {
        glyph: 'shield',
        title: { en: 'Backup check', it: 'Verifica dei backup' },
        text: {
          en: 'Checks whether every file on one drive is also on another, and lists what is missing grouped by folder.',
          it: 'Controlla se ogni file di un disco si trova anche su un altro ed elenca quelli mancanti raggruppati per cartella.',
        },
      },
      {
        glyph: 'drive',
        title: { en: 'Drive monitor', it: 'Controllo dei dischi' },
        text: {
          en: 'Notices when drives go online or offline and queues the known ones for a new scan when they come back.',
          it: 'Si accorge quando i dischi si collegano o si scollegano e rimette in coda per la scansione quelli già noti quando tornano.',
        },
      },
    ],
    requirements: [
      {
        en: 'Windows. Prism is portable: download Prism.exe and run it, no installation needed.',
        it: 'Windows. Prism è portatile: si scarica Prism.exe e si avvia, senza installazione.',
      },
      {
        en: "The index is kept in a local SQLite database in the user's application data.",
        it: "L'indice è salvato in un database SQLite locale, nei dati dell'applicazione dell'utente.",
      },
    ],
    stack: ['Rust', 'Tauri 2', 'SvelteKit', 'TypeScript', 'SQLite FTS5', 'D3.js', 'BLAKE3'],
    statedLicense: 'MIT',
    shots: [
      {
        src: prismDashboard,
        caption: { en: 'Dashboard', it: 'Pannello principale' },
        alt: {
          en: "Prism's dashboard with the indexed drives and the scan progress",
          it: "Il pannello di Prism con i dischi indicizzati e l'avanzamento della scansione",
        },
      },
      {
        src: prismSearch,
        caption: { en: 'Quick search', it: 'Ricerca rapida' },
        alt: {
          en: "Prism's quick search with file type filters",
          it: 'La ricerca rapida di Prism con i filtri per tipo di file',
        },
      },
      {
        src: prismBackup,
        caption: { en: 'Backup check', it: 'Verifica dei backup' },
        alt: {
          en: 'Prism checking whether a backup drive contains every file',
          it: 'Prism che verifica se un disco di backup contiene tutti i file',
        },
      },
    ],
    shotFit: 'contain',
    tiles: [{ k: 'platform' }, { k: 'downloadSize', asset: /\.exe$/i }, { k: 'installation', v: 'notNeeded' }, { k: 'license' }],
  },
  {
    slug: 'argus',
    name: 'Argus',
    color: '#b388ff',
    icon: argusIcon,
    platform: { en: 'Windows 10/11', it: 'Windows 10/11' },
    downloadFor: 'Windows',
    tagline: { en: 'Educational profiler for Windows.', it: 'Profiler didattico per Windows.' },
    short: { en: 'Profiler', it: 'Profiler' },
    intro: {
      en: 'Argus attaches to a program that is already running, without modifying it, and shows how it uses CPU, memory, I/O, threads and locks. Every metric has a short explanation of what it measures and what an unusual value means.',
      it: 'Argus si collega a un programma già in esecuzione, senza modificarlo, e mostra come usa CPU, memoria, I/O, thread e lock. Ogni metrica ha una breve spiegazione di cosa misura e di cosa indica un valore anomalo.',
    },
    features: [
      {
        glyph: 'chart',
        title: { en: 'Live metrics', it: 'Metriche in tempo reale' },
        text: {
          en: 'CPU, working set and private memory, I/O, threads and handles, each with a graph and an explanation.',
          it: 'CPU, working set e memoria privata, I/O, thread e handle, ognuno con un grafico e una spiegazione.',
        },
      },
      {
        glyph: 'flame',
        title: { en: 'Flame graph', it: 'Flame graph' },
        text: {
          en: 'Where the process spends CPU time, from ETW samples, with zoom and search.',
          it: 'Dove il processo spende tempo di CPU, dai campioni ETW, con zoom e ricerca.',
        },
      },
      {
        glyph: 'timeline',
        title: { en: 'Thread timeline', it: 'Timeline dei thread' },
        text: {
          en: 'Thread states over time and what each thread is waiting for: locks, I/O or nothing.',
          it: 'Gli stati dei thread nel tempo e cosa aspetta ognuno: lock, I/O o niente.',
        },
      },
      {
        glyph: 'memory',
        title: { en: 'Memory and disk', it: 'Memoria e disco' },
        text: {
          en: 'Hard page faults and allocations; disk operations with median and p99 latency.',
          it: 'Hard page fault e allocazioni; operazioni su disco con latenza mediana e p99.',
        },
      },
      {
        glyph: 'record',
        title: { en: 'Sessions', it: 'Sessioni' },
        text: {
          en: 'Recordings saved as .argus files, to replay later or to compare before and after a change.',
          it: 'Registrazioni salvate come file .argus, da rivedere o da confrontare prima e dopo una modifica.',
        },
      },
      {
        glyph: 'export',
        title: { en: 'Export', it: 'Esportazione' },
        text: {
          en: 'Data to CSV, the flame graph to SVG, the whole session to JSON.',
          it: "I dati in CSV, il flame graph in SVG, l'intera sessione in JSON.",
        },
      },
    ],
    requirements: [
      {
        en: 'Windows 10 or 11, 64-bit. Argus is a single portable .exe; the zip also contains a script that installs it for the current user.',
        it: "Windows 10 o 11 a 64 bit. Argus è un unico .exe portatile; nello zip c'è anche uno script che lo installa per l'utente corrente.",
      },
      {
        en: 'Flame graph, timeline, disk and memory use ETW and need Argus to run as administrator; the basic metrics work without.',
        it: 'Flame graph, timeline, disco e memoria usano ETW e richiedono di avviare Argus come amministratore; le metriche di base funzionano anche senza.',
      },
    ],
    stack: ['Rust', 'windows-rs', 'ETW', 'wgpu', 'egui'],
    statedLicense: 'MIT',
    shots: [
      {
        src: argusMetrics,
        caption: { en: 'Metrics', it: 'Metriche' },
        alt: {
          en: 'Argus attached to a demo program: CPU, memory, threads, handles and I/O with their graphs, disk latency and page faults from ETW',
          it: 'Argus collegato a un programma di prova: CPU, memoria, thread, handle e I/O con i loro grafici, latenza del disco e page fault da ETW',
        },
      },
      {
        src: argusFlame,
        caption: { en: 'Flame graph', it: 'Flame graph' },
        alt: {
          en: 'The flame graph of the demo program: the worker threads and the functions that use the CPU',
          it: 'Il flame graph del programma di prova: i thread di lavoro e le funzioni che usano la CPU',
        },
      },
      {
        src: argusGuide,
        caption: { en: 'Guide', it: 'Guida' },
        alt: {
          en: "Argus's built-in guide on how to read the metrics and find a bottleneck",
          it: 'La guida interna di Argus su come leggere le metriche e trovare un collo di bottiglia',
        },
      },
    ],
    shotFit: 'contain',
    tiles: [{ k: 'platform' }, { k: 'downloadSize', asset: /win-x64\.zip$/i }, { k: 'installation', v: 'notNeeded' }, { k: 'license' }],
  },
  {
    slug: 'cove',
    name: 'Cove',
    color: '#ff8a3d',
    icon: coveIcon,
    platform: { en: 'Windows 10/11', it: 'Windows 10/11' },
    downloadFor: 'Windows',
    tagline: {
      en: 'System-tray player for background audio.',
      it: "Player nell'area di notifica per l'audio di sottofondo.",
    },
    short: { en: 'Tray audio player', it: 'Player audio' },
    intro: {
      en: 'Cove downloads audio at the best available quality and plays it from a small panel that slides out of the system tray. It is meant for focus audio such as white noise, rain or ambient music.',
      it: "Cove scarica l'audio alla migliore qualità disponibile e lo riproduce da un piccolo pannello che esce dall'area di notifica. È pensato per l'audio di concentrazione, come rumore bianco, pioggia o musica ambient.",
    },
    features: [
      {
        glyph: 'tray',
        title: { en: 'Tray panel', it: "Pannello nell'area di notifica" },
        text: {
          en: 'A click on the tray icon opens a panel in the bottom-right corner; there is nothing else to open.',
          it: "Un clic sull'icona apre un pannello in basso a destra; non c'è altro da aprire.",
        },
      },
      {
        glyph: 'wave',
        title: { en: 'Original quality', it: 'Qualità originale' },
        text: {
          en: 'Audio is kept in its original format (Opus), without being converted again.',
          it: "L'audio resta nel formato originale (Opus), senza essere riconvertito.",
        },
      },
      {
        glyph: 'play',
        title: { en: 'Mini player', it: 'Mini player' },
        text: {
          en: 'Play, pause, seek and volume inside the panel.',
          it: 'Play, pausa, avanzamento e volume dentro il pannello.',
        },
      },
      {
        glyph: 'keys',
        title: { en: 'Media keys', it: 'Tasti multimediali' },
        text: {
          en: 'The play and pause keys of keyboards and headphones control Cove from anywhere.',
          it: 'I tasti play e pausa di tastiere e cuffie controllano Cove da qualsiasi punto.',
        },
      },
      {
        glyph: 'library',
        title: { en: 'Library', it: 'Libreria' },
        text: {
          en: 'Every downloaded file stays available in the panel; a link copied to the clipboard is offered when the panel opens.',
          it: "Ogni file scaricato resta disponibile nel pannello; un link copiato negli appunti viene proposto all'apertura del pannello.",
        },
      },
      {
        glyph: 'preset',
        title: { en: 'Presets', it: 'Preset' },
        text: {
          en: 'Four built-in sounds: two kinds of white noise, a drone and rain.',
          it: 'Quattro suoni inclusi: due tipi di rumore bianco, un drone e la pioggia.',
        },
      },
    ],
    requirements: [
      {
        en: 'Windows 10 or 11, 64-bit. The installer does not need administrator rights.',
        it: "Windows 10 o 11 a 64 bit. L'installer non richiede i permessi di amministratore.",
      },
      {
        en: 'It includes everything Cove needs to run, which is why it is larger than the others.',
        it: 'Contiene tutto quello che serve a Cove per funzionare, per questo è più grande degli altri.',
      },
    ],
    stack: ['Python', 'PySide6', 'FFmpeg'],
    statedLicense: 'MIT',
    shots: [
      {
        src: covePanel,
        caption: { en: 'The panel', it: 'Il pannello' },
        alt: {
          en: "Cove's panel with the four built-in sounds and the mini player playing one of them",
          it: 'Il pannello di Cove con i quattro suoni inclusi e il mini player che ne riproduce uno',
        },
      },
    ],
    shotFit: 'contain',
    tiles: [{ k: 'platform' }, { k: 'installer', asset: /setup.*\.exe$/i }, { k: 'runtime', v: 'included' }, { k: 'license' }],
  },
  {
    slug: 'inlay',
    name: 'Inlay',
    color: '#ffa133',
    icon: inlayIcon,
    platform: { en: 'Windows 11', it: 'Windows 11' },
    downloadFor: 'Windows',
    tagline: {
      en: 'A desk you call up with a shortcut, in place of the Windows desktop.',
      it: 'Una scrivania da richiamare con una scorciatoia, al posto del desktop di Windows.',
    },
    short: { en: 'Desktop replacement', it: 'Al posto del desktop' },
    intro: {
      en: 'Inlay replaces the desktop as the place where you keep your files: they live in a vault of ordinary folders, organised in spaces, and the window comes up with Alt+E over whatever is open.',
      it: "Inlay sostituisce il desktop come posto dove tenere i file: stanno in un archivio (il vault) di normali cartelle, organizzate in spazi, e la finestra compare con Alt+E sopra a tutto quello che è aperto.",
    },
    features: [
      {
        glyph: 'board',
        title: { en: 'Spaces and tiles', it: 'Spazi e riquadri' },
        text: {
          en: 'Spaces and the tiles on their board are real folders, so the vault stays tidy and usable from Explorer even without the app.',
          it: "Gli spazi (spaces) e i riquadri (tiles) della loro bacheca sono cartelle vere: il vault resta ordinato e si usa da Explorer anche senza l'app.",
        },
      },
      {
        glyph: 'cursor',
        title: { en: 'Works like the desktop', it: 'Si usa come il desktop' },
        text: {
          en: 'Select, open, rename, drag and copy with the same gestures and shortcuts as Explorer, also to and from other apps.',
          it: 'Si seleziona, apre, rinomina, trascina e copia con gli stessi gesti e le stesse scorciatoie di Explorer, anche da e verso le altre app.',
        },
      },
      {
        glyph: 'undo',
        title: { en: 'Undo', it: 'Annulla' },
        text: {
          en: 'Ctrl+Z undoes moves, copies, renames and deletions, several times in a row; deleting always goes through the Recycle Bin.',
          it: 'Ctrl+Z annulla spostamenti, copie, rinomine ed eliminazioni, anche più volte di seguito; eliminare passa sempre dal Cestino.',
        },
      },
      {
        glyph: 'search',
        title: { en: 'Search', it: 'Ricerca' },
        text: {
          en: 'Type anywhere to search the whole vault, with filters by space and file type, which can also be typed (type:pdf, in:Work).',
          it: 'Basta scrivere per cercare in tutto il vault, con filtri per spazio e tipo di file, che si possono anche scrivere (type:pdf, in:Lavoro).',
        },
      },
      {
        glyph: 'canvas',
        title: { en: 'Mosaic', it: 'Mosaico' },
        text: {
          en: 'The whole vault on a canvas you can zoom, the Mosaic, with one zone for each space.',
          it: "Tutto il vault su una tela che si zooma, il Mosaic, con una zona per ogni spazio.",
        },
      },
      {
        glyph: 'send',
        title: { en: 'Send to Inlay', it: 'Invia a Inlay' },
        text: {
          en: "Files can be sent to the vault from Explorer's Send to menu, or moved inside it with Move to…, choosing where to put them.",
          it: "I file si mandano nel vault dal menu Invia a di Explorer, o si spostano al suo interno con Move to…, scegliendo dove metterli.",
        },
      },
    ],
    requirements: [
      {
        en: 'Windows 11 with the .NET 10 Desktop Runtime; the installer downloads it if it is missing. New versions arrive from GitHub by themselves.',
        it: "Windows 11 con il .NET 10 Desktop Runtime; se manca, l'installer lo scarica. Le versioni nuove arrivano da sole da GitHub.",
      },
      {
        en: 'Inlay installs for the current user without administrator rights. Uninstalling it leaves the vault and your files where they are.',
        it: "Inlay si installa per l'utente corrente senza permessi di amministratore. Disinstallandolo, il vault e i tuoi file restano dove sono.",
      },
    ],
    stack: ['C#', '.NET 10', 'WPF'],
    shots: [
      {
        src: inlayBoard,
        caption: { en: 'Board', it: 'Bacheca' },
        alt: {
          en: 'Inlay showing the Work space of a demo vault: its tiles of files and the list of spaces',
          it: "Inlay con lo spazio Work di un vault di prova: i suoi riquadri di file e l'elenco degli spazi",
        },
      },
      {
        src: inlayMosaic,
        caption: { en: 'Mosaic', it: 'Mosaic' },
        alt: {
          en: 'The Mosaic: the whole demo vault on one canvas, with a colored zone for each space',
          it: 'Il Mosaic: tutto il vault di prova su una tela, con una zona colorata per ogni spazio',
        },
      },
      {
        src: inlaySearch,
        caption: { en: 'Search', it: 'Ricerca' },
        alt: {
          en: 'A search for PDF files across the vault, with the file type filters above the results',
          it: 'Una ricerca dei PDF in tutto il vault, con i filtri per tipo di file sopra i risultati',
        },
      },
      {
        src: inlayMove,
        caption: { en: 'Move to…', it: 'Move to…' },
        alt: {
          en: 'The Move to… dialog, listing tiles and spaces to send a file to',
          it: 'La finestra Move to…, con i riquadri e gli spazi dove mandare un file',
        },
      },
    ],
    shotFit: 'contain',
    tiles: [{ k: 'platform' }, { k: 'installer', asset: /win-setup\.exe$/i }, { k: 'requires', v: '.NET 10' }, { k: 'releases' }],
  },
];

export const mainProjects = projects.filter((p) => p.main);
export const otherProjects = projects.filter((p) => !p.main);
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
