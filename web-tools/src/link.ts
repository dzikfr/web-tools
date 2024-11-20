import pdf from './icons/pdf.svg'
import imgresize from './icons/imgresize.svg'
import speech from './icons/speech.svg'
import removebg from './icons/removebg.svg'
import json from './icons/json.svg'
import pdf2 from './icons/pdf2.svg'
import sticker from './icons/sticker.svg'
import imgenhance from './icons/imgenhance.svg'
import qr from './icons/qr.svg'
import findanime from './icons/find.svg'

type Url = (typeof link)[number]

type Link = {
  title: string
  icon: any
  link: string
  text?: string
}

const link = [
  'removebg',
  'imgresize',
  'speechtotext',
  'wordtopdf',
  'exceltojson',
  'imgtopdf',
  'imgtosticker',
  'enhancerimg',
  'exceltojson5',
  'qr',
  'findanime',
]

const LINKS: { [key in Url]: Link } = {
  removebg: {
    title: 'Remove Background',
    icon: removebg,
    link: '/removebg',
  },
  imgresize: {
    title: 'Resize Image',
    icon: imgresize,
    link: '/imgresize',
  },
  findanime: {
    title: 'Find Anime Title',
    icon: findanime,
    link: '/findanime',
  },
  speechtotext: {
    title: 'Speech to Text',
    icon: speech,
    link: '/speechtotext',
  },
  wordtopdf: {
    title: 'Word to PDF',
    icon: pdf,
    link: '/wordtopdf',
  },
  exceltojson: {
    title: 'Excel to JSON',
    icon: json,
    link: '/exceltojson',
  },
  imgtopdf: {
    title: 'Image to PDF',
    icon: pdf2,
    link: '/imgtopdf',
  },
  enhancerimg: {
    title: 'Enhancer IMG',
    icon: imgenhance,
    link: '/enhancerimg',
  },
  imgtosticker: {
    title: 'Image to WA Sticker',
    icon: sticker,
    link: '/imgtosticker',
  },
  exceltojson5: {
    title: 'QR Code generator',
    icon: qr,
    link: '/qrgenerator',
  },
}

export default LINKS