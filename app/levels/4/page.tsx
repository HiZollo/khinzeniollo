"use client"

import TextInput from "@/components/TextInput"
import Button from "@/components/button";
import GeneralCanvas from "@/components/generalCanvas"
import { ChangeEvent, useReducer } from "react"

type Event = ChangeEvent<HTMLInputElement>;

const names = ["Primer", "Segunta", "Tercer", "Cuarta", "Quinta", "Sexta", "Séptima", "Octava"];

function reducer(state: string[], action: { index: number, value: string }): string[] {
  state[action.index] = action.value;
  return [...state];
}

export default function Cuatro() {
  const [values, dispatch] = useReducer(reducer, Array<string>(8).fill(""));

  function handleChange(event: Event, index: number) {
    dispatch({ index, value: event.target.value });
  }

  function submit() {
    fetch('/api/levels/4/check', {
      method: 'POST',
      body: JSON.stringify(values)
    }).then(res => res.json()).then(data => {
      alert(data.code)
    })
  }

  return (
    <>
      <h1>¿Dónde están?</h1>
      <p>En la leyenda española, un artefacto divino se fragmentó en ocho piezas y se dispersó por toda España.</p>
      <p>Adquiriste una antigua máquina que revela las provincias donde se encuentran estas piezas.</p>
      <p>Haz clic en los puntos para descubrir las provincias. Buena suerte.</p>

      <GeneralCanvas
        animate={animate}
        onClick={onClick}
        width={SIZE}
        height={SIZE}
      ></GeneralCanvas>

      <div style={{ margin: "30px", gap: "20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <>
          {names.map((name, i) => {
            return (
              <TextInput
                key={i}
                placeholder={`${name} Provincia`}
                onChange={(e: Event) => handleChange(e, i)}
                value={values[i]}
              />
            )
          })}
          <Button onClick={submit}>Enviar</Button>
        </>
      </div>
    </>
  )
}

type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

interface Point {
  x: number
  y: number
  vx: number
  vy: number
}

type Regions = ArrayElement<typeof regions>
type Provinces = ArrayElement<typeof provinces>

const SIZE = 600
const SPRING_LEN = 40

const regions = [
  'c252714bb6bce3536805d06af8c7173d_r', '82139a2b169d3732fc9f2dc417f7c2d6_r',
  'd104ad307af87a256e7303b8a7e786d5_r', '9b05b095e0eda1d9d84a0405b334226d_r',
  '6b7ea5b50d33352a04b7eab37f43b6b8_r', '7f93e6c16e70fa303f21badc12a686a3_r',
  'd1d230610229af5e415c4ac97754cf19_r', '18d0dc3a82f798d19c9d4ede8253ef9d_r',
  '439a25f17d3ab976423ea90669684104_r', '7802463c9c580cdf31bdb3b3d885cdb9_r',
  '554d9c9bc3a4924b90d7b66f71b8b177_r', 'fabbd91210b9f49102b12b4446fd1858_r',
  '000e077d1a29a24f36a8b705dc821ee1_r', '96273221e25bde2eb704da1a5541dddf_r',
  '0247805523ffe1caa6994fac064f6a34_r'
] as const

const provinces = [
  '2271d7380ae256d854e0a776023240db_p', 'cb7a490cc9578d1fa5f878f011a19a51_p',
  'f515adc321b21b60757227a70e7a65c1_p', 'fd29408948e281040b1f1d83280c9bd1_p',
  '8a739c3989f0aec5601eed64f2afe068_p', '27cb40e4e292d6ee2c07fd6f302f0aa4_p',
  '54c7e0f5bd8e341f6f0766abbf8275f6_p', '7d3a2aa844806c54f07742ee05834106_p',
  'fd65da722a029873727925c51eaaebed_p', '9cbfaddc9bfb5efe83839ce449ce76c5_p',
  '7ca67b999c317da24710b6020b7cad4e_p', 'd95dece36f36461f37716d2a48636d5e_p',
  '575159712bf8d133d6badecc4b7dbfc4_p', '62cba08733a42bfb31a600fac8c6886f_p',
  '333a9c1d0d3aa77690e54501f101813d_p', '6b55512a55369619ea879473217795a0_p',
  'bcf5e62ea62812b9854b8d677d03a101_p', '61007e8d55d16366af9e8807b9e520d1_p',
  '08b21026a8c23e000c0a63243914b6b4_p', '93f477335c956c694c6770f8830f8be2_p',
  '2df9ace242625cbdae561521d657c151_p', '101835b1a2cb20929bbe6966087f09cb_p',
  '49786e9dccad1b5e1a76dff4508c3166_p', '0ea21b3e513cfb6a47fb3c06b7980ff4_p',
  'cce0b28c11f99bf22405764d503c7f80_p', 'ad1418343dec8236377353ecf7e6621e_p',
  'bbc19a07a765996c66b6b80cccd84074_p', '6e82355ca496d65a41b3fc8c4fb97b7e_p',
  'bc12ea08787501ca4f02ba6d3ac683c7_p', 'a31494053b4be5d181bb2682e05f9b6f_p',
  'e09fb018d905724ee425526b2bb0b1be_p', '30bcea2d8404926fb48500fa77528bdf_p',
  '3f4102eee6e969e0dd5ecc989c79ac4d_p', 'fd792379fd986e4322ecf5ab13d6f783_p',
  'ed0be09b4d0881151fab608b0ec68c1d_p', '924782a638b7b3dc5c6f128b225a3bd2_p',
  'b82b3600a0ab24a33b270aa44a97a83e_p', '219a3d8fed290a273da12ec738d05d4d_p',
  '160dc4cd7120eb4004e16ec92f829612_p', '045c08779250a36bf855a11d0dceac60_p',
  'ab164f493fc47d40596aa5193c2f5534_p', 'b4455439858ebd30588da0cb43fe9b80_p',
  'df2b829040ff33eeaa3c9199c893b98e_p', '8480322f38d10513a3a5bb43f9733f1f_p',
  '669067387ff48731ed672c279263b312_p', '11ed042f789f039d3578365ae2c97da1_p',
  'dcb9cf5ef3f9e75df79fbed4e8806e03_p', '6f6d022f6c2a1f53274a756c0db6d7d7_p'
] as const

const answers: Provinces[] = [
  '2df9ace242625cbdae561521d657c151_p', '30bcea2d8404926fb48500fa77528bdf_p',
  '62cba08733a42bfb31a600fac8c6886f_p', 'ed0be09b4d0881151fab608b0ec68c1d_p',
  '9cbfaddc9bfb5efe83839ce449ce76c5_p', 'dcb9cf5ef3f9e75df79fbed4e8806e03_p',
  'cb7a490cc9578d1fa5f878f011a19a51_p', 'fd29408948e281040b1f1d83280c9bd1_p'
] as const

const largeEdges: [Regions, Regions][] = [
  ['7802463c9c580cdf31bdb3b3d885cdb9_r', 'd104ad307af87a256e7303b8a7e786d5_r'],
  ['7802463c9c580cdf31bdb3b3d885cdb9_r', '7f93e6c16e70fa303f21badc12a686a3_r'],
  ['d104ad307af87a256e7303b8a7e786d5_r', '6b7ea5b50d33352a04b7eab37f43b6b8_r'],
  ['d104ad307af87a256e7303b8a7e786d5_r', '7f93e6c16e70fa303f21badc12a686a3_r'],
  ['6b7ea5b50d33352a04b7eab37f43b6b8_r', '9b05b095e0eda1d9d84a0405b334226d_r'],
  ['6b7ea5b50d33352a04b7eab37f43b6b8_r', '7f93e6c16e70fa303f21badc12a686a3_r'],
  ['9b05b095e0eda1d9d84a0405b334226d_r', '96273221e25bde2eb704da1a5541dddf_r'],
  ['9b05b095e0eda1d9d84a0405b334226d_r', '7f93e6c16e70fa303f21badc12a686a3_r'],
  ['9b05b095e0eda1d9d84a0405b334226d_r', '554d9c9bc3a4924b90d7b66f71b8b177_r'],
  ['96273221e25bde2eb704da1a5541dddf_r', '554d9c9bc3a4924b90d7b66f71b8b177_r'],
  ['96273221e25bde2eb704da1a5541dddf_r', '82139a2b169d3732fc9f2dc417f7c2d6_r'],
  ['7f93e6c16e70fa303f21badc12a686a3_r', '554d9c9bc3a4924b90d7b66f71b8b177_r'],
  ['7f93e6c16e70fa303f21badc12a686a3_r', '82139a2b169d3732fc9f2dc417f7c2d6_r'],
  ['7f93e6c16e70fa303f21badc12a686a3_r', 'fabbd91210b9f49102b12b4446fd1858_r'],
  ['7f93e6c16e70fa303f21badc12a686a3_r', 'd1d230610229af5e415c4ac97754cf19_r'],
  ['7f93e6c16e70fa303f21badc12a686a3_r', '439a25f17d3ab976423ea90669684104_r'],
  ['554d9c9bc3a4924b90d7b66f71b8b177_r', '82139a2b169d3732fc9f2dc417f7c2d6_r'],
  ['82139a2b169d3732fc9f2dc417f7c2d6_r', '18d0dc3a82f798d19c9d4ede8253ef9d_r'],
  ['82139a2b169d3732fc9f2dc417f7c2d6_r', 'd1d230610229af5e415c4ac97754cf19_r'],
  ['82139a2b169d3732fc9f2dc417f7c2d6_r', '0247805523ffe1caa6994fac064f6a34_r'],
  ['18d0dc3a82f798d19c9d4ede8253ef9d_r', '0247805523ffe1caa6994fac064f6a34_r'],
  ['fabbd91210b9f49102b12b4446fd1858_r', 'd1d230610229af5e415c4ac97754cf19_r'],
  ['d1d230610229af5e415c4ac97754cf19_r', '439a25f17d3ab976423ea90669684104_r'],
  ['d1d230610229af5e415c4ac97754cf19_r', '0247805523ffe1caa6994fac064f6a34_r'],
  ['d1d230610229af5e415c4ac97754cf19_r', 'c252714bb6bce3536805d06af8c7173d_r'],
  ['d1d230610229af5e415c4ac97754cf19_r', '000e077d1a29a24f36a8b705dc821ee1_r'],
  ['0247805523ffe1caa6994fac064f6a34_r', '000e077d1a29a24f36a8b705dc821ee1_r'],
  ['439a25f17d3ab976423ea90669684104_r', 'c252714bb6bce3536805d06af8c7173d_r'],
  ['c252714bb6bce3536805d06af8c7173d_r', '000e077d1a29a24f36a8b705dc821ee1_r']
]

const smallEgdes: Record<Regions, [Provinces, Provinces | Regions][]> = {
  'c252714bb6bce3536805d06af8c7173d_r': [
    ['101835b1a2cb20929bbe6966087f09cb_p', '160dc4cd7120eb4004e16ec92f829612_p'],
    ['101835b1a2cb20929bbe6966087f09cb_p', 'd95dece36f36461f37716d2a48636d5e_p'],
    ['160dc4cd7120eb4004e16ec92f829612_p', '6b55512a55369619ea879473217795a0_p'],
    ['160dc4cd7120eb4004e16ec92f829612_p', 'd95dece36f36461f37716d2a48636d5e_p'],
    ['160dc4cd7120eb4004e16ec92f829612_p', 'a31494053b4be5d181bb2682e05f9b6f_p'],
    ['6b55512a55369619ea879473217795a0_p', '0ea21b3e513cfb6a47fb3c06b7980ff4_p'],
    ['6b55512a55369619ea879473217795a0_p', 'a31494053b4be5d181bb2682e05f9b6f_p'],
    ['6b55512a55369619ea879473217795a0_p', '08b21026a8c23e000c0a63243914b6b4_p'],
    ['0ea21b3e513cfb6a47fb3c06b7980ff4_p', '08b21026a8c23e000c0a63243914b6b4_p'],
    ['d95dece36f36461f37716d2a48636d5e_p', 'a31494053b4be5d181bb2682e05f9b6f_p'],
    ['a31494053b4be5d181bb2682e05f9b6f_p', '08b21026a8c23e000c0a63243914b6b4_p'],
    ['08b21026a8c23e000c0a63243914b6b4_p', 'fd29408948e281040b1f1d83280c9bd1_p'],
    ['101835b1a2cb20929bbe6966087f09cb_p', '439a25f17d3ab976423ea90669684104_r'],
    ['160dc4cd7120eb4004e16ec92f829612_p', '439a25f17d3ab976423ea90669684104_r'],
    ['6b55512a55369619ea879473217795a0_p', '439a25f17d3ab976423ea90669684104_r'],
    ['6b55512a55369619ea879473217795a0_p', 'd1d230610229af5e415c4ac97754cf19_r'],
    ['0ea21b3e513cfb6a47fb3c06b7980ff4_p', 'd1d230610229af5e415c4ac97754cf19_r'],
    ['08b21026a8c23e000c0a63243914b6b4_p', 'd1d230610229af5e415c4ac97754cf19_r'],
    ['fd29408948e281040b1f1d83280c9bd1_p', '000e077d1a29a24f36a8b705dc821ee1_r']
  ],
  '82139a2b169d3732fc9f2dc417f7c2d6_r': [
    ['49786e9dccad1b5e1a76dff4508c3166_p', '6f6d022f6c2a1f53274a756c0db6d7d7_p'],
    ['6f6d022f6c2a1f53274a756c0db6d7d7_p', 'b4455439858ebd30588da0cb43fe9b80_p'],
    ['49786e9dccad1b5e1a76dff4508c3166_p', '96273221e25bde2eb704da1a5541dddf_r'],
    ['49786e9dccad1b5e1a76dff4508c3166_p', '18d0dc3a82f798d19c9d4ede8253ef9d_r'],
    ['6f6d022f6c2a1f53274a756c0db6d7d7_p', '96273221e25bde2eb704da1a5541dddf_r'],
    ['6f6d022f6c2a1f53274a756c0db6d7d7_p', '554d9c9bc3a4924b90d7b66f71b8b177_r'],
    ['6f6d022f6c2a1f53274a756c0db6d7d7_p', '7f93e6c16e70fa303f21badc12a686a3_r'],
    ['6f6d022f6c2a1f53274a756c0db6d7d7_p', 'd1d230610229af5e415c4ac97754cf19_r'],
    ['6f6d022f6c2a1f53274a756c0db6d7d7_p', '18d0dc3a82f798d19c9d4ede8253ef9d_r'],
    ['b4455439858ebd30588da0cb43fe9b80_p', '18d0dc3a82f798d19c9d4ede8253ef9d_r'],
    ['b4455439858ebd30588da0cb43fe9b80_p', 'd1d230610229af5e415c4ac97754cf19_r'],
    ['b4455439858ebd30588da0cb43fe9b80_p', '0247805523ffe1caa6994fac064f6a34_r']
  ],
  'd104ad307af87a256e7303b8a7e786d5_r': [
    ['8a739c3989f0aec5601eed64f2afe068_p', '7802463c9c580cdf31bdb3b3d885cdb9_r'],
    ['8a739c3989f0aec5601eed64f2afe068_p', '6b7ea5b50d33352a04b7eab37f43b6b8_r'],
    ['8a739c3989f0aec5601eed64f2afe068_p', '7f93e6c16e70fa303f21badc12a686a3_r']
  ],
  '9b05b095e0eda1d9d84a0405b334226d_r': [
    ['11ed042f789f039d3578365ae2c97da1_p', '2df9ace242625cbdae561521d657c151_p'],
    ['11ed042f789f039d3578365ae2c97da1_p', '2271d7380ae256d854e0a776023240db_p'],
    ['2df9ace242625cbdae561521d657c151_p', '2271d7380ae256d854e0a776023240db_p'],
    ['11ed042f789f039d3578365ae2c97da1_p', '6b7ea5b50d33352a04b7eab37f43b6b8_r'],
    ['11ed042f789f039d3578365ae2c97da1_p', '7f93e6c16e70fa303f21badc12a686a3_r'],
    ['2df9ace242625cbdae561521d657c151_p', '96273221e25bde2eb704da1a5541dddf_r'],
    ['2271d7380ae256d854e0a776023240db_p', '96273221e25bde2eb704da1a5541dddf_r'],
    ['2271d7380ae256d854e0a776023240db_p', '7f93e6c16e70fa303f21badc12a686a3_r'],
    ['2271d7380ae256d854e0a776023240db_p', '554d9c9bc3a4924b90d7b66f71b8b177_r']
  ],
  '6b7ea5b50d33352a04b7eab37f43b6b8_r': [
    ['575159712bf8d133d6badecc4b7dbfc4_p', 'd104ad307af87a256e7303b8a7e786d5_r'],
    ['575159712bf8d133d6badecc4b7dbfc4_p', '9b05b095e0eda1d9d84a0405b334226d_r'],
    ['575159712bf8d133d6badecc4b7dbfc4_p', '7f93e6c16e70fa303f21badc12a686a3_r']
  ],
  '7f93e6c16e70fa303f21badc12a686a3_r': [
    ['ad1418343dec8236377353ecf7e6621e_p', 'fd792379fd986e4322ecf5ab13d6f783_p'],
    ['ad1418343dec8236377353ecf7e6621e_p', 'dcb9cf5ef3f9e75df79fbed4e8806e03_p'],
    ['ad1418343dec8236377353ecf7e6621e_p', '669067387ff48731ed672c279263b312_p'],
    ['fd792379fd986e4322ecf5ab13d6f783_p', '9cbfaddc9bfb5efe83839ce449ce76c5_p'],
    ['fd792379fd986e4322ecf5ab13d6f783_p', '669067387ff48731ed672c279263b312_p'],
    ['9cbfaddc9bfb5efe83839ce449ce76c5_p', '669067387ff48731ed672c279263b312_p'],
    ['9cbfaddc9bfb5efe83839ce449ce76c5_p', '219a3d8fed290a273da12ec738d05d4d_p'],
    ['9cbfaddc9bfb5efe83839ce449ce76c5_p', '045c08779250a36bf855a11d0dceac60_p'],
    ['dcb9cf5ef3f9e75df79fbed4e8806e03_p', '669067387ff48731ed672c279263b312_p'],
    ['dcb9cf5ef3f9e75df79fbed4e8806e03_p', 'b82b3600a0ab24a33b270aa44a97a83e_p'],
    ['669067387ff48731ed672c279263b312_p', '219a3d8fed290a273da12ec738d05d4d_p'],
    ['669067387ff48731ed672c279263b312_p', 'b82b3600a0ab24a33b270aa44a97a83e_p'],
    ['669067387ff48731ed672c279263b312_p', '27cb40e4e292d6ee2c07fd6f302f0aa4_p'],
    ['219a3d8fed290a273da12ec738d05d4d_p', '045c08779250a36bf855a11d0dceac60_p'],
    ['b82b3600a0ab24a33b270aa44a97a83e_p', '27cb40e4e292d6ee2c07fd6f302f0aa4_p'],
    ['ad1418343dec8236377353ecf7e6621e_p', '7802463c9c580cdf31bdb3b3d885cdb9_r'],
    ['ad1418343dec8236377353ecf7e6621e_p', 'd104ad307af87a256e7303b8a7e786d5_r'],
    ['ad1418343dec8236377353ecf7e6621e_p', '6b7ea5b50d33352a04b7eab37f43b6b8_r'],
    ['fd792379fd986e4322ecf5ab13d6f783_p', '6b7ea5b50d33352a04b7eab37f43b6b8_r'],
    ['9cbfaddc9bfb5efe83839ce449ce76c5_p', '6b7ea5b50d33352a04b7eab37f43b6b8_r'],
    ['9cbfaddc9bfb5efe83839ce449ce76c5_p', '9b05b095e0eda1d9d84a0405b334226d_r'],
    ['9cbfaddc9bfb5efe83839ce449ce76c5_p', '554d9c9bc3a4924b90d7b66f71b8b177_r'],
    ['dcb9cf5ef3f9e75df79fbed4e8806e03_p', '7802463c9c580cdf31bdb3b3d885cdb9_r'],
    ['219a3d8fed290a273da12ec738d05d4d_p', 'fabbd91210b9f49102b12b4446fd1858_r'],
    ['219a3d8fed290a273da12ec738d05d4d_p', 'd1d230610229af5e415c4ac97754cf19_r'],
    ['045c08779250a36bf855a11d0dceac60_p', '554d9c9bc3a4924b90d7b66f71b8b177_r'],
    ['045c08779250a36bf855a11d0dceac60_p', '82139a2b169d3732fc9f2dc417f7c2d6_r'],
    ['045c08779250a36bf855a11d0dceac60_p', 'd1d230610229af5e415c4ac97754cf19_r'],
    ['b82b3600a0ab24a33b270aa44a97a83e_p', '439a25f17d3ab976423ea90669684104_r'],
    ['27cb40e4e292d6ee2c07fd6f302f0aa4_p', 'fabbd91210b9f49102b12b4446fd1858_r'],
    ['27cb40e4e292d6ee2c07fd6f302f0aa4_p', '439a25f17d3ab976423ea90669684104_r'],
    ['27cb40e4e292d6ee2c07fd6f302f0aa4_p', 'd1d230610229af5e415c4ac97754cf19_r']
  ],
  'd1d230610229af5e415c4ac97754cf19_r': [
    ['93f477335c956c694c6770f8830f8be2_p', 'bcf5e62ea62812b9854b8d677d03a101_p'],
    ['df2b829040ff33eeaa3c9199c893b98e_p', 'bcf5e62ea62812b9854b8d677d03a101_p'],
    ['df2b829040ff33eeaa3c9199c893b98e_p', '333a9c1d0d3aa77690e54501f101813d_p'],
    ['bcf5e62ea62812b9854b8d677d03a101_p', '333a9c1d0d3aa77690e54501f101813d_p'],
    ['bcf5e62ea62812b9854b8d677d03a101_p', 'cb7a490cc9578d1fa5f878f011a19a51_p'],
    ['333a9c1d0d3aa77690e54501f101813d_p', 'cb7a490cc9578d1fa5f878f011a19a51_p'],
    ['93f477335c956c694c6770f8830f8be2_p', '7f93e6c16e70fa303f21badc12a686a3_r'],
    ['93f477335c956c694c6770f8830f8be2_p', 'fabbd91210b9f49102b12b4446fd1858_r'],
    ['93f477335c956c694c6770f8830f8be2_p', '82139a2b169d3732fc9f2dc417f7c2d6_r'],
    ['df2b829040ff33eeaa3c9199c893b98e_p', 'fabbd91210b9f49102b12b4446fd1858_r'],
    ['df2b829040ff33eeaa3c9199c893b98e_p', '439a25f17d3ab976423ea90669684104_r'],
    ['bcf5e62ea62812b9854b8d677d03a101_p', '82139a2b169d3732fc9f2dc417f7c2d6_r'],
    ['bcf5e62ea62812b9854b8d677d03a101_p', '0247805523ffe1caa6994fac064f6a34_r'],
    ['333a9c1d0d3aa77690e54501f101813d_p', '439a25f17d3ab976423ea90669684104_r'],
    ['333a9c1d0d3aa77690e54501f101813d_p', 'c252714bb6bce3536805d06af8c7173d_r'],
    ['cb7a490cc9578d1fa5f878f011a19a51_p', '0247805523ffe1caa6994fac064f6a34_r'],
    ['cb7a490cc9578d1fa5f878f011a19a51_p', 'c252714bb6bce3536805d06af8c7173d_r'],
    ['cb7a490cc9578d1fa5f878f011a19a51_p', '000e077d1a29a24f36a8b705dc821ee1_r']
  ],
  '18d0dc3a82f798d19c9d4ede8253ef9d_r': [
    ['bbc19a07a765996c66b6b80cccd84074_p', '61007e8d55d16366af9e8807b9e520d1_p'],
    ['bbc19a07a765996c66b6b80cccd84074_p', 'ab164f493fc47d40596aa5193c2f5534_p'],
    ['bbc19a07a765996c66b6b80cccd84074_p', '7d3a2aa844806c54f07742ee05834106_p'],
    ['61007e8d55d16366af9e8807b9e520d1_p', '7d3a2aa844806c54f07742ee05834106_p'],
    ['ab164f493fc47d40596aa5193c2f5534_p', '7d3a2aa844806c54f07742ee05834106_p'],
    ['bbc19a07a765996c66b6b80cccd84074_p', '82139a2b169d3732fc9f2dc417f7c2d6_r'],
    ['ab164f493fc47d40596aa5193c2f5534_p', '82139a2b169d3732fc9f2dc417f7c2d6_r'],
    ['ab164f493fc47d40596aa5193c2f5534_p', '0247805523ffe1caa6994fac064f6a34_r']
  ],
  '439a25f17d3ab976423ea90669684104_r': [
    ['7ca67b999c317da24710b6020b7cad4e_p', '54c7e0f5bd8e341f6f0766abbf8275f6_p'],
    ['7ca67b999c317da24710b6020b7cad4e_p', '7f93e6c16e70fa303f21badc12a686a3_r'],
    ['7ca67b999c317da24710b6020b7cad4e_p', 'd1d230610229af5e415c4ac97754cf19_r'],
    ['54c7e0f5bd8e341f6f0766abbf8275f6_p', 'd1d230610229af5e415c4ac97754cf19_r'],
    ['54c7e0f5bd8e341f6f0766abbf8275f6_p', 'c252714bb6bce3536805d06af8c7173d_r']
  ],
  '7802463c9c580cdf31bdb3b3d885cdb9_r': [
    ['cce0b28c11f99bf22405764d503c7f80_p', '6e82355ca496d65a41b3fc8c4fb97b7e_p'],
    ['cce0b28c11f99bf22405764d503c7f80_p', 'ed0be09b4d0881151fab608b0ec68c1d_p'],
    ['6e82355ca496d65a41b3fc8c4fb97b7e_p', 'ed0be09b4d0881151fab608b0ec68c1d_p'],
    ['6e82355ca496d65a41b3fc8c4fb97b7e_p', '3f4102eee6e969e0dd5ecc989c79ac4d_p'],
    ['ed0be09b4d0881151fab608b0ec68c1d_p', '3f4102eee6e969e0dd5ecc989c79ac4d_p'],
    ['6e82355ca496d65a41b3fc8c4fb97b7e_p', 'd104ad307af87a256e7303b8a7e786d5_r'],
    ['6e82355ca496d65a41b3fc8c4fb97b7e_p', '7f93e6c16e70fa303f21badc12a686a3_r'],
    ['3f4102eee6e969e0dd5ecc989c79ac4d_p', '7f93e6c16e70fa303f21badc12a686a3_r']
  ],
  '554d9c9bc3a4924b90d7b66f71b8b177_r': [
    ['924782a638b7b3dc5c6f128b225a3bd2_p', '9b05b095e0eda1d9d84a0405b334226d_r'],
    ['924782a638b7b3dc5c6f128b225a3bd2_p', '96273221e25bde2eb704da1a5541dddf_r'],
    ['924782a638b7b3dc5c6f128b225a3bd2_p', '7f93e6c16e70fa303f21badc12a686a3_r'],
    ['924782a638b7b3dc5c6f128b225a3bd2_p', '82139a2b169d3732fc9f2dc417f7c2d6_r']
  ],
  'fabbd91210b9f49102b12b4446fd1858_r': [
    ['bc12ea08787501ca4f02ba6d3ac683c7_p', '7f93e6c16e70fa303f21badc12a686a3_r'],
    ['bc12ea08787501ca4f02ba6d3ac683c7_p', 'd1d230610229af5e415c4ac97754cf19_r']
  ],
  '000e077d1a29a24f36a8b705dc821ee1_r': [
    ['e09fb018d905724ee425526b2bb0b1be_p', 'd1d230610229af5e415c4ac97754cf19_r'],
    ['e09fb018d905724ee425526b2bb0b1be_p', '0247805523ffe1caa6994fac064f6a34_r'],
    ['e09fb018d905724ee425526b2bb0b1be_p', 'c252714bb6bce3536805d06af8c7173d_r']
  ],
  '96273221e25bde2eb704da1a5541dddf_r': [
    ['30bcea2d8404926fb48500fa77528bdf_p', '9b05b095e0eda1d9d84a0405b334226d_r'],
    ['30bcea2d8404926fb48500fa77528bdf_p', '554d9c9bc3a4924b90d7b66f71b8b177_r'],
    ['30bcea2d8404926fb48500fa77528bdf_p', '82139a2b169d3732fc9f2dc417f7c2d6_r']
  ],
  '0247805523ffe1caa6994fac064f6a34_r': [
    ['62cba08733a42bfb31a600fac8c6886f_p', '8480322f38d10513a3a5bb43f9733f1f_p'],
    ['8480322f38d10513a3a5bb43f9733f1f_p', 'f515adc321b21b60757227a70e7a65c1_p'],
    ['62cba08733a42bfb31a600fac8c6886f_p', '18d0dc3a82f798d19c9d4ede8253ef9d_r'],
    ['62cba08733a42bfb31a600fac8c6886f_p', '82139a2b169d3732fc9f2dc417f7c2d6_r'],
    ['8480322f38d10513a3a5bb43f9733f1f_p', '82139a2b169d3732fc9f2dc417f7c2d6_r'],
    ['8480322f38d10513a3a5bb43f9733f1f_p', 'd1d230610229af5e415c4ac97754cf19_r'],
    ['f515adc321b21b60757227a70e7a65c1_p', 'd1d230610229af5e415c4ac97754cf19_r'],
    ['f515adc321b21b60757227a70e7a65c1_p', '000e077d1a29a24f36a8b705dc821ee1_r']
  ]
}

const points: Record<Regions | Provinces, Point> = Object.fromEntries(
  Array.from({ length: regions.length }, (_, i) => ([
    regions[i], {
      x: randomInt(0, SIZE), y: randomInt(0, SIZE), vx: 0, vy: 0
    }
  ]))
) as Record<Regions | Provinces, Point>

let edges: [Regions | Provinces, Regions | Provinces][] = JSON.parse(JSON.stringify(largeEdges))

function animate(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, SIZE, SIZE)
  ctx.font = "12px sans-serif"

  // draw edges
  ctx.strokeStyle = "rgb(255 0 0)"
  ctx.lineWidth = 2
  edges.forEach(([a, b]) => {
    ctx.beginPath()
    ctx.moveTo(points[a].x, points[a].y)
    ctx.lineTo(points[b].x, points[b].y)
    ctx.stroke()
  })

  // draw points
  Object.entries(points).forEach(([k, p]) => {
    ctx.fillStyle = isAnswer(k) ? "rgb(148 180 250)" : "rgb(255 0 0)"
    ctx.beginPath()
    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI, false)
    ctx.fill()
    ctx.fillText(randomText(), p.x + 6, p.y + 6)
  })

  ctx.strokeStyle = "rgb(148 180 250)"
  ctx.lineWidth = 3

  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(0, SIZE)
  ctx.lineTo(SIZE, SIZE)
  ctx.lineTo(SIZE, 0)
  ctx.lineTo(0, 0)
  ctx.stroke()

  physic()
}

let prevRegion: Regions | undefined
function onClick(x: number, y: number) {
  let target: [number, Regions, Point] | undefined
  Object.entries(points).forEach(([label, point]) => {
    const distance = (x - point.x) ** 2 + (y - point.y) ** 2
    if (distance <= 300 && (!target || distance <= target[0]) && isRegion(label)) {
      target = [distance, label as Regions, point]
    }
  })

  if (!target) return

  const [_, region, point] = target
  if (prevRegion === region) return

  // remove previous province point
  const kinematics: Point[] = []
  for (const key in points) {
    if (isProvince(key)) {
      kinematics.push(points[key])
      delete points[key]
    }
  }

  // remove previous province edge
  edges = edges.filter(([p1, p2]) => {
    return isRegion(p1) && isRegion(p2)
  })

  // add previous region point
  if (prevRegion) {
    const l = kinematics.length
    points[prevRegion] = {
      x: kinematics.reduce((acc, {x}) => acc + x, 0) / l, 
      y: kinematics.reduce((acc, {y}) => acc + y, 0) / l, 
      vx: kinematics.reduce((acc, {vx}) => acc + vx, 0) / l, 
      vy: kinematics.reduce((acc, {vy}) => acc + vy, 0) / l
    }
  }

  // add previous region edge
  if (prevRegion) {
    edges.push(...largeEdges.filter(e => e.includes(prevRegion!)))
  }

  // remove new region point
  delete points[region]

  // remove new region edge
  edges = edges.filter(([p1, p2]) => {
    return p1 !== region && p2 !== region
  })

  // add new province edge
  const related = smallEgdes[region]
  const newPoints: Set<Regions | Provinces> = new Set()
  related.forEach((edge) => {
    if (isProvince(edge[0])) newPoints.add(edge[0])
    if (isProvince(edge[1])) newPoints.add(edge[1])
    edges.push(edge)
  })

  // add new province point
  newPoints.forEach(p => {
    points[p] = {
      x: point.x + randomNoise(SPRING_LEN), y: point.y + randomNoise(SPRING_LEN), 
      vx: point.vx, vy: point.vy
    }
  })

  prevRegion = region
}

function physic() {
  const entries = Object.entries(points)

  // move
  entries.forEach(([_, p]) => {
    p.x += p.vx
    p.y += p.vy
    if (!(0 <= p.x && p.x <= SIZE)) {
      p.x = Math.min(Math.max(p.x, 0), SIZE)
      p.vx = 0
    }
    if (!(0 <= p.y && p.y <= SIZE)) {
      p.y = Math.min(Math.max(p.y, 0), SIZE)
      p.vy = 0
    }
  })

  // gravity
  // entries.forEach(([k1, p1]) => {
  //   entries.forEach(([k2, p2]) => {
  //     if (k1 === k2) return

  //     let dx = p2.x - p1.x
  //     let dy = p2.y - p1.y
  //     const len = Math.sqrt(dx*dx + dy*dy)
  //     if (len > 0) {
  //       const factor = 1 / (len * len)
  //       dx *= factor
  //       dy *= factor
  //       p1.vx += dx
  //       p1.vy += dy
  //       p2.vx -= dx
  //       p2.vy -= dy
  //     }
  //   })
  // })

  // spring
  edges.forEach(([n1, n2]) => {
    let dx = points[n2].x - points[n1].x
    let dy = points[n2].y - points[n1].y
    const delta = Math.sqrt(dx*dx + dy*dy) - SPRING_LEN
    if (delta != 0) {
      dx *= 0.0000001 * delta
      dy *= 0.0000001 * delta
      points[n1].vx += dx
      points[n1].vy += dy
      points[n2].vx -= dx
      points[n2].vy -= dy
    }
  })

  // electronic force
  entries.forEach(([k, v]) => {
    const neighbor: (Regions | Provinces)[] = []
    edges.forEach(([a, b]) => {
      if (a == k) neighbor.push(b)
      if (b == k) neighbor.push(a)
    })

    neighbor.forEach(n1 => {
      neighbor.forEach(n2 => {
        if (n1 != n2) {
          let dx = points[n2].x - points[n1].x
          let dy = points[n2].y - points[n1].y
          const len = Math.max(Math.sqrt(dx*dx + dy*dy), 1)
          if (len > 0) {
            dx *= 10 / (len ** 3)
            dy *= 10 / (len ** 3)
            points[n1].vx -= dx
            points[n1].vy -= dy
            points[n2].vx += dx
            points[n2].vy += dy
          }
        } 
      })
    })
  })

  // regions.forEach(c => {
  //   points[c].vx *= 0.9
  //   points[c].vy *= 0.9
  // })
}

function randomInt(a: number, b: number) {
  return Math.random() * (b - a) + a
}

function randomNoise(delta: number) {
  return Math.random() * 2 * delta - delta
}

function randomText() {
  return (Math.random() * 1e15).toString(16);
}

function isRegion(str: string): str is Regions {
  return str.endsWith("_r")
}

function isProvince(str: string): str is Provinces {
  return str.endsWith("_p")
}

function isAnswer(str: string): str is Regions | Provinces {
  return isProvince(str) && answers.includes(str);
}