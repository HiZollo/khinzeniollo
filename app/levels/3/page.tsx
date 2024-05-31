'use client'
import GeneralCanvas from '@/components/generalCanvas'
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { Piano } from '@tonejs/piano';

const SIZE = 608;
const RADIUS = 8;
const VELOCITY = 8;
const DELTA = RADIUS - VELOCITY;

function get(arr: (null | [number, number])[], idx: number): null | [string, number] {
  const target = arr[indices[idx]];
  if (!target) return null;
  return [str[target[0] >> 3] + (target[0] & 7), target[1]];
}

function x(s: string) {
  let a = "";
  for (const c of s) {
    a += parseInt(a).toString() + c.charCodeAt(0);
  }
  return a;
}
function y(s: string) { return s + "Beat it." }
function z(s: string) { return "Country" + s + "Take Me Home." }

const left: (null | [number, number])[] = [[285,1],[420,1],[148,1],[564,1],[5,1],[5,1],[148,1],[5,1],null,[4,1],[420,1],[420,1],[4,1],[420,1],[491,1],[284,1],[4,1],[100,1],[285,1],[100,1],[4,1],[148,1],[148,1],[5,1],[5,1],[564,1],[284,1],[4,1],[564,1],[492,1],[4,1],[420,1],[492,1],[564,1],[420,1],[4,1],[420,1],[284,1],[148,1],[4,1],[420,1],[4,1],[420,1],[4,1],[420,1],[5,1],[5,1],[148,1],[420,1],[4,1],[492,1],[491,1],[563,1],[148,1],[420,1],[420,1],[420,1],[420,1],[565,1],[5,1],[284,1],[4,1],[285,1],[492,1],[148,1],[419,1],[284,1],[4,1],[5,1],[5,1],[420,1],[564,1],[565,1],[5,1],[420,1],[420,1],[4,1],[565,1],[4,1],[492,1],[4,1],[420,1],null,[491,1],[420,1],[101,1],[5,1],[492,1],[420,1],[4,1],[421,1],[565,1],[563,1],[4,1],[4,1],[5,1],[148,1],[100,1],[564,1],[4,1],[419,1],[101,1],[5,1],[5,1],[420,1],[284,1],[5,1],[5,1],[284,1],[148,1],[285,1],[148,1],[563,1],[420,1],[148,1],[5,1],[148,1],[420,1],[285,1],[420,1],[564,1],[4,1],[101,1],[4,1],[420,1],[149,2],[101,1],[564,1],[420,1],[148,1],[420,1],[5,1],[5,1],[5,1],[148,1],[420,1],[420,1],[492,1],[285,1],[563,1],[420,1],[564,1],[100,1],[420,1],[284,1],[564,1],[285,1],[4,1],[420,1],[101,1],[420,1],[285,1],[5,1],[284,1],[420,1],[420,1],[5,1],[5,1],[421,1],[420,1],[491,1],[284,1],[564,1],[5,1],[4,1],[565,1],[284,1],[5,1],[100,1],[5,1],[284,1],[420,1],[284,1],[4,1],[101,1],[420,1],[5,1],[420,1],[5,1],[284,1],[5,1],[5,1],null,[284,1],[284,1],[565,1],[148,1],[565,1],[492,1],[5,1],[4,1],[100,1]];
const right: (null | [number, number])[] = [null,null,null,[102,1],[494,2],null,null,[150,1],null,null,null,null,null,null,[6,3],null,null,null,null,null,null,null,null,[6,1],null,[102,1],[422,3],null,[7,3],[286,1],[6,2],[6,1],null,null,null,[6,1],null,[102,1],null,null,[102,1],null,null,[286,1],[286,1],null,[149,1],[286,1],[102,2],[286,3],null,[6,3],[6,3],[422,1],null,[102,1],null,null,null,[422,2],null,null,[493,1],[493,1],null,[149,2],null,[6,3],[494,2],[422,2],null,null,null,[150,1],[286,1],[102,1],null,null,[6,4],[286,1],[286,3],null,[421,2],[6,3],[422,3],null,null,null,[102,1],null,[421,2],[102,1],[6,3],[422,3],[422,3],null,null,null,[6,3],null,[149,2],null,null,null,null,null,null,[286,1],[149,3],[422,1],null,null,[6,2],[493,2],[149,1],null,null,null,null,null,[7,3],[6,2],null,[6,1],null,null,null,[493,3],[421,2],[286,1],null,null,[286,1],null,[149,1],null,null,[493,1],null,[6,2],[102,4],[6,2],null,null,null,[494,3],null,[286,4],null,null,[6,1],[493,1],null,null,null,null,null,null,null,[422,3],[6,3],[149,4],[494,3],null,[6,3],null,[6,1],null,[102,2],[286,1],[149,4],[102,2],[102,1],[6,4],null,null,[422,2],null,null,[149,3],null,[422,2],null,[422,3],[6,1],null,null,null,null,null,[286,1],[102,2]];
const indices = [128,164,34,24,44,93,1,189,31,108,116,146,47,183,2,18,53,145,103,77,73,120,5,72,4,76,159,163,154,12,143,132,40,51,144,50,166,83,153,29,172,52,20,71,35,112,39,3,190,191,188,149,137,65,142,171,19,78,10,106,177,27,175,59,54,49,119,95,88,30,57,69,117,170,64,138,6,60,186,62,114,127,131,185,46,113,85,90,101,147,13,102,124,9,130,181,81,80,56,86,75,121,70,176,42,161,111,110,38,105,22,151,134,98,156,187,23,141,167,91,169,140,122,158,174,125,8,182,82,67,11,180,74,94,148,45,150,179,96,118,129,26,21,0,109,162,152,58,7,28,115,165,68,41,84,133,36,99,155,107,55,14,15,32,184,160,66,79,37,92,61,33,123,139,89,25,43,168,87,126,63,100,97,48,17,173,136,178,135,16,104,157];
const str = `Congrats. I don't believe what I see. A man as strong as you are. The final answer is ${x(`${y(`${z("road")}`)}`)}.`;

export default function Tres() {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const pianoRef = useRef<Piano>();

  useEffect(() => {
    const piano = new Piano({
      velocities: 5,
    });

    piano.toDestination();
    piano.load().then(() => {
      pianoRef.current = piano;
      setLoading(false);
    }).catch(console.log);

    game.reset();

    return () => {
      if (pianoRef.current) {
        pianoRef.current.dispose();
      }
    };
  }, []);

  async function playNote(direction: number) {
    if (!pianoRef.current) return;

    if (Tone.getContext().state !== 'running') {
      await Tone.start();
    }

    const leftNote = get(left, game.index);
    const rightNote = get(right, game.index);

    if (leftNote) {
      pianoRef.current.keyDown({ note: leftNote[0], time: Tone.now(), velocity: 0.1 });
      pianoRef.current.keyUp({ note: leftNote[0], time: Tone.now() + 1.5 * (leftNote[1] ?? 1) });
    }
    if (rightNote) {
      pianoRef.current.keyDown({ note: rightNote[0], time: Tone.now(), velocity: 0.1 });
      pianoRef.current.keyUp({ note: rightNote[0], time: Tone.now() + 1.5 * (rightNote[1] ?? 1) });
    }

    game.index -= direction;
  }

  function onclick() {
    if (!started) {
      setStarted(true)
    }
  }

  if (loading) {
    return (
      <>
        <h1>¿Cómo cantar?</h1>
        <p>Cargando...</p>
      </>
    )
  }

  return (
    <>
      <h1>¿Cómo cantar?</h1>
      <p>Una pequeña caja de música, que según la leyenda es una reliquia de un gran hombre.</p>
      <p>Retrocediendo en el tiempo, en una noche donde la luz de la luna ilumina la tierra, toca una melodía.</p>
      <p>La melodía fluye silenciosamente en el corazón.</p>
      <p>Por favor, cuida con esmero las piezas dentro de la caja, no las rompas.</p>
      <GeneralCanvas
        animate={(ctx) => {
          const alive = animate(ctx, playNote, started);
          if (!alive) {
            setStarted(false);
            game.reset();
          }
        }}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onClick={onclick}
        width={SIZE}
        height={SIZE}
      ></GeneralCanvas>
    </>
  )
}

enum WallMode {
  Through, Block, Mirror
}

const game: {
  ball: { x: number, y: number, vx: number, vy: number, r: number }, 
  walls: Record<'up' | 'left' | 'right' | 'down', { from: [number, number], to: [number, number] }>, 
  targets: [{ x: number, y: number }, { x: number, y: number }][], 
  target: { x: number, y: number }[], 
  lastTarget: number, 
  mode: WallMode, 
  blockKey: boolean, 
  mirrorKey: boolean, 
  sequence: WallMode[], 
  index: number, 
  finished: boolean, 
  reset(): void
} = {
  ball: { x: SIZE / 4 + RADIUS, y: RADIUS, vx: -VELOCITY, vy: -VELOCITY, r: RADIUS }, 
  walls: {
    up:    { from: [SIZE / 2, 0],    to: [SIZE / 2, SIZE / 3],    }, 
    left:  { from: [0, SIZE / 2],    to: [SIZE / 3, SIZE / 2],    }, 
    right: { from: [SIZE, SIZE / 2], to: [SIZE * 2 / 3, SIZE / 2] }, 
    down:  { from: [SIZE / 2, SIZE], to: [SIZE / 2, SIZE * 2 / 3] }, 
  }, 
  targets: [
    [{ x: SIZE     / 4 + DELTA, y: DELTA }       , { x: DELTA       , y: SIZE     / 4 + DELTA }], 
    [{ x: SIZE * 3 / 4 - DELTA, y: DELTA }       , { x: SIZE - DELTA, y: SIZE     / 4 + DELTA }], 
    [{ x: SIZE     / 4 + DELTA, y: SIZE - DELTA }, { x: DELTA       , y: SIZE * 3 / 4 - DELTA }], 
    [{ x: SIZE * 3 / 4 - DELTA, y: SIZE - DELTA }, { x: SIZE - DELTA, y: SIZE * 3 / 4 - DELTA }], 
  ], 
  
  target: [], 
  lastTarget: 0, 
  mode: WallMode.Through, 
  blockKey: false, 
  mirrorKey: false, 
  sequence: [], 
  index: left.length - 1, 
  finished: false, 

  reset() {
    this.ball = { x: SIZE / 4 + RADIUS, y: RADIUS, vx: -VELOCITY, vy: -VELOCITY, r: RADIUS };
    this.walls = {
      up:    { from: [SIZE / 2, 0],    to: [SIZE / 2, SIZE / 3],    }, 
      left:  { from: [0, SIZE / 2],    to: [SIZE / 3, SIZE / 2],    }, 
      right: { from: [SIZE, SIZE / 2], to: [SIZE * 2 / 3, SIZE / 2] }, 
      down:  { from: [SIZE / 2, SIZE], to: [SIZE / 2, SIZE * 2 / 3] }, 
    };
    this.targets = [
      [{ x: SIZE     / 4 + DELTA, y: DELTA }       , { x: DELTA       , y: SIZE     / 4 + DELTA }], 
      [{ x: SIZE * 3 / 4 - DELTA, y: DELTA }       , { x: SIZE - DELTA, y: SIZE     / 4 + DELTA }], 
      [{ x: SIZE     / 4 + DELTA, y: SIZE - DELTA }, { x: DELTA       , y: SIZE * 3 / 4 - DELTA }], 
      [{ x: SIZE * 3 / 4 - DELTA, y: SIZE - DELTA }, { x: SIZE - DELTA, y: SIZE * 3 / 4 - DELTA }], 
    ];

    this.target = structuredClone(this.targets[0]);
    this.lastTarget = 0;
    this.mode = WallMode.Through;
    this.blockKey = false;
    this.mirrorKey = false;
    this.sequence = [];
    this.index = left.length - 1;
    this.finished = false;
  }
}

function onKeyDown(code: string, e: KeyboardEvent) {
  if (e.repeat) return;

  switch (code) {
    case 'KeyZ':
      game.mode = WallMode.Block;
      game.blockKey = true;
      break;
    case 'KeyX':
      game.mode = WallMode.Mirror;
      game.mirrorKey = true;
      break;
  }
}

function onKeyUp(code: string) {
  switch (code) {
    case 'KeyZ':
      game.mode = game.mirrorKey ? WallMode.Mirror : WallMode.Through;
      game.blockKey = false;
      break;
    case 'KeyX':
      game.mode = game.blockKey ? WallMode.Block : WallMode.Through;
      game.mirrorKey = false;
      break;
  }
}

function animate(ctx: CanvasRenderingContext2D, playNextNote: (dir: number) => void, started: boolean): boolean {
  ctx.clearRect(0, 0, SIZE, SIZE)

  if (game.index < 0) {
    game.finished = true;
    game.ball.x += game.ball.vx;
    game.ball.y += game.ball.vy;
    game.ball.vx = -game.ball.vx;
    game.ball.vy = -game.ball.vy;
    game.index = 0;
  }

  if (game.finished) {
    if (!game.sequence.length) {
      return true;
    }

    game.mode = game.sequence[game.sequence.length - 1];
    for (const wall of Object.values(game.walls)) {
      ctx.strokeStyle = 
        game.mode === WallMode.Block ? "red" : 
        game.mode === WallMode.Mirror ? "blue" : "green"
      ctx.beginPath();
      ctx.moveTo(...wall.from);
      ctx.lineTo(...wall.to);
      ctx.stroke();
    }

    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(game.ball.x, game.ball.y, RADIUS, 0, 2 * Math.PI, false)
    ctx.fill()

    const collideEdge = physics();
    const collideWall = contactWall();

    if (collideEdge || collideWall) {
      playNextNote(-1);
      game.sequence.pop();
    }

    return true;
  }

  if (!started) {
    let text = ctx.measureText("Haz clic para comenzar.");
    let width = text.width;
    let height = text.fontBoundingBoxAscent + text.fontBoundingBoxDescent;
    ctx.fillStyle = "#ffffff"
    ctx.font = "48px arial"
    ctx.fillText("Haz clic para comenzar.", (SIZE - width) / 2, (SIZE + height) / 2 - 84)
    
    text = ctx.measureText("Presiona Z/X para cambiar");
    width = text.width;
    height = text.fontBoundingBoxAscent + text.fontBoundingBoxDescent;
    ctx.fillText("Presiona Z/X para cambiar", (SIZE - width) / 2, (SIZE + height) / 2 - 24)
    
    text = ctx.measureText("los modos de control");
    width = text.width;
    height = text.fontBoundingBoxAscent + text.fontBoundingBoxDescent;
    ctx.fillText("los modos de control", (SIZE - width) / 2, (SIZE + height) / 2 + 36)

    return true;
  }

  ctx.lineWidth = 3;
  for (const wall of Object.values(game.walls)) {
    ctx.strokeStyle = 
      game.mode === WallMode.Block ? "red" : 
      game.mode === WallMode.Mirror ? "blue" : "green"
    ctx.beginPath();
    ctx.moveTo(...wall.from);
    ctx.lineTo(...wall.to);
    ctx.stroke();
  }

  ctx.fillStyle = "orange"
  ctx.fillRect(game.target[0].x - RADIUS, game.target[0].y - RADIUS, RADIUS * 2, RADIUS * 2);

  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.arc(game.ball.x, game.ball.y, RADIUS, 0, 2 * Math.PI, false)
  ctx.fill()

  const collide = physics();
  
  if (collide) {
    game.sequence.push(game.mode);
    playNextNote(1);

    if (game.ball.x === game.target[0].x && game.ball.y === game.target[0].y) {
      game.target.shift();
      if (game.target.length === 0) {
        let r = game.lastTarget
        while (r === game.lastTarget) {
          r = Math.floor(Math.random() * game.targets.length);
        }
        let [a, b] = game.targets[r];
        if (Math.random() > 0.5) {
          [a, b] = [b, a];
        }
        game.lastTarget = r;
        game.target = [a, b];
      }
    }
    else {
      return false;
    }
  }

  if (contactWall()) {
    game.sequence.push(game.mode);
    game.mode = WallMode.Through;
    playNextNote(1);
  }

  return true;
}

function physics(): boolean {
  game.ball.x += game.ball.vx;
  game.ball.y += game.ball.vy;

  if (game.ball.x < RADIUS || SIZE - RADIUS < game.ball.x) {
    game.ball.vx = -game.ball.vx;
    return true;
  }
  if (game.ball.y < RADIUS || SIZE - RADIUS < game.ball.y) {
    game.ball.vy = -game.ball.vy;
    return true;
  }
  return false;
}

function contactWall(): boolean {
  if (game.ball.x === SIZE / 2) {
    switch (game.mode) {
      case WallMode.Block:
        game.ball.vx = -game.ball.vx;
        break;

      case WallMode.Mirror:
        game.ball.vy = -game.ball.vy;
    }
    return true;
  }

  if (game.ball.y === SIZE / 2) {
    switch (game.mode) {
      case WallMode.Block:
        game.ball.vy = -game.ball.vy;
        break;

      case WallMode.Mirror:
        game.ball.vx = -game.ball.vx;
    }
    return true;
  }

  return false;
}
